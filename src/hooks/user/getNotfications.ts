
"use client";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export type NotificationTypes = {
  notificationId: number;
  ownerId: number;
  title: string;
  description: string;
  read: boolean;
  status: string;
  dateCreated: string;
};

const defaultMeta: MetaTypes = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};

export type NotificationPage = {
  notification: NotificationTypes[];
  meta: MetaTypes;
};

export default function useNotifications({ pageSize }: { pageSize: number }) {
  const query = useInfiniteQuery({
    queryKey: ["notifications", pageSize],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      params.append("page", pageParam.toString());
      params.append("dataPerPage", pageSize.toString());
      params.append("sortBy", "dateCreated");
      params.append("order", "desc");

      const endpoint = `${
        process.env.NEXT_PUBLIC_USER_URL
      }/getNotifications?${params.toString()}`;

      try {
        const res = await axios.get<{
          notification: NotificationTypes[];
          meta: MetaTypes;
        }>(endpoint, { withCredentials: true });

        return res.data;
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot fetch notifications.",
          });
        }
        throw error;
      }
    },

    // ✅ This line fixes your TypeScript error
    initialPageParam: 1,
    maxPages: 20,

    getNextPageParam: (lastPage) => {
      const { meta } = lastPage;
      return meta.page < meta.totalPage ? meta.page + 1 : undefined;
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const data = query.data?.pages.flatMap((p) => p.notification) ?? [];
  const meta = query.data?.pages.at(-1)?.meta ?? defaultMeta;

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [
    inView,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
  ]);
  return {
    data,
    meta,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    ref,
  };
}

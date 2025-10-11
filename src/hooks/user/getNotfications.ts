"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
export type NotificationTypes = {
  notificationId: number;
  ownerId: number;
  title: string;
  description: string;
  read: boolean;
  dateCreated: string;
};
export default function usefetchNotifications({
  page,
  pageSize,
  accountId,
}: {
  page: number;
  pageSize?: number;
  accountId?: number;
}) {
  const [data, setData] = useState<NotificationTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      if (page === 1) setLoading(true);
      else setIsFetchingMore(true);
      try {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("dataPerPage", pageSize.toString());

        if (accountId) params.append("accountId", accountId.toString());

        const endpoint = `${
          process.env.NEXT_PUBLIC_USER_URL
        }/getNotifications?${params.toString()}`;

        const res = await axios.get<{
          notification: NotificationTypes[];
          meta: MetaTypes;
        }>(endpoint, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setData((prevData) =>
            page > 1
              ? [...prevData, ...res.data.notification]
              : res.data.notification
          );
          setMeta(res.data.meta);
        }
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    }

    fetchNotifications();
  }, [page, pageSize]);

  return { data, loading, meta, isFetchingMore, setData };
}

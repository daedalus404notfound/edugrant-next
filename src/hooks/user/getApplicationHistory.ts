"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useHistoryStore } from "@/store/historyUserStore";

export default function useClientHistoryApplications() {
  const { loadingUser } = useUserStore();
  const { meta, setMeta, resetPage, search, sortBy, order, page, pageSize } =
    useHistoryStore();

  const debouncedSearch = useDebounce(search, 800);
  useEffect(() => {
    resetPage();
  }, [debouncedSearch, sortBy, order]);
  const query = useQuery({
    queryKey: [
      "historyApplications",
      page,
      pageSize,
      sortBy,
      order,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (pageSize) params.append("dataPerPage", pageSize.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_USER_URL
      }/getApplicationHistory?${params.toString()}`;
      console.log("Fetching:", endpoint);

      try {
        const res = await axios.get<{
          applications: ApplicationFormData[];
          meta: MetaTypes;
        }>(endpoint, { withCredentials: true });

        return res.data;
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !loadingUser,
  });

  const data = query.data?.applications ?? [];
  useEffect(() => {
    if (query.isSuccess && query.data?.meta) {
      setMeta(query.data.meta);
    }
  }, [query.isSuccess, query.data?.meta, setMeta]);
  return {
    data,
    meta,
    isLoading: query.isLoading || loadingUser,
    isError: query.isError,
    refetch: query.refetch,
  };
}

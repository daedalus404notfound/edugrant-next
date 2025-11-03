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
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (!error.response) {
          StyledToast({
            status: "error",
            title: "Network Error",
            description:
              "No internet connection or the server is unreachable. Please check your connection and try again.",
          });
        } else if (status === 400) {
          StyledToast({
            status: "error",
            title: "Bad Request",
            description: message ?? "Invalid request. Please check your input.",
          });
        } else if (status === 401) {
          StyledToast({
            status: "error",
            title: "Unauthorized",
            description:
              message ?? "You are not authorized. Please log in again.",
          });
        } else if (status === 403) {
          StyledToast({
            status: "error",
            title: "Forbidden",
            description:
              message ?? "You do not have permission to perform this action.",
          });
        } else if (status === 404) {
          StyledToast({
            status: "warning",
            title: "No data found",
            description: message ?? "There are no records found.",
          });
        } else if (status === 500) {
          StyledToast({
            status: "error",
            title: "Server Error",
            description:
              message ?? "Internal server error. Please try again later.",
          });
        } else {
          StyledToast({
            status: "error",
            title: message ?? "Export CSV error occurred.",
            description: "Cannot process your request.",
          });
        }
      } else {
        StyledToast({
          status: "error",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
      throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  
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
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

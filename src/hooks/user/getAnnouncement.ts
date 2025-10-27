
"use client";

import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MetaTypes } from "../zodMeta";
import { AnnouncementFormDataGet } from "../zod/announcement";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder"; // use same debounce util
import { useAnnouncementUserStore } from "@/store/announcementUserStore";
import { useUserStore } from "@/store/useUserStore";

export default function useAnnouncementData() {
  const { loadingUser } = useUserStore();
  const { meta, setMeta, page, pageSize, sortBy, order, search, resetPage } =
    useAnnouncementUserStore();

  const debouncedSearch = useDebounce(search, 800);

  useEffect(() => {
    resetPage();
  }, [debouncedSearch, sortBy, order, search]);

  const query = useQuery({
    queryKey: ["announcements", page, pageSize, sortBy, order, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (pageSize) params.append("dataPerPage", pageSize.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_USER_URL
      }/getAnnouncements?${params.toString()}`;
      console.log("Fetching announcements:", endpoint);

      try {
        const res = await axios.get<{
          annoucements: AnnouncementFormDataGet[];
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
             description:
               message ?? "Invalid request. Please check your input.",
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
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 min cache
    enabled: !loadingUser,
  });

  const data = query.data?.annoucements ?? [];

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

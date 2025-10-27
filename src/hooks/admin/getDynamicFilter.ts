"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterOptions } from "../zod/filter";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useGetFilter({
  applicationStatus,
  scholarshipStatus,
}: {
  applicationStatus?: string;
  scholarshipStatus?: string;
}) {
  const [filter, setFilter] = useState<FilterOptions | null>(null);
  const [filterLoading, setFilterLoading] = useState(true);
  useEffect(function () {
    async function fetchFilter() {
      setFilterLoading(true);
      try {
        const res = await axios.get<FilterOptions>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getFilterData`,
          {
            withCredentials: true,
            params: {
              ...(applicationStatus && { applicationStatus }),
              ...(scholarshipStatus && { scholarshipStatus }),
            },
          }
        );
        if (res.status === 200) {
          // console.log("API filter:", res.data);
          setFilter(res.data);
        }
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
      } finally {
        setFilterLoading(false);
      }
    }

    fetchFilter();
  }, []);

  return { filter, filterLoading };
}

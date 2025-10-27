"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetApplicationFormData } from "../zod/getApplicationZod";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useApplicationById(id: number) {
  const [data, setData] = useState<GetApplicationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchApplicationById() {
        setLoading(true);
        try {
          const res = await axios.get<{
            data: GetApplicationFormData;
          }>(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getApplicationById?applicationId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log(res);
            setData(res.data.data);
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
                 message ??
                 "You do not have permission to perform this action.",
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
          setLoading(false);
        }
      }

      fetchApplicationById();
    },
    [id]
  );

  return { data, loading, error };
}

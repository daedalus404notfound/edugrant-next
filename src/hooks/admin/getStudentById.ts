"use client";
import axios from "axios";
import { StudentUserFormData } from "../user/zodUpdateUserByHead";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useQuery } from "@tanstack/react-query";

export default function useGetStudentsById(id: number) {
  const query = useQuery({
    queryKey: ["headStudentManage", id],
    queryFn: async () => {
      try {
        const res = await axios.get<{
          student: StudentUserFormData;
        }>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getStudentsById?ownerId=${id}`,
          { withCredentials: true }
        );
        return res.data.student;
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
    enabled: !!id, // only fetch if id exists
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

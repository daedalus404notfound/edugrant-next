"use client";
import axios from "axios";
import { StudentUserFormData } from "../user/zodUpdateUserByHead";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useQuery } from "@tanstack/react-query";

export default function useScholarshipUserByIdAdmin(id: number) {
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
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
        throw error;
      }
    },
    enabled: !!id, // only fetch if id exists
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.isError ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

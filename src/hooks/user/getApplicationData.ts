"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { ApplicationFormData } from "../zod/application";

export interface ScholarshipByIdResponse {
  application: ApplicationFormData;
}

export default function useApplicationUserById({ id }: { id: number }) {
  const query = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      try {
        const res = await axios.get<ScholarshipByIdResponse>(
          `${process.env.NEXT_PUBLIC_USER_URL}/getStudentApplicationById?applicationId=${id}`,
          { withCredentials: true }
        );
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
    enabled: !!id, // Only run query if id exists
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes - adjust as needed
  });

  return {
    data: query.data?.application ?? null,
    loading: query.isLoading,
    error: query.error ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

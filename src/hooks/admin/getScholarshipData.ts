"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { displayScholarshipFormData } from "./displayScholarshipData";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";

export default function useScholarshipUserByIdAdmin(id: number) {
  const query = useQuery({
    queryKey: ["adminScholarship", id],
    queryFn: async () => {
      try {
        const res = await axios.get<{
          scholarship: displayScholarshipFormData;
        }>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getScholarshipsById?scholarshipId=${id}`,
          { withCredentials: true }
        );
        return res.data.scholarship;
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
    loading: query.isLoading,
    error: query.isError ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

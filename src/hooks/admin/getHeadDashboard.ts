"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { scholarshipFormData } from "./zodUpdateScholarship";
import { ApplicationFormData } from "../zod/application";
import { handleApiError } from "@/lib/handleApiError";

export type DashboardData = {
  GeneralCount: number;
  indiginousApplicationCount: number;
  PWDApplicationCount: number;
  activeScholarshipCount: number;
  applcationCount: number;
  approvedApplcationCount: number;
  pendingApplcationCount: number;
  applicationCountPerInsti: InstitteCountTypes[];
  applications: ApplicationFormData[];
  scholarship: scholarshipFormData[];
  applicationApprovedToday: number;
  scholarshipCountToday: number;
  applicationCountToday: number;
  applicationPendingToday: number;
};

type InstitteCountTypes = {
  institute: string;
  applicationCount: number;
};

export default function useFetchHeadDashboard() {
  const query = useQuery({
    queryKey: ["headDashboard"],
    queryFn: async () => {
      try {
        const res = await axios.get<DashboardData>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/headDashboard`,
          { withCredentials: true }
        );
        return res.data;
      } catch (error) {
        handleApiError(error, true); // toast + safe throw
      }
    },
    refetchOnMount: true, // ✅ Refetch every time component remounts
    refetchOnWindowFocus: false, // Optional: disable refetch when window regains focus
    staleTime: 1000 * 60, // Optional: 1 minute cache
    retry: false,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.isError ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

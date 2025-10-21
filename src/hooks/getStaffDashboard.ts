"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApiErrorResponse } from "./admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { scholarshipFormData } from "./admin/zodUpdateScholarship";
import { ApplicationFormData } from "./zod/application";

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

export default function usefetchStaffDashboard(accountId?: number) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(function () {
    async function fetchStaffDashboard() {
      setLoading(true);
      try {
        const res = await axios.get<DashboardData>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getDashboard${
            accountId ? `?accountId=${accountId}` : ""
          }`,

          { withCredentials: true }
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStaffDashboard();
  }, []);

  return { data, loading, error };
}

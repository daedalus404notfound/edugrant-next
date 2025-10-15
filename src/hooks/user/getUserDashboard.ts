"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import { ApplicationFormData } from "../zod/application";
import { AnnouncementFormDataGet } from "../zod/announcement";

export type DashboardData = {
  recentApplications: ApplicationFormData[];
  onGoingScholarships: scholarshipFormData[];
  announcements: AnnouncementFormDataGet[];
  interviewApplicationCount: number;
  approvedApplicationsCount: number;
  pendingApplicationCount: number;
  scholarshipActivity: string;
  totalApplicationsCount: number;
};

export default function usefetchUserDashboard(
  accountId?: number,
  schoolId?: string
) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("zz", data);
  useEffect(function () {
    async function fetchUserDashboard() {
      setLoading(true);
      try {
        const res = await axios.get<DashboardData>(
          `${process.env.NEXT_PUBLIC_USER_URL}/getDashboard${
            accountId ? `?accountId=${accountId}` : ""
          }${accountId ? `&schoolId=${schoolId}` : ""}`,

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

    fetchUserDashboard();
  }, []);

  return { data, loading, error };
}

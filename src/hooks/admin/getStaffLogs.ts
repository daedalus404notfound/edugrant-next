"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { UserFormData } from "../user/zodUserProfile";
import { ApplicationFormData } from "../zod/application";
import { scholarshipFormData } from "./zodUpdateScholarship";

type StaffLogs = {
  action: string;
  applicationId: number;
  dateCreated: string;
  description: string;
  logsId: number;
  scholarshipId: number;
  staffId: number;
  application: ApplicationFormData;
  scholarship: scholarshipFormData;
};
export default function useGetStaffLogs(id: string, accountId?: number) {
  const [data, setData] = useState<StaffLogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(data);
  useEffect(
    function () {
      async function fetchStaffLogs() {
        setLoading(true);
        try {
          const res = await axios.get<{ Staff_Logs: StaffLogs[] }>(
            `${
              process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
            }/getStaffById?staffId=${id}${
              accountId ? `&accountId=${accountId}` : ""
            }`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.Staff_Logs);
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

      fetchStaffLogs();
    },
    [id]
  );

  return { data, loading, error };
}

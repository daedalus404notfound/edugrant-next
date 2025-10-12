"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { displayScholarshipFormData } from "./displayScholarshipData";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
export default function useScholarshipUserByIdAdmin(id: string) {
  const [data, setData] = useState<displayScholarshipFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchScholarshipsAdmin() {
        setLoading(true);
        try {
          const res = await axios.get<{
            scholarship: displayScholarshipFormData;
          }>(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getScholarshipsById?scholarshipId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.scholarship);
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

      fetchScholarshipsAdmin();
    },
    [id]
  );

  return { data, loading, error, setData };
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { displayScholarshipFormData } from "../admin/displayScholarshipData";

export default function useScholarshipUserById(id: string) {
  const [data, setData] = useState<displayScholarshipFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGovernmentAlready, setIsGovernmentAlready] = useState(false);

  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_USER_URL}/getScholarshipsbyId?scholarshipId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.scholarship);
            setIsGovernmentAlready(res.data.inGovScholar);
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

      fetchScholarships();
    },
    [id]
  );

  return { data, loading, error, isGovernmentAlready, setData };
}

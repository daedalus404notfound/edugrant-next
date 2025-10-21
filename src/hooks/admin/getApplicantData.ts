"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationFormData } from "../zod/application";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useApplicationById(id: number) {
  const [data, setData] = useState<ApplicationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchApplicationById() {
        setLoading(true);
        try {
          const res = await axios.get<{
            data: ApplicationFormData;
          }>(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getApplicationById?applicationId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log(res);
            setData(res.data.data);
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

      fetchApplicationById();
    },
    [id]
  );

  return { data, loading, error };
}

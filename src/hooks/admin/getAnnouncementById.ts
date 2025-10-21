"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { displayScholarshipFormData } from "./displayScholarshipData";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { AnnouncementFormDataGet } from "../zod/announcement";
export default function useGetAnnouncementById(id: number, accountId?: number) {
  const [data, setData] = useState<AnnouncementFormDataGet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchAnnouncementById() {
        setLoading(true);
        try {
          const res = await axios.get<{ annoucement: AnnouncementFormDataGet }>(
            `${
              process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
            }/getAnnouncementById?announcementId=${id}${
              accountId ? `&accountId=${accountId}` : ""
            }`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.annoucement);
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

      fetchAnnouncementById();
    },
    [id]
  );

  return { data, loading, error };
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useFetchApplicationCSVShit({
  accountId,
}: {
  accountId?: number;
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSubmitting = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (accountId) params.append("accountId", String(accountId));

      const endpoint = `${
        process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
      }/getFiltersCSV?${params.toString()}`;

      const res = await axios.get(endpoint, { withCredentials: true });
      if (res.status === 200) {
        setData(res.data.dataSelections);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "Export CSV error occurred.",
          description: "Cannot process your request.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, onSubmitting };
}

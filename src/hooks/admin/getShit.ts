"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
type Meow = {
  dataSelections: [];
  filters: {
    applicationStatus: [];
    course: [];
    institute: [];
    scholarshipTitles: [];
    section: [];
    year: [];
  };
};
export default function useFetchApplicationCSVShit() {
  const [data, setData] = useState<Meow | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function ExportExcel() {
      setLoading(true);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getFiltersCSV`;

        const res = await axios.get<Meow>(endpoint, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title:
              error?.response?.data.message ?? "Export CSV error occurred.",
            description: "Cannot process your request.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
    ExportExcel();
  }, []);

  return { data, loading };
}

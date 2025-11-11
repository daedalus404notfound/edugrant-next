"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterOptions } from "../zod/filter";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { handleApiError } from "@/lib/handleApiError";

export default function useGetFilter({
  applicationStatus,
  scholarshipStatus,
}: {
  applicationStatus?: string;
  scholarshipStatus?: string;
}) {
  const [filter, setFilter] = useState<FilterOptions | null>(null);
  const [filterLoading, setFilterLoading] = useState(true);
  useEffect(function () {
    async function fetchFilter() {
      setFilterLoading(true);
      try {
        const res = await axios.get<FilterOptions>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getFilterData`,
          {
            withCredentials: true,
            params: {
              ...(applicationStatus && { applicationStatus }),
              ...(scholarshipStatus && { scholarshipStatus }),
            },
          }
        );
        if (res.status === 200) {
          // console.log("API filter:", res.data);
          setFilter(res.data);
        }
      } catch (error) {
        handleApiError(error, true);
      } finally {
        setFilterLoading(false);
      }
    }

    fetchFilter();
  }, []);

  return { filter, filterLoading };
}

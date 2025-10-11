"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { StudentUserFormData } from "../user/zodUserProfile";
const defaultMeta: MetaTypes = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};
export default function useFetchApplicationCSV({
  status,
  filters,
  accountId,
}: {
  status?: string;
  filters?: string;
  accountId?: number;
}) {
  const [data, setData] = useState<StudentUserFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  useEffect(
    function () {
      async function fetchApplicationCSV() {
        setLoading(true);
        try {
          const params = new URLSearchParams();

          if (status) params.append("status", status);
          if (accountId) params.append("accountId", String(accountId));
          if (filters) params.append("filters", filters);

          const endpoint = `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/downloadApplicationCSV?${params.toString()}`;

          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.students);
            setMeta(res.data.meta);
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

      fetchApplicationCSV();
    },
    [filters]
  );

  return { data, loading, meta };
}

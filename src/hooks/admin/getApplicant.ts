"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useAdminStore } from "@/store/adminUserStore";
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
export default function useFetchApplications({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
}) {
  const [data, setData] = useState<ApplicationFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  const { loading: loadingAdmin } = useAdminStore();

  const loadingState = loading || loadingAdmin;
  useEffect(
    function () {
      async function fetchApplications() {
        setLoading(true);
        try {
          const params = new URLSearchParams();

          if (status) params.append("status", status);
          if (page) params.append("page", String(page));
          if (pageSize) params.append("dataPerPage", String(pageSize));
          if (sortBy) params.append("sortBy", sortBy);
          if (order) params.append("order", order);
          if (filters) params.append("filters", filters);

          const endpoint = `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getApplication?${params.toString()}`;

          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.data);
            setMeta(res.data.meta);
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

      fetchApplications();
    },
    [page, pageSize, sortBy, order, filters]
  );

  return { data, loadingState, meta, setData };
}

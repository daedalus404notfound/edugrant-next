"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "./zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { useAdminStore } from "@/store/adminUserStore";

type CountIndicator = {
  countActive: number;
  countExpired: number;
  countRenew: number;
  countArchived: number;
};

export type ExtendedMeta = MetaTypes & { count: CountIndicator };

export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
  accountId,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
  accountId?: number;
}) {
  const [data, setData] = useState<scholarshipFormData[]>([]);
  const [meta, setMeta] = useState<ExtendedMeta>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
    count: { countActive: 0, countExpired: 0, countRenew: 0, countArchived: 0 },
  });

  const [loading, setLoading] = useState(true);
  const { loading: loadingAdmin } = useAdminStore();
  const loadingState = loading || loadingAdmin;
  useEffect(() => {
    async function fetchScholarships() {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("dataPerPage", pageSize.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        if (filters) params.append("filters", filters);
        if (accountId) params.append("accountId", accountId.toString());

        const endpoint = `${
          process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        }/getScholarship?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

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

    fetchScholarships();
  }, [page, pageSize, sortBy, order, filters, status]);

  return { data, loadingState, meta, setData };
}

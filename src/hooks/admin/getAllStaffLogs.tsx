"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "./zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { StaffFormData } from "../zod/staff";
import { ApplicationFormData } from "../zod/application";

export type AllStaffLogsType = {
  scholarship: scholarshipFormData;
  ISPSU_Staff: StaffFormData;
  application: ApplicationFormData;
  dateCreated: string;
  status: string;
  logsId: number
};
export default function useGetAllStaffLogs({
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
  const [data, setData] = useState<AllStaffLogsType[]>([]);
  const [meta, setMeta] = useState<MetaTypes>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
  });

  const [loading, setLoading] = useState(true);
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
        }/getStaffLogs?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

        if (res.status === 200) {
          setData(res.data.Staff_Logs);
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

  return { data, loading, meta, setData };
}

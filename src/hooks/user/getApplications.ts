"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
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
export default function useClientApplications({
  page,
  pageSize,
  sortBy,
  order,
  status,
  userId,
  applicationId,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  userId?: string;
  applicationId?: string;
}) {
  const [data, setData] = useState<ApplicationFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function fetchApplications() {
        setLoading(true);
        try {
          const params = new URLSearchParams();

          if (status) params.append("status", status);
          if (applicationId)
            params.append("applicationId", applicationId.toString());
          if (userId) params.append("accountId", userId.toString());
          if (page) params.append("page", page.toString());
          if (pageSize) params.append("dataPerPage", pageSize.toString());
          if (sortBy) params.append("sortBy", sortBy);
          if (order) params.append("order", order);

          const endpoint = `${
            process.env.NEXT_PUBLIC_USER_URL
          }/getApplications?${params.toString()}`;
          console.log("Fetching:", endpoint);

          const res = await axios.get(endpoint, { withCredentials: true });

          if (res.status === 200) {
            setData(res.data.applications);
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
    [page, pageSize, sortBy, order, status]
  );

  return { data, loading, meta };
}

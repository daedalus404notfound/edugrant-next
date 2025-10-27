"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "./zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";

export default function useRenewScholarshipData({
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
    async function fetchRenewScholarships() {
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
        }/getRenewScholarship?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

        if (res.status === 200) {
          setData(res.data.data);
          setMeta(res.data.meta);
        }
      } catch (error) {
       if (axios.isAxiosError<ApiErrorResponse>(error)) {
         const status = error.response?.status;
         const message = error.response?.data?.message;

         if (!error.response) {
           StyledToast({
             status: "error",
             title: "Network Error",
             description:
               "No internet connection or the server is unreachable. Please check your connection and try again.",
           });
         } else if (status === 400) {
           StyledToast({
             status: "error",
             title: "Bad Request",
             description:
               message ?? "Invalid request. Please check your input.",
           });
         } else if (status === 401) {
           StyledToast({
             status: "error",
             title: "Unauthorized",
             description:
               message ?? "You are not authorized. Please log in again.",
           });
         } else if (status === 403) {
           StyledToast({
             status: "error",
             title: "Forbidden",
             description:
               message ?? "You do not have permission to perform this action.",
           });
         } else if (status === 404) {
           StyledToast({
             status: "warning",
             title: "No data found",
             description: message ?? "There are no records found.",
           });
         } else if (status === 500) {
           StyledToast({
             status: "error",
             title: "Server Error",
             description:
               message ?? "Internal server error. Please try again later.",
           });
         } else {
           StyledToast({
             status: "error",
             title: message ?? "Export CSV error occurred.",
             description: "Cannot process your request.",
           });
         }
       } else {
         StyledToast({
           status: "error",
           title: "Unexpected Error",
           description: "Something went wrong. Please try again later.",
         });
       }
       throw error;
      } finally {
        setLoading(false);
      }
    }

    fetchRenewScholarships();
  }, [page, pageSize, sortBy, order, filters, status]);

  return { data, loading, meta };
}

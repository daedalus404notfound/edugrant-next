"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useDebounce } from "@/lib/debounder";
import { useEffect, useState } from "react";

interface ScholarshipCounts {
  APPROVED: number;
  BLOCKED: number;
  DECLINED: number;
  PENDING: number;
  INTERVIEW: number;
}

export interface MetaWithCounts extends MetaTypes {
  counts: ScholarshipCounts;
}

const defaultMeta: MetaWithCounts = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
  counts: {
    APPROVED: 0,
    BLOCKED: 0,
    DECLINED: 0,
    PENDING: 0,
    INTERVIEW: 0,
  },
};

export type UseApplicationDataProps = {
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  status: string;
  search?: string;
};
export interface StaffApplicationsDataTypes {
  applications: ApplicationFormData[];
  meta: MetaWithCounts;
}
export default function useClientApplications({
  pagination,
  sorting,
  columnFilters,
  status,
  search,
}: UseApplicationDataProps) {
  const [meta, setMeta] = useState<MetaWithCounts>(defaultMeta);
  const debounce = useDebounce(search, 800);
  const query = useQuery({
    queryKey: [
      "clientApplications",
      pagination,
      sorting,
      columnFilters,
      status,
      debounce,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (debounce) params.append("search", debounce);
      params.append("page", (pagination.pageIndex + 1).toString()); // +1 if backend uses 1-based page indexing
      params.append("dataPerPage", pagination.pageSize.toString());
      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }
      if (columnFilters.length > 0) {
        params.append("filters", JSON.stringify(columnFilters));
      }

      const endpoint = `${
        process.env.NEXT_PUBLIC_USER_URL
      }/getApplications?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<StaffApplicationsDataTypes>(endpoint, {
          withCredentials: true,
        });

        return res.data;
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
            description: message ?? "Invalid request. Please check your input.",
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
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.meta) {
      setMeta(query.data.meta);
    }
  }, [query.isSuccess, query.data?.meta, setMeta]);

  return {
    query,
    meta,
  };
}

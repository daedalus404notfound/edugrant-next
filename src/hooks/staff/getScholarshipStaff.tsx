"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { useDebounce } from "@/lib/debounder";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { MetaTypes } from "../zodMeta";
type MetaPropTypes = {
  status: string;

  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  search?: string;
};

export interface GetScholarshopTypes {
  data: scholarshipFormData[];
  meta: MetaWithCountsScholarship;
}
interface ScholarshipCounts {
  countActive: number;
  countExpired: number;
  countRenew: number;
  countEnded: number;
}

export interface MetaWithCountsScholarship extends MetaTypes {
  count: ScholarshipCounts;
}

export const defaultMeta: MetaWithCountsScholarship = {
  page: 0,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
  count: {
    countActive: 0,
    countExpired: 0,
    countRenew: 0,
    countEnded: 0,
  },
};
export default function useScholarshipDataStaff({
  status,
  pagination,
  sorting,
  columnFilters,
  search,
}: MetaPropTypes) {
  const { pageIndex, pageSize } = pagination;
  const [meta, setMeta] = useState<MetaWithCountsScholarship>(defaultMeta);
  // console.log(status, pagination, sorting, columnFilters, search);
  // Debounce search input
  const debouncedSearch = useDebounce(search, 800);

  const query = useQuery({
    queryKey: [
      "staffScholarshipData",
      pagination,
      sorting,
      columnFilters,
      status,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Append parameters dynamically
      if (status) params.append("status", status);
      params.append("page", (pageIndex + 1).toString()); // +1 if backend uses 1-based page indexing
      params.append("dataPerPage", pageSize.toString());

      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }

      if (columnFilters.length > 0) {
        params.append("filters", JSON.stringify(columnFilters));
      }

      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
      }/getScholarship?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<GetScholarshopTypes>(endpoint, {
          withCredentials: true,
        });

        return res.data;
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
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

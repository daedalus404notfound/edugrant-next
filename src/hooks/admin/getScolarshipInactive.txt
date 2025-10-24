"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { scholarshipFormData } from "./zodUpdateScholarship";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { useDebounce } from "@/lib/debounder";
import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
import { MetaWithCountsScholarship } from "@/store/headScholarshipMeta";
import { useHeadInactiveScholarshipStore } from "@/store/headInactiveScholarshipStore";

export default function useScholarshipInactiveData() {
  const {
    metaInactive,
    statusInactive,

    paginationInactive,
    setPaginationInactive,
    searchInactive,

    sortingInactive,
    columnFiltersInactive,
    setMetaInactive,
  } = useHeadInactiveScholarshipStore();

  // Destructure pagination
  const { pageIndex, pageSize } = paginationInactive;

  // Debounce search input
  const debouncedSearch = useDebounce(searchInactive, 800);

  // Reset page to 0 when filters change
  const resetPage = () => {
    setPaginationInactive((prev) => ({ ...prev, pageIndex: 0 }));
  };

  useEffect(() => {
    resetPage();
  }, [debouncedSearch, sortingInactive, statusInactive, columnFiltersInactive]);

  const query = useQuery({
    queryKey: [
      "adminInactiveScholarshipData",
      paginationInactive,
      sortingInactive,
      columnFiltersInactive,
      statusInactive,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Append parameters dynamically
      if (statusInactive) params.append("status", statusInactive);
      params.append("page", (pageIndex + 1).toString()); // +1 if backend uses 1-based page indexing
      params.append("dataPerPage", pageSize.toString());

      if (sortingInactive.length > 0) {
        params.append("sortBy", sortingInactive[0].id);
        params.append("order", sortingInactive[0].desc ? "desc" : "asc");
      }

      if (columnFiltersInactive.length > 0) {
        params.append("filters", JSON.stringify(columnFiltersInactive));
      }

      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
      }/getScholarship?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<{
          data: scholarshipFormData[];
          meta: MetaWithCountsScholarship;
        }>(endpoint, { withCredentials: true });

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

  const data = query.data?.data ?? [];

  useEffect(() => {
    if (query.isSuccess && query.data?.meta) {
      setMetaInactive(query.data.meta);
    }
  }, [query.isSuccess, query.data?.meta, setMetaInactive]);

  return {
    data,
    metaInactive,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    statusInactive,
  };
}

// "use client";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { scholarshipFormData } from "./zodUpdateScholarship";
// import StyledToast from "@/components/ui/toast-styled";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import { useDebounce } from "@/lib/debounder";
// import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
// import { MetaWithCountsScholarship } from "@/store/headScholarshipMeta";

// export default function useScholarshipData() {
//   const {
//     status: tabStatus,
//     setStatus: setTabStatus,
//     setMeta,
//     meta,
//     pagination,
//     sorting,
//     columnFilters,
//     search,
//   } = useHeadScholarshipStore();

//   const debouncedSearch = useDebounce(search, 800);
//   useEffect(() => {
//     resetPage();
//   }, [debouncedSearch, sorting, tabStatus, columnFilters]);
//   const query = useQuery({
//     queryKey: [
//       "adminScholarshipData",
//       pagination,
//       sorting,
//       columnFilters,
//       tabStatus,
//       debouncedSearch,
//     ],
//     queryFn: async () => {
//       const params = new URLSearchParams();
//       if (tabStatus) params.append("status", tabStatus);
//       if (pagination.) params.append("page", page.toString());
//       if (pageSize) params.append("dataPerPage", pageSize.toString());
//       if (sortBy) params.append("sortBy", sortBy);
//       if (order) params.append("order", order);
//       if (filters) params.append("filters", filters);
//       if (debouncedSearch) params.append("search", debouncedSearch);
//       const endpoint = `${
//         process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//       }/getScholarship?${params.toString()}`;

//       console.log("Fetching (admin):", endpoint);

//       try {
//         const res = await axios.get<{
//           data: scholarshipFormData[];
//           meta: MetaWithCountsScholarship;
//         }>(endpoint, { withCredentials: true });

//         return res.data;
//       } catch (error) {
//         if (axios.isAxiosError<ApiErrorResponse>(error)) {
//           StyledToast({
//             status: "error",
//             title: error?.response?.data.message ?? "An error occurred.",
//             description: "Cannot process your request.",
//           });
//         }
//         throw error;
//       }
//     },
//     retry: false,
//     staleTime: 1000 * 60 * 5,
//   });

//   const data = query.data?.data ?? [];

//   useEffect(() => {
//     if (query.isSuccess && query.data?.meta) {
//       setMeta(query.data.meta);
//     }
//   }, [query.isSuccess, query.data?.meta]);

//   return {
//     data,
//     meta,
//     setMeta,
//     isLoading: query.isLoading,
//     isError: query.isError,
//     refetch: query.refetch,
//     setTabStatus,
//   };
// }
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

export default function useScholarshipData() {
  const {
    status: tabStatus,
    setStatus: setTabStatus,
    setMeta,
    meta,
    pagination,
    sorting,
    columnFilters,
    search,
    setPagination,
  } = useHeadScholarshipStore();

  // Destructure pagination
  const { pageIndex, pageSize } = pagination;

  // Debounce search input
  const debouncedSearch = useDebounce(search, 800);

  // Reset page to 0 when filters change
  const resetPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  useEffect(() => {
    resetPage();
  }, [debouncedSearch, sorting, tabStatus, columnFilters]);

  const query = useQuery({
    queryKey: [
      "adminScholarshipData",
      pagination,
      sorting,
      columnFilters,
      tabStatus,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Append parameters dynamically
      if (tabStatus) params.append("status", tabStatus);
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
      setMeta(query.data.meta);
    }
  }, [query.isSuccess, query.data?.meta, setMeta]);

  return {
    data,
    meta,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    setTabStatus,
  };
}

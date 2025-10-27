// "use client";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { scholarshipFormData } from "../admin/zodUpdateScholarship";
// import { MetaTypes } from "../zodMeta";
// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { useDebounce } from "@/lib/debounder";
// import { useUserStore } from "@/store/useUserStore";
// import { useEffect } from "react";
// import { useScholarshipUserStore } from "@/store/scholarshipUserStore";

// interface ScholarshipCounts {
//   countActive: number;
//   countRenew: number;
//   countExpired: number;
// }

// export interface MetaWithCounts extends MetaTypes {
//   counts: ScholarshipCounts;
// }

// const defaultMeta: MetaWithCounts = {
//   page: 1,
//   pageSize: 10,
//   totalRows: 0,
//   totalPage: 0,
//   sortBy: "",
//   order: "",
//   filters: "",
//   search: "",
//   counts: {
//     countActive: 0,
//     countRenew: 0,
//     countExpired: 0,
//   },
// };

// export default function useScholarshipData() {
//   const { loadingUser } = useUserStore();
//   const {
//     status: tabStatus,
//     setStatus: setTabStatus,
//     setMeta,
//     meta,
//     resetPage,
//     search,
//     sortBy,
//     order,
//     page,
//     pageSize,
//   } = useScholarshipUserStore();

//   const debouncedSearch = useDebounce(search, 800);
//   useEffect(() => {
//     resetPage();
//   }, [debouncedSearch, sortBy, order, tabStatus, search]);
//   const query = useQuery({
//     queryKey: [
//       "scholarshipData",
//       page,
//       pageSize,
//       sortBy,
//       order,
//       tabStatus,
//       debouncedSearch,
//     ],
//     queryFn: async () => {
//       const params = new URLSearchParams();
//       if (tabStatus) params.append("status", tabStatus);

//       if (page) params.append("page", page.toString());
//       if (pageSize) params.append("dataPerPage", pageSize.toString());
//       if (sortBy) params.append("sortBy", sortBy);
//       if (order) params.append("order", order);
//       if (debouncedSearch) params.append("search", debouncedSearch);

//       const endpoint = `${process.env.NEXT_PUBLIC_USER_URL}/${
//         debouncedSearch ? "searchScholarship" : "getAllScholarship"
//       }?${params.toString()}`;

//       console.log("Fetching scholarships:", endpoint);

//       try {
//         const res = await axios.get<{
//           data: scholarshipFormData[];
//           meta: MetaWithCounts;
//         }>(endpoint, { withCredentials: true });

//         return res.data;
//       } catch (error) {
//         if (axios.isAxiosError<ApiErrorResponse>(error)) {
//           StyledToast({
//             status: "error",
//             title: error?.response?.data.message ?? "An error occurred.",
//             description: "Cannot process get scholarship request.",
//           });
//         }
//         throw error;
//       }
//     },
//     retry: false,
//     staleTime: 1000 * 60 * 5,
//     enabled: !loadingUser,
//   });

//   const data = query.data?.data ?? [];

//   useEffect(() => {
//     if (query.isSuccess && query.data?.meta) {
//       setMeta(query.data.meta);
//     }
//   }, [query.isSuccess, query.data?.meta, setMeta]);

//   return {
//     data,
//     meta,
//     tabStatus,
//     setTabStatus,
//     isLoading: query.isLoading || loadingUser,
//     isError: query.isError,
//     refetch: query.refetch,
//   };
// }
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
  counts: ScholarshipCounts;
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
  counts: {
    countActive: 0,
    countExpired: 0,
    countRenew: 0,
    countEnded: 0,
  },
};
export default function useScholarshipData({
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
      "scholarshipData",
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

      const endpoint = `${process.env.NEXT_PUBLIC_USER_URL}/${
        debouncedSearch ? "searchScholarship" : "getAllScholarship"
      }?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<GetScholarshopTypes>(endpoint, {
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

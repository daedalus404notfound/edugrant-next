// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { scholarshipFormData } from "../admin/zodUpdateScholarship";
// import { MetaTypes } from "../zodMeta";
// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { useDebounce } from "@/lib/debounder";
// import { useUserStore } from "@/store/useUserStore";
// interface ScholarshipCounts {
//   countActive: number;
//   countRenew: number;
//   countExpired: number;
// }

// interface MetaWithCounts extends MetaTypes {
//   counts: ScholarshipCounts;
// }
// export default function useScholarshipData({
//   page,
//   pageSize,
//   sortBy,
//   order,
//   status,
//   filters,
//   search,
//   accountId,
// }: {
//   page: number;
//   pageSize: number;
//   sortBy?: string;
//   order?: string;
//   status?: string;
//   filters?: string;
//   search?: string;
//   accountId?: string;
// }) {
//   const [data, setData] = useState<scholarshipFormData[]>([]);
//   const [meta, setMeta] = useState<MetaWithCounts>({
//     page: 1,
//     pageSize: 10,
//     totalRows: 0,
//     totalPage: 0,
//     sortBy: "",
//     order: "",
//     filters: "",
//     search: "",
//     counts: {
//       countActive: 0,
//       countRenew: 0,
//       countExpired: 0,
//     },
//   });
//   const [loading, setLoading] = useState(true);

//   const debouncedSearch = useDebounce(search, 800);
//   const { user, loadingUser } = useUserStore();

//   const loadingState = loading || loadingUser;
//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const endpoint = `${
//             process.env.NEXT_PUBLIC_USER_URL
//           }/getAllScholarship?page=${page}&dataPerPage=${pageSize}${
//             sortBy ? `&sortBy=${sortBy}` : ""
//           }${order ? `&order=${order}` : ""}${
//             status ? `&status=${status}` : ""
//           }${filters ? `&filters=${encodeURIComponent(filters)}` : ""}${
//             debouncedSearch
//               ? `&search=${encodeURIComponent(debouncedSearch)}`
//               : ""
//           }${accountId ? `&accountId=${accountId}` : ""}`;

//           const res = await axios.get(endpoint, { withCredentials: true });
//           console.log(endpoint);
//           if (res.status === 200) {
//             setData(res.data.data);
//             setMeta(res.data.meta);
//           }
//         } catch (error) {
//           if (axios.isAxiosError<ApiErrorResponse>(error)) {
//             StyledToast({
//               status: "error",
//               title: error?.response?.data.message ?? "An error occurred.",
//               description: "Cannot process get scholarship request.",
//             });
//           }
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchScholarships();
//     },
//     [page, pageSize, sortBy, order, filters, status, debouncedSearch]
//   );

//   return { data, loading, meta, user, loadingState, setData };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useScholarshipUserStore } from "@/store/scholarshipUserStore";

interface ScholarshipCounts {
  countActive: number;
  countRenew: number;
  countExpired: number;
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
    countActive: 0,
    countRenew: 0,
    countExpired: 0,
  },
};

export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
  search,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
  search?: string;
}) {
  const { loadingUser } = useUserStore();
  const {
    status: tabStatus,
    setStatus: setTabStatus,
    meta: metaZustand,
    setMeta,
    resetPage,
  } = useScholarshipUserStore();

  const debouncedSearch = useDebounce(search, 800);
  useEffect(() => {
    resetPage();
  }, [debouncedSearch, sortBy, order, filters, status]);
  const query = useQuery({
    queryKey: [
      "scholarshipData",
      page,
      pageSize,
      sortBy,
      order,
      tabStatus,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (tabStatus) params.append("status", tabStatus);
      if (filters) params.append("filters", filters);
      if (page) params.append("page", page.toString());
      if (pageSize) params.append("dataPerPage", pageSize.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${process.env.NEXT_PUBLIC_USER_URL}/${
        debouncedSearch ? "searchScholarship" : "getAllScholarship"
      }?${params.toString()}`;

      console.log("Fetching scholarships:", endpoint);

      try {
        const res = await axios.get<{
          data: scholarshipFormData[];
          meta: MetaWithCounts;
        }>(endpoint, { withCredentials: true });

        return res.data;
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process get scholarship request.",
          });
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !loadingUser,
  });

  const data = query.data?.data ?? [];
  const meta = query.data?.meta ?? defaultMeta;

  useEffect(() => {
    if (query.data?.meta) {
      setMeta(query.data.meta);
    }
  }, [query.data?.meta, setMeta]);

  return {
    data,
    meta,
    tabStatus,
    setTabStatus,
    isLoading: query.isLoading || loadingUser,
    isError: query.isError,
    refetch: query.refetch,
  };
}

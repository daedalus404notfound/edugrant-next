// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { MetaTypes } from "../zodMeta";
// import { AnnouncementFormDataGet } from "../zod/announcement";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { useDebounce } from "@/lib/debounder";

// const defaultMeta: MetaTypes = {
//   page: 1,
//   pageSize: 10,
//   totalRows: 0,
//   totalPage: 0,
//   sortBy: "",
//   order: "",
//   filters: "",
//   search: "",
// };

// export default function useAnnouncementFetch({
//   page,
//   pageSize,
//   sortBy,
//   order,
//   search,
// }: {
//   page: number;
//   pageSize: number;
//   sortBy?: string;
//   order?: string;
//   search?: string;
// }) {
//   const [data, setData] = useState<AnnouncementFormDataGet[]>([]);
//   const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
//   const [loading, setLoading] = useState(false);

//   const debouncedSearch = useDebounce(search, 800);
//   useEffect(() => {
//     async function fetchAnnouncement() {
//       setLoading(true);

//       try {
//         const res = await axios.get(
//           `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getAnnouncement?page=${page}&dataPerPage=${pageSize}${
//             sortBy ? `&sortBy=${sortBy}` : ""
//           }${order ? `&order=${order}` : ""}${
//             debouncedSearch ? `&search=${debouncedSearch}` : ""
//           }`,
//           { withCredentials: true }
//         );

//         if (res.status === 200) {
//           setData(res.data.announcements);
//           setMeta(res.data.meta);
//         }
//       } catch (error) {
//         if (axios.isAxiosError<ApiErrorResponse>(error)) {
//           StyledToast({
//             status: "error",
//             title: error?.response?.data.message ?? "An error occurred.",
//             description: "Cannot process your request.",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAnnouncement();
//   }, [page, pageSize, sortBy, order, debouncedSearch]);

//   useEffect(() => {
//     setData([]);
//   }, [debouncedSearch, sortBy, order]);

//   return { data, meta, loading };
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
import { AnnouncementFormDataGet } from "../zod/announcement";
type MetaPropTypes = {
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  search?: string;
};

export interface GetAnnouncementTypes {
  announcements: AnnouncementFormDataGet[];
  meta: MetaTypes;
}

export const defaultMeta: MetaTypes = {
  page: 0,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};
export default function useAnnouncementDataAdmin({
  pagination,
  sorting,
  columnFilters,
  search,
}: MetaPropTypes) {
  const { pageIndex, pageSize } = pagination;
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const debouncedSearch = useDebounce(search, 800);

  const query = useQuery({
    queryKey: [
      "adminAnnouncement",
      pagination,
      sorting,
      columnFilters,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Append parameters dynamically

      params.append("page", (pageIndex + 1).toString()); // +1 if backend uses 1-based page indexing
      params.append("dataPerPage", pageSize.toString());

      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }

      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
      }/getAnnouncement?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<GetAnnouncementTypes>(endpoint, {
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

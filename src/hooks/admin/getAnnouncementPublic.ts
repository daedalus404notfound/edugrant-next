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

// export default function useAnnouncementFetcPublic({
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
//           `https://server.edugrant.online/getAnnouncementsPublic?page=${page}&dataPerPage=${pageSize}${
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
//           const status = error.response?.status;
//           const message = error.response?.data?.message;

//           if (!error.response) {
//             StyledToast({
//               status: "error",
//               title: "Network Error",
//               description:
//                 "No internet connection or the server is unreachable. Please check your connection and try again.",
//             });
//           } else if (status === 400) {
//             StyledToast({
//               status: "error",
//               title: "Bad Request",
//               description:
//                 message ?? "Invalid request. Please check your input.",
//             });
//           } else if (status === 401) {
//             StyledToast({
//               status: "error",
//               title: "Unauthorized",
//               description:
//                 message ?? "You are not authorized. Please log in again.",
//             });
//           } else if (status === 403) {
//             StyledToast({
//               status: "error",
//               title: "Forbidden",
//               description:
//                 message ?? "You do not have permission to perform this action.",
//             });
//           } else if (status === 404) {
//             StyledToast({
//               status: "warning",
//               title: "No data found",
//               description: message ?? "There are no records found.",
//             });
//           } else if (status === 500) {
//             StyledToast({
//               status: "error",
//               title: "Server Error",
//               description:
//                 message ?? "Internal server error. Please try again later.",
//             });
//           } else {
//             StyledToast({
//               status: "error",
//               title: message ?? "Export CSV error occurred.",
//               description: "Cannot process your request.",
//             });
//           }
//         } else {
//           StyledToast({
//             status: "error",
//             title: "Unexpected Error",
//             description: "Something went wrong. Please try again later.",
//           });
//         }
//         throw error;
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
import { AnnouncementFormDataGet } from "../zod/announcement";
import { defaultMeta } from "../admin/getAnnouncement";

export type UseApplicationDataProps = {
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;

  search?: string;
};
export interface AnnouncementTypes {
  announcements: AnnouncementFormDataGet[];
  meta: MetaTypes;
}
export default function useAnnouncementFetcPublic({
  pagination,
  sorting,
  columnFilters,

  search,
}: UseApplicationDataProps) {
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const debounce = useDebounce(search, 800);
  const query = useQuery({
    queryKey: [
      "announcementsPublic",
      pagination,
      sorting,
      columnFilters,
      debounce,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (debounce) params.append("search", debounce);
      params.append("page", (pagination.pageIndex + 1).toString());
      params.append("dataPerPage", pagination.pageSize.toString());
      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }
      if (columnFilters.length > 0) {
        params.append("filters", JSON.stringify(columnFilters));
      }

      const endpoint = `https://server.edugrant.online/getAnnouncementsPublic?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<AnnouncementTypes>(endpoint, {
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

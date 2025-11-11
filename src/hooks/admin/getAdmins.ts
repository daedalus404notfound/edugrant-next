// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { StaffFormData } from "../zod/staff";
// import { MetaTypes } from "../zodMeta";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
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
// export default function useAdminData({
//   page,
//   pageSize,
//   sortBy,
//   order,
// }: {
//   page: number;
//   pageSize: number;
//   sortBy?: string;
//   order?: string;
//   status?: boolean;
// }) {
//   const [data, setData] = useState<StaffFormData[]>([]);
//   const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
//   const [loading, setLoading] = useState(true);
//   useEffect(
//     function () {
//       async function fetchAdmin() {
//         setLoading(true);
//         try {
//           const endpoint = `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getAllAdmin?page=${page}&dataPerPage=${pageSize}${
//             sortBy ? `&sortBy=${sortBy}` : ""
//           }${order ? `&order=${order}` : ""}`;

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
//               description: "Cannot process your request.",
//             });
//           }
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchAdmin();
//     },
//     [page, pageSize, sortBy, order]
//   );

//   return { data, loading, meta };
// }

"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import { scholarshipFormData } from "./zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { StaffFormData } from "../zod/staff";
import { ApplicationFormData } from "../zod/application";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/debounder";
import { AdminProfileFormData } from "../head-profile-edit";
import { handleApiError } from "@/lib/handleApiError";

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

type UseApplicationDataProps = {
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  search?: string;
};

export type StaffFormDataTypes = {
  data: AdminProfileFormData[];
  meta: MetaTypes;
};
export default function useAdminData({
  pagination,
  sorting,
  columnFilters,
  search,
}: UseApplicationDataProps) {
  const debouncer = useDebounce(search, 800);
  const query = useQuery({
    queryKey: ["adminStaffData", pagination, sorting, columnFilters, debouncer],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("page", (pagination.pageIndex + 1).toString()); // +1 if backend uses 1-based page indexing
      params.append("dataPerPage", pagination.pageSize.toString());
      if (debouncer) {
        params.append("search", debouncer);
      }
      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }
      if (columnFilters.length > 0) {
        params.append("filters", JSON.stringify(columnFilters));
      }
      const endpoint = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
        debouncer === "" ? "getAllAdmin" : "searchAdmin"
      }?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<StaffFormDataTypes>(endpoint, {
          withCredentials: true,
        });

        return res.data;
      } catch (error) {
        handleApiError(error, true);
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const data = query.data?.data ?? [];
  const meta = query.data?.meta ?? defaultMeta;

  return {
    data,
    meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}

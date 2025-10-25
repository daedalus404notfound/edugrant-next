// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { ApplicationFormData } from "../zod/application";
// import { MetaTypes } from "../zodMeta";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { StudentUserFormData } from "../user/zodUserProfile";
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
// export default function useFetchStudents({
//   page,
//   pageSize,
//   sortBy,
//   order,
//   status,
//   filters,
//   accountId,
// }: {
//   page?: number;
//   pageSize?: number;
//   sortBy?: string;
//   order?: string;
//   status?: string;
//   filters?: string;
//   accountId?: number;
// }) {
//   const [data, setData] = useState<StudentUserFormData[]>([]);
//   const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
//   const [loading, setLoading] = useState(true);
//   console.log("2323", data);
//   useEffect(
//     function () {
//       async function fetchStudents() {
//         setLoading(true);
//         try {
//           const params = new URLSearchParams();

//           if (status) params.append("status", status);
//           if (page) params.append("page", String(page));
//           if (pageSize) params.append("dataPerPage", String(pageSize));
//           if (sortBy) params.append("sortBy", sortBy);
//           if (accountId) params.append("accountId", String(accountId));
//           if (order) params.append("order", order);
//           if (filters) params.append("filters", filters);

//           const endpoint = `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getStudents?${params.toString()}`;

//           const res = await axios.get(endpoint, { withCredentials: true });
//           console.log(endpoint);
//           if (res.status === 200) {
//             setData(res.data.students);
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

//       fetchStudents();
//     },
//     [page, pageSize, sortBy, order, filters]
//   );

//   return { data, loading, meta };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useDebounce } from "@/lib/debounder";
import { StudentUserFormData } from "../user/zodUserProfile";

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

export default function useGetAllStudents({
  pagination,
  sorting,
  columnFilters,

  search,
}: UseApplicationDataProps) {
  const debounce = useDebounce(search, 800);
  const query = useQuery({
    queryKey: [
      "studentsDataHead",
      pagination,
      sorting,
      columnFilters,

      debounce,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

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

      const endpoint = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
        debounce === "" ? "getStudents" : "searchStudents"
      }?${params.toString()}`;

      console.log("Fetching (admin):", endpoint);

      try {
        const res = await axios.get<{
          students: StudentUserFormData[];
          meta: MetaTypes;
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
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const data = query.data?.students ?? [];
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

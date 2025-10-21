// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import {
//   ApplicationFormData,
//   UpdatedApplicationFormData,
// } from "../zod/application";
// import { MetaTypes } from "../zodMeta";
// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { useDebounce } from "@/lib/debounder";
// import { useUserStore } from "@/store/useUserStore";

// interface ScholarshipCounts {
//   APPROVED: number;
//   BLOCKED: number;
//   DECLINED: number;
//   PENDING: number;
//   INTERVIEW: number;
// }
// interface MetaWithCounts extends MetaTypes {
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
//     APPROVED: 0,
//     BLOCKED: 0,
//     DECLINED: 0,
//     PENDING: 0,
//     INTERVIEW: 0,
//   },
// };

// export default function useClientApplications({
//   page,
//   pageSize,
//   sortBy,
//   order,
//   userId,
//   search,
//   applicationId,
// }: {
//   page?: number;
//   pageSize?: number;
//   sortBy?: string;
//   order?: string;
//   status?: string;
//   userId?: string;
//   applicationId?: string;
//   search?: string;
// }) {
//   const [data, setData] = useState<ApplicationFormData[]>([]);
//   const { loadingUser } = useUserStore();
//   const [meta, setMeta] = useState<MetaWithCounts>(defaultMeta);
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("PENDING");
//   const [updateDocument, setUpdateDocument] =
//     useState<UpdatedApplicationFormData | null>(null);
//   const loadingState = loading || loadingUser;
//   const debouncedSearch = useDebounce(search, 800);
//   useEffect(
//     function () {
//       async function fetchApplications() {
//         setLoading(true);
//         try {
//           const params = new URLSearchParams();

//           if (status) params.append("status", status);
//           if (applicationId)
//             params.append("applicationId", applicationId.toString());
//           if (userId) params.append("accountId", userId.toString());
//           if (page) params.append("page", page.toString());
//           if (pageSize) params.append("dataPerPage", pageSize.toString());
//           if (sortBy) params.append("sortBy", sortBy);
//           if (order) params.append("order", order);
//           if (debouncedSearch) params.append("search", debouncedSearch);

//           const endpoint = `${
//             process.env.NEXT_PUBLIC_USER_URL
//           }/getApplications?${params.toString()}`;
//           console.log("Fetching:", endpoint);

//           const res = await axios.get(endpoint, { withCredentials: true });

//           if (res.status === 200) {
//             setData(res.data.applications);
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

//       fetchApplications();
//     },
//     [page, pageSize, sortBy, order, status, debouncedSearch]
//   );

//   useEffect(() => {
//     setData([]);
//   }, [debouncedSearch, order]);
//   useEffect(() => {
//     if (updateDocument && data.length > 0) {
//       setData((prev) =>
//         prev.map((app) =>
//           app.applicationId === updateDocument.applicationId
//             ? {
//                 ...app,
//                 submittedDocuments: updateDocument.submittedDocuments,
//               }
//             : app
//         )
//       );
//     }
//   }, [updateDocument]);

//   return {
//     data,
//     loadingState,
//     meta,
//     setUpdateDocument,
//     setData,
//     status,
//     setStatus,
//     setMeta,
//   };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder";
import { useUserStore } from "@/store/useUserStore";
import { useApplicationStore } from "@/store/applicationUsetStore";
import { useEffect } from "react";

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

export default function useClientApplications({
  page,
  pageSize,
  sortBy,
  order,
  applicationId,
  search,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  userId?: string;
  applicationId?: string;
  search?: string;
}) {
  const { loadingUser } = useUserStore();
  const {
    status: tabStatus,
    setStatus: setTabStatus,
    meta: metaZustand,
    setMeta,
  } = useApplicationStore();
  const debouncedSearch = useDebounce(search, 800);

  const query = useQuery({
    queryKey: [
      "clientApplications",
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

      if (page) params.append("page", page.toString());
      if (pageSize) params.append("dataPerPage", pageSize.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (applicationId) params.append("applicationId", applicationId);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const endpoint = `${
        process.env.NEXT_PUBLIC_USER_URL
      }/getApplications?${params.toString()}`;
      console.log("Fetching:", endpoint);

      try {
        const res = await axios.get<{
          applications: ApplicationFormData[];
          meta: MetaWithCounts;
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
    staleTime: 1000 * 60 * 5,
    enabled: !loadingUser,
  });

  const data = query.data?.applications ?? [];
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

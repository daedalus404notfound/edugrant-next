// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { displayScholarshipFormData } from "./displayScholarshipData";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { AnnouncementFormDataGet } from "../zod/announcement";
// export default function useGetAnnouncementById(id: number, accountId?: number) {
//   const [data, setData] = useState<AnnouncementFormDataGet | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(
//     function () {
//       async function fetchAnnouncementById() {
//         setLoading(true);
//         try {
//           const res = await axios.get<{ annoucement: AnnouncementFormDataGet }>(
//             `${
//               process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//             }/getAnnouncementById?announcementId=${id}${
//               accountId ? `&accountId=${accountId}` : ""
//             }`,

//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             setData(res.data.annoucement);
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

//       fetchAnnouncementById();
//     },
//     [id]
//   );

//   return { data, loading, error };
// }
"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AnnouncementFormDataGet } from "../zod/announcement";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useGetAnnouncementByIdAdmin(
  announcementId?: number | null
) {
  const query = useQuery({
    queryKey: ["getAnnouncementById", announcementId],
    queryFn: async () => {
      if (!announcementId) return null; // guard for undefined IDs

      try {
        const res = await axios.get<{ annoucement: AnnouncementFormDataGet }>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getAnnouncementById?announcementId=${announcementId}`,
          { withCredentials: true }
        );

        return res.data.annoucement;
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
    enabled: !!announcementId, // only runs if an ID is provided
    retry: false,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return {
    fullData: query.data ?? null,
    loading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

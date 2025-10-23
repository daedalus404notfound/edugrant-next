// "use client";
// import axios from "axios";
// import {  useState } from "react";

// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { AnnouncementFormDataGet } from "../zod/announcement";
// export default function useGetAnnouncementByIdUser() {
//   const [fullData, setData] = useState<AnnouncementFormDataGet | null>(null);
//   const [loading, setLoading] = useState(true);

//   const onGetAnnouncement = (annoucementId: number) => {
//     async function fetchAnnouncementById() {
//       setLoading(true);
//       try {
//         const res = await axios.get<{ annoucement: AnnouncementFormDataGet }>(
//           `${process.env.NEXT_PUBLIC_USER_URL}/getAnnouncementsById?annoucementId=${annoucementId}`,

//           { withCredentials: true }
//         );
//         if (res.status === 200) {
//           setData(res.data.annoucement);
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

//     fetchAnnouncementById();
//   };

//   return { fullData, loading, onGetAnnouncement };
// }
"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AnnouncementFormDataGet } from "../zod/announcement";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useGetAnnouncementByIdUser(announcementId?: number) {
  const query = useQuery({
    queryKey: ["announcementById", announcementId],
    queryFn: async () => {
      if (!announcementId) return null; // guard for undefined IDs

      try {
        const res = await axios.get<{ annoucement: AnnouncementFormDataGet }>(
          `${process.env.NEXT_PUBLIC_USER_URL}/getAnnouncementsById?annoucementId=${announcementId}`,
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

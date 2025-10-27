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

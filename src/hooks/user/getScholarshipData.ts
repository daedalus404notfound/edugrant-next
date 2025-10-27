// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { scholarshipFormData } from "../admin/zodUpdateScholarship";
// import StyledToast from "@/components/ui/toast-styled";
// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import { displayScholarshipFormData } from "../admin/displayScholarshipData";

// export default function useScholarshipUserById(id: string) {
//   const [data, setData] = useState<displayScholarshipFormData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isGovernmentAlready, setIsGovernmentAlready] = useState(false);

//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_USER_URL}/getScholarshipsbyId?scholarshipId=${id}`,

//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             setData(res.data.scholarship);
//             setIsGovernmentAlready(res.data.inGovScholar);
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

//       fetchScholarships();
//     },
//     [id]
//   );

//   return { data, loading, error, isGovernmentAlready, setData };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { displayScholarshipFormData } from "../admin/displayScholarshipData";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";

export interface ScholarshipByIdResponse {
  scholarship: displayScholarshipFormData;
  inGovScholar: boolean;
}

export default function useScholarshipUserById(id: number) {
  const query = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      try {
        const res = await axios.get<ScholarshipByIdResponse>(
          `${process.env.NEXT_PUBLIC_USER_URL}/getScholarshipsbyId?scholarshipId=${id}`,
          { withCredentials: true }
        );
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
    enabled: !!id, // Only run query if id exists
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes - adjust as needed
  });

  return {
    data: query.data?.scholarship ?? null,
    isGovernmentAlready: query.data?.inGovScholar ?? false,
    loading: query.isLoading,
    error: query.error ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

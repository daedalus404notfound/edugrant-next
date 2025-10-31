// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// import { getStaffFormData } from "../zod/head/getStaffZod";

// export default function useGetStaffById(id: string) {
//   const [data, setData] = useState<getStaffFormData | null>();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   useEffect(
//     function () {
//       async function fetchStaffLogs() {
//         setLoading(true);
//         try {
//           const res = await axios.get<getStaffFormData>(
//             `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getStaffById?staffId=${id}`,

//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             setData(res.data);
//           }
//         } catch (error) {
//          if (axios.isAxiosError<ApiErrorResponse>(error)) {
//            const status = error.response?.status;
//            const message = error.response?.data?.message;

//            if (!error.response) {
//              StyledToast({
//                status: "error",
//                title: "Network Error",
//                description:
//                  "No internet connection or the server is unreachable. Please check your connection and try again.",
//              });
//            } else if (status === 400) {
//              StyledToast({
//                status: "error",
//                title: "Bad Request",
//                description:
//                  message ?? "Invalid request. Please check your input.",
//              });
//            } else if (status === 401) {
//              StyledToast({
//                status: "error",
//                title: "Unauthorized",
//                description:
//                  message ?? "You are not authorized. Please log in again.",
//              });
//            } else if (status === 403) {
//              StyledToast({
//                status: "error",
//                title: "Forbidden",
//                description:
//                  message ??
//                  "You do not have permission to perform this action.",
//              });
//            } else if (status === 404) {
//              StyledToast({
//                status: "warning",
//                title: "No data found",
//                description: message ?? "There are no records found.",
//              });
//            } else if (status === 500) {
//              StyledToast({
//                status: "error",
//                title: "Server Error",
//                description:
//                  message ?? "Internal server error. Please try again later.",
//              });
//            } else {
//              StyledToast({
//                status: "error",
//                title: message ?? "Export CSV error occurred.",
//                description: "Cannot process your request.",
//              });
//            }
//          } else {
//            StyledToast({
//              status: "error",
//              title: "Unexpected Error",
//              description: "Something went wrong. Please try again later.",
//            });
//          }
//          throw error;
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchStaffLogs();
//     },
//     [id]
//   );

//   return { data, loading, error };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { AdminProfileFormData } from "../head-profile-edit";
export interface GetStaffByHead {
  safeData: AdminProfileFormData;
}
async function fetchStaffById(id: string): Promise<GetStaffByHead> {
  try {
    const res = await axios.get<GetStaffByHead>(
      `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getStaffById?staffId=${id}`,
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
          description: message ?? "Invalid request. Please check your input.",
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
          title: message ?? "Error occurred",
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
}

export default function useGetStaffById(id: string) {
  return useQuery<GetStaffByHead>({
    queryKey: ["manageStaff", id],
    queryFn: () => fetchStaffById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: "always",
  });
}

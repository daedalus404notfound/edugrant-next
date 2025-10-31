// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useAdminStore } from "@/store/adminUserStore";
// import { usePathname, useRouter } from "next/navigation";
// import { ApiErrorResponse } from "../admin/postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";

// export default function useAuthenticatedUser() {
//   const { setAdmin, setLoading, setError, logout } = useAdminStore();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [success, setSucces] = useState(false);

//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminTokenAuthentication`,
//           {
//             withCredentials: true,
//           }
//         );

//         if (res.status === 200) {
//           setAdmin(res.data.safeData);

//           // if (
//           //   res.data.safeData.role === "ISPSU_Staff" &&
//           //   pathname !== "/administrator/staff/home"
//           // ) {
//           //   router.push("/administrator/staff/home");
//           // } else if (
//           //   res.data.safeData.role === "ISPSU_Head" &&
//           //   pathname !== "/administrator/head/home"
//           // ) {
//           //   router.push("/administrator/head/home");
//           // }

//           setSucces(true);
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
//         setSucces(false);
//         // if (pathname !== "/") {
//         //   router.replace("/administrator");
//         // }
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserData();
//   }, [setAdmin, setLoading, setError]);

//   return { success };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { AdminProfileFormData } from "../head-profile-edit";

export interface AuthTypes {
  availableScholarshipCount: {
    ISPSU_StaffCount: number;
    announcementCount: number;
    applicationCount: number;
    availableScholarshipCount: number;
  };
  message: string;
  safeData: AdminProfileFormData;
  success: boolean;
}

export default function useAuthenticatedUser() {
  const query = useQuery({
    queryKey: ["authenticated-user"],
    queryFn: async () => {
      try {
        const res = await axios.get<AuthTypes>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminTokenAuthentication`,
          {
            withCredentials: true,
          }
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
              title: message ?? "Unexpected Error",
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
    retry: false, // no automatic retries for authentication
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return {
    data: query.data ?? null,
    success: query.data?.success ?? false,
    loading: query.isLoading,
    error: query.error ? "An error occurred" : "",
    isError: query.isError,
    refetch: query.refetch,
  };
}

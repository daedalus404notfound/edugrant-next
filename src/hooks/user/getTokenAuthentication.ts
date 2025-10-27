"use client";
import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useNotificationStore } from "@/store/userNotificationStore";

export default function useAuthenticatedUser() {
  const { setUser, setLoading, setError, logout } = useUserStore();
  const { setUnreadNotifications } = useNotificationStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_URL}/tokenValidation`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setUser(res.data.userData);
          setUnreadNotifications(res.data.unreadNotifications);
          // if (pathname === "/") {
          //   router.replace("/user/home");
          // }

          // console.log("authapi:", res.data);
        }
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
        // if (pathname !== "/") {
        //   router.replace("/");
        // }
        logout();
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setUser, setLoading, setError]);

  return null;
}

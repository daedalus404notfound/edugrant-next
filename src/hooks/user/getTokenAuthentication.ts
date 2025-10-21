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
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
          // if (pathname !== "/") {
          //   router.replace("/");
          // }
          logout();
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setUser, setLoading, setError]);

  return null;
}

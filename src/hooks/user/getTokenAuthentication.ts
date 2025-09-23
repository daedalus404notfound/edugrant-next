"use client";
import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useAuthenticatedUser() {
  const { setUser, setLoading, setError } = useUserStore();
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
          // if (pathname === "/") {
          //   router.push("/user/home");
          // }

          console.log("authapi:", res.data);
        }
      } catch (error) {
        // if (pathname !== "/") {
        //   router.replace("/");
        // }
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setUser, setLoading, setError]);

  return null;
}

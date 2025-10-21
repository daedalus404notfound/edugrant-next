"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { usePathname, useRouter } from "next/navigation";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useAuthenticatedUser() {
  const { setAdmin, setLoading, setError, logout } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
  const [success, setSucces] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminTokenAuthentication`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setAdmin(res.data.safeData);

          // if (
          //   res.data.safeData.role === "ISPSU_Staff" &&
          //   pathname !== "/administrator/staff/home"
          // ) {
          //   router.push("/administrator/staff/home");
          // } else if (
          //   res.data.safeData.role === "ISPSU_Head" &&
          //   pathname !== "/administrator/head/home"
          // ) {
          //   router.push("/administrator/head/home");
          // }

          setSucces(true);
        }
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
        setSucces(false);
        // if (pathname !== "/") {
        //   router.replace("/administrator");
        // }
        logout();
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setAdmin, setLoading, setError]);

  return { success };
}

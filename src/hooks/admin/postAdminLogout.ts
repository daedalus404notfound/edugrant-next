import StyledToast from "@/components/ui/toast-styled";
import { useAdminStore } from "@/store/adminUserStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

export function useAdminLogout() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAdminStore();
  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminLogout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        logout();
        setOpen(false);
        StyledToast({
          status: "success",
          title: "Successfully logged out",
          description: "You have been redirected to the login page.",
        });

        router.replace("/administrator");
      } else {
        StyledToast({
          status: "error",
          title: "Logout failed",
          description: "Unexpected response from the server.",
        });
        ``;
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setOpen(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, open, setOpen };
}

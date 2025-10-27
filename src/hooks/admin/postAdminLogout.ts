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
      setOpen(false);
   
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, open, setOpen };
}

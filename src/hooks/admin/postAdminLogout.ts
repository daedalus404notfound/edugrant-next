import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

      StyledToast({
        status: "checking",
        title: "Logging out...",
        description: "Please wait while we log you out.",
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminLogout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
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
      }
    } catch (error) {
      StyledToast({
        status: "error",
        title: "Logout failed",
        description: "An error occurred while logging out.",
      });
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}

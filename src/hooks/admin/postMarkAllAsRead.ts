import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

export default function useMarkAllAsRead() {
  const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setMarkAllAsReadLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/markAllReadNotifications`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMarkAllAsReadLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });

        setMarkAllAsReadLoading(false);
      }
    } finally {
      setMarkAllAsReadLoading(false);
    }
  };

  return { onSubmit, markAllAsReadLoading };
}

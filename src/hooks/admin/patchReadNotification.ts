import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

export default function useMarkAsReadNotification() {
  const [markReadLoading, setMarkReadLoading] = useState(false);
  const markReadSubmit = async (notificationId?: number) => {
    try {
      setMarkReadLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/readNotification`,
        {
          notifiactionId: notificationId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMarkReadLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });

        setMarkReadLoading(false);
      }
    } finally {
      setMarkReadLoading(false);
    }
  };

  return { markReadSubmit, markReadLoading };
}

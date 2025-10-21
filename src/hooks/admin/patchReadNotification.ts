import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type MarkAllAsReadTypes = {
  accountId?: number;
};

export default function useMarkAsReadNotification({
  accountId,
}: MarkAllAsReadTypes) {
  const [patchMarkLoading, setMarkLoading] = useState(false);
  const onSubmitPatch = async (notificationId?: number) => {
    try {
      setMarkLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/readNotification`,
        {
          accountId: accountId,
          notifiactionId: notificationId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMarkLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });

        setMarkLoading(false);
      }
    }
  };

  return { onSubmitPatch, patchMarkLoading };
}

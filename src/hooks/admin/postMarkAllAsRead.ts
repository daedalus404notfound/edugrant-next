import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type MarkAllAsReadTypes = {
  accountId?: number;
};

export default function useMarkAllAsRead({ accountId }: MarkAllAsReadTypes) {
  const [markLoading, setMarkLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setMarkLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/markAllReadNotifications`,
        {
          accountId: accountId,
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

  return { onSubmit, markLoading };
}

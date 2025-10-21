import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type DeleteTypes = {
  applicationId?: (string | number)[];
};

export default function useDeleteApplication({ applicationId }: DeleteTypes) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteApplications`,
        {
          applicationId: JSON.stringify({
            data: applicationId,
          }),
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Application Deleted",
          description:
            "The application has been successfully removed from the system.",
        });
        setIsSuccess(true);

        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setIsSuccess(false);
        setLoading(false);
      }
    }
  };

  return { onSubmit, isSuccess, loading };
}

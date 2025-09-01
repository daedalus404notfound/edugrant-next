import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
type ReviewedTypes = {
  id: string;
  adminId?: string;
  documentUpdate: Record<string, { comment: string; status: string }>;
};
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export function useRevieweddHandler({
  id,
  adminId,
  documentUpdate,
}: ReviewedTypes) {
  const [loadingReviewed, setLoadingReviewed] = useState(false);
  const [openReviewed, setOpenReviewed] = useState(false);
  const [isSuccessReviewed, setIsSuccessReviewed] = useState(false);
  const handleReviewed = async () => {
    try {
      setOpenReviewed(true);
      setLoadingReviewed(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/reviewedApplication`,
        {
          applicationId: id,
          adminId: adminId,
          rejectMessage: JSON.stringify(documentUpdate),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Application Reviewed",
          description: "The applicant has been reviewed.",
        });
        setLoadingReviewed(false);
        setOpenReviewed(false);
        setIsSuccessReviewed(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setLoadingReviewed(false);
        setOpenReviewed(false);
        setIsSuccessReviewed(false);
      }

      console.error(error);
    } finally {
      setLoadingReviewed(false);
    }
  };

  return {
    handleReviewed,
    loadingReviewed,
    openReviewed,
    setOpenReviewed,
    isSuccessReviewed,
  };
}

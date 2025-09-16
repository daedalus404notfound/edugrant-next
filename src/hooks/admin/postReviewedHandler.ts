import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
type InterviewTypes = {
  id: string;
  adminId?: string;
  scholarshipId: string;
  documentUpdate: Record<string, { comment: string; status: string }>;
};
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export function useInterviewdHandler({
  id,
  adminId,
  scholarshipId,
  documentUpdate,
}: InterviewTypes) {
  const [loadingInterview, setLoadingInterview] = useState(false);
  const [openInterview, setOpenInterview] = useState(false);
  const [isSuccessInterview, setIsSuccessInterview] = useState(false);
  const handleInterview = async () => {
    try {
      setOpenInterview(true);
      setLoadingInterview(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/forInterview`,
        {
          applicationId: id,
          accountId: adminId,
          scholarshipId: scholarshipId,
          reviewFeedback: JSON.stringify(documentUpdate),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Application Interview",
          description: "The applicant has been Interview.",
        });
        setLoadingInterview(false);
        setOpenInterview(false);
        setIsSuccessInterview(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setLoadingInterview(false);
        setOpenInterview(false);
        setIsSuccessInterview(false);
      }

      console.error(error);
    } finally {
      setLoadingInterview(false);
    }
  };

  return {
    handleInterview,
    loadingInterview,
    openInterview,
    setOpenInterview,
    isSuccessInterview,
  };
}

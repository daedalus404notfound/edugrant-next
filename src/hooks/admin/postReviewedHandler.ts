import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
type InterviewTypes = {
  id: number;
  adminId?: number;
  scholarshipId: number;
  documentUpdate: Record<string, { comment: string; status: string }>;
};
export interface ApiErrorResponse {
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
  const { addForInterviewId } = useApplicationUIStore();
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
          rejectMessage: JSON.stringify(documentUpdate),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        addForInterviewId(res.data.interviewedApplication.applicationId);
        StyledToast({
          status: "success",
          title: "Application Interview",
          description: "The applicant has been Interview.",
        });
        setLoadingInterview(false);
        setOpenInterview(false);
        setIsSuccessInterview(true);
      }
    } catch (error) {
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

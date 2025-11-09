import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
type InterviewTypes = {
  id: number;
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
      setLoadingInterview(false);
      setOpenInterview(false);
      setIsSuccessInterview(false);
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

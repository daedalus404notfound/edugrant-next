import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
type ApproveTypes = {
  id: number;
  adminId?: number;
  scholarshipId: number;
  documentUpdate: Record<string, { comment: string; status: string }>;
};
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export function useApprovedHandler({
  id,
  adminId,
  scholarshipId,
  documentUpdate,
}: ApproveTypes) {
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [isSuccessApprove, setIsSuccessApprove] = useState(false);
  const { addApprovedId } = useApplicationUIStore();
  const handleApprove = async () => {
    try {
      setOpenApprove(true);
      setLoadingApprove(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/approveApplication`,
        {
          applicationId: id,
          adminId: adminId,
          scholarshipId: scholarshipId,
          rejectMessage: JSON.stringify(documentUpdate),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        addApprovedId(res.data.approvedApplication.applicationId);
        StyledToast({
          status: "success",
          title: "Application Approved",
          description: "The applicant has been approved and notified.",
        });
        setLoadingApprove(false);
        setOpenApprove(false);
        setIsSuccessApprove(true);
      }
    } catch (error: unknown) {
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
      setLoadingApprove(false);
      setOpenApprove(false);
      setIsSuccessApprove(false);
     
    } finally {
      setLoadingApprove(false);
    }
  };

  return {
    handleApprove,
    loadingApprove,
    openApprove,
    setOpenApprove,
    isSuccessApprove,
  };
}

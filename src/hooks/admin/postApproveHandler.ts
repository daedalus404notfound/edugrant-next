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
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setLoadingApprove(false);
        setOpenApprove(false);
        setIsSuccessApprove(false);
      }

      console.error(error);
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

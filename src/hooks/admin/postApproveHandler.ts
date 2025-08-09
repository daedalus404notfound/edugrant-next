import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
type ApproveTypes = {
  id: string;
  setOpenApprove: (approve: boolean) => void;
  adminId?: string;
};
export function useApprovedHandler({
  id,
  setOpenApprove,
  adminId,
}: ApproveTypes) {
  const [loadingApprove, setLoadingApprove] = useState(false);
  const router = useRouter();
  const handleApprove = async () => {
    try {
      setOpenApprove(true);
      setLoadingApprove(true);
      StyledToast({
        status: "checking",
        title: "Processing Approval...",
        description: "Please wait while we approve the application.",
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/approveApplication`,
        { applicationId: id, adminId: adminId },
        { withCredentials: true }
      );
      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Application Approved",
          description: "The applicant has been notified and granted access.",
        });
        setLoadingApprove(false);
        setOpenApprove(false);
        router.back();
      }
    } catch (error) {
      StyledToast({
        status: "error",
        title: "Network Error",
        description: "Please check your connection and try again.",
      });
      setLoadingApprove(false);
      setOpenApprove(false);
      console.error(error);
    } finally {
      setLoadingApprove(false);
    }
  };

  return { handleApprove, loadingApprove };
}

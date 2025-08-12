import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
type RejectTypes = {
  id: string;
  adminId?: string;
  setOpenReject: (approve: boolean) => void;
  documentUpdate: Record<string, { comment: string; status: string }>;
};
export function useRejectHandler({
  id,
  setOpenReject,
  adminId,
  documentUpdate,
}: RejectTypes) {
  const [loadingReject, setLoadingReject] = useState(false);
  console.log("documentUpdate", documentUpdate)
  const router = useRouter();
  const handleDecline = async () => {
    try {
      setOpenReject(true);
      setLoadingReject(true);
      StyledToast({
        status: "checking",
        title: "Processing Approval...",
        description: "Please wait while we approve the application.",
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/declineApplication`,
        {
          applicationId: id,
          adminId: adminId,
          documentUpdate: JSON.stringify(documentUpdate),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setLoadingReject(false);
        setOpenReject(false);
        StyledToast({
          status: "success",
          title: "Application Rejected",
          description: "The applicant has been notified of the rejection.",
        });
        router.back();
      }
    } catch (error) {
      setLoadingReject(false);
      setOpenReject(false);
      StyledToast({
        status: "error",
        title: "Network Error",
        description: "Please check your connection and try again.",
      });
      console.error(error);
    } finally {
      setLoadingReject(false);
    }
  };

  return { handleDecline, loadingReject };
}

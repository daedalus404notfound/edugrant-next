import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type DeleteTypes = {
  scholarshipId: number;
  accountId?: number;
};

export default function useDeleteScholarship({
  scholarshipId,
  accountId,
}: DeleteTypes) {
  const { addDeletedScholarshipId } = useApplicationUIStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
        {
          scholarshipId: scholarshipId,
          accountId: accountId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addDeletedScholarshipId(scholarshipId);
        StyledToast({
          status: "success",
          title: "Scholarship Deleted",
          description:
            "The scholarship has been successfully removed from the system.",
        });
        setIsSuccess(true);
        setOpenDelete(false);
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
        setOpenDelete(false);
      }
    }
  };

  return { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete };
}

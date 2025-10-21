import StyledToast from "@/components/ui/toast-styled";

import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type DeleteTypes = {
  id: number;
  accountId?: number;
};

export default function useDeleteStudent({ id, accountId }: DeleteTypes) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteStudent`,
        {
          studentId: id,
          accountId: accountId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Announcement Deleted",
          description:
            "The announcement has been successfully removed from the system.",
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

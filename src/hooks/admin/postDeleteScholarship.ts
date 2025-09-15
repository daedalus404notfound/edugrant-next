import StyledToast from "@/components/ui/toast-styled";
import { useScholarshipStore } from "@/store/deleteScholarshipStore";
import axios from "axios";
import { useState } from "react";

type DeleteTypes = {
  scholarshipId?: (string | number)[];
  accountId?: string;
};

export default function useDeleteScholarship({
  scholarshipId,
  accountId,
}: DeleteTypes) {
  const { addScholarshipIds } = useScholarshipStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
        {
          scholarshipId: JSON.stringify({
            data: scholarshipId,
          }),
          accountId: accountId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addScholarshipIds(scholarshipId ?? []);
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
      console.error(error);
      StyledToast({
        status: "error",
        title: "Deletion Failed",
        description:
          "The scholarship could not be removed. Please try again later.",
      });
      setIsSuccess(false);
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete };
}

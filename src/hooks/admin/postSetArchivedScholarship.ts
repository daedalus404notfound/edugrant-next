import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/deleteScholarshipStore";
import axios from "axios";
import { useState } from "react";

type DeleteTypes = {
  scholarshipId: string | number;
  accountId?: string;
};

export default function useArchiveScholarship({
  scholarshipId,
  accountId,
}: DeleteTypes) {
  const { addDeletedScholarshipId } = useApplicationUIStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [archiveLoading, setLoading] = useState(false);

  const [openArchive, setOpenArchive] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/archiveScholarship`,
        {
          scholarshipId: JSON.stringify({
            data: scholarshipId,
          }),
          accountId: accountId,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addDeletedScholarshipId(scholarshipId);
        StyledToast({
          status: "success",
          title: "Scholarship Archived",
          description:
            "The scholarship has been successfully archived in the system.",
        });
        setIsSuccess(true);
        setOpenArchive(false);
      }
    } catch (error) {
      console.error(error);
      StyledToast({
        status: "error",
        title: "Archiving Failed",
        description:
          "The scholarship could not be archived. Please try again later.",
      });
      setIsSuccess(false);
      setOpenArchive(false);
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, isSuccess, archiveLoading, openArchive, setOpenArchive };
}

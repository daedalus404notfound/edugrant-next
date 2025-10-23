import StyledToast from "@/components/ui/toast-styled";
import { useApplicationUIStore } from "@/store/updateUIStore";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";

type DeleteTypes = {
  scholarshipId: number;
};

export default function useArchiveScholarship({ scholarshipId }: DeleteTypes) {
  const { addArchiveScholarshipId } = useApplicationUIStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [archiveLoading, setLoading] = useState(false);

  const [openArchive, setOpenArchive] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/endScholarship`,
        { scholarshipId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addArchiveScholarshipId(scholarshipId);
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
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setIsSuccess(false);
        setOpenArchive(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, isSuccess, archiveLoading, openArchive, setOpenArchive };
}

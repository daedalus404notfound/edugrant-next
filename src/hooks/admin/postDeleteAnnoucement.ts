import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";

type DeleteTypes = {
  announcementId?: (string | number)[];
};

export default function useDeleteAnnouncement({ announcementId }: DeleteTypes) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingDelete, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteAnnouncement`,
        {
          announcementId: JSON.stringify({
            data: announcementId,
          }),
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

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      StyledToast({
        status: "error",
        title: "Deletion Failed",
        description:
          "The announcement could not be removed. Please try again later.",
      });
      setIsSuccess(false);
      setLoading(false);
    }
  };

  return { onSubmit, isSuccess, loadingDelete };
}

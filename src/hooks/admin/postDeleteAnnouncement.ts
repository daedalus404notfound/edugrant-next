import StyledToast from "@/components/ui/toast-styled";

import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";
import { useApplicationUIStore } from "@/store/updateUIStore";

type DeleteTypes = {
  id: number | null;
};

export default function useDeleteAnnouncement({ id }: DeleteTypes) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { addDeletedAnnouncementId, deletedAnnouncementIds } =
    useApplicationUIStore();
  const [deleteLoading, setLoading] = useState(false);

  console.log(deletedAnnouncementIds);
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteAnnouncement`,
        {
          announcementId: id,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addDeletedAnnouncementId(res.data.announcementId);
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
      setIsSuccess(false);
      setLoading(false);
      setOpenDelete(false);
     
    }
  };

  return { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete };
}

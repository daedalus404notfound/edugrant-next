"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { GetAnnouncementTypes } from "./getAnnouncement";
type DeleteTypes = {
  id: number | null;
};

export default function useDeleteAnnouncement({ id }: DeleteTypes) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteAnnouncement`,
        { announcementId: id },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      const deletedId = data.announcementId;
      StyledToast({
        status: "success",
        title: "Announcement Deleted",
        description:
          "The announcement has been successfully removed from the system.",
      });

      cache.findAll({ queryKey: ["adminAnnouncement"] }).forEach((meow) => {
        queryClient.setQueryData<GetAnnouncementTypes>(meow.queryKey, (old) => {
          if (!old) return old;

          return {
            ...old,
            announcements: old.announcements.filter(
              (a) => a.announcementId !== deletedId
            ),
          };
        });
      });
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        const toastConfig = {
          status: "error" as const,
          title: "",
          description: "",
        };

        switch (status) {
          case 400:
            toastConfig.title = "Bad Request";
            toastConfig.description = message ?? "Invalid request.";
            break;
          case 401:
            toastConfig.title = "Unauthorized";
            toastConfig.description = message ?? "Please log in again.";
            break;
          case 403:
            toastConfig.title = "Forbidden";
            toastConfig.description =
              message ?? "You don’t have permission for this action.";
            break;
          case 404:
            toastConfig.title = "Not Found";
            toastConfig.description = message ?? "Record not found.";
            break;
          case 500:
            toastConfig.title = "Server Error";
            toastConfig.description =
              message ?? "Internal server error. Try again later.";
            break;
          default:
            toastConfig.title = "Unexpected Error";
            toastConfig.description =
              message ?? "Something went wrong. Please try again.";
        }

        StyledToast(toastConfig);
      } else {
        StyledToast({
          status: "error",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    },
  });

  return {
    deleteAnnouncement: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

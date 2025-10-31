import axios, { AxiosError } from "axios";
import { AnnouncementFormDataPost } from "../zod/announcement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";
import socket from "@/lib/socketLib";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import { useAdminStore } from "@/store/adminUserStore";
import { useCreateAnnouncementZod } from "../zodAnnouncement";
type ApiError = AxiosError<ApiErrorResponse>;
const addAnnouncementApi = async (data: AnnouncementFormDataPost) => {
  const { admin } = useAdminStore.getState();
  const payload = {
    announcementTitle: data.title,
    announcementDescription: data.description,
    announcementTags: JSON.stringify(data.tags),
    adminId: admin?.accountId,
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/createAnnouncement`,
    payload,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const useAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAnnouncementApi,
    onSuccess: (data) => {
      StyledToast({
        status: "success",
        title: "Scholarship Created",
        description: "Your announcement has been successfully posted.",
      });

      queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
    },
    onError: (error: ApiError) => {
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
    },
  });
};

export const useCreateAnnouncement = () => {
  const { form, formWatch } = useCreateAnnouncementZod();
  const addAnnouncement = useAnnouncement();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: AnnouncementFormDataPost) => {
    try {
      const result = await addAnnouncement.mutateAsync(data);

      if (result) {
        setOpen(false);
        addAnnouncement.reset();
        form.reset();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleTriggerClick = async () => {
    const isValid = await form.trigger();

    console.log(isValid);

    if (!isValid) {
      StyledToast({
        status: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return; // ⛔ stop here if invalid
    }

    // ✅ only open when valid
    setOpen(true);
  };

  const resetCreateState = () => {
    addAnnouncement.reset();
    form.reset();
    StyledToast({
      status: "success",
      title: "Form Reset",
      description:
        "Form has been cleared and ready for new announcement entry.",
    });
  };
  return {
    open,
    setOpen,
    loading: addAnnouncement.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
    formWatch,
  };
};

import axios, { AxiosError } from "axios";
import { AnnouncementFormDataPost } from "../zod/announcement";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { useUpdateAnnouncementZod } from "../zodUpdateAnnouncement";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;

const updateAnnouncementApi = async (data: AnnouncementFormDataPost) => {
  const payload = {
    title: data.title,
    description: data.description,
    tags: JSON.stringify(data.tags),
    announcementId: data.announcementId,
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editAnnouncement`,
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

export const useUpdateAnnouncementMutation = () => {
  return useMutation({
    mutationFn: updateAnnouncementApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Announcement Updated",
        description: "The announcement has been successfully updated.",
      });
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

export const useUpdateAnnouncement = (
  data: AnnouncementFormDataPost | null
) => {
  const { form, formWatch } = useUpdateAnnouncementZod(data);
  const updateAnnouncement = useUpdateAnnouncementMutation();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: AnnouncementFormDataPost) => {
    try {
      const result = await updateAnnouncement.mutateAsync(formData);
      if (result) {
        setOpen(false);
        updateAnnouncement.reset();
        form.reset();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleTriggerClick = async () => {
    const isValid = await form.trigger(); // Validate all fields
    if (isValid) {
      setOpen(true);
    } else {
      StyledToast({
        status: "error",
        title: "Validation Error",
        description:
          "Please fill in all required fields correctly before updating.",
      });
    }
  };

  const resetUpdateState = () => {
    updateAnnouncement.reset();
    form.reset();
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form cleared. You can now update another announcement.",
    });
  };

  return {
    open,
    setOpen,
    loading: updateAnnouncement.isPending,
    handleSubmit,
    handleTriggerClick,
    resetUpdateState,
    form,
    formWatch,
  };
};

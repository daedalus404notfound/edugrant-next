import axios, { AxiosError } from "axios";
import {
  createAnnouncementFormData,
  useCreateAnnouncementZod,
} from "./zodCreateAnnouncement";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import { useAdminStore } from "@/store/adminUserStore";
type ApiError = AxiosError<ApiErrorResponse>;
const addAnnouncementApi = async (data: createAnnouncementFormData) => {
  const { admin } = useAdminStore.getState();
  const formDataToSend = new FormData();
  formDataToSend.append("announcementTitle", data.announcementTitle);
  formDataToSend.append(
    "announcementDescription",
    data.announcementDescription
  );
  if (data.announcementAttachment) {
    formDataToSend.append(
      "announcementAttachment",
      data.announcementAttachment
    );
  }
  if (admin?.adminId) {
    formDataToSend.append("adminId", String(admin.adminId));
  }
  formDataToSend.append(
    "announcementExpiration",
    data.announcementExpiration.toISOString()
  );
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddAnnouncements`,
    formDataToSend,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const useAnnouncement = () => {
  return useMutation({
    mutationFn: addAnnouncementApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Announcement Created",
        description: "Your announcement has been successfully posted.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Add announcement error:", error);

      if (error.response?.status === 401) {
        StyledToast({
          status: "error",
          title: "Unauthorized",
          duration: 10000,
          description: "You are not authorized to create a scholarship.",
        });
      } else if (error.response?.status === 410) {
        StyledToast({
          status: "error",
          title: "Request Expired",
          duration: 10000,
          description: "The request to create this announcement has expired.",
        });
      } else if (error.response?.status === 429) {
        StyledToast({
          status: "error",
          title: "Too Many Attempts",
          duration: 10000,
          description:
            "Please wait a moment before trying to post another announcement.",
        });
      } else if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        StyledToast({
          status: "error",
          title: "Connection Issue",
          duration: 10000,
          description:
            "Network error. Please check your internet connection and try again.",
        });
      } else {
        StyledToast({
          status: "error",
          title: "Failed to Create announcement",
          duration: 10000,
          description:
            "Something went wrong while posting your announcement. Please try again.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useCreateAnnouncement = () => {
  const { form, formData } = useCreateAnnouncementZod();
  const addAnnouncement = useAnnouncement();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: createAnnouncementFormData) => {
    // Show loading toast while processing
    StyledToast({
      status: "checking",
      title: "Creating Announcement...",
      description: "Please wait while we creating your announcement.",
    });

    try {
      const result = await addAnnouncement.mutateAsync(data);

      if (result) {
        setOpen(false);
        addAnnouncement.reset();
        form.reset();
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };

  const handleTriggerClick = async () => {
    // Trigger form validation
    const isValid = await form.trigger(); // This validates all fields

    if (isValid) {
      setOpen(true); // Only open dialog if validation passes
    } else {
      // Optionally show a toast for validation errors
      StyledToast({
        status: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const resetCreateState = () => {
    addAnnouncement.reset();
    form.reset();
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form has been cleared and ready for new scholarship entry.",
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
    formData,
  };
};

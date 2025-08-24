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
  const payload = {
    announcementTitle: data.announcementTitle,
    announcementDescription: data.announcementDescription,
    announcementTags: JSON.stringify({ data: data.announcementTags || [] }),
    adminId: admin?.adminId,
    announcementExpiration: data.announcementExpiration.toISOString(),
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
  return useMutation({
    mutationFn: addAnnouncementApi,
   onSuccess: () => {
        StyledToast({
          status: "success",
          title: "Scholarship Created",
          description: "Your announcement has been successfully posted.",
        });
      },
      onError: (error: ApiError) => {
        console.error("Add scholarship error:", error);
        if (error.response?.data.message) {
          StyledToast({
            status: "error",
            title: error.response.data.message,
            duration: 10000,
            description: "Cannot process your request.",
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
      description: "Form has been cleared and ready for new announcement entry.",
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

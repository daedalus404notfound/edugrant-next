import axios, { AxiosError } from "axios";
import { AnnouncementFormData } from "../zod/announcement";
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

const updateAnnouncementApi = async (data: AnnouncementFormData) => {
  const { admin } = useAdminStore.getState();
  const payload = {
    announcementTitle: data.title,
    announcementDescription: data.description,
    announcementTags: JSON.stringify(data.tags),
    adminId: admin?.accountId,
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
      console.error("Update announcement error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,

          description: "Unable to update the announcement. Please try again.",
        });
      } else {
        StyledToast({
          status: "error",
          title: "Unknown Error",

          description: "Unable to update the announcement. Please try again.",
        });
      }
    },
  });
};

export const useUpdateAnnouncement = (data: AnnouncementFormData | null) => {
  const { form, formWatch } = useUpdateAnnouncementZod(data);
  const updateAnnouncement = useUpdateAnnouncementMutation();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: AnnouncementFormData) => {
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

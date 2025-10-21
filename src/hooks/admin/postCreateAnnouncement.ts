import axios, { AxiosError } from "axios";
import { AnnouncementFormDataPost } from "../zod/announcement";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: addAnnouncementApi,
    onSuccess: (data) => {
      StyledToast({
        status: "success",
        title: "Scholarship Created",
        description: "Your announcement has been successfully posted.",
      });

      if (socket.connected) {
        socket.emit("newAnnouncement", data); // 🔥 real-time update
        console.log("📡 Broadcasted new announcement:", data);
      } else {
        console.warn("⚠️ Socket not connected — unable to broadcast");
      }
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

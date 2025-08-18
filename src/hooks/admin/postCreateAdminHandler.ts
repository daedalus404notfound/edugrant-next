import axios, { AxiosError } from "axios";

import { useAdminZod, createAdminFormData } from "./zodCreateAdmin";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
type ApiError = AxiosError<ApiErrorResponse>;


const createAdminpApi = async (data: createAdminFormData) => {
  const formDataToSend = new FormData();
  formDataToSend.append("firstName", data.firstName);
  formDataToSend.append("middleName", data.middleName);
  formDataToSend.append("lastName", data.lastName);
  formDataToSend.append("phone", data.contactNumber);
  formDataToSend.append("email", data.email);
  formDataToSend.append("passwordHash", data.password);
  formDataToSend.append("role", data.role);
  if (data.profileImage) {
    formDataToSend.append("profileImage", data.profileImage);
  }

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/createAccount`,
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

export const useCreateAdminAccount = () => {
  return useMutation({
    mutationFn: createAdminpApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Admin Created",
        description: "Admin has been successfully create.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Add scholarship error:", error);

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
          description: "The request to create this scholarship has expired.",
        });
      } else if (error.response?.status === 429) {
        StyledToast({
          status: "error",
          title: "Too Many Attempts",
          duration: 10000,
          description:
            "Please wait a moment before trying to post another scholarship.",
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
          title: "Failed to Create Scholarship",
          duration: 10000,
          description:
            "Something went wrong while posting your scholarship. Please try again.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useCreateAdmin = () => {
  const { form, formData } = useAdminZod();
  const createAdmin = useCreateAdminAccount();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: createAdminFormData) => {
    // Show loading toast while processing
    StyledToast({
      status: "checking",
      title: "Creating Scholarship...",
      description: "Please wait while we creating your scholarship.",
    });

    try {
      const result = await createAdmin.mutateAsync(data);

      if (result) {
        setOpen(false);
        createAdmin.reset();
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
    console.log("Validation result:", isValid);
    if (isValid) {
      setOpen(true); // Only open dialog if validation passes
    } else {
      console.log("Form errors:", form.formState.errors);
      // Optionally show a toast for validation errors
      StyledToast({
        status: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const resetCreateState = () => {
    createAdmin.reset();
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
    loading: createAdmin.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
    formData,
  };
};

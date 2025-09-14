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
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/createAccount`,
    {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      ...(data.middleName ? { middleName: data.middleName } : {}),
    },
    {
      withCredentials: true,
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
      console.error("Add admin error:", error);

      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message || "",
          duration: 10000,
          description: "Cannot process your request.",
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
  const [reset, setReset] = useState(false);

  const handleSubmit = async (data: createAdminFormData) => {
    try {
      const result = await createAdmin.mutateAsync(data);

      if (result) {
        setOpen(false);
        setReset(true);
        createAdmin.reset();
        form.reset();
      }
    } catch (error) {
      setOpen(false);
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
    setReset(true);
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form has been cleared.",
    });
  };
  return {
    open,
    setOpen,
    reset,
    setReset,
    loading: createAdmin.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
    formData,
  };
};

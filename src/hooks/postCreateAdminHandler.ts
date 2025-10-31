import axios, { AxiosError } from "axios";

import { useAdminZod, createAdminFormData } from "./zodCreateAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminpApi,
    onSuccess: (data) => {
      const newAccount = data.newAccount;
      const accountId = newAccount.accountId;
      StyledToast({
        status: "success",
        title: "Admin Created",
        description: "Admin has been successfully create.",
      });

      queryClient.setQueryData(
        ["adminStaffData", { pageIndex: 0, pageSize: 10 }, [], [], ""],
        (old) => {
          if (!old) return { data: [newAccount] };
          return { data: [newAccount] };
        }
      );

      queryClient.setQueryData(["manageStaff", String(accountId)], (old) => {
        if (!old) return { safeData: newAccount };

        return { safeData: newAccount };
      });

      queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
      queryClient.invalidateQueries({ queryKey: ["adminStaffData"] });
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

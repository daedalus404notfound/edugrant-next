import axios, { AxiosError } from "axios";
import { useAdminProfileForm } from "./head-profile-edit";
import { AdminProfileFormData } from "./head-profile-edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: AdminProfileFormData) => {
  const formData = new FormData();
  formData.append("firstName", data.ISPSU_Head.fName);
  formData.append("gender", data.ISPSU_Head.gender);
  formData.append("lastName", data.ISPSU_Head.lName);
  formData.append("middleName", data.ISPSU_Head.mName);
  formData.append("accountId", String(data.accountId));

  if (data.ISPSU_Head.profileImg?.publicUrl) {
    formData.append("profileImg", data.ISPSU_Head.profileImg.publicUrl);
  }

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editHead
    `,
    formData,
    { withCredentials: true }
  );

  return res.data;
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: (resData) => {
      StyledToast({
        status: "success",
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
      queryClient.setQueryData(["authenticated-user"], (old) => {
        if (!old) return old;

        return {
          ...old,
          safeData: resData.updatedHead,
        };
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

export const useUpdateProfileAdmin = (data?: AdminProfileFormData | null) => {
  const { form, isChanged } = useAdminProfileForm(data);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (data: AdminProfileFormData) => {
    try {
      const result = await profileUpdate.mutateAsync(data);

      if (result) {
        setOpen(false);
        setReset(true);
        profileUpdate.reset();
        // form.reset();
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
      setOpen(false);
      StyledToast({
        status: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const resetCreateState = () => {
    profileUpdate.reset();
    form.reset();
    setReset(true);
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form has been cleared and ready for new scholarship entry.",
    });
  };
  return {
    open,
    setOpen,
    loading: profileUpdate.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    reset,
    setReset,
    form,
    isChanged,
  };
};

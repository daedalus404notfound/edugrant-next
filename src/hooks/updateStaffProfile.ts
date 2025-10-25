import axios, { AxiosError } from "axios";
import { getStaffFormData, useUpdateStaffByHead } from "./zod/head/getStaffZod";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: getStaffFormData) => {
  const formData = new FormData();

  formData.append("fName", data.fName);
  formData.append("lName", data.lName);
  formData.append("mName", data.mName);

  formData.append("email", data.Account.email);
  formData.append("ownerId", String(data.staffId));
  if (data.validated) {
    formData.append("validate", data.validated);
  }
  if (data.profileImg?.publicUrl) {
    formData.append("profileImg", data.profileImg.publicUrl);
  }

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editStaff`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const useProfile = () => {
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Staff Profile Updated",
        description: "Staff information has been successfully saved.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Profile update error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your staff profile update request.",
        });
      }
    },
  });
};

export const useUpdateProfileStaff = (data?: getStaffFormData | null) => {
  const { form, isChanged } = useUpdateStaffByHead(data);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (data: getStaffFormData) => {
    try {
      const result = await profileUpdate.mutateAsync(data);

      if (result) {
        setOpen(false);
        setReset(true);
        profileUpdate.reset();
        form.reset();
      }
    } catch (error) {
      console.error("Update Error:", error);
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

import axios, { AxiosError } from "axios";
import { useAdminProfileForm } from "./head-profile-edit";
import { AdminProfileFormData } from "./head-profile-edit";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { headers } from "next/headers";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: AdminProfileFormData) => {
  const { admin } = useAdminStore.getState();
  const isHead = admin?.role === "ISPSU_Head";
  const head = {
    address: data.ISPSU_Head.address,
    firstName: data.ISPSU_Head.fName,
    gender: data.ISPSU_Head.gender,
    lastName: data.ISPSU_Head.lName,
    middleName: data.ISPSU_Head.mName,

    accountId: data.accountId,
  };
  const staff = {
    address: data.ISPSU_Staff.address,
    fName: data.ISPSU_Staff.fName,
    gender: data.ISPSU_Staff.gender,
    lName: data.ISPSU_Staff.lName,
    mName: data.ISPSU_Staff.mName,
    accountId: data.accountId,
    ownerId: data.accountId,
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
      isHead ? "editHead" : "editStaff"
    }`,
    isHead ? head : staff,
    { withCredentials: true }
  );

  return res.data;
};

export const useProfile = () => {
  const { setAdmin } = useAdminStore();
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: (resData) => {
      StyledToast({
        status: "success",
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
      setAdmin(resData.updatedHead);
    },
    onError: (error: ApiError) => {
      console.error("Profile update error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your profile update request.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useUpdateProfileAdmin = (data?: AdminProfileFormData) => {
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

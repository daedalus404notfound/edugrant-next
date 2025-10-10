import axios, { AxiosError } from "axios";
import { StudentUserFormData } from "./zodUpdateUserByHead";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { zodUpdateUserByHead } from "./zodUpdateUserByHead";
import { useAdminStore } from "@/store/adminUserStore";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: StudentUserFormData) => {
  const admin = useAdminStore.getState().admin;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/updateStudentAccount`,
    {
      address: data.address,
      ownerId: data.studentId,
      contactNumber: data.contactNumber,
      course: data.course,
      dateOfBirth: data.dateOfBirth,
      firstName: data.fName,
      gender: data.gender,
      lastName: data.lName,
      middleName: data.mName,
      section: data.section,
      schoolId: data.Account.schoolId,
      email: data.Account.email,
      year: data.year,
      accountId: admin?.accountId,
    },
    { withCredentials: true }
  );

  return res.data;
};

export const useProfile = () => {
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
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
  });
};

export const useUpdateUserByHead = (data?: StudentUserFormData | null) => {
  const { form, isChanged } = zodUpdateUserByHead(data);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const { setUser } = useUserStore();
  const handleSubmit = async (data: StudentUserFormData) => {
    console.log("111", data);
    try {
      const result = await profileUpdate.mutateAsync(data);

      if (result) {
        setOpen(false);
        setReset(true);
        profileUpdate.reset();
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

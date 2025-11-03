import axios, { AxiosError } from "axios";
import { StudentUserFormData } from "./zodUpdateUserByHead";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      const studentData = data.updatedStudent;
      const studentId = data.updatedStudent.accountId;
      StyledToast({
        status: "success",
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });

      console.log("ussd", studentData, studentId);
      queryClient.setQueryData(["headStudentManage", studentId], (old) => {
        if (!old) return old;
        console.log("gomana lopit");
        return studentData;
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

export const useUpdateUserByHead = (data?: StudentUserFormData | null) => {
  const { form, isChanged } = zodUpdateUserByHead(data);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

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

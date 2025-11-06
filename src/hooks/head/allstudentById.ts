"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentUserFormData } from "../user/zodUpdateUserByHead";
import axios, { AxiosError } from "axios";
import StyledToast from "@/components/ui/toast-styled";

import { ApiErrorResponse } from "../admin/postReviewedHandler";

type ApiError = AxiosError<ApiErrorResponse>;

export const addScholarshipApi = async (data: StudentUserFormData) => {
  const formData = new FormData();

  // Append text fields
  formData.append("address", data.address);
  formData.append("ownerId", data.studentId.toString());
  formData.append("contactNumber", data.contactNumber);
  formData.append("course", data.course);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("firstName", data.fName);
  formData.append("gender", data.gender);
  formData.append("lastName", data.lName);
  formData.append("middleName", data.mName);
  formData.append("section", data.section);
  formData.append("schoolId", data.Account.schoolId);
  formData.append("email", data.Account.email);
  formData.append("year", data.year);

  // Append optional fields if they exist
  if (data.indigenous) {
    formData.append("indigenous", data.indigenous);
  }

  if (data.PWD) {
    formData.append("PWD", data.PWD);
  }

  if (data.institute) {
    formData.append("institute", data.institute);
  }

  // Handle profile image if it's a File object
  if (data.profileImg?.publicUrl && data.profileImg.publicUrl instanceof File) {
    formData.append("profileImg", data.profileImg.publicUrl);
  }
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/updateStudentAccount`,
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
};

export function useEditUserByAdministrator() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addScholarshipApi,

    onSuccess: (data) => {
      const studentData = data.updatedStudent;
      const studentId = data.updatedStudent.accountId;
      StyledToast({
        status: "success",
        title: "Success",
        description: "Profile successfully edited.",
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
        const toastConfig = {
          status: "error" as const,
          title: "",
          description: "",
        };

        switch (status) {
          case 400:
            toastConfig.title = "Bad Request";
            toastConfig.description = message ?? "Invalid request.";
            break;
          case 401:
            toastConfig.title = "Unauthorized";
            toastConfig.description = message ?? "Please log in again.";
            break;
          case 403:
            toastConfig.title = "Forbidden";
            toastConfig.description =
              message ?? "You don’t have permission for this action.";
            break;
          case 404:
            toastConfig.title = "Not Found";
            toastConfig.description = message ?? "Record not found.";
            break;
          case 500:
            toastConfig.title = "Server Error";
            toastConfig.description =
              message ?? "Internal server error. Try again later.";
            break;
          default:
            toastConfig.title = "Unexpected Error";
            toastConfig.description =
              message ?? "Something went wrong. Please try again.";
        }

        StyledToast(toastConfig);
      } else {
        StyledToast({
          status: "error",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    },
  });

  return mutation;
}

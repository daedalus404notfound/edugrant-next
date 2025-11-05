"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import { FamilyBackgroundFormData } from "./zodFamilyBackground";

type ApiError = AxiosError<ApiErrorResponse>;

export const addScholarshipApi = async (data: FamilyBackgroundFormData) => {
  const familyBackground = {
    ...(data.fatherFullName && {
      fatherFullName: data.fatherFullName,
    }),
    ...(data.fatherAddress && {
      fatherAddress: data.fatherAddress,
    }),
    ...(data.fatherContactNumber && {
      fatherContactNumber: data.fatherContactNumber,
    }),
    ...(data.fatherOccupation && {
      fatherOccupation: data.fatherOccupation,
    }),
    ...(data.fatherHighestEducation && {
      fatherHighestEducation: data.fatherHighestEducation,
    }),
    ...(data.fatherStatus && {
      fatherStatus: data.fatherStatus,
    }),
    ...(data.fatherTotalParentsTaxableIncome && {
      fatherTotalParentsTaxableIncome: data.fatherTotalParentsTaxableIncome,
    }),

    ...(data.motherFullName && {
      motherFullName: data.motherFullName,
    }),
    ...(data.motherAddress && {
      motherAddress: data.motherAddress,
    }),
    ...(data.motherContactNumber && {
      motherContactNumber: data.motherContactNumber,
    }),
    ...(data.motherOccupation && {
      motherOccupation: data.motherOccupation,
    }),
    ...(data.motherHighestEducation && {
      motherHighestEducation: data.motherHighestEducation,
    }),
    ...(data.motherStatus && {
      motherStatus: data.motherStatus,
    }),
    ...(data.motherTotalParentsTaxableIncome && {
      motherTotalParentsTaxableIncome: data.motherTotalParentsTaxableIncome,
    }),

    ...(data.guardianFullName && {
      guardianFullName: data.guardianFullName,
    }),
    ...(data.guardianAddress && {
      guardianAddress: data.guardianAddress,
    }),
    ...(data.guardianContactNumber && {
      guardianContactNumber: data.guardianContactNumber,
    }),
    ...(data.guardianOccupation && {
      guardianOccupation: data.guardianOccupation,
    }),
    ...(data.guardianHighestEducation && {
      guardianHighestEducation: data.guardianHighestEducation,
    }),

    ...(data.siblings &&
      data.siblings.length > 0 && {
        siblings: data.siblings,
      }),
  };
  const formData = new FormData();

  const hasFamilyBackground = Object.keys(familyBackground).length > 0;
  formData.append(
    "familyBackground",
    hasFamilyBackground ? JSON.stringify(familyBackground) : JSON.stringify({})
  );

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/updateStudentInfo`,
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
};

export function useEditUserProfileFamilyBackground() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addScholarshipApi,

    onSuccess: (data) => {
      const newData = data.updatedStudent;
      StyledToast({
        status: "success",
        title: "Success",
        description: "Profile successfully edited.",
      });
      queryClient.setQueryData(["authenticated-user-student"], (old) => {
        if (!old) return { userData: newData };

        return { ...old, userData: newData };
      });
      queryClient.invalidateQueries({
        queryKey: ["authenticated-user-student"],
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

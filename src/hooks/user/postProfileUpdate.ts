import axios, { AxiosError } from "axios";
import { ProfileFormData, useProfileForm } from "./zodUserProfile";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: ProfileFormData) => {
  const familyBackground = {
    ...(data.familyBackground.fatherFullName && {
      fatherFullName: data.familyBackground.fatherFullName,
    }),
    ...(data.familyBackground.fatherAddress && {
      fatherAddress: data.familyBackground.fatherAddress,
    }),
    ...(data.familyBackground.fatherContactNumber && {
      fatherContactNumber: data.familyBackground.fatherContactNumber,
    }),
    ...(data.familyBackground.fatherOccupation && {
      fatherOccupation: data.familyBackground.fatherOccupation,
    }),
    ...(data.familyBackground.fatherHighestEducation && {
      fatherHighestEducation: data.familyBackground.fatherHighestEducation,
    }),
    ...(data.familyBackground.fatherStatus && {
      fatherStatus: data.familyBackground.fatherStatus,
    }),
    ...(data.familyBackground.fatherTotalParentsTaxableIncome && {
      fatherTotalParentsTaxableIncome:
        data.familyBackground.fatherTotalParentsTaxableIncome,
    }),

    ...(data.familyBackground.motherFullName && {
      motherFullName: data.familyBackground.motherFullName,
    }),
    ...(data.familyBackground.motherAddress && {
      motherAddress: data.familyBackground.motherAddress,
    }),
    ...(data.familyBackground.motherContactNumber && {
      motherContactNumber: data.familyBackground.motherContactNumber,
    }),
    ...(data.familyBackground.motherOccupation && {
      motherOccupation: data.familyBackground.motherOccupation,
    }),
    ...(data.familyBackground.motherHighestEducation && {
      motherHighestEducation: data.familyBackground.motherHighestEducation,
    }),
    ...(data.familyBackground.motherStatus && {
      motherStatus: data.familyBackground.motherStatus,
    }),
    ...(data.familyBackground.motherTotalParentsTaxableIncome && {
      motherTotalParentsTaxableIncome:
        data.familyBackground.motherTotalParentsTaxableIncome,
    }),

    ...(data.familyBackground.guardianFullName && {
      guardianFullName: data.familyBackground.guardianFullName,
    }),
    ...(data.familyBackground.guardianAddress && {
      guardianAddress: data.familyBackground.guardianAddress,
    }),
    ...(data.familyBackground.guardianContactNumber && {
      guardianContactNumber: data.familyBackground.guardianContactNumber,
    }),
    ...(data.familyBackground.guardianOccupation && {
      guardianOccupation: data.familyBackground.guardianOccupation,
    }),
    ...(data.familyBackground.guardianHighestEducation && {
      guardianHighestEducation: data.familyBackground.guardianHighestEducation,
    }),
    ...(data.familyBackground.guardianStatus && {
      guardianStatus: data.familyBackground.guardianStatus,
    }),

    ...(data.familyBackground.siblings &&
      data.familyBackground.siblings.length > 0 && {
        siblings: data.familyBackground.siblings,
      }),
  };
  const hasFamilyBackground = Object.keys(familyBackground).length > 0;

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/updateStudentInfo`,
    {
      address: data.address,
      contactNumber: data.contactNumber,
      course: data.course,
      dateOfBirth: data.dateOfBirth,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      middleName: data.middleName,
      section: data.section,
      studentId: data.studentId,
      userId: data.userId,
      year: data.year,
      familyBackground: hasFamilyBackground
        ? JSON.stringify(familyBackground)
        : null,
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
    retry: 1,
    retryDelay: 1000,
  });
};

export const useUpdateProfile = (initialData?: ProfileFormData) => {
  const { form, formData, siblings, hasChanges } = useProfileForm(initialData);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (data: ProfileFormData) => {
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
    formData,
    siblings,
    hasChanges,
  };
};

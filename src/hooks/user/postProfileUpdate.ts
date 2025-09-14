import axios, { AxiosError } from "axios";
import { useProfileForm } from "./zodUserProfile";
import { UserFormData } from "../zod/user";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const updateUserApi = async (data: UserFormData) => {
  const familyBackground = {
    ...(data.Student.familyBackground.fatherFullName && {
      fatherFullName: data.Student.familyBackground.fatherFullName,
    }),
    ...(data.Student.familyBackground.fatherAddress && {
      fatherAddress: data.Student.familyBackground.fatherAddress,
    }),
    ...(data.Student.familyBackground.fatherContactNumber && {
      fatherContactNumber: data.Student.familyBackground.fatherContactNumber,
    }),
    ...(data.Student.familyBackground.fatherOccupation && {
      fatherOccupation: data.Student.familyBackground.fatherOccupation,
    }),
    ...(data.Student.familyBackground.fatherHighestEducation && {
      fatherHighestEducation:
        data.Student.familyBackground.fatherHighestEducation,
    }),
    ...(data.Student.familyBackground.fatherStatus && {
      fatherStatus: data.Student.familyBackground.fatherStatus,
    }),
    ...(data.Student.familyBackground.fatherTotalParentsTaxableIncome && {
      fatherTotalParentsTaxableIncome:
        data.Student.familyBackground.fatherTotalParentsTaxableIncome,
    }),

    ...(data.Student.familyBackground.motherFullName && {
      motherFullName: data.Student.familyBackground.motherFullName,
    }),
    ...(data.Student.familyBackground.motherAddress && {
      motherAddress: data.Student.familyBackground.motherAddress,
    }),
    ...(data.Student.familyBackground.motherContactNumber && {
      motherContactNumber: data.Student.familyBackground.motherContactNumber,
    }),
    ...(data.Student.familyBackground.motherOccupation && {
      motherOccupation: data.Student.familyBackground.motherOccupation,
    }),
    ...(data.Student.familyBackground.motherHighestEducation && {
      motherHighestEducation:
        data.Student.familyBackground.motherHighestEducation,
    }),
    ...(data.Student.familyBackground.motherStatus && {
      motherStatus: data.Student.familyBackground.motherStatus,
    }),
    ...(data.Student.familyBackground.motherTotalParentsTaxableIncome && {
      motherTotalParentsTaxableIncome:
        data.Student.familyBackground.motherTotalParentsTaxableIncome,
    }),

    ...(data.Student.familyBackground.guardianFullName && {
      guardianFullName: data.Student.familyBackground.guardianFullName,
    }),
    ...(data.Student.familyBackground.guardianAddress && {
      guardianAddress: data.Student.familyBackground.guardianAddress,
    }),
    ...(data.Student.familyBackground.guardianContactNumber && {
      guardianContactNumber:
        data.Student.familyBackground.guardianContactNumber,
    }),
    ...(data.Student.familyBackground.guardianOccupation && {
      guardianOccupation: data.Student.familyBackground.guardianOccupation,
    }),
    ...(data.Student.familyBackground.guardianHighestEducation && {
      guardianHighestEducation:
        data.Student.familyBackground.guardianHighestEducation,
    }),
    ...(data.Student.familyBackground.guardianStatus && {
      guardianStatus: data.Student.familyBackground.guardianStatus,
    }),

    ...(data.Student.familyBackground.siblings &&
      data.Student.familyBackground.siblings.length > 0 && {
        siblings: data.Student.familyBackground.siblings,
      }),
  };
  const hasFamilyBackground = Object.keys(familyBackground).length > 0;

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/updateStudentInfo`,
    {
      address: data.Student.address,
      contactNumber: data.Student.contactNumber,
      course: data.Student.course,
      dateOfBirth: data.Student.dateOfBirth,
      firstName: data.Student.fName,
      gender: data.Student.gender,
      lastName: data.Student.lName,
      middleName: data.Student.mName,
      section: data.Student.section,
      studentId: data.Student.studentId,
      accountId: data.Student.studentId,
      year: data.Student.year,
      familyBackground: hasFamilyBackground
        ? JSON.stringify(familyBackground)
        : JSON.stringify({}),
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

export const useUpdateProfile = (initialData?: UserFormData) => {
  const { form, formData, siblings, hasChanges } = useProfileForm(initialData);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const { setUser } = useUserStore();
  const handleSubmit = async (data: UserFormData) => {
    console.log("111", data);
    try {
      const result = await profileUpdate.mutateAsync(data);

      if (result) {
        setUser(data);
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

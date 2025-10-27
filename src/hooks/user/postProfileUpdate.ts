import axios, { AxiosError } from "axios";
import { useProfileForm } from "./zodUserProfile";
import { UserFormData } from "./zodUserProfile";
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

    ...(data.Student.familyBackground.siblings &&
      data.Student.familyBackground.siblings.length > 0 && {
        siblings: data.Student.familyBackground.siblings,
      }),
  };
  const formData = new FormData();

  formData.append("address", data.Student.address);
  formData.append("contactNumber", data.Student.contactNumber);
  formData.append("course", data.Student.course);
  formData.append("dateOfBirth", data.Student.dateOfBirth);
  formData.append("firstName", data.Student.fName);
  formData.append("gender", data.Student.gender);
  formData.append("lastName", data.Student.lName);
  if (data.Student.mName) {
    formData.append("middleName", data.Student.mName);
  }
  formData.append("section", data.Student.section);
  formData.append("studentId", String(data.Student.studentId));
  formData.append("accountId", String(data.accountId));
  formData.append("year", data.Student.year);

  const hasFamilyBackground = Object.keys(familyBackground).length > 0;
  formData.append(
    "familyBackground",
    hasFamilyBackground ? JSON.stringify(familyBackground) : JSON.stringify({})
  );
  if (data.Student.profileImg) {
    formData.append("profileImg", data.Student.profileImg.publicUrl);
  }
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/updateStudentInfo`,
    formData,
    { withCredentials: true }
  );

  return res.data;
};

export const useProfile = () => {
  const { setStudent } = useUserStore();
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: (resData) => {
      StyledToast({
        status: "success",
        title: "Profile Updated",
        description: resData.message
          ? resData.message
          : "Your profile information has been successfully saved.",
      });

      setStudent(resData.updatedStudent.Student);
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

export const useUpdateProfile = (data?: UserFormData | null) => {
  const { form, siblings, isChanged } = useProfileForm(data);
  const profileUpdate = useProfile();
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (data: UserFormData) => {
    try {
      const result = await profileUpdate.mutateAsync(data);

      if (result) {
        setOpen(false);
        setIsSuccess(true);
        profileUpdate.reset();
      }
    } catch (error) {
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
    setIsSuccess(true);
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
    isSuccess,
    setIsSuccess,
    form,
    siblings,
    isChanged,
  };
};

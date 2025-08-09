import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  creatScholarshipFormData,
  useCreateScholarshipZod,
} from "./zodCreateScholarship";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const today = new Date().toISOString().split("T")[0];
const addScholarshipApi = async (data: creatScholarshipFormData) => {
  const formDataToSend = new FormData();
  formDataToSend.append("newScholarTitle", data.scholarshipTitle);
  formDataToSend.append("newScholarProvider", data.providerName);
  formDataToSend.append("newScholarDescription", data.scholarshipDescription);
  formDataToSend.append("applicationStartDate", today);
  formDataToSend.append(
    "newScholarDeadline",
    data.applicationDeadline.toISOString()
  );
  formDataToSend.append("scholarshipAmount", data.scholarshipAmount);
  formDataToSend.append("scholarshipLimit", data.scholarshipLimit);

  if (data.detailsImage) {
    formDataToSend.append("coverImg", data.detailsImage);
  }
  if (data.sponsorImage) {
    formDataToSend.append("sponsorLogo", data.sponsorImage);
  }
  formDataToSend.append("requirements", JSON.stringify(data.documents));

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddScholarships`,
    formDataToSend,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const useAddScholarship = () => {
  return useMutation({
    mutationFn: addScholarshipApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Scholarship Created",
        description: "Your scholarship has been successfully posted.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Add scholarship error:", error);

      if (error.response?.status === 401) {
        StyledToast({
          status: "error",
          title: "Unauthorized",
          duration: 10000,
          description: "You are not authorized to create a scholarship.",
        });
      } else if (error.response?.status === 410) {
        StyledToast({
          status: "error",
          title: "Request Expired",
          duration: 10000,
          description: "The request to create this scholarship has expired.",
        });
      } else if (error.response?.status === 429) {
        StyledToast({
          status: "error",
          title: "Too Many Attempts",
          duration: 10000,
          description:
            "Please wait a moment before trying to post another scholarship.",
        });
      } else if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        StyledToast({
          status: "error",
          title: "Connection Issue",
          duration: 10000,
          description:
            "Network error. Please check your internet connection and try again.",
        });
      } else {
        StyledToast({
          status: "error",
          title: "Failed to Create Scholarship",
          duration: 10000,
          description:
            "Something went wrong while posting your scholarship. Please try again.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useCreateScholarship = () => {
  const router = useRouter();
  const { form, formData, fields, append, remove } = useCreateScholarshipZod();
  const addScholarship = useAddScholarship();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: creatScholarshipFormData) => {
    // Show loading toast while processing
    StyledToast({
      status: "checking",
      title: "Creating Scholarship...",
      description: "Please wait while we creating your scholarship.",
    });

    try {
      const result = await addScholarship.mutateAsync(data);

      if (result) {
        setOpen(false);
        addScholarship.reset();
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
     StyledToast({
       status: "error",
       title: "Validation Error",
       description: "Please fill in all required fields correctly.",
     });
   }
 };

  const resetCreateState = () => {
    addScholarship.reset();
    form.reset();
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form has been cleared and ready for new scholarship entry.",
    });
  };
  return {
    open,
    setOpen,
    loading: addScholarship.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
    formData,
    fields,
    append,
    remove,
  };
};

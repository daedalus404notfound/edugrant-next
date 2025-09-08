import axios, { AxiosError } from "axios";
import { updateScholarshipFormData } from "./zodUpdateScholarship";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import { useAdminStore } from "@/store/adminUserStore";
import { ScholarshipTypes } from "../types";
import { useUpdateScholarshipZod } from "./zodUpdateScholarship";
type ApiError = AxiosError<ApiErrorResponse>;
const today = new Date().toISOString().split("T")[0];
const addScholarshipApi = async (data: updateScholarshipFormData) => {
  const { admin } = useAdminStore.getState();
  const formDataToSend = new FormData();
  if (data.scholarshipId) {
    formDataToSend.append("scholarshipId", data.scholarshipId);
  }
  console.log("wtf", data.scholarshipId);
  formDataToSend.append("newScholarTitle", data.scholarshipTitle);
  formDataToSend.append("newScholarProvider", data.providerName);
  if (data.scholarshipGwa) {
    formDataToSend.append("gwa", data.scholarshipGwa);
  }
  if (admin?.adminId) {
    formDataToSend.append("adminId", String(admin.adminId));
  }
  console.log(data.scholarshipGwa);
  formDataToSend.append("newScholarDescription", data.scholarshipDescription);
  formDataToSend.append("applicationStartDate", today);
  formDataToSend.append(
    "newScholarDeadline",
    data.applicationDeadline.toISOString()
  );
  formDataToSend.append("scholarshipAmount", data.scholarshipAmount);
  if (data.scholarshipLimit) {
    formDataToSend.append("scholarshipLimit", data.scholarshipLimit);
  }
  if (data.detailsImage) {
    formDataToSend.append("coverImg", data.detailsImage);
  }
  if (data.sponsorImage) {
    formDataToSend.append("sponsorLogo", data.sponsorImage);
  }
  const documentsPayload = {
    documents: data.documents,
  };
  formDataToSend.append(
    "scholarshipDocuments",
    JSON.stringify(documentsPayload)
  );

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/updateScholarship`,
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
        title: "Scholarship Updated",
        description: "Your scholarship has been successfully updated.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Update scholarship error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your request.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useUpdateScholarship = (data?: ScholarshipTypes) => {
  const { form, formData, fields, append, remove } =
    useUpdateScholarshipZod(data);
  const addScholarship = useAddScholarship();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: updateScholarshipFormData) => {
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
      setOpen(false);
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

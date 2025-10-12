import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import {
  renewDocumentsFormData,
  useRedeployScholarshipZod,
} from "./zodRedeploy";
import { useApplicationUIStore } from "@/store/updateUIStore";
type ApiError = AxiosError<ApiErrorResponse>;

const addScholarshipApi = async (data: renewDocumentsFormData) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/renewScholarship`,
    {
      renewDeadline: data.renewDeadline.toISOString(),
      scholarshipId: data.accountId,
      accountId: data.scholarshipId,
      isForInterview: data.interview === true ? "true" : "false",
      renewDocuments: JSON.stringify(data.renewDocuments),
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const useAddScholarship = () => {
  const { addRenewalScholarshipId } = useApplicationUIStore();
  return useMutation({
    mutationFn: addScholarshipApi,
    onSuccess: (resData) => {
      StyledToast({
        status: "success",
        title: "Scholarship Updated",
        description: "Your scholarship has been successfully updated.",
      });
      addRenewalScholarshipId(resData.renewedScholarship.scholarshipId);
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

export const useRedeployScholarship = ({
  scholarshipId,
  accountId,
  HandleCloseDrawer,
}: {
  scholarshipId: number;
  accountId?: number;
  HandleCloseDrawer: (drawer: boolean) => void;
}) => {
  const { form, formData, fields, append, remove } = useRedeployScholarshipZod({
    scholarshipId,
    accountId,
  });
  const addScholarship = useAddScholarship();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: renewDocumentsFormData) => {
    try {
      const result = await addScholarship.mutateAsync(data);

      if (result) {
        setOpen(false);
        addScholarship.reset();
        form.reset();
        HandleCloseDrawer(false);
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

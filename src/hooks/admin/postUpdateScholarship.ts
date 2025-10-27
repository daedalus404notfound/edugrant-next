import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import { useAdminStore } from "@/store/adminUserStore";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useUpdateScholarshipZod } from "./zodUpdateScholarship";
import { useUserStore } from "@/store/useUserStore";
import { useUpdateScholarshipStore } from "@/store/editScholarStore";
import { useModeStore } from "@/store/scholarshipModalStore";
type ApiError = AxiosError<ApiErrorResponse>;
const today = new Date().toISOString().split("T")[0];
const addScholarshipApi = async (data: scholarshipFormData) => {
  const { admin } = useAdminStore.getState();

  const formDataToSend = new FormData();
  if (data.scholarshipId) {
    formDataToSend.append("scholarshipId", data.scholarshipId.toString());
  }
  formDataToSend.append("newScholarTitle", data.title);
  formDataToSend.append("newScholarProvider", data.Scholarship_Provider.name);
  if (data.requiredGWA) {
    formDataToSend.append("gwa", data.requiredGWA);
  }
  if (admin?.accountId) {
    formDataToSend.append("accountId", String(admin.accountId));
  }
  formDataToSend.append("newScholarDescription", data.description);
  formDataToSend.append("applicationStartDate", today);
  formDataToSend.append("newScholarDeadline", data.deadline.toISOString());
  if (data.amount) {
    formDataToSend.append("scholarshipAmount", data.amount);
  }
  if (data.limit) {
    formDataToSend.append("scholarshipLimit", data.limit);
  }
  if (data.cover) {
    formDataToSend.append("coverImg", data.cover);
  }
  if (data.logo) {
    formDataToSend.append("sponsorLogo", data.logo);
  }

  formDataToSend.append(
    "scholarshipDocuments",
    JSON.stringify({ documents: data.documents })
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
  const { setUpdatedScholarship } = useUpdateScholarshipStore();
  return useMutation({
    mutationFn: addScholarshipApi,
    onSuccess: (resData) => {
      StyledToast({
        status: "success",
        title: "Scholarship Updated",
        description: "Your scholarship has been successfully updated.",
      });
      setUpdatedScholarship(resData.updatedScholarship);
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
    retry: 1,
    retryDelay: 1000,
  });
};

export const useUpdateScholarship = (data?: scholarshipFormData) => {
  const { form, formData, documentFields, appendDocument, removeDocument } =
    useUpdateScholarshipZod(data);
  const addScholarship = useAddScholarship();
  const [open, setOpen] = useState(false);
  const { setMode } = useModeStore();
  const handleSubmit = async (data: scholarshipFormData) => {
    try {
      const result = await addScholarship.mutateAsync(data);

      if (result) {
        setOpen(false);
        setMode("details");
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
      console.error("Validation failed. Errors:", form.formState.errors);
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
    documentFields,
    appendDocument,
    removeDocument,
  };
};

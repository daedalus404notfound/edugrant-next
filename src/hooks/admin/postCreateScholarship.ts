
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { scholarshipFormData } from "../zod/scholarship";
import { useAdminStore } from "@/store/adminUserStore";
import { ApiErrorResponse } from "./postReviewedHandler";

type ApiError = AxiosError<ApiErrorResponse>;

const addScholarshipApi = async (data: scholarshipFormData) => {
  const { admin } = useAdminStore.getState();
  const today = new Date().toISOString().split("T")[0];

  const formDataToSend = new FormData();

  formDataToSend.append("scholarshipType", data.type);
  formDataToSend.append("newScholarTitle", data.title);
  formDataToSend.append("newScholarProvider", data.providerName);

  if (data.requiredGWA) formDataToSend.append("gwa", data.requiredGWA);
  if (admin?.accountId)
    formDataToSend.append("adminId", String(admin.accountId));

  formDataToSend.append("newScholarDescription", data.description);
  formDataToSend.append("applicationStartDate", today);
  formDataToSend.append("newScholarDeadline", data.deadline.toISOString());

  if (data.amount)
    formDataToSend.append("scholarshipAmount", data.amount.toString());
  if (data.limit) formDataToSend.append("scholarshipLimit", data.limit);
  if (data.interview !== undefined)
    formDataToSend.append("isForInterview", data.interview.toString());

  if (data.cover) formDataToSend.append("coverImg", data.cover);
  if (data.logo) formDataToSend.append("sponsorLogo", data.logo);
  if (data.form) formDataToSend.append("scholarshipForm", data.form);

  const docs = { documents: data.documents.documents };
  formDataToSend.append("scholarshipDocuments", JSON.stringify(docs));

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddScholarships`,
    formDataToSend,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
};

export function useAddScholarship() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addScholarshipApi,

    onSuccess: (data) => {
      StyledToast({
        status: "success",
        title: "Scholarship Posted",
        description: "Your scholarship has been successfully posted.",
      });

      // ✅ Optionally refresh cache if needed
      queryClient.invalidateQueries({ queryKey: ["adminScholarshipData"] });
      queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
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

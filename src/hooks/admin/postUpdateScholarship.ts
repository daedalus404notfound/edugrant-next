
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import {
  scholarshipFormData,
  useUpdateScholarshipZod,
} from "./zodUpdateScholarship";
import { GetScholarshopTypes } from "../staff/getScholarshipStaff";
import { displayScholarshipFormData } from "./displayScholarshipData";
type scholarshipFormDataTypes = {
  data: scholarshipFormData;
};

export default function useUpdateScholarship() {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();
  const mutation = useMutation({
    mutationFn: async (data: scholarshipFormData) => {
      const today = new Date().toISOString().split("T")[0];
      const formDataToSend = new FormData();
      if (data.scholarshipId) {
        formDataToSend.append("scholarshipId", data.scholarshipId.toString());
      }
      formDataToSend.append("newScholarTitle", data.title);
      formDataToSend.append(
        "newScholarProvider",
        data.Scholarship_Provider.name
      );
      if (data.requiredGWA) {
        formDataToSend.append("gwa", data.requiredGWA);
      }

      formDataToSend.append("accountId", String(1));

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
    },
    onSuccess: (data) => {
      const editedData = data.updatedScholarship;
      const editedId = editedData.scholarshipId;
      StyledToast({
        status: "success",
        title: "Scholarship Updated",
        description: "Your scholarship has been successfully updated.",
      });

      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          const exists = old.data.some((s) => s.scholarshipId === editedId);
          const updatedData = exists
            ? old.data.map((s) =>
                s.scholarshipId === editedId ? editedData : s
              )
            : [editedData, ...old.data];
          return { ...old, data: updatedData };
        });
      });

      queryClient.setQueryData<displayScholarshipFormData>(
        ["adminScholarship", editedId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          console.log("lopit");
          return editedData;
        }
      );
    },
    onError: (error) => {
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

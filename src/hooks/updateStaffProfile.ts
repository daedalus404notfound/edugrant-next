"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./admin/postReviewedHandler";
import { AdminProfileFormData } from "./head-profile-edit";
import { StaffFormDataTypes } from "./admin/getAdmins";
import { GetStaffByHead } from "./admin/getStaffByHeadById";

export default function useUpdateProfileStaff() {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();

  const mutation = useMutation({
    mutationFn: async (data: AdminProfileFormData) => {
      const formDataToSend = new FormData();

      formDataToSend.append("fName", data.ISPSU_Staff.fName);
      formDataToSend.append("lName", data.ISPSU_Staff.lName);
      formDataToSend.append("mName", data.ISPSU_Staff.mName);
      formDataToSend.append("email", data.email);
      formDataToSend.append("ownerId", String(data.accountId));

      if (data.ISPSU_Staff.validated !== undefined) {
        formDataToSend.append("validate", String(data.ISPSU_Staff.validated));
      }
      if (data.ISPSU_Staff.profileImg?.publicUrl) {
        formDataToSend.append(
          "profileImg",
          data.ISPSU_Staff.profileImg.publicUrl
        );
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editStaff`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data;
    },

    onSuccess: (data) => {
      const newData = data.updatedStaff;
      const accountId = newData.accountId;
      StyledToast({
        status: "success",
        title: "Staff Profile Updated",
        description: "The staff profile has been successfully updated.",
      });
      cache.findAll({ queryKey: ["adminStaffData"] }).forEach((query) => {
        queryClient.setQueryData<StaffFormDataTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          const exists = old.data.some((s) => s.accountId === accountId);
          const updatedData = exists
            ? old.data.map((s) => (s.accountId === accountId ? newData : s))
            : [newData, ...old.data];
          return { ...old, data: updatedData };
        });
      });

      queryClient.setQueryData<GetStaffByHead>(
        ["manageStaff", String(accountId)],
        (old) => {
          console.log("Old manageStaff cache:", old);
          return {
            ...old, // preserve success
            safeData: newData,
          };
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
            toastConfig.description = message ?? "Invalid request data.";
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
            toastConfig.description = message ?? "Staff record not found.";
            break;
          case 500:
            toastConfig.title = "Server Error";
            toastConfig.description =
              message ?? "Internal server error. Please try again later.";
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

// import axios, { AxiosError } from "axios";
// import { useAdminProfileForm } from "./head-profile-edit";
// import { AdminProfileFormData } from "./head-profile-edit";
// import { useMutation } from "@tanstack/react-query";
// import StyledToast from "@/components/ui/toast-styled";
// import { useState } from "react";
// import { useAdminStore } from "@/store/adminUserStore";
// import { headers } from "next/headers";

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   statusCode?: number;
// }

// type ApiError = AxiosError<ApiErrorResponse>;
// const updateUserApi = async (data: AdminProfileFormData) => {
//   const formData = new FormData();

//   formData.append("firstName", data.ISPSU_Staff.fName);
//   if (data.ISPSU_Staff.gender) {
//     formData.append("gender", data.ISPSU_Staff.gender);
//   }
//   formData.append("lastName", data.ISPSU_Staff.lName);
//   formData.append("middleName", data.ISPSU_Staff.mName);

//   if (data.ISPSU_Staff.profileImg?.publicUrl) {
//     formData.append("profileImg", data.ISPSU_Staff.profileImg.publicUrl);
//   }

//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editStaffAccount
//     `,
//     formData,
//     { withCredentials: true }
//   );

//   return res.data;
// };

// export const useProfile = () => {
//   const { setAdmin } = useAdminStore();
//   return useMutation({
//     mutationFn: updateUserApi,
//     onSuccess: (resData) => {
//       StyledToast({
//         status: "success",
//         title: "Profile Updated",
//         description: "Your profile information has been successfully saved.",
//       });
//       setAdmin(resData.updatedHead);
//     },
//     onError: (error: ApiError) => {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         const status = error.response?.status;
//         const message = error.response?.data?.message;

//         if (!error.response) {
//           StyledToast({
//             status: "error",
//             title: "Network Error",
//             description:
//               "No internet connection or the server is unreachable. Please check your connection and try again.",
//           });
//         } else if (status === 400) {
//           StyledToast({
//             status: "error",
//             title: "Bad Request",
//             description: message ?? "Invalid request. Please check your input.",
//           });
//         } else if (status === 401) {
//           StyledToast({
//             status: "error",
//             title: "Unauthorized",
//             description:
//               message ?? "You are not authorized. Please log in again.",
//           });
//         } else if (status === 403) {
//           StyledToast({
//             status: "error",
//             title: "Forbidden",
//             description:
//               message ?? "You do not have permission to perform this action.",
//           });
//         } else if (status === 404) {
//           StyledToast({
//             status: "warning",
//             title: "No data found",
//             description: message ?? "There are no records found.",
//           });
//         } else if (status === 500) {
//           StyledToast({
//             status: "error",
//             title: "Server Error",
//             description:
//               message ?? "Internal server error. Please try again later.",
//           });
//         } else {
//           StyledToast({
//             status: "error",
//             title: message ?? "Export CSV error occurred.",
//             description: "Cannot process your request.",
//           });
//         }
//       } else {
//         StyledToast({
//           status: "error",
//           title: "Unexpected Error",
//           description: "Something went wrong. Please try again later.",
//         });
//       }
//     },
//   });
// };

// export const useUpdateProfileStaff = (data?: AdminProfileFormData) => {
//   const { form, isChanged } = useAdminProfileForm(data);
//   const profileUpdate = useProfile();
//   const [open, setOpen] = useState(false);
//   const [reset, setReset] = useState(false);

//   const handleSubmit = async (data: AdminProfileFormData) => {
//     try {
//       const result = await profileUpdate.mutateAsync(data);

//       if (result) {
//         setOpen(false);
//         setReset(true);
//         profileUpdate.reset();
//         // form.reset();
//       }
//     } catch (error) {
//       // Error toast is already handled in useSendAuthCode onError
//       console.error("Login error:", error);
//     }
//   };

//   const handleTriggerClick = async () => {
//     // Trigger form validation
//     const isValid = await form.trigger(); // This validates all fields

//     if (isValid) {
//       setOpen(true); // Only open dialog if validation passes
//     } else {
//       // Optionally show a toast for validation errors
//       setOpen(false);
//       StyledToast({
//         status: "error",
//         title: "Validation Error",
//         description: "Please fill in all required fields correctly.",
//       });
//     }
//   };

//   const resetCreateState = () => {
//     profileUpdate.reset();
//     form.reset();
//     setReset(true);
//     StyledToast({
//       status: "success",
//       title: "Form Reset",
//       description: "Form has been cleared and ready for new scholarship entry.",
//     });
//   };
//   return {
//     open,
//     setOpen,
//     loading: profileUpdate.isPending,
//     handleSubmit,
//     handleTriggerClick,
//     resetCreateState,
//     reset,
//     setReset,
//     form,
//     isChanged,
//   };
// };

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { AdminProfileFormData } from "./head-profile-edit";
import { ApiErrorResponse } from "./admin/postReviewedHandler";

type ApiError = AxiosError<ApiErrorResponse>;

const addScholarshipApi = async (data: AdminProfileFormData) => {
  const formDataToSend = new FormData();
  formDataToSend.append("fName", data.ISPSU_Staff.fName);
  if (data.ISPSU_Staff.gender) {
    formDataToSend.append("gender", data.ISPSU_Staff.gender);
  }
  formDataToSend.append("lName", data.ISPSU_Staff.lName);
  if (data.ISPSU_Staff.mName) {
    formDataToSend.append("mName", data.ISPSU_Staff.mName);
  }
  if (data.ISPSU_Staff.profileImg?.publicUrl) {
    formDataToSend.append("profileImg", data.ISPSU_Staff.profileImg.publicUrl);
  }
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/editStaffAccount`,
    formDataToSend,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
};

export function useEditAdministrator() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addScholarshipApi,

    onSuccess: (data) => {
      const newData = data.updatedStaffInfo;
      StyledToast({
        status: "success",
        title: "Success",
        description: "Profile successfully edited.",
      });
      queryClient.setQueryData(["authenticated-user"], (old) => {
        if (!old) return { safeData: newData };
        return { ...old, safeData: newData };
      });
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

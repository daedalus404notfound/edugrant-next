// "use client";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import StyledToast from "@/components/ui/toast-styled";
// import { ApiErrorResponse } from "./postReviewedHandler";

// export default function useDeleteScholarship({
//   scholarshipId,
// }: {
//   scholarshipId: number;
// }) {
//   const mutation = useMutation({
//     mutationFn: async () => {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
//         { scholarshipId },
//         { withCredentials: true }
//       );
//       return res;
//     },
//     onSuccess: (data) => {
//       StyledToast({
//         status: "success",
//         title: "Scholarship Deleted",
//         description:
//           "The scholarship has been successfully removed from the system.",
//       });
//     },
//     onError: (error) => {
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

//   return {
//     deleteScholarship: mutation.mutate, // call this to trigger delete
//     deleteLoading: mutation.isPending,
//     isSuccess: mutation.isSuccess,
//   };
// }
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";
import { ScholarshipGetTypes } from "./getScholarship";
type DeleteTypes = {
  id: number | null;
};

export default function useDeleteScholarship({ id }: DeleteTypes) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
        { scholarshipId: id },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      const deletedId = data.scholarshipId;
      StyledToast({
        status: "success",
        title: "Announcement Deleted",
        description:
          "The announcement has been successfully removed from the system.",
      });

      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((meow) => {
        queryClient.setQueryData<ScholarshipGetTypes>(meow.queryKey, (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((a) => a.scholarshipId !== deletedId),
          };
        });
      });
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

  return {
    deleteScholarship: mutation.mutate,
    deleteLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

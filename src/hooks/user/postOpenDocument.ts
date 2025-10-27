import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "../admin/postReviewedHandler";

interface GetDocumentTypes {
  message: string;
  signedURL: string;
  success: boolean;
}
export default function useGetDocument(user: boolean) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState<string | undefined>(undefined);
  console.log(filePath);
  const onGetDocument = async (
    applicationId: string | number,
    path: string
  ) => {
    try {
      setLoading(true);
      const baseUrl = user
        ? process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        : process.env.NEXT_PUBLIC_USER_URL;

      console.log(baseUrl);
      const res = await axios.post<GetDocumentTypes>(
        `${baseUrl}/getFileUrl`,
        {
          applicationId,
          path,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsSuccess(true);
        setFilePath(res.data.signedURL);
        setLoading(false);
      }
    } catch (error) {
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
      setIsSuccess(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { onGetDocument, isSuccess, loading, filePath };
}

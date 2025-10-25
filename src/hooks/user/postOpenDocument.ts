import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "../admin/postReviewedHandler";

interface GetDocumentTypes {
  message: string;
  signedURLs: {
    signedURLs: string;
  };
  success: boolean;
}
export default function useGetDocument(user: boolean) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState("");
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
        setFilePath(res.data.signedURLs.signedURLs);
        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred",
          description: "Cannot fetch the document at this time.",
        });
        setIsSuccess(false);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return { onGetDocument, isSuccess, loading, filePath };
}

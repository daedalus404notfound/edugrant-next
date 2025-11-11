import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export function handleApiError(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (!error.response) {
      StyledToast({
        status: "error",
        title: "Network Connection Issue",
        description:
          "We’re having trouble connecting to the server. Please check your internet connection and try again.",
      });
    } else if (status === 400) {
      StyledToast({
        status: "error",
        title: "Invalid Request",
        description:
          message ??
          "There seems to be an issue with your input. Please review and try again.",
      });
    } else if (status === 401) {
      StyledToast({
        status: "error",
        title: "Session Expired",
        description:
          message ?? "Your session has expired. Please log in to continue.",
      });
    } else if (status === 403) {
      StyledToast({
        status: "error",
        title: "Access Denied",
        description:
          message ?? "You don’t have permission to perform this action.",
      });
    } else if (status === 404) {
      StyledToast({
        status: "warning",
        title: "No Results Found",
        description:
          message ?? "We couldn’t find any matching data for your request.",
      });
    } else if (status === 500) {
      StyledToast({
        status: "error",
        title: "Server Error",
        description:
          message ?? "Something went wrong on our end. Please try again later.",
      });
    } else {
      StyledToast({
        status: "error",
        title: "Request Failed",
        description:
          message ??
          "We couldn’t process your request. Please try again shortly.",
      });
    }
  } else {
    StyledToast({
      status: "error",
      title: "Unexpected Error",
      description: "An unexpected issue occurred. Please try again later.",
    });
  }
  throw error;
}

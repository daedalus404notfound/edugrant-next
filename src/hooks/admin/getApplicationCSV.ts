"use client";
import axios from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function useFetchApplicationCSV({
  dataSelections,
  filters,
  status,
}: {
  dataSelections: string;
  filters?: string;
  accountId?: number;
  status?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");

  console.log("status", status);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dataSelections) params.append("dataSelections", dataSelections);

      if (filters) params.append("filters", filters);

      const endpoint = `${
        process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
      }/downloadApplicationCSV?${params.toString()}`;

      const res = await axios.get(endpoint, {
        withCredentials: true,
        responseType: "blob",
      });
      console.log("Content-Type:", res.headers["content-type"]);
      console.log("Content-Disposition:", res.headers["content-disposition"]);
      downloadBlob(
        res.data,
        `${filename} ${new Date().toISOString().split("T")[0]}.xlsx`
      );

      StyledToast({
        status: "success",
        title: "Excel file exported successfully", // Updated message
        description: "",
      });
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, onSubmit, setFilename };
}
// "use client";
// import axios from "axios";
// import { useState } from "react";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";

// export default function useFetchApplicationCSV({
//   dataSelections,
//   filters,
//   accountId,
// }: {
//   dataSelections: string;
//   filters?: string;
//   accountId?: number;
// }) {
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();

//       if (dataSelections) params.append("dataSelections", dataSelections);
//       if (accountId) params.append("accountId", String(accountId));
//       if (filters) params.append("filters", filters);

//       const endpoint = `${
//         process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//       }/downloadApplicationCSV?${params.toString()}`;

//       const res = await axios.get(endpoint, {
//         withCredentials: true,
//         responseType: "blob", // ✅ binary data for file
//       });

//       if (res.status === 200) {
//         const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" }); // ✅ CSV MIME type
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "applications.csv"; // ✅ file name
//         link.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         StyledToast({
//           status: "error",
//           title: error?.response?.data.message ?? "Export CSV error occurred.",
//           description: "Cannot process your request.",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, onSubmit };
// }

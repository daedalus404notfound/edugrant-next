// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// type GetDataForExportTypes = {
//   label: string;
//   count: number;
// };
// type Meow = {
//   dataSelections: [];
//   filters: {
//     applicationStatuses: GetDataForExportTypes[];
//     courses: GetDataForExportTypes[];
//     institutes: GetDataForExportTypes[];
//     scholarshipTitles: GetDataForExportTypes[];
//     sections: GetDataForExportTypes[];
//     years: GetDataForExportTypes[];
//   };
// };
// export default function useFetchApplicationCSVShit(
//   selectedFilters: { id: string; value: string[] }[]
// ) {
//   const [data, setData] = useState<Meow | null>(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     async function ExportExcel() {
//       setLoading(true);
//       try {
//         const params = new URLSearchParams();

//         selectedFilters.forEach((filter) => {
//           if (filter.value && filter.value.length > 0) {
//             params.append(filter.id, JSON.stringify(filter.value));
//           }
//         });
//         const endpoint = `${
//           process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//         }/getFiltersCSV?${params.toString()}`;

//         const res = await axios.get<Meow>(endpoint, {
//           withCredentials: true,
//         });
//         if (res.status === 200) {
//           setData(res.data);
//         }
//       } catch (error) {
//         if (axios.isAxiosError<ApiErrorResponse>(error)) {
//           const status = error.response?.status;
//           const message = error.response?.data?.message;

//           if (!error.response) {
//             StyledToast({
//               status: "error",
//               title: "Network Error",
//               description:
//                 "No internet connection or the server is unreachable. Please check your connection and try again.",
//             });
//           } else if (status === 400) {
//             StyledToast({
//               status: "error",
//               title: "Bad Request",
//               description:
//                 message ?? "Invalid request. Please check your input.",
//             });
//           } else if (status === 401) {
//             StyledToast({
//               status: "error",
//               title: "Unauthorized",
//               description:
//                 message ?? "You are not authorized. Please log in again.",
//             });
//           } else if (status === 403) {
//             StyledToast({
//               status: "error",
//               title: "Forbidden",
//               description:
//                 message ?? "You do not have permission to perform this action.",
//             });
//           } else if (status === 404) {
//             StyledToast({
//               status: "warning",
//               title: "No data found",
//               description: message ?? "There are no records found.",
//             });
//           } else if (status === 500) {
//             StyledToast({
//               status: "error",
//               title: "Server Error",
//               description:
//                 message ?? "Internal server error. Please try again later.",
//             });
//           } else {
//             StyledToast({
//               status: "error",
//               title: message ?? "Export CSV error occurred.",
//               description: "Cannot process your request.",
//             });
//           }
//         } else {
//           StyledToast({
//             status: "error",
//             title: "Unexpected Error",
//             description: "Something went wrong. Please try again later.",
//           });
//         }
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     }
//     ExportExcel();
//   }, [selectedFilters]);

//   return { data, loading };
// }
"use client";

import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";

type GetDataForExportTypes = {
  label: string;
  count: number;
};

type Meow = {
  dataSelections: [];
  filters: {
    applicationStatuses: GetDataForExportTypes[];
    courses: GetDataForExportTypes[];
    institutes: GetDataForExportTypes[];
    scholarshipTitles: GetDataForExportTypes[];
    sections: GetDataForExportTypes[];
    years: GetDataForExportTypes[];
  };
};

async function fetchApplicationCSV(
  selectedFilters: { id: string; value: string[] }[]
): Promise<Meow> {
  const params = new URLSearchParams();

  selectedFilters.forEach((filter) => {
    if (filter.value && filter.value.length > 0) {
      params.append(filter.id, JSON.stringify(filter.value));
    }
  });

  const endpoint = `${
    process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
  }/getFiltersCSV?${params.toString()}`;

  try {
    const res = await axios.get<Meow>(endpoint, { withCredentials: true });
    return res.data;
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
  }
}

export default function useFetchApplicationCSV(
  selectedFilters: { id: string; value: string[] }[]
) {
  const query = useQuery({
    queryKey: ["applicationCSV", selectedFilters],
    queryFn: () => fetchApplicationCSV(selectedFilters),
    retry: false, // disable auto-retry if backend error
    placeholderData: keepPreviousData,
  });

  return query;
}

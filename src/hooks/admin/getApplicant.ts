// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ApplicationTypes } from "../types";

// export default function useAdminReview({
//   currentPage,
//   rowsPerPage,
//   sort,
//   scholar,
//   course,
//   year,
//   section,
//   status,
// }: {
//   currentPage: number;
//   rowsPerPage: number;
//   sort?: string;
//   scholar?: string;
//   course?: string;
//   year?: string;
//   section?: string;
//   status: string;
// }) {
//   const [data, setData] = useState<ApplicationTypes[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const endpoint = `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getApplicationByStatus?status=${status}&page=${currentPage}&dataPerPage=${rowsPerPage}${
//             sort ? `&sortBy=${sort}` : ""
//           }${scholar ? `&scholarshipId=${scholar}` : ""}${
//             course ? `&course=${course}` : ""
//           }
//             ${year ? `&year=${year}` : ""} ${
//             section ? `&section=${section}` : ""
//           }`;
//           const res = await axios.get(endpoint, { withCredentials: true });
//           console.log(endpoint);
//           if (res.status === 200) {
//             console.log("API response:", res.data);
//             setData(res.data.applications);
//             setTotalPages(res.data.totalPage);
//           }
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchScholarships();
//     },
//     [currentPage, rowsPerPage, sort, scholar, course, year, section, status]
//   );

//   return { data, loading, totalPages };
// }
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationTypes } from "../types";

interface UseAdminReviewParams {
  currentPage: number;
  rowsPerPage: number;
  sort?: string;
  scholar?: string;
  course?: string;
  year?: string;
  section?: string;
  status: string;
}

interface AdminReviewResponse {
  applications: ApplicationTypes[];
  totalPage: number;
}

// Extract the API call to a separate function
async function fetchApplications(
  params: UseAdminReviewParams
): Promise<AdminReviewResponse> {
  const {
    currentPage,
    rowsPerPage,
    sort,
    scholar,
    course,
    year,
    section,
    status,
  } = params;

  const endpoint = `${
    process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
  }/getApplicationByStatus?${
    status ? `status=${status}` : ""
  }&page=${currentPage}&dataPerPage=${rowsPerPage}${
    sort ? `&sortBy=${sort}` : ""
  }${scholar ? `&filterScholarship=${scholar}` : ""}${
    course ? `&filterCourse=${course}` : ""
  }${year ? `&filterYear=${year}` : ""}${
    section ? `&filterSection=${section}` : ""
  }`;
  console.log(endpoint);
  const res = await axios.get(endpoint, { withCredentials: true });

  if (res.status !== 200) {
    throw new Error(`Failed to fetch applications: ${res.status}`);
  }

  return res.data;
}

export default function useAdminReview(params: UseAdminReviewParams) {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: [
      "admin-review",
      params.currentPage,
      params.rowsPerPage,
      params.sort,
      params.scholar,
      params.course,
      params.year,
      params.section,
      params.status,
    ],
    queryFn: () => fetchApplications(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data: data?.applications || [],
    totalPages: data?.totalPage || 1,
    loading: isLoading,
    error,
    isError,
    isFetching, // Useful for showing background loading states
    refetch, // Manual refetch function
  };
}

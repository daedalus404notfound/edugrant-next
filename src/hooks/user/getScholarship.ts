// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ScholarshipTypes } from "../types";

// export default function useScholarshipUserData({
//   currentPage,
//   rowsPerPage,
//   sort,
// }: {
//   currentPage: number;
//   rowsPerPage: number;
//   sort: string;
// }) {
//   const [data, setData] = useState<ScholarshipTypes[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_USER_URL}/getAllScholarships?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}`,
//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             setData(res.data.getScholarshipsData);
//           }
//         } catch (error) {
//           console.error(error);
//           if (axios.isAxiosError(error)) {
//             if (error.message === "Network Error") {
//               setError("No internet connection. Please check your network.");
//             }
//           }
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchScholarships();
//     },
//     [sort, currentPage, rowsPerPage]
//   );

//   return { data, loading, error };
// }
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";

export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
  search,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
  search?: string;
}) {
  const [data, setData] = useState<scholarshipFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
  });
  const [loading, setLoading] = useState(true);
  console.log(filters);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const endpoint = `${
            process.env.NEXT_PUBLIC_USER_URL
          }/getAllScholarship?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            status ? `&status=${status}` : ""
          }${filters ? `&filters=${encodeURIComponent(filters)}` : ""}${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`;

          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.data);
            setMeta(res.data.meta);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [page, pageSize, sortBy, order, filters, status, search]
  );

  return { data, loading, meta };
}

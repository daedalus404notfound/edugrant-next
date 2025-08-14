// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { ScholarshipTypes } from "../types";

// export default function useScholarshipData({
//   currentPage,
//   rowsPerPage,
//   sort,
//   active,
// }: {
//   currentPage: number;
//   rowsPerPage: number;
//   sort?: string;
//   active: boolean;
// }) {
//   const [data, setData] = useState<ScholarshipTypes[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
//               active ? "getScholarships" : "getExpiredScholarships"
//             }?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}`,
//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             console.log("API response:", res.data);
//             setData(res.data.getScholarshipsData);
//             setTotalPages(res.data.totalPages);
//           }
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchScholarships();
//     },
//     [currentPage, rowsPerPage, sort]
//   );

//   return { data, loading, totalPages };
// }
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ScholarshipTypes } from "../types";

export default function useScholarshipData({
  currentPage,
  rowsPerPage,
  sort,
  sortOrder = "asc",
  filters = {},
  active,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  active: boolean;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          // Build query parameters
          const params = new URLSearchParams({
            page: currentPage.toString(),
            dataPerPage: rowsPerPage.toString(),
            sortBy: sort || "scholarshipTitle",
            sortOrder: sortOrder,
          });

          // Add filters to params
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "" && value !== null) {
              if (Array.isArray(value)) {
                params.append(key, value.join(","));
              } else {
                params.append(key, value.toString());
              }
            }
          });

          const url = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
            active ? "getScholarships" : "getExpiredScholarships"
          }?${params.toString()}`;

          const res = await axios.get(url, { withCredentials: true });

          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.getScholarshipsData);
            setTotalPages(res.data.totalPages);
          }
        } catch (error) {
          console.error(error);
          setData([]);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [currentPage, rowsPerPage, sort, sortOrder, JSON.stringify(filters), active]
  );

  return { data, loading, totalPages };
}
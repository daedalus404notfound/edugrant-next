// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import { ScholarshipTypes } from "../types";
// import { MetaTypes } from "../types";
// const defaultMeta: MetaTypes = {
//   page: undefined,
//   pageSize: undefined,
//   totalRows: undefined,
//   totalPage: undefined,
//   sortBy: undefined,
//   order: undefined,
//   filters: undefined,
//   search: undefined,
// };
// export default function useScholarshipData({
//   page,
//   pageSize,
//   sortBy,
//   order,
//   status,
//   filters,
// }: {
//   page?: number;
//   pageSize?: number;
//   sortBy?: string;
//   order?: string;
//   status?: string;
//   filters?: string;
// }) {
//   const [data, setData] = useState<ScholarshipTypes[]>([]);
//   const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
//   const [loading, setLoading] = useState(true);
//   console.log(filters);
//   useEffect(
//     function () {
//       async function fetchScholarships() {
//         setLoading(true);
//         try {
//           const endpoint = `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getScholarships?status=${status}${page ? `&page=${page}` : ""}${
//             pageSize ? `&dataPerPage=${pageSize}` : ""
//           }${sortBy ? `&sortBy=${sortBy}` : ""}${
//             order ? `&order=${order}` : ""
//           }${filters ? `&filters=${encodeURIComponent(filters)}` : ""}`;

//           const res = await axios.get(endpoint, { withCredentials: true });
//           console.log(endpoint);
//           if (res.status === 200) {
//             setData(res.data.data);
//             setMeta(res.data.meta);
//           }
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchScholarships();
//     },
//     [page, pageSize, sortBy, order, filters, status]
//   );

//   return { data, loading, meta };
// }
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ScholarshipTypes } from "../types";
import { MetaTypes } from "../types";

const defaultMeta: MetaTypes = {
  page: undefined,
  pageSize: undefined,
  totalRows: undefined,
  totalPage: undefined,
  sortBy: undefined,
  order: undefined,
  filters: undefined,
  search: undefined,
};

export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScholarships() {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (pageSize)
          params.append("dataPerPage", pageSize.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        if (filters) params.append("filters", filters);

        const endpoint = `${
          process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        }/getScholarship?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

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
  }, [page, pageSize, sortBy, order, filters, status]);

  return { data, loading, meta };
}

// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ApplicationTypes } from "../types";

// export default function useApplicationpSearch({
//   query,
//   status,
// }: {
//   query: string;
//   status: string;
// }) {
//   const [searchData, setSearchData] = useState<ApplicationTypes[]>([]);
//   const [searchLoading, setLoading] = useState(false);

//   useEffect(() => {
//     const trimmedQuery = query.trim();
//     if (!trimmedQuery) {
//       setSearchData([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     const delayDebounce = setTimeout(async () => {
//       try {
//         const endpoint = `${
//           process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//         }/searchApplication?status=${status}&search=${encodeURIComponent(
//           trimmedQuery
//         )}`;
//         const res = await axios.get(endpoint, { withCredentials: true });
//         console.log(endpoint);
//         console.log(query);
//         if (res.status === 200) {
//           console.log(res);
//           setSearchData(res.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }, 500); // Adjust delay time as needed

//     return () => clearTimeout(delayDebounce);
//   }, [query, status]);

//   return { searchData, searchLoading };
// }

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes, MetaTypes } from "../types";
const defaultMeta: MetaTypes = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};
export default function useApplicantsSearch({
  page,
  pageSize,
  sortBy,
  order,
  status = true,
  query,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status?: boolean;
  query: string;
}) {
  const [searchData, setSearchData] = useState<ApplicationTypes[]>([]);
  const [searchMeta, setSearchMeta] = useState<MetaTypes>(defaultMeta);
  const [searchLoading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/searchApplication?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            status ? "&status=ACTIVE" : "&status=EXPIRED"
          }&search=${trimmedQuery}`,

          { withCredentials: true }
        );

        if (res.status === 200) {
          setSearchData(res.data.data);
          setSearchMeta(res.data.meta);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, pageSize, sortBy, order, query]);

  return { searchData, searchMeta, searchLoading };
}

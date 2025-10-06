// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { MetaTypes } from "../zodMeta";
// import { AnnouncementFormData } from "../zod/announcement";
// import { ApiErrorResponse } from "./postReviewedHandler";
// import StyledToast from "@/components/ui/toast-styled";
// const defaultMeta: MetaTypes = {
//   page: 1,
//   pageSize: 10,
//   totalRows: 0,
//   totalPage: 0,
//   sortBy: "",
//   order: "",
//   filters: "",
//   search: "",
// };
// export default function useAnnouncementFetch({
//   page,
//   pageSize,
//   sortBy,
//   order,
// }: {
//   page: number;
//   pageSize: number;
//   sortBy?: string;
//   order?: string;
// }) {
//   const [data, setData] = useState<AnnouncementFormData[]>([]);
//   const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchAnnouncement() {
//       setLoading(true);

//       try {
//         const res = await axios.get(
//           `${
//             process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
//           }/getAnnouncement?page=${page}&dataPerPage=${pageSize}${
//             sortBy ? `&sortBy=${sortBy}` : ""
//           }${order ? `&order=${order}` : ""}`,

//           { withCredentials: true }
//         );

//         if (res.status === 200) {
//           setData(res.data.announcements);
//           setMeta(res.data.meta);
//         }
//       } catch (error) {
//         if (axios.isAxiosError<ApiErrorResponse>(error)) {
//           StyledToast({
//             status: "error",
//             title: error?.response?.data.message ?? "An error occurred.",
//             description: "Cannot process your request.",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAnnouncement();
//   }, [page, pageSize, sortBy, order]);

//   return { data, meta, loading };
// }
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes } from "../zodMeta";
import { AnnouncementFormData } from "../zod/announcement";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

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

export default function useAnnouncementFetch({
  page,
  pageSize,
  sortBy,
  order,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
}) {
  const [data, setData] = useState<AnnouncementFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // for pagination loading
  useEffect(() => {
    async function fetchAnnouncement() {
      if (page === 1) setLoading(true);
      else setIsFetchingMore(true);

      try {
        const res = await axios.get(
          `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getAnnouncement?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          // ✅ Append data if page > 1, else replace
          setData((prevData) =>
            page > 1
              ? [...prevData, ...res.data.announcements]
              : res.data.announcements
          );

          setMeta(res.data.meta);
        }
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          StyledToast({
            status: "error",
            title: error?.response?.data.message ?? "An error occurred.",
            description: "Cannot process your request.",
          });
        }
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    }

    fetchAnnouncement();
  }, [page, pageSize, sortBy, order]);
  useEffect(() => {
    // Reset data when sorting or ordering changes
    setData([]);
  }, [sortBy, order]);
  return { data, meta, loading, isFetchingMore };
}

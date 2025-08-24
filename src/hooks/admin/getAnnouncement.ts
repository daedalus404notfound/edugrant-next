"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes, AnnouncementTypes, AnnouncementDataTypes } from "../types";
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
  status,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status: string;
}) {
  const [data, setData] = useState<AnnouncementDataTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAnnouncement() {
      setLoading(true);

      try {
        const res = await axios.get<AnnouncementTypes>(
          `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getAnnouncement?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            status ? `&status=${status}` : ""
          }`,

          { withCredentials: true }
        );

        if (res.status === 200) {
          setData(res.data.announcements);
          setMeta(res.data.meta);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncement();
  }, [page, pageSize, sortBy, order, status]);

  return { data, meta, loading };
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes } from "../zodMeta";
import { AnnouncementFormDataGet } from "../zod/announcement";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
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

export default function useAnnouncementFetchUser({
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
  const [data, setData] = useState<AnnouncementFormDataGet[]>([]);
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
            process.env.NEXT_PUBLIC_USER_URL
          }/getAnnouncements?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setData((prevData) =>
            page > 1
              ? [...prevData, ...res.data.annoucements]
              : res.data.annoucements
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

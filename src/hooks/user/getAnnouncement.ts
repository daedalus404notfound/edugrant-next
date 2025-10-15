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
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
export default function useAnnouncementFetchUser({
  page,
  pageSize,
  sortBy,
  order,
  search,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  search?: string;
}) {
  const [data, setData] = useState<AnnouncementFormDataGet[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 800);
  useEffect(() => {
    async function fetchAnnouncement() {
      setLoading(true);

      try {
        const res = await axios.get(
          `${
            process.env.NEXT_PUBLIC_USER_URL
          }/getAnnouncements?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            debouncedSearch ? `&search=${debouncedSearch}` : ""
          }`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setData(res.data.annoucements);

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
      }
    }

    fetchAnnouncement();
  }, [page, pageSize, sortBy, order, debouncedSearch]);

  useEffect(() => {
    setData([]);
  }, [debouncedSearch, sortBy, order]);

  return { data, meta, loading };
}

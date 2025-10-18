"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes } from "../zodMeta";
import { AnnouncementFormDataGet } from "../zod/announcement";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder";

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

export default function useAnnouncementFetcPublic({
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
          `https://server.edugrant.online/getAnnouncementsPublic?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            debouncedSearch ? `&search=${debouncedSearch}` : ""
          }`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setData(res.data.announcements);
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

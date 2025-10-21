"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes } from "../zodMeta";
import { scholarshipFormData } from "./zodUpdateScholarship";
import StyledToast from "@/components/ui/toast-styled";
import { ApiErrorResponse } from "./postReviewedHandler";

export default function useScholarshipSearch({
  page,
  pageSize,
  sortBy,
  order,
  status,
  query,
  accountId,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status: string;
  query: string;
  accountId?: number;
}) {
  const [searchData, setSearchData] = useState<scholarshipFormData[]>([]);
  const [searchMeta, setSearchMeta] = useState<MetaTypes>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
  });
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
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("dataPerPage", pageSize.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        if (query) params.append("search", query);
        if (accountId) params.append("accountId", accountId.toString());
        const endpoint = `${
          process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        }/searchScholarship?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

        if (res.status === 200) {
          setSearchData(res.data.data);
          setSearchMeta(res.data.meta);
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
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, pageSize, sortBy, order, query]);

  return { searchData, searchMeta, searchLoading, setSearchData };
}

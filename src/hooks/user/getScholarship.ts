
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "../admin/zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";
import { ApiErrorResponse } from "../admin/postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { useDebounce } from "@/lib/debounder";
interface ScholarshipCounts {
  countActive: number;
  countRenew: number;
  countExpired: number;
}

interface MetaWithCounts extends MetaTypes {
  counts: ScholarshipCounts;
}
export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
  search,
  accountId,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
  search?: string;
  accountId?: string;
}) {
  const [data, setData] = useState<scholarshipFormData[]>([]);
  const [meta, setMeta] = useState<MetaWithCounts>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
    counts: {
      countActive: 0,
      countRenew: 0,
      countExpired: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 800);
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
            debouncedSearch
              ? `&search=${encodeURIComponent(debouncedSearch)}`
              : ""
          }${accountId ? `&accountId=${accountId}` : ""}`;

          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.data);
            setMeta(res.data.meta);
          }
        } catch (error) {
          if (axios.isAxiosError<ApiErrorResponse>(error)) {
            StyledToast({
              status: "error",
              title: error?.response?.data.message ?? "An error occurred.",
              description: "Cannot process get scholarship request.",
            });
          }
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [page, pageSize, sortBy, order, filters, status, debouncedSearch]
  );

  return { data, loading, meta };
}

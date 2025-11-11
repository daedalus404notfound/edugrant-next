"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes } from "../zodMeta";
import { StaffFormData } from "../zod/staff";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";
import { handleApiError } from "@/lib/handleApiError";
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
export default function useAdminsSearch({
  page,
  pageSize,
  sortBy,
  order,

  query,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;

  query: string;
}) {
  const [searchData, setSearchData] = useState<StaffFormData[]>([]);
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
          }/searchAdmin?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}&search=${trimmedQuery}`,

          { withCredentials: true }
        );

        if (res.status === 200) {
          setSearchData(res.data.data);
          setSearchMeta(res.data.meta);
        }
      } catch (error) {
        handleApiError(error, true);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, pageSize, sortBy, order, query]);

  return { searchData, searchMeta, searchLoading };
}

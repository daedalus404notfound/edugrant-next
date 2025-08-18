"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MetaTypes, ScholarshipTypes } from "../types";
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
export default function useScholarshipSearch({
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
  const [searchData, setSearchData] = useState<ScholarshipTypes[]>([]);
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
          }/searchScholarship?page=${page}&dataPerPage=${pageSize}${
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

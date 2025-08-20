"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ScholarshipTypes } from "../types";
import { MetaTypes } from "../types";
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
export default function useScholarshipData({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  console.log(filters);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const endpoint = `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getScholarships?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            status ? `&status=${status}` : ""
          }${filters ? `&filters=${encodeURIComponent(filters)}` : ""}`;

          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.data);
            setMeta(res.data.meta);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [page, pageSize, sortBy, order, filters, status]
  );

  return { data, loading, meta};
}

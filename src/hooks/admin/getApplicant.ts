"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApplicationFormData } from "../zod/application";
import { MetaTypes } from "../zodMeta";
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
export default function useFetchApplications({
  page,
  pageSize,
  sortBy,
  order,
  status,
  filters,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  filters?: string;
}) {
  const [data, setData] = useState<ApplicationFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  console.log("2323", data);
  useEffect(
    function () {
      async function fetchApplications() {
        setLoading(true);
        try {
          const endpoint = `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getApplication?status=${status}${page ? `&page=${page}` : ""}${
            pageSize ? `&dataPerPage=${pageSize}` : ""
          }${sortBy ? `&sortBy=${sortBy}` : ""}${
            order ? `&order=${order}` : ""
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

      fetchApplications();
    },
    [page, pageSize, sortBy, order, filters]
  );

  return { data, loading, meta };
}

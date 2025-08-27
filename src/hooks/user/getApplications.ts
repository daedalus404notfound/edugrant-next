"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ApplicationTypes } from "../types";
import { MetaTypes } from "../types";
const defaultMeta: MetaTypes = {
  page: undefined,
  pageSize: undefined,
  totalRows: undefined,
  totalPage: undefined,
  sortBy: undefined,
  order: undefined,
  filters: undefined,
  search: undefined,
};
export default function useClientApplications({
  page,
  pageSize,
  sortBy,
  order,
  status,
  userId,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  status?: string;
  userId?: string;
}) {
  const [data, setData] = useState<ApplicationTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function fetchApplications() {
        setLoading(true);
        try {
          const endpoint = `${
            process.env.NEXT_PUBLIC_USER_URL
          }/getApplications?userId=${userId}&page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            status ? `&status=${status}` : ""
          }`;
          console.log(endpoint);
          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            setData(res.data.applications);
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
    [page, pageSize, sortBy, order, status]
  );

  return { data, loading, meta };
}

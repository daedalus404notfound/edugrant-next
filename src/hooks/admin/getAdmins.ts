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
export default function useAdminData({
  page,
  pageSize,
  sortBy,
  order,
  // status = true,
  filters,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  status?: boolean;
  filters?: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  console.log(filters);
  useEffect(
    function () {
      async function fetchAdmin() {
        setLoading(true);
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getAllAdmin?page=${page}&dataPerPage=${pageSize}`;

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

      fetchAdmin();
    },
    [page, pageSize, sortBy, order, filters]
  );

  return { data, loading, meta };
}

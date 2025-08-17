"use client";
import axios from "axios";
import { act, useEffect, useState } from "react";

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
  active,
  search,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  active: boolean;
  search?: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [meta, setMeta] = useState<MetaTypes>(defaultMeta);
  const [loading, setLoading] = useState(true);
  console.log("DATA response:", data);
  console.log("META response:", meta);
  console.log(
    "data sent to backend:",
    "page:",
    page,
    "pageSize:",
    pageSize,
    "sortBy:",
    sortBy,
    "order:",
    order
  );
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
            active ? "getScholarships" : "getExpiredScholarships"
          }?page=${page}&dataPerPage=${pageSize}${
            sortBy ? `&sortBy=${sortBy}` : ""
          }${order ? `&order=${order}` : ""}${
            search ? `&search=${search}` : ""
          }`;
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
    [page, pageSize, sortBy, order, active, search]
  );

  return { data, loading, meta };
}

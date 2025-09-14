"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "./zodUpdateScholarship";
import { MetaTypes } from "../zodMeta";

export default function useScholarshipData({
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
  const [data, setData] = useState<scholarshipFormData[]>([]);
  const [meta, setMeta] = useState<MetaTypes>({
    page: 1,
    pageSize: 10,
    totalRows: 0,
    totalPage: 0,
    sortBy: "",
    order: "",
    filters: "",
    search: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScholarships() {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("dataPerPage", pageSize.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        if (filters) params.append("filters", filters);

        const endpoint = `${
          process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        }/getScholarship?${params.toString()}`;
        console.log("Fetching:", endpoint);

        const res = await axios.get(endpoint, { withCredentials: true });

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
  }, [page, pageSize, sortBy, order, filters, status]);

  return { data, loading, meta };
}

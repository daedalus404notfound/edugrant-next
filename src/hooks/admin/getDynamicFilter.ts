"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterTypes } from "../types";

export default function useGetFilter({ status }: { status?: string }) {
  const [filter, setFilter] = useState<FilterTypes | null>(null);
  const [filterLoading, setFilterLoading] = useState(true);
  useEffect(function () {
    async function fetchFilter() {
      setFilterLoading(true);
      try {
        const res = await axios.get<FilterTypes>(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getFilterData${
            status ? `?status=${status}` : ""
          }`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          // console.log("API filter:", res.data);
          setFilter(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFilterLoading(false);
      }
    }

    fetchFilter();
  }, []);

  return { filter, filterLoading };
}

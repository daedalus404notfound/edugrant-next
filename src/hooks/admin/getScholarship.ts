"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { ScholarshipTypes } from "../types";

export default function useScholarshipData({
  currentPage,
  rowsPerPage,
  sort,
  active,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort?: string;
  active: boolean;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/${
              active ? "getScholarships" : "getExpiredScholarships"
            }?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}`,
            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.getScholarshipsData);
            setTotalPages(res.data.totalPages);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [currentPage, rowsPerPage, sort]
  );

  return { data, loading, totalPages };
}

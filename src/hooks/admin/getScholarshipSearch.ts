"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScholarshipTypes } from "../types";

export default function useScholarshipSearch({ query }: { query: string }) {
  const [searchData, setSearchData] = useState<ScholarshipTypes[]>([]);
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
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/searchScholarship?search=${trimmedQuery}`,

          { withCredentials: true }
        );

        if (res.status === 200) {
          setSearchData(res.data.dataSearch);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500); // Adjust delay time as needed

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { searchData, searchLoading };
}

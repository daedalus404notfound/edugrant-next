"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "../types";

export default function useApplicationpSearch({
  query,
  status,
}: {
  query: string;
  status: string;
}) {
  const [searchData, setSearchData] = useState<ApplicationTypes[]>([]);
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
        const endpoint = `${
          process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
        }/searchApplication?status=${status}&search=${encodeURIComponent(
          trimmedQuery
        )}`;
        const res = await axios.get(endpoint, { withCredentials: true });
        console.log(endpoint);
        console.log(query);
        if (res.status === 200) {
          console.log(res);
          setSearchData(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500); // Adjust delay time as needed

    return () => clearTimeout(delayDebounce);
  }, [query, status]);

  return { searchData, searchLoading };
}

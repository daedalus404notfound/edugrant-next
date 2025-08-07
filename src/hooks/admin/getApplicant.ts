"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "../types";

export default function useAdminReview({
  currentPage,
  rowsPerPage,
  sort,
  scholar,
  course,
  year,
  section,
  status,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort?: string;
  scholar?: string;
  course?: string;
  year?: string;
  section?: string;
  status: string;
}) {
  const [data, setData] = useState<ApplicationTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const endpoint = `${
            process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
          }/getApplicationByStatus?status=${status}&page=${currentPage}&dataPerPage=${rowsPerPage}${
            sort ? `&sortBy=${sort}` : ""
          }${scholar ? `&scholarshipId=${scholar}` : ""}${
            course ? `&course=${course}` : ""
          }
            ${year ? `&year=${year}` : ""} ${
            section ? `&section=${section}` : ""
          }`;
          const res = await axios.get(endpoint, { withCredentials: true });
          console.log(endpoint);
          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.applications);
            setTotalPages(res.data.totalPage);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [currentPage, rowsPerPage, sort, scholar, course, year, section, status]
  );

  return { data, loading, totalPages };
}

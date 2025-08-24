"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScholarshipTypes } from "../types";



export default function useScholarshipUserById(id: string) {
  const [data, setData] = useState<ScholarshipTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get<{
            scholarship: ScholarshipTypes;
          }>(
            `${process.env.NEXT_PUBLIC_USER_URL}/getScholarshipsbyId?scholarshipId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.scholarship);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.message === "Network Error") {
              setError("No internet connection. Please check your network.");
            }
          }
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [id]
  );

  return { data, loading, error };
}

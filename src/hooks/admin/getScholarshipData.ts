"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
export default function useScholarshipUserByIdAdmin(id: string) {
  const [data, setData] = useState<scholarshipFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchScholarshipsAdmin() {
        setLoading(true);
        try {
          const res = await axios.get<{
            scholarship: scholarshipFormData;
          }>(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getScholarshipsById?scholarshipId=${id}`,

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

      fetchScholarshipsAdmin();
    },
    [id]
  );

  return { data, loading, error };
}

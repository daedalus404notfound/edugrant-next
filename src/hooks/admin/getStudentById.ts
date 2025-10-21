"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { StudentUserFormData } from "../user/zodUpdateUserByHead";
import { ApiErrorResponse } from "./postReviewedHandler";
import StyledToast from "@/components/ui/toast-styled";

export default function useStudentById(id: number) {
  const [data, setData] = useState<StudentUserFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchStudentById() {
        setLoading(true);
        try {
          const res = await axios.get<{
            student: StudentUserFormData;
          }>(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getStudentsById?ownerId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log(res);
            setData(res.data.student);
          }
        } catch (error) {
          if (axios.isAxiosError<ApiErrorResponse>(error)) {
            StyledToast({
              status: "error",
              title: error?.response?.data.message ?? "An error occurred.",
              description: "Cannot process your request.",
            });
          }
        } finally {
          setLoading(false);
        }
      }

      fetchStudentById();
    },
    [id]
  );

  return { data, loading, error };
}

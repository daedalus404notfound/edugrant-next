"use client";
import axios from "axios";
import { useEffect } from "react";
import { useAdminStore } from "@/store/adminUserStore";

export default function useAuthenticatedUser() {
  const { setAdmin, setLoading, setError } = useAdminStore();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminTokenAuthentication`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setAdmin(res.data.user[0]);
        
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === "Network Error") {
          setError("No network connection");
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setAdmin, setLoading, setError]);

  return null;
}

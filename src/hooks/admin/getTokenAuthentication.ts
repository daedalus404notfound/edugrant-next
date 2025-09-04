"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { useRouter } from "next/navigation";

export default function useAuthenticatedUser() {
  const { setAdmin, setLoading, setError } = useAdminStore();
  const router = useRouter();
  const [success, setSucces] = useState(false);

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
          router.push("/administrator/home");
          setSucces(true);
        }
      } catch (error) {
        console.error(error);
        setSucces(false);
        router.push("/administrator");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setAdmin, setLoading, setError]);

  return { success };
}

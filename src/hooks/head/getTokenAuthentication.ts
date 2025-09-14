"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { usePathname, useRouter } from "next/navigation";

export default function useAuthenticatedUser() {
  const { setAdmin, setLoading, setError } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
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
          setAdmin(res.data.safeData);

          if (
            res.data.safeData.role === "ISPSU_Staff" &&
            pathname !== "/administrator/staff/home"
          ) {
            router.push("/administrator/staff/home");
          } else if (
            res.data.safeData.role === "ISPSU_Head" &&
            pathname !== "/administrator/head/home"
          ) {
            router.push("/administrator/head/home");
          }

          setSucces(true);
        }
      } catch (error) {
        console.error(error);
        setSucces(false);
        if (pathname !== "/") {
          router.replace("/administrator");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setAdmin, setLoading, setError]);

  return { success };
}

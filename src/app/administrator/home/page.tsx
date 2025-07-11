// /app/administrator/home
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const handleLogout = async () => {
    console.log("logout button clicked");
    try {
      await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminLogout`,
        {},
        {
          withCredentials: true,
        }
      );
      router.push("/administrator/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <>
      HOME!!!!
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}

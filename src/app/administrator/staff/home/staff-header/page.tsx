"use client";
import { motion } from "motion/react";
import logo from "@/assets/basclogo.png";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/vercel-tabs";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { ModeToggle } from "@/components/ui/dark-mode";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";

const tabs = [
  { id: "/administrator/staff/home", label: "Dashboard", indicator: null },
  {
    id: "/administrator/staff/home/application",
    label: "Pending Application",
    indicator: null,
  },
  {
    id: "/administrator/staff/home/for-interview",
    label: "For Interview",
    indicator: null,
  },
  {
    id: "/administrator/staff/home/scholarship",
    label: "Scholarship",
    indicator: null,
  },
  {
    id: "/administrator/staff/home/announcement",
    label: "Announcements",
    indicator: null,
  },
  {
    id: "/administrator/staff/home/profile",
    label: "Staff Profile",
    indicator: null,
  },
];
export default function StaffHeader() {
  const router = useRouter();
  const [tab, setTab] = useState("/administrator/staff/home");
  const { handleLogout, loading, open, setOpen } = useAdminLogout();
  return (
    <div className="relative">
      <div className="relative">
        <header className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <img src={logo.src} alt="" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="flex gap-1">
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70 truncate  text-2xl havelock tracking-[-3px]
          "
                  initial={{ backgroundPosition: "200% 0" }}
                  animate={{ backgroundPosition: "-200% 0" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 7,
                    ease: "linear",
                  }}
                >
                  Edugrant
                </motion.span>
                <p className="text-xs mt-1 tracking-wider uppercase font-medium text-muted-foreground">
                  Staff
                </p>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <UserRound /> Jerome Tecson
            </Button>
            <ModeToggle />

            <DeleteDialog
              open={open}
              onOpenChange={setOpen}
              onConfirm={handleLogout}
              loading={loading}
              title="Logout?"
              confirmText="Logout"
              confirmTextLoading="Logging out..."
              red={false}
              description="Are you sure you want to log out of your account?"
              cancelText="Stay Logged In"
              trigger={
                <Button onClick={() => setOpen(true)} variant="outline">
                  <LogOut />
                </Button>
              }
            />
          </div>
        </header>
        <div className="pb-2 border-b px-8">
          <Tabs
            tabs={tabs}
            onTabChange={(tabId) => {
              setTab(tabId);
              router.push(tabId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

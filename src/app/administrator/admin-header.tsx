import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Activity,
  Edit,
  HelpCircle,
  LogOut,
  Megaphone,
  PenLine,
  RefreshCcw,
  UserRoundPlus,
} from "lucide-react";

import { useAdminLogout } from "@/hooks/admin/postAdminLogout";

import { ModeToggle } from "@/components/ui/dark-mode";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TourStep } from "@/components/tour-2/tour-step";
import TitleReusable from "@/components/ui/title";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTourStore } from "@/store/useTourStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface HeaderTypes {
  first: string;
  second?: string;
  third?: string;
}
export default function DynamicHeaderAdmin({
  first,
  second,
  third,
}: HeaderTypes) {
  const {
    handleLogout,
    loading: loadingLogout,
    open: openLogout,
    setOpen: setOpenLogout,
  } = useAdminLogout();
  const {
    setOpenScholarship,
    setOpenAnnouncement,
    setOpenEditScholarship,
    setOpenRenewScholarship,
    setOpenGenerate,
    setOpenStaff,
    setActivateStaff,
  } = useTourStore();
  return (
    <header className="flex w-full z-30 items-center justify-between  p-4 rounded-lg">
      <div className="flex  shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1 lg:flex hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 lg:flex hidden"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>{capitalizeFirstLetter(first)}</BreadcrumbItem>
            {second && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(second)}</BreadcrumbItem>
              </>
            )}
            {third && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(third)}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <TourStep stepId="guide">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                Help
                <HelpCircle />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-md p-2 mr-2 rounded-xl shadow-md border-border/50 bg-background"
            >
              <div className="grid grid-cols-2 gap-3">
                <Link href="/administrator/head/home/create">
                  <div
                    onClick={() => setOpenScholarship(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Post Scholarship
                    <PenLine className="absolute -right-1 -bottom-1 size-10 opacity-40 text-primary" />
                  </div>
                </Link>

                <Link href="/administrator/head/home/manage">
                  <div
                    onClick={() => setOpenEditScholarship(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Edit Scholarship
                    <Edit className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link>

                <Link href="/administrator/head/home/archive">
                  <div
                    onClick={() => setOpenRenewScholarship(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Renew Scholarship
                    <RefreshCcw className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link>

                <Link href="/administrator/head/home/post-announcement">
                  <div
                    onClick={() => setOpenAnnouncement(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    {" "}
                    Post Announcement
                    <Megaphone className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link>

                {/* <Link href="/administrator/head/home/generate-report">
                  <div
                    onClick={() => setOpenGenerate(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Generate Report
                    <Activity className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link> */}

                <Link href="/administrator/head/home/add">
                  <div
                    onClick={() => setOpenStaff(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Add Staff
                    <UserRoundPlus className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link>

                <Link
                  href="/administrator/head/home/manage-staff"
                  className="col-span-2"
                >
                  <div
                    onClick={() => setActivateStaff(true)}
                    className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                  >
                    Activate Staff
                    <UserRoundPlus className="absolute -right-1 -bottom-1 size-10 opacity-20 text-primary" />
                  </div>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </TourStep>
        <ModeToggle />
        <DeleteDialog
          open={openLogout}
          onOpenChange={setOpenLogout}
          onConfirm={handleLogout}
          confirmText="Log out"
          confirmTextLoading="Please wait..."
          loading={loadingLogout}
          title="Logout?"
          red={false}
          description="Are you sure you want to log out of your account?"
          cancelText="Stay Logged In"
          trigger={
            <Button
              onClick={() => setOpenLogout(true)}
              variant="secondary"
              className="rounded-full"
            >
              <LogOut />
            </Button>
          }
        />
      </div>
    </header>
  );
}

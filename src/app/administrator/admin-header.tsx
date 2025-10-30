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
  HelpCircle,
  LogOut,
  PenLine,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <HelpCircle />
                Help
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Guides available</DropdownMenuLabel>
              <DropdownMenuSeparator />{" "}
              <Link href="/administrator/head/home/create">
                <DropdownMenuItem onClick={() => setOpenScholarship(true)}>
                  <PenLine /> Post Scholarship
                </DropdownMenuItem>
              </Link>{" "}
              <Link href="/administrator/head/home/manage">
                <DropdownMenuItem onClick={() => setOpenEditScholarship(true)}>
                  <PenLine /> Edit Scholarship
                </DropdownMenuItem>
              </Link>
              <Link href="/administrator/head/home/archive">
                <DropdownMenuItem onClick={() => setOpenRenewScholarship(true)}>
                  <PenLine /> Renew Scholarship
                </DropdownMenuItem>
              </Link>
              <Link href="/administrator/head/home/post-announcement">
                <DropdownMenuItem onClick={() => setOpenAnnouncement(true)}>
                  <PenLine /> Post Announcement
                </DropdownMenuItem>{" "}
              </Link>{" "}
              <Link href="/administrator/head/home/generate-report">
                <DropdownMenuItem onClick={() => setOpenGenerate(true)}>
                  <Activity />
                  Generate Report
                </DropdownMenuItem>
              </Link>{" "}
              <Link href="/administrator/head/home/add">
                <DropdownMenuItem onClick={() => setOpenStaff(true)}>
                  <UserRoundPlus /> Add Staff
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
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

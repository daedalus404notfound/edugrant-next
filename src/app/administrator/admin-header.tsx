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
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-80 p-4 mr-2 rounded-xl shadow-md border bg-background"
            >
              <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                Guides Available
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/administrator/head/home/create">
                  <Button
                    variant="outline"
                    onClick={() => setOpenScholarship(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <PenLine className="h-4 w-4 text-primary" />
                    Post
                  </Button>
                </Link>

                <Link href="/administrator/head/home/manage">
                  <Button
                    variant="outline"
                    onClick={() => setOpenEditScholarship(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <PenLine className="h-4 w-4 text-primary" />
                    Edit
                  </Button>
                </Link>

                <Link href="/administrator/head/home/archive">
                  <Button
                    variant="outline"
                    onClick={() => setOpenRenewScholarship(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <PenLine className="h-4 w-4 text-primary" />
                    Renew
                  </Button>
                </Link>

                <Link href="/administrator/head/home/post-announcement">
                  <Button
                    variant="outline"
                    onClick={() => setOpenAnnouncement(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <PenLine className="h-4 w-4 text-primary" />
                    Announce
                  </Button>
                </Link>

                <Link href="/administrator/head/home/generate-report">
                  <Button
                    variant="outline"
                    onClick={() => setOpenGenerate(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <Activity className="h-4 w-4 text-primary" />
                    Report
                  </Button>
                </Link>

                <Link href="/administrator/head/home/add">
                  <Button
                    variant="outline"
                    onClick={() => setOpenStaff(true)}
                    className="flex w-full items-center justify-start gap-2 text-sm rounded-sm"
                  >
                    <UserRoundPlus className="h-4 w-4 text-primary" />
                    Add Staff
                  </Button>
                </Link>

                <Link
                  href="/administrator/head/home/manage-staff"
                  className="col-span-2"
                >
                  <Button
                    variant="outline"
                    onClick={() => setActivateStaff(true)}
                    className="flex w-full items-center justify-center gap-2 text-sm "
                  >
                    <UserRoundPlus className="h-4 w-4 text-primary" />
                    Activate Staff
                  </Button>
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

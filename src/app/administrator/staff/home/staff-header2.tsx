import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Activity,
  Edit,
  HelpCircle,
  LogOut,
  Megaphone,
  PenLine,
  RefreshCcw,
  Search,
  UserRoundPlus,
} from "lucide-react";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/dark-mode";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { TourStep } from "@/components/tour-2/tour-step";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [openDark, setOpenDark] = useState(false);

  const {
    setOpenScholarship,
    setOpenAnnouncement,
    setOpenEditScholarship,
    setOpenRenewScholarship,
    setOpenGenerate,
    setOpenStaff,
    setActivateStaff,
    reviewPending,
    setReviewPending,
  } = useTourStore();
  return (
    <header className="flex w-full z-30 items-center justify-between  backdrop-blur-sm sticky top-0 p-4 rounded-lg">
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
                align="center"
                sideOffset={8}
                className="w-xs p-2 mr-2 rounded-xl shadow-md border-border/50 bg-background"
              >
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/administrator/staff/home/pending">
                    <div
                      onClick={() => setReviewPending(true)}
                      className="relative bg-card/60 overflow-hidden px-4 py-6 flex items-center gap-4 text-sm rounded-sm  justify-between hover:underline"
                    >
                      Review Application
                      <Search className="absolute -right-1 -bottom-1 size-10 opacity-40 text-primary" />
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
        <ModeToggle />{" "}
        <DeleteDialog
          open={openLogout}
          onOpenChange={setOpenLogout}
          onConfirm={handleLogout}
          confirmText="Log out"
          confirmTextLoading="Please wait..."
          loading={loadingLogout}
          title="Logout?"
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

      <Dialog open={openDark} onOpenChange={setOpenDark}>
        <DialogContent showCloseButton={false} className="max-w-lg p-4">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

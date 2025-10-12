import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Fade as Hamburger } from "hamburger-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
];

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  CalendarIcon,
  LogOut,
  Moon,
  UserRound,
  UserRoundIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { useState } from "react";

import { format } from "date-fns";

import { useAdminStore } from "@/store/adminUserStore";
import { ModeToggle } from "@/components/ui/dark-mode";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import TitleReusable from "@/components/ui/title";
import AnnouncementDescription from "@/components/ui/description";
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
  const { admin } = useAdminStore();

  const {
    handleLogout,
    loading: loadingLogout,
    open: openLogout,
    setOpen: setOpenLogout,
  } = useAdminLogout();
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  const [loading, setLoading] = useState(false);
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

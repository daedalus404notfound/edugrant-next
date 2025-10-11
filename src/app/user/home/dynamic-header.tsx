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

import { ModeToggle } from "@/components/ui/dark-mode";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  CalendarIcon,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  Loader,
  LogOut,
  Menu,
  Moon,
  User,
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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { ModeToggle2 } from "@/components/ui/dark-mode2";
import AnnouncementDescription from "@/components/ui/description";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TitleReusable from "@/components/ui/title";
import { useIsMobile } from "@/hooks/use-mobile";
import bascLogo from "@/assets/basclogo.png";
import osas from "@/assets/osasa.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserLogout } from "@/hooks/user/postUserLogout";
import usefetchNotifications from "@/hooks/user/getNotfications";
import { useNotificationStore } from "@/store/userNotificationStore";
import { Skeleton } from "@/components/ui/skeleton";
import useMarkAllAsRead from "@/hooks/admin/postMarkAllAsRead";
import useMarkAsReadNotification from "@/hooks/admin/patchReadNotification";
import Notification from "./notification";
import ProfileCard from "./profile-card";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface HeaderTypes {
  first: string;
  second?: string;
  third?: string;
}
export default function DynamicHeaderUser({
  first,
  second,
  third,
}: HeaderTypes) {
  const { user } = useUserStore();
  const accountId = user?.accountId;
  // console.log(admin);
  const isMobile = useIsMobile();
  const { handleLogout, loading: loadingLogout } = useUserLogout();

  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const [openDark, setOpenDark] = useState(false);

  const [page, setPage] = useState(1);
  const { onSubmit, markLoading } = useMarkAllAsRead({ accountId });
  const { onSubmitPatch, patchMarkLoading } = useMarkAsReadNotification({
    accountId,
  });

  return (
    <header className="flex w-full z-30 items-center justify-between  backdrop-blur-sm rounded-lg">
      <div className="flex h-16 shrink-0 items-center gap-2 lg:px-5 px-3">
        {/* <div className="flex gap-2 items-center">
          <img src={bascLogo.src} alt="" className="size-9" />
        </div> */}
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

      {!isMobile && (
        <div className="flex items-center gap-8 lg:px-5 px-3">
          <ProfileCard />
          <div className="space-x-3">
            <Notification />
            <ModeToggle />
          </div>
          {/* <Button
            variant="outline"
            onClick={() => {
              setOpenOut(true);
            }}
          >
            <LogOut />
          </Button> */}
        </div>
      )}
      {isMobile && (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 " variant="ghost">
              <Hamburger toggled={open} toggle={setOpen} size={28} rounded />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="lg:mr-5 mr-3 w-[200px] space-y-2">
            <DropdownMenuItem>
              <UserRound />
              My Account
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                setOpenNotif(true);
                setOpen(false);
              }}
            >
              <Bell />
              Notification
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                setOpenOut(true);
                setOpen(false);
                handleLogout;
              }}
              disabled={loadingLogout}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                setOpenDark(true);
                setOpen(false);
              }}
            >
              <Moon />
              Dark mode
            </DropdownMenuItem>{" "}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={openOut} onOpenChange={setOpenOut}>
        <DialogContent showCloseButton={false} className="max-w-lg p-4">
          <DialogHeader>
            <DialogTitle>Logout?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account? You can log back
              in anytime.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              className="flex-1 lg:flex-none"
              onClick={() => setOpenOut(false)}
              variant="outline"
            >
              Stay logged in
            </Button>
            <Button className="flex-1 lg:flex-none" onClick={handleLogout}>
              {loadingLogout ? (
                <>
                  Logging out...
                  <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  <LogOut />
                  Log out
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openDark} onOpenChange={setOpenDark}>
        <DialogContent showCloseButton={false} className="max-w-lg p-4">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ModeToggle2 />
        </DialogContent>
      </Dialog>
    </header>
  );
}

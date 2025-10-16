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
import LogoutDialog from "./logout-dialog";
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

  const [openOut, setOpenOut] = useState(false);
  const [openDark, setOpenDark] = useState(false);

  const [page, setPage] = useState(1);
  const { onSubmit, markLoading } = useMarkAllAsRead({ accountId });
  const { onSubmitPatch, patchMarkLoading } = useMarkAsReadNotification({
    accountId,
  });

  return (
    <header className="w-full z-30 items-center justify-between  backdrop-blur-sm rounded-lg hidden lg:flex">
      <div className="flex h-16 shrink-0 items-center gap-2 lg:px-10 px-3">
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
      <div className="space-x-2 px-5">
        <Notification /> <ModeToggle />
        <LogoutDialog />
      </div>
    </header>
  );
}

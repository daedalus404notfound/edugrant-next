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
  const { unreadNotifications } = useNotificationStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { onSubmit, markLoading } = useMarkAllAsRead({ accountId });
  const { onSubmitPatch, patchMarkLoading } = useMarkAsReadNotification({
    accountId,
  });
  const {
    data,
    loading: loadingNotif,
    meta,
    setData,
    isFetchingMore,
  } = usefetchNotifications({
    page,
    pageSize,
    accountId: user?.accountId,
  });

  const handleLoadMore = () => {
    if (meta && page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

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
        <div className="flex items-center gap-2 lg:px-5 px-3">
          <Button variant="ghost">
            <Avatar>
              <AvatarFallback>
                <UserRoundIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
              </AvatarFallback>
            </Avatar>
            {user?.Student.fName} {user?.Student.lName}
          </Button>
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-red-700 px-1 py-0.5 rounded-full text-xs pointer-events-none aspect-square">
              {unreadNotifications}
            </span>
            <Button
              variant="outline"
              onClick={() => {
                setOpenNotif(true);
              }}
            >
              <Bell />
            </Button>
          </div>

          <ModeToggle />
          <Button
            variant="outline"
            onClick={() => {
              setOpenOut(true);
            }}
          >
            <LogOut />
          </Button>
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
      <Drawer direction="right" open={openNotif} onOpenChange={setOpenNotif}>
        <DrawerContent className="p-4 space-y-4">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <TitleReusable title="Notification" description="" />

          <div className="flex flex-col  flex-1 overflow-auto ">
            {loadingNotif ? (
              <>loading</>
            ) : (
              <Timeline className="space-y-3">
                {data.map((item, index) => (
                  <Dialog key={item.notificationId}>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        // Run API only if unread
                        if (!item.read) {
                          onSubmitPatch(item.notificationId);
                          setData((prev) =>
                            prev.map((notif) =>
                              notif.notificationId === item.notificationId
                                ? { ...notif, read: true } // update the clicked one
                                : notif
                            )
                          );
                        }
                      }}
                    >
                      <div
                        className={`p-4 rounded-lg transition-all border hover:bg-accent hover:shadow-sm cursor-pointer ${
                          item.read ? "bg-card" : "bg-accent/30 border-accent"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <TimelineTitle className="font-medium text-sm sm:text-base">
                              {item.title}
                            </TimelineTitle>
                            {!item.read && (
                              <span className="size-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <TimelineContent className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </TimelineContent>
                        </div>

                        <TimelineDate className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                          <CalendarIcon size={13} />
                          {format(item.dateCreated, "PPP p")}
                        </TimelineDate>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg p-6 rounded-xl">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>
                          {format(item.dateCreated, "PPP p")}
                        </DialogDescription>
                      </DialogHeader>
                      <p className="text-sm mt-4 leading-relaxed text-foreground">
                        {item.description}
                      </p>
                    </DialogContent>
                  </Dialog>
                ))}
              </Timeline>
            )}
            {isFetchingMore && (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden py-8 transition-all"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                      <div className="flex flex-col gap-1 lg:w-32 shrink-0">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />

                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20 rounded-full" />
                          <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {meta?.totalPage > 1 && (
              <div className="mt-12 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={
                    loadingNotif || page >= meta.totalPage || isFetchingMore
                  }
                >
                  {loadingNotif || isFetchingMore ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : page < meta.totalPage ? (
                    <>
                      Load More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  ) : (
                    "You're all caught up!"
                  )}
                </Button>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button
              onClick={onSubmit}
              disabled={markLoading || data.every((notif) => notif.read)}
            >
              Mark all as read
            </Button>
            <DrawerClose asChild className="!bg-transparent">
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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

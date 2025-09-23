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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  // console.log(admin);
  const isMobile = useIsMobile();
  const { handleLogout } = useAdminLogout();
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <header className="flex w-full z-30 items-center justify-between  backdrop-blur-sm">
      <div className="flex h-16 shrink-0 items-center gap-2 lg:px-5 px-3">
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
          <Button
            variant="outline"
            onClick={() => {
              setOpenNotif(true);
            }}
          >
            <Bell />
          </Button>

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
          <DropdownMenuContent className="lg:mr-5 mr-3 w-[200px]">
            <DropdownMenuItem>
              <UserRound />
              My Account
            </DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenNotif(true);
                setOpen(false);
              }}
            >
              <Bell />
              Notification
            </DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenOut(true);
                setOpen(false);
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
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
        <DrawerContent className="bg-transparent !border-0 p-4">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col bg-card flex-1 rounded-lg p-4 gap-y-10">
            <div className="flex justify-between items-center">
              <TitleReusable title="Notification" description="" />
              <Button size="sm">Mark all as read</Button>
            </div>
            <div className="flex-1">
              <Timeline className="space-y-5">
                {loading ? (
                  <></>
                ) : (
                  announcements.map((item) => (
                    <TimelineItem
                      key={item.id}
                      step={item.id}
                      className="!m-0  bg-card  p-4! rounded-md border !mb-2 "
                    >
                      <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                        <TimelineTitle className="font-medium text-base">
                          {item.title ?? "Win scholarship is now open."}
                        </TimelineTitle>
                      </div>
                      <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                        <CalendarIcon size={13} /> {format(item.date, "PPP p")}
                      </TimelineDate>
                      <TimelineContent className="text-foreground mt-1 whitespace-pre-line">
                        <AnnouncementDescription
                          description={item.description}
                        />
                      </TimelineContent>
                    </TimelineItem>
                  ))
                )}
              </Timeline>
              <div className=" justify-center items-center hidden">
                <Button variant="link" size="lg" className="!p-0">
                  Load More <ArrowRight />
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild className="!bg-transparent">
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
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
              Cancel
            </Button>
            <Button variant="secondary" className="flex-1 lg:flex-none">
              Logout
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

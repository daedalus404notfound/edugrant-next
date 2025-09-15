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
    <header className="flex w-full z-30 items-center justify-between  backdrop-blur-sm sticky top-0 p-4">
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
      <div className="flex items-center gap-2">
        <Button>
          <UserRound /> {admin?.ISPSU_Head.fName}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpenNotif(true);
          }}
        >
          <Bell />
        </Button>
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
            <Button variant="outline">
              <LogOut />
            </Button>
          }
        />
        <ModeToggle />
      </div>
      <Drawer direction="right" open={openNotif} onOpenChange={setOpenNotif}>
        <DrawerContent className="bg-transparent !border-0 p-4">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col bg-background flex-1 rounded-lg p-4 gap-y-10">
            <div className="flex justify-between items-center">
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
                        <p>item.description</p>
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

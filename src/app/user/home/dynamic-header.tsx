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
import { ModeToggle } from "@/components/ui/dark-mode";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  ChevronsUpDown,
  ExternalLink,
  LogOut,
  Menu,
  Moon,
  User,
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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { ModeToggle2 } from "@/components/ui/dark-mode2";
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
  const { handleLogout } = useAdminLogout();
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  return (
    <header className="flex w-full z-30 items-center justify-between bg-card dark:bg-zinc-950/90 backdrop-blur-sm  sticky top-0">
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
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="p-0" variant="ghost">
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
      <Drawer direction="right" open={openNotif} onOpenChange={setOpenNotif}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
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

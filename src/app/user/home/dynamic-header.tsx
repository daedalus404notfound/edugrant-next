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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  return (
    <header className="flex w-full items-center justify-between bg-background rounded-lg  relative">
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="p-0" variant="ghost">
            <Hamburger toggled={open} toggle={setOpen} size={28} rounded />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="center" className="space-y-1.5 p-2 w-[200px]">
          <Button variant="ghost" className="justify-start w-full">
            <UserRound /> Profile
          </Button>
          <Button variant="ghost" className="justify-start w-full">
            <Bell /> Notification
          </Button>
          <Button variant="ghost" className="justify-start w-full">
            <LogOut /> Log out
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="justify-start w-full">
                <Moon /> Dark mode
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <ModeToggle2 />
            </PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>
    </header>
  );
}

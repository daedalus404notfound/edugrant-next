import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
  Bell,
  ChevronsUpDown,
  ExternalLink,
  LogOut,
  User,
  UserRound,
} from "lucide-react";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
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
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
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
      <div className="mr-3 flex  items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="capitalize">
              <UserRound />
              {user?.firstName || "N/A"}
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-1 bg-background flex flex-col gap-2">
            <div className="p-1.5 text-sm font-semibold">My Account</div>
            <Separator />
            <h1 className="flex items-center gap-1.5 text-sm p-1.5 border border-transparent hover:border-primary rounded-sm">
              <User size={15} /> Profile
            </h1>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <h1 className="flex items-center gap-1.5 text-sm p-1.5 border border-transparent hover:border-primary rounded-sm">
                  <LogOut size={15} /> Logout
                </h1>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out from this session. You can log in
                    again anytime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={handleLogout}>Log Out</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 size-4 flex justify-center items-center text-[.7rem] rounded-full">
                2
              </span>
              <Button variant="outline">
                <Bell />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-md p-2 bg-background space-y-2">
            <div className="bg-background z-50 w-full rounded-md border p-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex grow items-center gap-12">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Your application to Win Gatchalian has been approved
                    </p>
                    <p className="text-muted-foreground text-xs">
                      November 20 at 8:00 PM.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View <ExternalLink />
                </Button>
              </div>
            </div>
            <div className="bg-background z-50 w-full rounded-md border p-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex grow items-center gap-12">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Live in 27 hours</p>
                    <p className="text-muted-foreground text-xs">
                      November 20 at 8:00 PM.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View <ExternalLink />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <ModeToggle />
      </div>
    </header>
  );
}

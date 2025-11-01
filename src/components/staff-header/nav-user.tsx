"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAdminStore } from "@/store/adminUserStore";
import { DeleteDialog } from "../ui/delete-dialog";
import { useAdminLogout } from "@/hooks/admin/postAdminLogout";
import { Button } from "../ui/button";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data, success, loading, isError } = useAuthenticatedUser();
  const {
    handleLogout,
    loading: loadingLogout,
    open: openLogout,
    setOpen: setOpenLogout,
  } = useAdminLogout();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    data?.safeData?.ISPSU_Staff?.profileImg?.publicUrl ||
                    "https://github.com/shadcn.png"
                  }
                  alt={
                    data?.safeData?.ISPSU_Staff
                      ? `${data.safeData?.ISPSU_Staff?.fName} ${data.safeData?.ISPSU_Staff?.lName}`
                      : "N/A"
                  }
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data?.safeData?.ISPSU_Staff
                    ? `${data.safeData?.ISPSU_Staff?.fName} ${data.safeData?.ISPSU_Staff?.lName}`
                    : "N/A"}
                </span>

                <span className="truncate text-xs">
                  {data?.safeData?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={``}
                    alt={
                      data?.safeData?.ISPSU_Staff
                        ? `${data.safeData?.ISPSU_Staff?.fName} ${data.safeData?.ISPSU_Staff?.lName}`
                        : "Admin"
                    }
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {data?.safeData?.ISPSU_Staff
                      ? `${data.safeData?.ISPSU_Staff?.fName} ${data.safeData?.ISPSU_Staff?.lName}`
                      : "Admin"}
                  </span>
                  <span className="truncate text-xs">
                    {data?.safeData?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

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
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <LogOut /> Logout
                </Button>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

"use client";

import * as React from "react";
import logo from "@/assets/basclogo.png";
import {
  Ban,
  CheckCheck,
  CircleUserRound,
  Crown,
  GraduationCap,
  Home,
  LayoutDashboard,
  Megaphone,
  MessagesSquare,
  UserRoundCog,
  UserRoundX,
  UsersRound,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarData = [
  {
    title: "Dashboard",
    url: "/administrator/staff/home",
    icon: LayoutDashboard,
  },
  {
    title: "Profile Settings",
    url: "/administrator/staff/home/profile",
    icon: CircleUserRound,
  },
  {
    title: "Announcements",
    url: "/administrator/staff/home/announcement",
    icon: Megaphone,
  },
];
const sidebarScholar = [
  {
    title: "Active Scholarship",
    url: "/administrator/staff/home/scholarship",
    icon: GraduationCap,
  },
];

const sidebarApplication = [
  {
    title: "Pending Application",
    url: "/administrator/staff/home/pending",
    icon: UsersRound,
  },
  {
    title: "For Interview",
    url: "/administrator/staff/home/for-interview",
    icon: MessagesSquare,
  },
];
const sidebarApplicationProcessed = [
  {
    title: "Approved Application",
    url: "/administrator/staff/home/approved",
    icon: CheckCheck,
  },
  {
    title: "Declined Application",
    url: "/administrator/staff/home/rejected",
    icon: X,
  },
  {
    title: "Blocked Application",
    url: "/administrator/staff/home/blocked",
    icon: Ban,
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pointer-events-none"
        >
          <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src={logo.src} alt="" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="flex gap-1">
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-primary/70 truncate  text-xl havelock tracking-[-3px]
          "
                initial={{ backgroundPosition: "200% 0" }}
                animate={{ backgroundPosition: "-200% 0" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear",
                }}
              >
                Edugrant
              </motion.span>
              <p className="text-xs mt-1 tracking-wider uppercase font-medium text-muted-foreground">
                STAFF
              </p>
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className="flex items-center gap-2 cursor-pointer"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Scholarships</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarScholar.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className="flex items-center gap-2 cursor-pointer"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application Processing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarApplication.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className="flex items-center gap-2 cursor-pointer"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Processed Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarApplicationProcessed.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className="flex items-center gap-2 cursor-pointer"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Manage Staff</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarStaff.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className="flex items-center gap-2 cursor-pointer"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

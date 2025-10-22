"use client";

import * as React from "react";
import logo from "@/assets/basclogo.png";
import {
  GalleryVerticalEnd,
  GraduationCap,
  Grid2X2,
  Home,
  Megaphone,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { motion } from "motion/react";
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

const userSidebarData = [
  {
    title: "Dashboard",
    url: "/user/home",
    icon: Home,
  },
  {
    title: "Profile Settings",
    url: "/user/home/profile",
    icon: UserRoundCog,
  },

  {
    title: "Announcements",
    url: "/user/home/announcements",
    icon: Megaphone,
  },
];
const scholar = [
  {
    title: "Available Scholarships",
    url: "/user/home/scholarships",
    icon: GraduationCap,
  },
  {
    title: "My Applications",
    url: "/user/home/applications",
    icon: Grid2X2,
  },
  {
    title: "Application History",
    url: "/user/home/history",
    icon: GalleryVerticalEnd,
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
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70 truncate  text-xl havelock tracking-[-3px]
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
                BASC
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
              {userSidebarData.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link
                        prefetch
                        scroll={false}
                        className={
                          isActive
                            ? "dark:!bg-emerald-700/20  !bg-emerald-800 !text-gray-200"
                            : ""
                        }
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
          <SidebarGroupLabel>Scholarship</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {scholar.map((meow) => {
                const isActive = pathname === meow.url;
                return (
                  <SidebarMenuItem key={meow.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      asChild
                      className={
                        isActive
                          ? "dark:!bg-emerald-700/20  !bg-emerald-800 !text-gray-200"
                          : ""
                      }
                    >
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

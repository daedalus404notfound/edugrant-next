"use client";

import * as React from "react";
import logo from "@/assets/basclogo.png";
import {
  Activity,
  Archive,
  BarChart,
  Bell,
  BookUser,
  Bot,
  CheckCheck,
  CircleUserRound,
  Crown,
  FileSpreadsheet,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Hourglass,
  LayoutDashboard,
  Megaphone,
  PenLine,
  UserCog,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  UserRoundPlus,
  UserRoundSearch,
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
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";

// const sidebarScholar = [
//   {
//     title: "Post Scholarship",
//     url: "/administrator/head/home/create",
//     icon: PenLine,
//   },
//   {
//     title: "Active Scholarship",
//     url: "/administrator/head/home/manage",
//     icon: GraduationCap,
//   },
//   {
//     title: "Inactive Scholarships",
//     url: "/administrator/head/home/archive",
//     icon: Archive,
//   },
// ];
// const sidebarStaff = [
//   {
//     title: "Add New Staff",
//     url: "/administrator/head/home/add",
//     icon: UserRoundPlus,
//   },
//   {
//     title: "Manage Staff",
//     url: "/administrator/head/home/manage-staff",
//     icon: UserRoundCheck,
//   },
// ];

// const sidebarAnnouncements = [
//   {
//     title: "Post announcement",
//     url: "/administrator/head/home/post-announcement",
//     icon: PenLine,
//   },
//   {
//     title: "Announcements",
//     url: "/administrator/head/home/announcement",
//     icon: Megaphone,
//   },
// ];

// const manageStudent = [
//   {
//     title: "All Student",
//     url: "/administrator/head/home/all-application",
//     icon: UsersRound,
//   },
// ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { data } = useAuthenticatedUser();
  const applicationCount = data?.availableScholarshipCount.applicationCount;
  const scholarshipCount =
    data?.availableScholarshipCount.availableScholarshipCount;
  const staffCount = data?.availableScholarshipCount.ISPSU_StaffCount;
  const announcementCount = data?.availableScholarshipCount.announcementCount;
  const sidebarApplication = [
    {
      title: "Pending Application",
      url: "/administrator/head/home/pending",
      icon: Hourglass,
    },
    {
      title: "Approved Application",
      url: "/administrator/head/home/approved",
      icon: CheckCheck,
    },
    {
      title: "Rejected Application",
      url: "/administrator/head/home/rejected",
      icon: UserRoundX,
    },
    {
      title: "Blocked Application",
      url: "/administrator/head/home/blocked",
      icon: X,
    },
  ];

  const dataa = {
    user: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "/avatars/admin.jpg",
    },
    navMain: [
      {
        title: "Scholarships",
        url: "/administrator/home/scholarships",
        icon: GraduationCap,
        isActive: false,
        count: scholarshipCount,
        items: [
          {
            title: "Post Scholarship",
            url: "/administrator/head/home/create",
            icon: PenLine,
          },
          {
            title: "Active Scholarship",
            url: "/administrator/head/home/manage",
            icon: GraduationCap,
          },
          {
            title: "Inactive Scholarships",
            url: "/administrator/head/home/archive",
            icon: Archive,
          },
        ],
      },
      {
        title: "Applications",
        url: "/administrator/home/applicants",
        icon: UsersRound,
        count: applicationCount,
        items: [
          {
            title: "Pending Application",
            url: "/administrator/head/home/pending",
            icon: Hourglass,
          },
          {
            title: "For Interview",
            url: "/administrator/head/home/interview",
            icon: CheckCheck,
          },
          {
            title: "Approved Application",
            url: "/administrator/head/home/approved",
            icon: CheckCheck,
          },
          {
            title: "Rejected Application",
            url: "/administrator/head/home/rejected",
            icon: UserRoundX,
          },
          {
            title: "Blocked Application",
            url: "/administrator/head/home/blocked",
            icon: X,
          },
        ],
      },

      {
        title: "Announcements",
        url: "/administrator/home/announcements",
        icon: Megaphone,
        count: announcementCount,
        items: [
          {
            title: "Post announcement",
            url: "/administrator/head/home/post-announcement",
            icon: PenLine,
          },
          {
            title: "Announcements",
            url: "/administrator/head/home/announcement",
            icon: Megaphone,
          },
        ],
      },

      {
        title: "Manage Staff",
        url: "/administrator/home/announcements",
        icon: UsersRound,
        count: staffCount,
        items: [
          {
            title: "Add New Staff",
            url: "/administrator/head/home/add",
            icon: UserRoundPlus,
          },
          {
            title: "Manage Staff",
            url: "/administrator/head/home/manage-staff",
            icon: UserRoundCheck,
          },
        ],
      },
    ],
  };

  const sidebarData = [
    {
      title: "Dashboard",
      url: "/administrator/head/home",
      icon: LayoutDashboard,
    },
    {
      title: "Profile Settings",
      url: "/administrator/head/home/profile",
      icon: UserRoundCog,
    },
  ];
  const usersData = [
    {
      title: "All Student",
      url: "/administrator/head/home/all-application",
      icon: UsersRound,
    },
    {
      title: "Generate Report",
      url: "/administrator/head/home/generate-report",
      icon: Activity,
    },
    {
      title: "Staff Logs",
      url: "/administrator/head/home/staff-logs",
      icon: FileSpreadsheet,
    },
  ];
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
                HEAD
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
        {/* <SidebarGroup>
          <SidebarGroupLabel>Manage Scholarship</SidebarGroupLabel>
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
          <SidebarGroupLabel>Manage Student</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manageStudent.map((meow) => {
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
          <SidebarGroupLabel>Manage Application</SidebarGroupLabel>
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
                        className="flex items-center  gap-2 cursor-pointer relative"
                        href={meow.url}
                      >
                        <meow.icon className="w-4 h-4" />
                        {meow.title}

                        {open && (
                          <Badge className="absolute right-2" variant="outline">
                            {meow.indicator}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Announcement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarAnnouncements.map((meow) => {
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
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {usersData.map((meow) => {
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

        <NavMain items={dataa.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

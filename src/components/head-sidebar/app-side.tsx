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
import usefetchHeadDashboard from "@/hooks/admin/getHeadDashboard";
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
      items: [
        {
          title: "Add New Scholarship",
          url: "/administrator/home/scholarships/create",
        },
        {
          title: "Manage Scholarships",
          url: "/administrator/home/scholarships/manage",
        },
        {
          title: "Archived Scholarships",
          url: "/administrator/home/scholarships/archived",
        },
      ],
    },
    {
      title: "Applicants",
      url: "/administrator/home/applicants",
      icon: Bot,
      items: [
        {
          title: "Pending Applications",
          url: "/administrator/home/applicants/pending",
        },
        {
          title: "For Interview",
          url: "/administrator/home/applicants/pending",
        },
        {
          title: "Approved Applications",
          url: "/administrator/home/applicants/approved",
        },
        {
          title: "Applicants for Interview",
          url: "/administrator/home/applicants/reviewed",
          sa: true,
        },
        {
          title: "Declined Applications",
          url: "/administrator/home/applicants/rejected",
        },
      ],
    },

    {
      title: "Announcements",
      url: "/administrator/home/announcements",
      icon: Megaphone,
      items: [
        {
          title: "Post Announcement",
          url: "/administrator/home/announcements/create",
        },
        {
          title: "Manage Announcements",
          url: "/administrator/home/announcements/manage",
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
  const { data, loading } = usefetchHeadDashboard();
  const sidebarApplication = [
    {
      title: "Pending Application",
      url: "/administrator/head/home/pending",
      icon: Hourglass,
      indicator: data?.pendingApplcationCount,
    },
    {
      title: "Approved Application",
      url: "/administrator/head/home/approved",
      icon: CheckCheck,
      indicator: data?.approvedApplcationCount,
    },
    {
      title: "Rejected Application",
      url: "/administrator/head/home/rejected",
      icon: UserRoundX,
      indicator: data?.approvedApplcationCount,
    },
    {
      title: "Blocked Application",
      url: "/administrator/head/home/blocked",
      icon: X,
      indicator: data?.approvedApplcationCount,
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
        items: [
          {
            title: "Pending Application",
            url: "/administrator/head/home/pending",
            icon: Hourglass,
            indicator: data?.pendingApplcationCount,
          },
          {
            title: "Approved Application",
            url: "/administrator/head/home/approved",
            icon: CheckCheck,
            indicator: data?.approvedApplcationCount,
          },
          {
            title: "Rejected Application",
            url: "/administrator/head/home/rejected",
            icon: UserRoundX,
            indicator: data?.approvedApplcationCount,
          },
          {
            title: "Blocked Application",
            url: "/administrator/head/home/blocked",
            icon: X,
            indicator: data?.approvedApplcationCount,
          },
        ],
      },

      {
        title: "Announcements",
        url: "/administrator/home/announcements",
        icon: Megaphone,
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

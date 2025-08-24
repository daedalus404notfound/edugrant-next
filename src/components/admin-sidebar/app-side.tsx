// "use client";
// import * as React from "react";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   Megaphone,
//   GraduationCap,
//   Archive,
//   SquareUserRound,
//   UsersRound,
//   Plus,
//   ShieldUser,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import Link from "next/link";

// const sidebarData = {
//   navMain: [
//     {
//       title: "Home",
//       items: [
//         {
//           title: "Dashboard",
//           url: "/administrator/home",
//           icon: Home,
//         },
//         {
//           title: "Admin Profile",
//           url: "/administrator/home/admin",
//           icon: SquareUserRound,
//         },
//         {
//           title: "Manage Admins",
//           url: "/administrator/home/manage-admins",
//           icon: ShieldUser,
//         },
//       ],
//     },
//     {
//       title: "Scholarship Management",
//       items: [
//         {
//           title: "Add Scholarships",
//           url: "/administrator/home/create",
//           icon: Plus,
//         },
//         {
//           title: "Manage Scholarships",
//           url: "/administrator/home/manage",
//           icon: GraduationCap,
//         },
//         {
//           title: "Archived Scholarship",
//           url: "/administrator/home/archived",
//           icon: Archive,
//         },
//       ],
//     },
//     {
//       title: "Review Applications",
//       items: [
//         {
//           title: "Manage Applicants",
//           url: "/administrator/home/applicants",
//           icon: UsersRound,
//         },
//       ],
//     },
//     {
//       title: "Updates",
//       items: [
//         {
//           title: "Annoucements",
//           url: "/administrator/home/announcement",
//           icon: Megaphone,
//         },
//       ],
//     },
//     // {
//     //   title: "User & Access Control",
//     //   items: [
//     //     {
//     //       title: "Manage Students",
//     //       url: "/administrator/home/users/students",
//     //       icon: Users,
//     //     },
//     //     {
//     //       title: "Admin Settings",
//     //       url: "/administrator/home/users/admin-settings",
//     //       icon: Settings,
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "Support",
//     //   items: [
//     //     {
//     //       title: "Help Center",
//     //       url: "/administrator/home/support/help-center",
//     //       icon: HelpCircle,
//     //     },
//     //     {
//     //       title: "Contact Support",
//     //       url: "/administrator/home/support/contact",
//     //       icon: Mail,
//     //     },
//     //   ],
//     // },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const pathname = usePathname();
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
//                 <img src={logo.src} alt="" />
//               </div>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="flex gap-1">
//                   <p className="truncate  text-xl zxczxc tracking-[-3px]">
//                     Edugrant
//                   </p>
//                   <p className="text-xs mt-1 tracking-wide uppercase font-medium">Admin</p>
//                 </span>
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         {sidebarData.navMain.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => {
//                   // Check if the current pathname matches the item url
//                   // You can tweak this logic if you want partial matching or dynamic routes
//                   const isActive = pathname === item.url;

//                   return (
//                     <SidebarMenuItem key={item.title}>
//                       <SidebarMenuButton asChild isActive={isActive}>
//                         <Link
//                           href={item.url}
//                           prefetch={true}
//                           className="flex items-center gap-2 cursor-pointer"
//                         >
//                           {item.icon && <item.icon className="w-4 h-4" />}
//                           {item.title}
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   );
//                 })}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
"use client";

import * as React from "react";
import logo from "@/assets/basclogo.png";
import {
  BarChart,
  Bell,
  Bot,
  GraduationCap,
  Home,
  Megaphone,
  Settings2,
  UserCog,
  UserRound,
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
const data = {
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
          title: "Pending Applicants",
          url: "/administrator/home/applicants/pending",
        },
        {
          title: "Approved Applicants",
          url: "/administrator/home/applicants/approved",
        },
        {
          title: "Declined Applicants",
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
          title: "Add New Announcement",
          url: "/administrator/home/announcements/create",
        },
        {
          title: "Manage Announcements",
          url: "/administrator/home/announcements/manage",
        },
      ],
    },
    {
      title: "Admin Management",
      url: "/administrator/home/admins",
      icon: UserCog,
      items: [
        { title: "Add New Admin", url: "/administrator/home/admins/create" },
        { title: "View Admins", url: "/administrator/home/admins/manage" },
      ],
    },
    {
      title: "Reports",
      url: "/administrator/home/reports",
      icon: BarChart,
      items: [
        { title: "Overview", url: "/administrator/home/reports/overview" },
        { title: "Statistics", url: "/administrator/home/reports/statistics" },
      ],
    },

  ],
};
const sidebarData = [
  {
    title: "Dashboard",
    url: "/administrator/home",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/administrator/home/admin",
    icon: UserRound,
  },
  {
    title: "Notification",
    url: "/administrator/home/notification",
    icon: Bell,
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
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70 truncate  text-xl zxczxc tracking-[-3px]
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
                Admin
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
                    <SidebarMenuButton
                      isActive={isActive}
                      asChild
                      className={
                        isActive
                          ? "!bg-emerald-700/20 !text-emerald-400 "
                          : "hover:bg-emerald-700/20"
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

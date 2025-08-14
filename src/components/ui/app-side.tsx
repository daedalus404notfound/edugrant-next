"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Megaphone,
  GraduationCap,
  Archive,
  SquareUserRound,
  UsersRound,
  Plus,
  ShieldUser,
} from "lucide-react";
import logo from "@/assets/basclogo.png";
import {
  Sidebar,
  SidebarContent,
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

const sidebarData = {
  navMain: [
    {
      title: "Home",
      items: [
        {
          title: "Dashboard",
          url: "/administrator/home",
          icon: Home,
        },
        {
          title: "Admin Profile",
          url: "/administrator/home/admin",
          icon: SquareUserRound,
        },
        {
          title: "Manage Admins",
          url: "/administrator/home/manage-admins",
          icon: ShieldUser,
        },
      ],
    },
    {
      title: "Scholarship Management",
      items: [
        {
          title: "Add Scholarships",
          url: "/administrator/home/create",
          icon: Plus,
        },
        {
          title: "Manage Scholarships",
          url: "/administrator/home/manage",
          icon: GraduationCap,
        },
        {
          title: "Archived Scholarship",
          url: "/administrator/home/archived",
          icon: Archive,
        },
      ],
    },
    {
      title: "Review Applications",
      items: [
        {
          title: "Manage Applicants",
          url: "/administrator/home/applicants",
          icon: UsersRound,
        },
      ],
    },
    {
      title: "Updates",
      items: [
        {
          title: "Annoucements",
          url: "/administrator/home/announcement",
          icon: Megaphone,
        },
      ],
    },
    // {
    //   title: "User & Access Control",
    //   items: [
    //     {
    //       title: "Manage Students",
    //       url: "/administrator/home/users/students",
    //       icon: Users,
    //     },
    //     {
    //       title: "Admin Settings",
    //       url: "/administrator/home/users/admin-settings",
    //       icon: Settings,
    //     },
    //   ],
    // },
    // {
    //   title: "Support",
    //   items: [
    //     {
    //       title: "Help Center",
    //       url: "/administrator/home/support/help-center",
    //       icon: HelpCircle,
    //     },
    //     {
    //       title: "Contact Support",
    //       url: "/administrator/home/support/contact",
    //       icon: Mail,
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className=" text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
                <img src={logo.src} alt="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="flex gap-1">
                  <p className="truncate  text-xl zxczxc tracking-[-3px]">
                    Edugrant
                  </p>
                  <p className="text-xs mt-0.5">Admin</p>
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // Check if the current pathname matches the item url
                  // You can tweak this logic if you want partial matching or dynamic routes
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link
                          href={item.url}
                          prefetch={true}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

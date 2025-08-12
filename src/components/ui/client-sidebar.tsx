"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  ClipboardList,
  FileSearch,

  User,
  Megaphone,
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
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/user/home",
          icon: Home,
        },
        {
          title: "Scholarships",
          url: "/user/home/scholarships",
          icon: FileSearch,
        },
        {
          title: "My Applications",
          url: "/user/home/application",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Updates",
      items: [
        {
          title: "Announcements",
          url: "/user/home/announcement",
          icon: Megaphone,
        },
      ],
    },

    {
      title: "Profile & Settings",
      items: [
        {
          title: "My Profile",
          url: "/user/home/profile",
          icon: User,
        },
      ],
    },
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
              <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src={logo.src} alt="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="flex gap-1">
                  <p className="truncate font-medium text-xl  zxc">
                    BASC Edugrant
                  </p>
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

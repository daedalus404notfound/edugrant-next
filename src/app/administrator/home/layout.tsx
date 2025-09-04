"use client";
import { AppSidebar } from "@/components/admin-sidebar/app-side";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuthenticatedUser from "@/hooks/admin/getTokenAuthentication";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DynamicHeaderAdmin from "./admin-header";
import { usePathname } from "next/navigation";

export default function Home({ children, modal }: DashboardLayoutProps) {
 useAuthenticatedUser();
  const path = usePathname();
  const segmentedPath = path.split("/");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 70)",
          "--header-height": "calc(var(--spacing) * 10)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="relative">
          <DynamicHeaderAdmin
            first={segmentedPath[2]}
            second={segmentedPath[3]}
            third={segmentedPath[4]}
          />
          {/* <div className="fixed your-class h-screen w-full pointer-events-none "></div> */}
          {children}
          {modal}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

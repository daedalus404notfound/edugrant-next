"use client";
import { AppSidebar } from "@/components/staff-header/app-side";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import DynamicHeaderAdmin from "./staff-header2";
import useSocketConnection from "@/hooks/head/useSocketConnection";

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  const { connected } = useSocketConnection();
  console.log("Staff connected?", connected);
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
          {children}
          {modal}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

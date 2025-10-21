"use client";
import { AppSidebar } from "@/components/head-sidebar/app-side";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import DynamicHeaderAdmin from "../../admin-header";
import { TourProvider } from "@/components/tour-2/tour-provider";
import { tourConfigs } from "@/lib/tour-config";
import useSocketConnection from "@/hooks/head/useSocketConnection";
export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  useSocketConnection();
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
      <TourProvider tours={tourConfigs}>
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
        <Toaster />{" "}
      </TourProvider>
    </SidebarProvider>
  );
}

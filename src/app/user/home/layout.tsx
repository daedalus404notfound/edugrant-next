"use client";
import { AppSidebar } from "@/components/user-sidebar/app-side";
import { ReactNode } from "react";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import DynamicHeaderUser from "./dynamic-header";
import { usePathname } from "next/navigation";
import MobDock from "./dock";

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
        {/* <div className="fixed your-class h-screen w-full pointer-events-none"></div> */}
        <div className="relative">
          <DynamicHeaderUser
            first={segmentedPath[2]}
            second={segmentedPath[3]}
            third={segmentedPath[4]}
          />
          {children} {modal}
          <MobDock />
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

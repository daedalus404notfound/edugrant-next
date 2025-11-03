"use client";
import { AppSidebar } from "@/components/user-sidebar/app-side";
import { ReactNode, useEffect, useState } from "react";
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
import MobHeader from "./mobile-header";
import useSocketConnection from "@/hooks/user/useSocketConnection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApplicationStore } from "@/store/applicationUsetStore";
import SocketListener from "./socketListeners";
import { TourProvider } from "@/components/tour-2/tour-provider";
import { tourConfigs } from "@/lib/tour-config";
export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  const { connected } = useSocketConnection();
  console.log("user connnected?", connected);
  // Persistent QueryClient across renders
  const [queryClient] = useState(() => new QueryClient());
  const path = usePathname();
  const segmentedPath = path.split("/");

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 70)",
            "--header-height": "calc(var(--spacing) * 10)",
          } as React.CSSProperties
        }
      >
        {" "}
        <TourProvider tours={tourConfigs}>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="relative">
              <DynamicHeaderUser
                first={segmentedPath[2]}
                second={segmentedPath[3]}
                third={segmentedPath[4]}
              />
              <MobHeader />
              {children} {modal}
              <SocketListener />
              <MobDock />
            </div>
          </SidebarInset>
          <Toaster />
        </TourProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

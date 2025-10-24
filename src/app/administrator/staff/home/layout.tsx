"use client";
import { AppSidebar } from "@/components/staff-header/app-side";
import { ReactNode, useState } from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SocketListener from "./socketListeners";

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  useSocketConnection();
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
            <SocketListener />
          </div>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

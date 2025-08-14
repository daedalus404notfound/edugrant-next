"use client"
import { AppSidebar } from "@/components/ui/app-side";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuthenticatedUser from "@/hooks/admin/getTokenAuthentication";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="relative">
          {/* <div className="fixed your-class h-screen w-full pointer-events-none"></div> */}
          {children}
          {modal}
        </div>
      </SidebarInset>
      <Toaster
     
      />
    </SidebarProvider>
  );
}

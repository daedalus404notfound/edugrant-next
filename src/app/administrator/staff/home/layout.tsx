"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";
import StaffHeader from "./staff-header/page";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();

  return (
    <div>
      <div
        className="fixed inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        }}
      />

      <div
        className="absolute inset-0 z-0 dark:hidden h-60 opacity-50 "
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
      <StaffHeader />
      <div className="relative z-20 p-10 w-3/4 mx-auto"> {children}</div>
      {modal}
      <Toaster />
    </div>
  );
}

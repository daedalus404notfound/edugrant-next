"use client";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-mobile";

const DesktopLandingPage = dynamic(() => import("./desktop-landing"), {
  ssr: false,
});
const MobileLandingPage = dynamic(() => import("./mobile-landing"), {
  ssr: false,
});

export default function HeroPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;

  return isMobile ? <MobileLandingPage /> : <DesktopLandingPage />;
}

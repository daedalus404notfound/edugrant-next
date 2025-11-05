import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "./queryProvider";
import { Toaster } from "sonner";
import { TourProvider } from "@/components/tour-2/tour-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BASC | Edugrant",
  description: "Online scholarship portal for BASC students.",
};
import { tourConfigs } from "@/lib/tour-config";
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <TourProvider tours={tourConfigs}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              themes={["light", "dark"]}
            >
              {children}
              {modal}
              <Toaster />
            </ThemeProvider>
          </TourProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

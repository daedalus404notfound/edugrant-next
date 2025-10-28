"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  GalleryVertical,
  GalleryVerticalEnd,
  GraduationCap,
  History,
  Home,
  Megaphone,
  MoreHorizontal,
  SignpostBig,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // optional utility
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobDock() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/user/home", label: "Home", icon: Home, exact: true },
    { href: "/user/home/scholarships", label: "Browse", icon: GraduationCap },
    {
      href: "/user/home/applications",
      label: "Track",
      icon: GalleryVerticalEnd,
    },
    // { href: "/user/home/announcements", label: "Announce", icon: Megaphone },
    { href: "/user/home/profile", label: "Profile", icon: UserRound },
  ];

  return (
    <div className="sticky bottom-0 w-full left-0 z-30 bg-card dark:bg-zinc-950/90 backdrop-blur-sm flex justify-center p-2 gap-2 border-t lg:hidden items-center rounded-t-sm">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex justify-center gap-1 flex-col items-center px-2 py-0.5 w-15 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon size={23} />
            <p className="text-xs">{label}</p>
            {!isActive && (
              <span className="h-[2px] w-6 bg-primary rounded-full opacity-0"></span>
            )}
            {isActive && (
              <span className="h-[2px] w-8 bg-primary rounded-full"></span>
            )}
          </Link>
        );
      })}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex justify-center gap-1 flex-col items-center px-2 py-0.5 w-15 transition-colors">
            <MoreHorizontal size={23} />
            <p className="text-xs">More</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mr-2">
          <DropdownMenuItem>
            {" "}
            <Link href="/user/home/announcements">
              <DropdownMenuItem>
                <Megaphone />
                Announcements
              </DropdownMenuItem>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/user/home/history">
            <DropdownMenuItem>
              <GalleryVerticalEnd />
              Application History
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <SignpostBig />
            Help
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Check out available tutorials
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button>How to apply</Button>
          <Button>How to edit profile</Button>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

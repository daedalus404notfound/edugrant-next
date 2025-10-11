"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/useUserStore";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  Mail,
  Shield,
  IdCard,
} from "lucide-react";

export default function ProfileCard() {
  const { user, loading } = useUserStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-full gap-2 font-medium flex items-center cursor-pointer">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {user?.Student.fName.slice(0, 1)}
            {user?.Student.lName.slice(0, 1)}
          </div>
          <span className="hidden sm:inline">
            {user?.Student.fName} {user?.Student.lName}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 mr-8 overflow-hidden"
        align="end"
        sideOffset={8}
      >
        {/* Header with gradient background */}
        <div className="relative h-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />

          {/* Profile Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {user?.Student.fName.slice(0, 1)}
                  {user?.Student.lName.slice(0, 1)}
                </span>
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-14 px-6 pb-4">
          {/* Name */}
          <div className="mb-1">
            <h3 className="text-lg font-semibold text-foreground">
              {user?.Student.lName}, {user?.Student.fName}{" "}
              {user?.Student.mName?.slice(0, 1)}.
            </h3>
          </div>

          {/* Student ID with icon */}
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <IdCard className="w-3.5 h-3.5" />
            <span className="text-sm font-mono">
              {user?.Student.Account.schoolId}
            </span>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-muted/50 rounded-lg p-3 border">
              <div className="text-xs text-muted-foreground mb-1">
                Application
              </div>
              <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                0
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 border">
              <div className="text-xs text-muted-foreground mb-1">Approved</div>
              <div className="text-sm font-semibold text-foreground">0</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="p-3 space-y-1">
          {/* <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10"
            size="sm"
          >
            <User className="w-4 h-4" />
            View Profile
          </Button> */}

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10"
            size="sm"
          >
            <Settings className="w-4 h-4" />
            Profile Settings
          </Button>

          <Separator className="my-2" />

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
            size="sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

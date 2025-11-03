"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";
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
  const { data } = useAuthenticatedUser();
  const user = data?.userData;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-full gap-2  flex items-center cursor-pointer">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {user?.Student.fName.slice(0, 1)}
            {user?.Student.lName.slice(0, 1)}
          </div>
          <span className="hidden sm:inline font-medium text-sm">
            {user?.Student.fName} {user?.Student.lName}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50" strokeWidth={3} />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 mr-8 overflow-hidden"
        align="end"
        sideOffset={8}
      >
        {/* Header with gradient background */}

        {/* Profile Info */}
        <div className=" p-4">
          {/* Name */}
          <div className="mb-1">
            <h3 className="text-lg font-semibold text-foreground">
              {user?.Student.lName}, {user?.Student.fName}{" "}
              {user?.Student.mName?.slice(0, 1)}.
            </h3>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <IdCard className="w-3.5 h-3.5" />
            <span className="text-sm font-mono">
              {user?.Student.Account.schoolId}
            </span>
          </div>
        </div>

        <div className="flex p-4 space-x-2">
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
            Profile
          </Button>

          <Button size="sm" variant="destructive">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import logo from "@/assets/edugrant-logo.png";
import basc from "@/assets/basclogo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Hamburger from "hamburger-react";
import { Bell, LogOut, Moon, UserRound } from "lucide-react";
import { useState } from "react";
import { useUserLogout } from "@/hooks/user/postUserLogout";
import LogoutDialog from "./logout-dialog";
import NotificationDialog from "./notification";
import { ModeToggle } from "@/components/ui/dark-mode";

export default function MobHeader() {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  const { handleLogout, loading: loadingLogout } = useUserLogout();
  return (
    <div className=" lg:hidden flex justify-between items-center  border  px-2 py-3 rounded-b-md sticky top-0 z-20 bg-background">
      <div className="flex items-center gap-1">
        <img className="size-10" src={basc.src} alt="" />{" "}
        <img className="size-10" src={logo.src} alt="" />{" "}
      </div>

      <div className=" space-x-2">
        <NotificationDialog />
        <ModeToggle /> <LogoutDialog />
      </div>

      {/* */}
    </div>
  );
}

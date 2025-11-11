import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserLogout } from "@/hooks/user/postUserLogout";
import { Loader, LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutDialog() {
  const [openLogout, setOpenLogout] = useState(false);
  const { handleLogout, loading: loadingLogout } = useUserLogout();
  return (
    <Dialog open={openLogout} onOpenChange={setOpenLogout}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full relative"
          size="icon"
          variant="secondary"
        >
          <LogOut />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>Logout?</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account? You can log back
            in anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            className="flex-1 lg:flex-none"
            onClick={() => setOpenLogout(false)}
            variant="outline"
          >
            Stay logged in
          </Button>
          <Button
            className="flex-1 lg:flex-none"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <>
                Logging out...
                <Loader className="animate-spin" />
              </>
            ) : (
              <>
                <LogOut />
                Log out
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

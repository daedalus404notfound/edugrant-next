import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Activity, LogOut, PenLine, UserRoundPlus } from "lucide-react";

import { useAdminLogout } from "@/hooks/admin/postAdminLogout";

import { ModeToggle } from "@/components/ui/dark-mode";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TourStep } from "@/components/tour-2/tour-step";
import TitleReusable from "@/components/ui/title";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { useState } from "react";
import { useRouter } from "next/navigation";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface HeaderTypes {
  first: string;
  second?: string;
  third?: string;
}
export default function DynamicHeaderAdmin({
  first,
  second,
  third,
}: HeaderTypes) {
  const {
    handleLogout,
    loading: loadingLogout,
    open: openLogout,
    setOpen: setOpenLogout,
  } = useAdminLogout();
  const [openGuide, setOpenGuide] = useState(false);
  const router = useRouter();
  return (
    <header className="flex w-full z-30 items-center justify-between  p-4 rounded-lg">
      <div className="flex  shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1 lg:flex hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 lg:flex hidden"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>{capitalizeFirstLetter(first)}</BreadcrumbItem>
            {second && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(second)}</BreadcrumbItem>
              </>
            )}
            {third && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(third)}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <TourStep stepId="guide">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Guide (Soon)</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Guides available</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenGuide(true)}>
                <PenLine /> Post Scholarship
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PenLine /> Post Announcement
              </DropdownMenuItem>{" "}
              <DropdownMenuItem>
                <UserRoundPlus /> Add Staff
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity />
                Generate Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </TourStep>
        <ModeToggle />
        <DeleteDialog
          open={openLogout}
          onOpenChange={setOpenLogout}
          onConfirm={handleLogout}
          confirmText="Log out"
          confirmTextLoading="Please wait..."
          loading={loadingLogout}
          title="Logout?"
          red={false}
          description="Are you sure you want to log out of your account?"
          cancelText="Stay Logged In"
          trigger={
            <Button
              onClick={() => setOpenLogout(true)}
              variant="secondary"
              className="rounded-full"
            >
              <LogOut />
            </Button>
          }
        />
      </div>

      <Dialog open={openGuide} onOpenChange={setOpenGuide}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable
                title="Welcome to POST SCHOLARSHIP"
                description=""
              />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenGuide(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenGuide(false);
                router.push("/administrator/head/home/create");
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="postScholarship"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}

"use client";

import type React from "react";

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
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clock, GraduationCap, Megaphone, X } from "lucide-react";
import { format } from "date-fns";
import useGetAnnouncementById from "@/hooks/admin/getAnnouncementById";
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnouncement";
import { useAdminStore } from "@/store/adminUserStore";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import logo from "@/assets/basclogo.png";
export default function GetAnnouncementById() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [open, setOpen] = useState(true);
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = useGetAnnouncementById(id, accountId);
  const [edit, setEdit] = useState(false);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DialogContent className="max-w-5xl overflow-hidden  gap-0 p-1 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Announcement Details</DialogTitle>
          <DialogDescription>View and manage announcement</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between pb-2 sticky top">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
              variant="ghost"
              size="sm"
            >
              <Megaphone />
              Announcement {edit ? "Edit" : "Details"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="ghost"
              variant="ghost"
              size="sm"
              onClick={() => HandleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>

        <div className="bg-background rounded-t-md max-h-[90vh]  overflow-auto">
          <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg overflow-hidden ">
            {/* Header Section */}
            <div className="relative flex lg:flex-row flex-col lg:items-end items-center  py-8 px-4">
              <img
                className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-15 "
                src={logo.src}
                alt=""
              />
              <div className="flex-1 px-4 py-2 z-10 space-y-3">
                <h1 className="text-base lg:text-xl font-medium text-foreground capitalize line-clamp-1">
                  {data?.title}
                </h1>

                {/* <p className="font-medium font-mono text-base tracking-wide">
                        {data?.Scholarship_Provider.name}
                      </p>{" "} */}
                <div>
                  {data?.tags?.data && data.tags.data.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.tags.data.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 px-4 bg-card relative z-10">
              <div className="space-y-1.5 border-l-2 pl-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <h1 className="text-xs text-muted-foreground">
                    Published Date
                  </h1>
                </div>

                <p className="font-medium text-foreground">
                  {data?.dateCreated && format(data.dateCreated, "PPP")}
                </p>
              </div>{" "}
              <div className="space-y-1.5  border-l-2 pl-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <h1 className="text-xs text-muted-foreground">
                    Published Time
                  </h1>
                </div>

                <span className="font-medium text-foreground">
                  {data?.dateCreated && format(data.dateCreated, "p")}
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4 rounded-lg" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-48 rounded-lg" />
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32 rounded-lg" />
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-28 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>

                <div className="space-y-3 pt-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                </div>
              </div>

              <div className="flex gap-3">
                <Skeleton className="h-9 flex-1" />{" "}
                <Skeleton className="h-9 flex-1" />
              </div>
            </div>
          ) : (
            <TipTapViewer content={data?.description || ""} className="p-6" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

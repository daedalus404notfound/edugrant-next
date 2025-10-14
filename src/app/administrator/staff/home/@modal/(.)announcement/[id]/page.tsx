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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import {
  Calendar,
  Clock,
  Trash2,
  Pencil,
  Loader2,
  Megaphone,
  X,
  Save,
  Plus,
  Sparkles,
  FileText,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import useGetAnnouncementById from "@/hooks/admin/getAnnouncementById";
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnouncement";
import { useUpdateAnnouncement } from "@/hooks/admin/postEditAnnouncement";
import { useAdminStore } from "@/store/adminUserStore";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import { TipTapEditor } from "@/components/ui/tip-tap";

export default function GetAnnouncementById() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [open, setOpen] = useState(true);
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = useGetAnnouncementById(id, accountId);
  const [inputValue, setInputValue] = useState("");

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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden p-0 gap-0 border-border/40">
        <DialogHeader className="sr-only">
          <DialogTitle>Announcement Details</DialogTitle>
          <DialogDescription>View and manage announcement</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between pb-2 sticky top bg-background/50">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
              variant="ghost"
              size="sm"
            >
              <Megaphone />
              Announcement Details
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

        <div className="flex-1 overflow-y-auto">
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
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h1 className="text-xl font-bold tracking-tight leading-tight text-balance">
                  {data?.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {data?.dateCreated && format(data.dateCreated, "PPP")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {data?.dateCreated && format(data.dateCreated, "p")}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {data?.tags?.data && data.tags.data.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tags.data.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className=" bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {data?.description && (
                <TipTapViewer content={data?.description} className="p-4" />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

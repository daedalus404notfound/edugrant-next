"use client";
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
  ArrowRight,
  CalendarIcon,
  Loader,
  PenLine,
  Plus,
  RefreshCcw,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Tabs } from "@/components/ui/vercel-tabs";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";

import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import AnnouncementDescription from "@/components/ui/description";
import { useCreateAnnouncement } from "@/hooks/admin/postCreateAnnouncement";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import NoDataFound from "@/components/ui/nodata";

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
import useGetAnnouncementById from "@/hooks/admin/getAnnouncementById";
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnouncement";
import { useAdminStore } from "@/store/adminUserStore";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Trash2,
  Pencil,
  Loader2,
  Megaphone,
  X,
  Save,
} from "lucide-react";
import ModalHeader from "@/components/ui/modal-header";
import { useUpdateAnnouncement } from "@/hooks/admin/postEditAnnouncement";

export default function GetAnnouncementById() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [open, setOpen] = useState(true);
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = useGetAnnouncementById(id, accountId);
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };
  const { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete } =
    useDeleteAnnouncement({ accountId, id });

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const {
    open: openMeow,
    setOpen: setOpenMeow,
    loading: updateLoading,
    handleSubmit,
    handleTriggerClick,
    form,
    formWatch,
  } = useUpdateAnnouncement(data);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DialogContent className=" max-w-4xl max-h-[90vh] flex flex-col overflow-auto ">
        <DialogHeader className="sr-only">
          <DialogTitle className="text-2xl font-semibold leading-tight pr-8">
            1
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            11
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <div className="flex items-center justify-between pb-2">
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

          {loading ? (
            // Loading State
            <div className="bg-background rounded-t-md ">
              <div className="p-4 pb-4 space-y-4">
                <div className="space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 space-y-4 flex-1">
                {/* Tags Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Content Skeleton */}
                <div className="space-y-3 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              <Separator />

              <div className="p-6 pt-4 flex justify-end gap-2 bg-card">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ) : edit ? (
            <div className="bg-background rounded-t-md ">
              <div className="p-4 pb-4 space-y-4">
                <Form {...form}>
                  <div className="space-y-5 mt-10">
                    <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel className="flex justify-between items-center">
                              Title <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tags.data"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel className="flex justify-between items-center">
                              Tags
                              <span className="flex items-center gap-2">
                                {(!field.value || field.value.length === 0) && (
                                  <p className="text-sm text-muted-foreground">
                                    No tags added yet. Type below and press
                                    Enter or click “Add”.
                                  </p>
                                )}
                                {(field.value || []).map(
                                  (tag: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        const newTags = (
                                          field.value || []
                                        ).filter(
                                          (_: string, i: number) => i !== index
                                        );
                                        field.onChange(newTags);
                                      }}
                                    >
                                      {tag} ×
                                    </Badge>
                                  )
                                )}
                                <FormMessage />
                              </span>
                            </FormLabel>

                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  id="tag-input"
                                  type="text"
                                  value={inputValue}
                                  onChange={handleInputChange}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      inputValue.trim()
                                    ) {
                                      e.preventDefault();
                                      const newTags = [
                                        ...(field.value || []),
                                        inputValue.trim(),
                                      ];
                                      field.onChange(newTags);
                                      setInputValue("");
                                    }
                                  }}
                                  className="flex-1"
                                  placeholder="Enter a tag"
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => {
                                    if (inputValue.trim()) {
                                      const newTags = [
                                        ...(field.value || []),
                                        inputValue.trim(),
                                      ];
                                      field.onChange(newTags);
                                      setInputValue("");
                                    }
                                  }}
                                >
                                  <Plus /> Add
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel className="flex justify-between items-center">
                              Body <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Textarea {...field} className="min-h-50" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Form>
                <div className="p-4 pt-4 flex justify-end gap-2 items-center bg-card sticky bottom-0">
                  <Button
                    variant="outline"
                    disabled={updateLoading}
                    onClick={() => setEdit(false)}
                  >
                    <Pencil />
                    Back
                  </Button>

                  <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                    <AlertDialogTrigger asChild>
                      <Button disabled={updateLoading}>
                        <Save />
                        Save
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will update the announcement
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={updateLoading}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={form.handleSubmit(handleSubmit)}
                          disabled={updateLoading}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {updateLoading ? (
                            <>
                              <Loader2 className=" mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Update Announcement"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-t-md ">
              <div className="p-4 pb-4 space-y-4">
                <div className="space-y-3">
                  <div className="text-xl font-semibold leading-tight pr-8">
                    {data?.title}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Posted on{" "}
                      {data?.dateCreated && format(data.dateCreated, "PPP")}
                    </span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>
                      {data?.dateCreated && format(data.dateCreated, "p")}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 space-y-4 ">
                {/* Tags */}
                {data?.tags?.data && data.tags.data.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.data.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="whitespace-pre-line text-base leading-relaxed text-foreground/90 pt-2">
                  {data?.description}
                </div>
              </div>

              <Separator />

              <div className="p-4 pt-4 flex justify-end gap-2 items-center bg-card sticky bottom-0">
                <Button
                  variant="outline"
                  disabled={deleteLoading}
                  onClick={() => setEdit(true)}
                >
                  <Pencil />
                  Edit
                </Button>

                <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={deleteLoading}>
                      <Trash2 />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this announcement and remove it from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={deleteLoading}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmit();
                        }}
                        disabled={deleteLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleteLoading ? (
                          <>
                            <Loader2 className=" mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete Announcement"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

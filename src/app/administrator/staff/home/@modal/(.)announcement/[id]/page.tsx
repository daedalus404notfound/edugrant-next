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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden p-0 gap-0 border-border/40">
        <DialogHeader className="sr-only">
          <DialogTitle>Announcement Details</DialogTitle>
          <DialogDescription>View and manage announcement</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between pb-2 sticky top bg-background">
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
          ) : edit ? (
            <div className="p-6">
              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          Title
                          <FormMessage className="ml-auto" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 text-base border-border/40 focus-visible:ring-primary/20"
                            placeholder="Enter announcement title"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags.data"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-medium">
                          <Tag className="w-4 h-4 text-muted-foreground" />
                          Tags
                          <FormMessage className="ml-auto" />
                        </FormLabel>

                        {field.value && field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted/30 border border-border/40">
                            {field.value.map((tag: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="px-3 py-1.5 text-xs font-medium bg-background hover:bg-muted border border-border/40 cursor-pointer transition-all hover:scale-105"
                                onClick={() => {
                                  const newTags = (field.value || []).filter(
                                    (_: string, i: number) => i !== index
                                  );
                                  field.onChange(newTags);
                                }}
                              >
                                {tag}
                                <X className="w-3 h-3 ml-1.5" />
                              </Badge>
                            ))}
                          </div>
                        )}

                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              id="tag-input"
                              type="text"
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && inputValue.trim()) {
                                  e.preventDefault();
                                  const newTags = [
                                    ...(field.value || []),
                                    inputValue.trim(),
                                  ];
                                  field.onChange(newTags);
                                  setInputValue("");
                                }
                              }}
                              className="flex-1 h-11 border-border/40 focus-visible:ring-primary/20"
                              placeholder="Type a tag and press Enter"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              className="h-11 px-4 border border-border/40"
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
                              <Plus className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </div>
                        </FormControl>

                        {(!field.value || field.value.length === 0) && (
                          <p className="text-xs text-muted-foreground mt-2">
                            No tags added yet. Type above and press Enter or
                            click Add.
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-medium">
                          <Sparkles className="w-4 h-4 text-muted-foreground" />
                          Description
                          <FormMessage className="ml-auto" />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px] text-base border-border/40 focus-visible:ring-primary/20 resize-none"
                            placeholder="Write your announcement description..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
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

              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
                  {data?.description}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-xl border-t border-border/40">
          <div className="flex justify-end gap-3 px-6 py-4">
            {edit ? (
              <>
                <Button
                  variant="outline"
                  disabled={updateLoading}
                  onClick={() => setEdit(false)}
                  className="h-10 px-4 border-border/40"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={updateLoading}
                      className="h-10 px-4 bg-primary hover:bg-primary/90"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-border/40">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Update</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to update this announcement? This
                        will save all your changes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        disabled={updateLoading}
                        className="border-border/40"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={updateLoading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {updateLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Update Announcement
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  disabled={deleteLoading}
                  onClick={() => setEdit(true)}
                  className="h-10 px-4 border-border/40"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>

                <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={deleteLoading}
                      className="h-10 px-4"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-border/40">
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
                      <AlertDialogCancel
                        disabled={deleteLoading}
                        className="border-border/40"
                      >
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
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Announcement
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

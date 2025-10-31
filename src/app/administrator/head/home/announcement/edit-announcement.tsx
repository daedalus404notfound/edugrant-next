"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { X, Plus, Save, Loader2 } from "lucide-react";

import { useUpdateAnnouncement } from "@/hooks/admin/postEditAnnouncement";

import { TipTapEditor } from "@/components/ui/tip-tap";
import { AnnouncementFormDataPost } from "@/hooks/zod/announcement";
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

export default function EditAnnouncementt({
  data,
  setEdit,
}: {
  data: AnnouncementFormDataPost | null;
  setEdit: (edit: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const {
    open,
    setOpen,
    loading,
    handleSubmit,
    handleTriggerClick,
    form,
    formWatch,
  } = useUpdateAnnouncement(data);
  return (
    <div className="bg-background">
      <div className="p-6 space-y-8">
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col  items-end">
                <FormMessage />
                <div className="w-full flex items-center">
                  <FormLabel className="w-70">Announcement Title</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter announcement title..."
                      className=" border-0"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags.data"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end ">
                <FormMessage />
                <div className="flex w-full">
                  <FormLabel className="w-70">Announcement Tag</FormLabel>

                  <FormControl>
                    <div className="flex gap-2 w-full">
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
                        placeholder="Type a tag and press Enter..."
                        className=" border-0"
                      />
                      <Button
                        type="button"
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
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </FormControl>
                </div>

                {(!field.value || field.value.length === 0) && (
                  <p className="text-sm text-muted-foreground">
                    No tags added yet. Type above and press Enter or click Add.
                  </p>
                )}
                {field.value && field.value.length > 0 && (
                  <div className="flex  justify-center items-center flex-wrap gap-2 ">
                    {field.value.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-blue-800 uppercase px-2 tracking-wide py-1 cursor-pointer rounded-sm text-gray-200 border border-border/50 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          const newTags = field.value.filter(
                            (_: string, i: number) => i !== index
                          );
                          field.onChange(newTags);
                        }}
                      >
                        {tag}
                        <X className="" />
                      </Badge>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormMessage />
                <div className="w-full flex items-start ">
                  <FormLabel className="w-70">Description</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <TipTapEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Write your announcement here..."
                      />
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </Form>
      </div>

      <div className="sticky bottom-0 z-10 bg-card rounded-md">
        {" "}
        <div className="flex gap-3 px-6 py-4">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={loading} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border/40">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Update</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to update this announcement? This will
                  save all your changes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={loading}
                  className="border-border/40"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={form.handleSubmit(handleSubmit)}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? (
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
          </AlertDialog>{" "}
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => setEdit(false)}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

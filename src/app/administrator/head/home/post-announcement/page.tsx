"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader2,
  PenLine,
  Plus,
  RefreshCcw,
  TagIcon,
  FileText,
  Sparkles,
  X,
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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCreateAnnouncement } from "@/hooks/admin/postCreateAnnouncement";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import TitleReusable from "@/components/ui/title";
import { Separator } from "@/components/ui/separator";
import { TipTapEditor } from "@/components/ui/tip-tap";
import { useTourStore } from "@/store/useTourStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { TourStep } from "@/components/tour-2/tour-step";

export default function PostAnnouncement() {
  const [inputValue, setInputValue] = useState("");
  const {
    openScholarship,
    openAnnouncement,
    setOpenScholarship,
    setOpenAnnouncement,
  } = useTourStore();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const {
    open,
    setOpen,
    loading: createLoading,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
  } = useCreateAnnouncement();

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      <Dialog open={openAnnouncement} onOpenChange={setOpenAnnouncement}>
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
              <TitleReusable title="Post scholarship guide" description="" />
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
              onClick={() => setOpenAnnouncement(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenAnnouncement(false);
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="postAnnouncement"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Post Announcement"
          description="Publish a new scholarship announcement for registered students."
          Icon={PenLine}
        />
        <Separator className="mt-4" />

        {/* Form Section */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-15 lg:w-[60%] min-w-5xl w-full mx-auto"
          >
            <div className="space-y-8">
              {/* Title Field */}
              <TourStep stepId="1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col  items-end">
                      <FormMessage />
                      <div className="w-full flex items-center">
                        <FormLabel className="w-35">Title</FormLabel>

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
              </TourStep>
              {/* Tags Field */}{" "}
              <TourStep stepId="2">
                <FormField
                  control={form.control}
                  name="tags.data"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-end ">
                      <FormMessage />
                      <div className="flex w-full">
                        <FormLabel className="w-35">Tag</FormLabel>

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
                          No tags added yet. Type above and press Enter or click
                          Add.
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
              </TourStep>
              {/* Description Field */}
              <TourStep stepId="3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-end">
                      <FormMessage />
                      <div className="w-full flex items-start ">
                        <FormLabel className="w-35">Description</FormLabel>
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
              </TourStep>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <DeleteDialog
                open={open}
                red={false}
                onOpenChange={setOpen}
                onConfirm={form.handleSubmit(handleSubmit)}
                loading={createLoading}
                confirmText="Continue"
                title="Post Announcement?"
                confirmTextLoading="Posting..."
                description="Are you sure you want to post this announcement? It will be visible to all users."
                cancelText="Cancel"
                trigger={
                  <Button
                    onClick={handleTriggerClick}
                    type="button"
                    disabled={createLoading}
                  >
                    {createLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        Post Announcement
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                }
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarIcon,
  Loader,
  Megaphone,
  PenLine,
  Plus,
  RefreshCcw,
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import AnnouncementDescription from "@/components/ui/description";
import { useCreateAnnouncement } from "@/hooks/admin/postCreateAnnouncement";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import NoDataFound from "@/components/ui/nodata";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientScholarship() {
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");
  const [tab, setTabs] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const { data, loading } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
  });
  const {
    open,
    setOpen,
    loading: createLoading,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    form,
    formWatch,
  } = useCreateAnnouncement();
  const tabs = [
    { id: "1", label: "Announcement", indicator: null },
    { id: "2", label: "Post Announcement", indicator: null },
  ];

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pt-10  pt-3 lg:w-3/4 w-full p-2 lg:p-0 mx-auto">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Post Announcements"
            description="Stay updated with the latest announcements and important updates"
            Icon={PenLine}
          />
        </div>

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
                            No tags added yet. Type below and press Enter or
                            click “Add”.
                          </p>
                        )}
                        {(field.value || []).map(
                          (tag: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => {
                                const newTags = (field.value || []).filter(
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

          <div className="flex justify-end items-center gap-3 mt-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <Button variant="secondary" onClick={resetCreateState}>
              <RefreshCcw />
              Clear Form
            </Button>
            <DeleteDialog
              open={open}
              red={false}
              onOpenChange={setOpen}
              onConfirm={form.handleSubmit(handleSubmit)}
              loading={createLoading}
              title="Post Announcement?"
              confirmTextLoading="Posting..."
              description="Are you sure you want to post this announcement?"
              cancelText="Cancel"
              trigger={
                <Button
                  size="lg"
                  variant="ghost"
                  className="justify-start bg-green-700/20 text-green-700 hover:text-green-600"
                >
                  Post Announcement <ArrowRight />
                </Button>
              }
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

//  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />;

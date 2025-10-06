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

export default function PostAnnouncement() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const {
    open,
    setOpen,
    loading: createLoading,
    handleSubmit,
    resetCreateState,
    form,
  } = useCreateAnnouncement();

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pt-10  pt-3 lg:w-3/4 max-w-4xl p-2 lg:p-0 mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Post Announcements"
            description="Stay updated with the latest announcements and important updates"
            Icon={PenLine}
          />
        </div>

        {/* Form Section */}
        <div className=" py-12">
          <Form {...form}>
            <div className="space-y-8">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter announcement title..."
                        className="h-10 border-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags Field */}
              <FormField
                control={form.control}
                name="tags.data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <TagIcon className="h-4 w-4 text-muted-foreground" />
                      Tags
                    </FormLabel>

                    {/* Tags Display */}

                    {/* Tag Input */}
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
                          placeholder="Type a tag and press Enter..."
                          className="h-10 border-0"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="lg"
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

                    {(!field.value || field.value.length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        No tags added yet. Type above and press Enter or click
                        Add.
                      </p>
                    )}
                    {field.value && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 rounded-lg bg-muted/30 h-9">
                        {field.value.map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="group cursor-pointer gap-1.5 border border-border/50 bg-background px-3 py-1.5 text-sm font-medium transition-all hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => {
                              const newTags = field.value.filter(
                                (_: string, i: number) => i !== index
                              );
                              field.onChange(newTags);
                            }}
                          >
                            {tag}
                            <X className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <PenLine className="h-4 w-4 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your announcement details here..."
                        className="min-h-[200px] resize-none border-border/50 bg-background text-base leading-relaxed transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={resetCreateState}
              >
                <RefreshCcw className="h-4 w-4" />
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
                description="Are you sure you want to post this announcement? It will be visible to all users."
                cancelText="Cancel"
                trigger={
                  <Button size="lg" disabled={createLoading}>
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
          </Form>
        </div>
      </div>
    </div>
  );
}

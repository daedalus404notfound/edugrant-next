"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowRight,
  LoaderCircleIcon,
  PenLine,
  RefreshCcw,
  X,
} from "lucide-react";

import { useCreateAnnouncement } from "@/hooks/admin/postCreateAnnouncement";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import TitleReusable from "@/components/ui/title";
export default function CreateAnnouncement() {
  const {
    open,
    setOpen,
    handleSubmit,
    loading,
    resetCreateState,
    form,
    handleTriggerClick,
  } = useCreateAnnouncement();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className="px-4 ">
      <div className="mx-auto max-w-4xl w-full py-10 px-6">
        <TitleReusable
          title="Create Announcement"
          description=""
          Icon={PenLine}
        />

        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new announcement.
        </p>
        <Form {...form}>
          <div className="space-y-5 mt-10">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="announcementTitle"
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
                name="announcementTags"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel className="flex justify-between items-center">
                      Tags
                      <span className="flex items-center gap-2">
                        {(!field.value || field.value.length === 0) && (
                          <p className="text-sm text-muted-foreground">
                            No tags added yet. Type in the input below and press
                            Enter.
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
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="announcementDescription"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel className="flex justify-between items-center">
                      Body <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-10">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={resetCreateState}
            >
              <RefreshCcw />
              Clear Form
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <Button className="flex-1" onClick={handleTriggerClick}>
                Post Announcement <ArrowRight />
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit this scholarship?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    onClick={form.handleSubmit(handleSubmit)}
                    disabled={loading}
                    className="flex-1"
                    variant="outline"
                  >
                    {loading && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    {loading ? "Submitting..." : "Yes, Submit"}
                  </Button>

                  <AlertDialogCancel className="flex-1">
                    <X />
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Form>
      </div>
    </div>
  );
}

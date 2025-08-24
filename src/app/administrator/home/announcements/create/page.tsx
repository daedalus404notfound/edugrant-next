"use client";
import { format } from "date-fns";
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
import { motion } from "motion/react";
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
  CalendarIcon,
  ClockIcon,
  LoaderCircleIcon,
  PenLine,
  RefreshCcw,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useCreateAnnouncement } from "@/hooks/admin/postCreateAnnouncement";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
    <div className="px-4">
      <div className="mx-auto max-w-4xl w-full py-10 px-6">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-xl font-semibold flex items-center gap-1.5
          "
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          <PenLine strokeWidth={2} />
          Create Announcement
        </motion.span>

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
                name="announcementExpiration"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel className="flex items-center justify-between">
                      Expiration Date <FormMessage />
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full  text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "MMM d, yyyy 'at' h:mm a")
                              : ""}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (!date) return;

                              const current = field.value ?? new Date();
                              date.setHours(current.getHours());
                              date.setMinutes(current.getMinutes());
                              date.setSeconds(current.getSeconds());
                              field.onChange(date);
                            }}
                            captionLayout="dropdown"
                          />
                          <div className="border-t p-3">
                            <div className="flex items-center gap-3">
                              <Label className="text-xs">Enter time</Label>
                              <div className="relative grow">
                                <Input
                                  type="time"
                                  step="1"
                                  value={
                                    field.value
                                      ? `${String(
                                          field.value.getHours()
                                        ).padStart(2, "0")}:${String(
                                          field.value.getMinutes()
                                        ).padStart(2, "0")}:${String(
                                          field.value.getSeconds()
                                        ).padStart(2, "0")}`
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const [hours, minutes, seconds] =
                                      e.target.value.split(":").map(Number);
                                    const updated = field.value ?? new Date();
                                    updated.setHours(hours);
                                    updated.setMinutes(minutes);
                                    updated.setSeconds(seconds || 0);
                                    field.onChange(updated);
                                  }}
                                  className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <ClockIcon size={16} aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
                                  (_: any, i: number) => i !== index
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
                      Description <FormMessage />
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

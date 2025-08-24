"use client";
import { format } from "date-fns";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
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
  ArrowRight,
  CalendarIcon,
  ClockIcon,
  PenLine,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DragAndDropArea } from "@/components/ui/upload";
import { useCreateScholarship } from "@/hooks/admin/postCreateScholarship";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "@/components/ui/delete-dialog";

const options: Option[] = [
  { label: "PDF", value: "application/pdf" },
  {
    label: "Word Document",
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { label: "JPEG Image", value: "image/jpeg" },
  { label: "PNG Image", value: "image/png" },
];

export default function Create() {
  const {
    open,
    setOpen,
    handleSubmit,
    loading,
    resetCreateState,
    form,
    fields,
    append,
    handleTriggerClick,
    remove,
    reset,
    setReset,
  } = useCreateScholarship();

  return (
    <div className="px-4">
      <div className="mx-auto max-w-4xl w-full py-10">
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
          Create Scholarship
        </motion.span>

        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new scholarship.
        </p>
        <Form {...form}>
          <div className="space-y-5 mt-10">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="scholarshipTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Title <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Provider Name <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="applicationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center justify-between">
                        Deadline <FormMessage />
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
                              {field.value ? (
                                format(field.value, "MMM d, yyyy 'at' h:mm a")
                              ) : (
                                <span>Pick a date</span>
                              )}
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
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="scholarshipGwa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Required GWA <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(Optional)" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="scholarshipAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Amount <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="scholarshipLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Limit
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(Optional)"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="scholarshipDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Description <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 mt-10">
            <div className="w-full flex gap-5">
              {/* Backdrop Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="detailsImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Details Cover
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
                          reset={reset}
                          setReset={setReset}
                          label="backdrop image"
                          accept={["image/png", "image/jpeg", "image/jpg"]}
                          onFilesChange={(files) => field.onChange(files[0])} // Single file
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Sponsor Logo Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="sponsorImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Sponsor Logo/Image <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
                          reset={reset}
                          setReset={setReset}
                          label="sponsor logo"
                          accept={["image/png", "image/jpeg", "image/jpg"]}
                          onFilesChange={(files) => field.onChange(files[0])} // Single file
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Required Documents */}
          <div className="space-y-5 mt-10">
            <div className="w-full flex items-center justify-end ">
              <Button
                type="button"
                size="sm"
                onClick={() => append({ label: "", formats: [] })}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                More requirements
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-3 gap-3 items-center"
                >
                  {/* Label */}
                  <div className="lg:col-span-1 col-span-3">
                    <FormField
                      control={form.control}
                      name={`documents.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            Document Label {index + 1} <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. COR" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Formats */}
                  <div className="lg:col-span-2 col-span-3 flex gap-3 items-end">
                    <FormField
                      control={form.control}
                      name={`documents.${index}.formats`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="flex justify-between items-center">
                            Document Formats
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <MultipleSelector
                              className="bg-white/5"
                              commandProps={{
                                label: "Select document formats",
                              }}
                              value={options.filter((option) =>
                                field.value?.includes(option.value)
                              )}
                              defaultOptions={options}
                              placeholder="Choose formats"
                              hideClearAllButton
                              hidePlaceholderWhenSelected
                              emptyIndicator={
                                <p className="text-center text-sm">
                                  No results found
                                </p>
                              }
                              onChange={(selected) => {
                                field.onChange(
                                  selected.map((option) => option.value)
                                );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
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
            <DeleteDialog
              red={false}
              open={open}
              onOpenChange={setOpen}
              onConfirm={form.handleSubmit(handleSubmit)}
              loading={loading}
              title="Confirm Submission"
              description="  Are you sure you want to submit this scholarship?"
              confirmText="Submit"
              confirmTextLoading="Submitting..."
              cancelText="Cancel"
              trigger={
                <Button className="flex-1" onClick={handleTriggerClick}>
                  Submit Scholarship <ArrowRight />
                </Button>
              }
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

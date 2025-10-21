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

import {
  ArrowRight,
  Building2,
  CalendarIcon,
  ClockIcon,
  Landmark,
  MessagesSquare,
  PenLine,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DragAndDropArea } from "@/components/ui/upload";
import { useCreateScholarship } from "@/hooks/admin/postCreateScholarship";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import TitleReusable from "@/components/ui/title";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TourStep } from "@/components/tour-2/tour-step";
import socket from "@/lib/socketLib";

const options: Option[] = [
  { label: "PDF", value: "application/pdf" },
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

  const [openGuide, setOpenGuide] = useState(true);

  useEffect(() => {
    // if (!socket.connected) socket.connect();

    socket.on("adminAddScholarships", (data) => {
      console.log("🎓 New scholarship received:", data);
    });

    return () => {
      socket.off("adminAddScholarships");
    };
  }, []);

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TourStep
          stepId="post-scholarship"
          className="bg-background p-4 rounded-md"
        >
          <TitleReusable
            title=" Post Scholarship"
            description="Fill out the form below to post a new scholarship."
            Icon={PenLine}
          />
        </TourStep>
        <Separator className="mt-2" />
        <div className="mt-10 lg:w-[60%] min-w-5xl w-full mx-auto">
          <Form {...form}>
            <TourStep className="mt-10" stepId="text-forms">
              <div className="grid grid-cols-3 gap-x-5 gap-y-10 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 p-6 rounded-md ">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <div className="flex justify-between items-center">
                        {" "}
                        <FormLabel>
                          <span>
                            Scholarship Type
                            <span className="text-red-800 ml-2">*</span>
                          </span>
                        </FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="gap-3 flex"
                        >
                          {/* Radio card #1 */}
                          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 bg-card items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                            <RadioGroupItem
                              value="government"
                              className="order-1 after:absolute after:inset-0"
                            />
                            <div className="flex grow items-center gap-3">
                              <Landmark />

                              <Label>Government</Label>
                            </div>
                          </div>

                          {/* Radio card #2 */}
                          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 bg-card items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                            <RadioGroupItem
                              value="private"
                              className="order-1 after:absolute after:inset-0"
                            />
                            <div className="flex grow items-center gap-3">
                              <Building2 />

                              <Label>Private</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="flex justify-between items-center">
                        <span>
                          Scholarship Title
                          <span className="text-red-800 ml-2">*</span>
                        </span>
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="eg. Kuya Wally Scholarship"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        <span>
                          {" "}
                          Provider Name
                          <span className="text-red-800 ml-2">*</span>
                        </span>{" "}
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="eg. Wally" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center justify-between">
                        <span>
                          Deadline
                          <span className="text-red-800 ml-2">*</span>
                        </span>
                        <FormMessage />
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

                <FormField
                  control={form.control}
                  name="requiredGWA"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="flex justify-between items-center">
                        Required GWA <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(Optional) eg. 2.50" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Amount
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="(Optional) eg. 7,000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Limit
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="(Optional) eg. 1000" {...field} />
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
                        <span>
                          Scholarship Description
                          <span className="text-red-800 ml-2">*</span>
                        </span>
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </TourStep>
            <TourStep className="mt-10" stepId="interview-form">
              <div className=" p-6 rounded-md bg-card/40 dark:bg-gradient-to-br to-card from-card/50">
                <FormField
                  control={form.control}
                  name="interview"
                  render={({ field }) => (
                    <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none bg-card col-span-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value || false}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          className="order-1 after:absolute after:inset-0"
                          aria-describedby="for-interview-description"
                        />
                      </FormControl>

                      <div className="flex grow items-center gap-3">
                        {/* SVG Icon */}
                        <MessagesSquare />

                        {/* Label + Description */}
                        <div className="grid gap-2">
                          <FormLabel>
                            For Interview{" "}
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                              (Optional)
                            </span>
                          </FormLabel>
                          <p
                            id="for-interview-description"
                            className="text-muted-foreground text-xs"
                          >
                            Check this if the approved application is selected
                            for an interview.
                          </p>
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TourStep>
            <TourStep className="mt-10" stepId="image-forms">
              <div className="space-y-8 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 p-6 rounded-md">
                <div className="w-full flex gap-5">
                  {/* Backdrop Image */}
                  <div className="flex flex-col flex-1 gap-2">
                    <FormField
                      control={form.control}
                      name="cover"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            <span>
                              {" "}
                              Details Cover
                              <span className="text-red-800 ml-2">*</span>
                            </span>
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <DragAndDropArea
                              reset={reset}
                              setReset={setReset}
                              label="backdrop image"
                              accept={["image/png", "image/jpeg"]}
                              onFilesChange={(files) =>
                                field.onChange(files[0])
                              } // Single file
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
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            <span>
                              {" "}
                              Sponsor Logo/Image
                              <span className="text-red-800 ml-2">*</span>
                            </span>{" "}
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <DragAndDropArea
                              reset={reset}
                              setReset={setReset}
                              label="sponsor logo"
                              accept={["image/png", "image/jpeg"]}
                              onFilesChange={(files) =>
                                field.onChange(files[0])
                              } // Single file
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="form"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Scholarship Form (Optional)
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <DragAndDropArea
                            reset={reset}
                            setReset={setReset}
                            label="scholarship form"
                            accept={[
                              "application/pdf",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ]}
                            onFilesChange={(files) => field.onChange(files[0])} // Single file
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TourStep>

            {/* Dynamic Required Documents */}
            <TourStep className="mt-10" stepId="document-forms">
              <div className="space-y-8 mt-10 ">
                <div className="w-full flex items-center justify-between ">
                  <p className="text-sm font-medium text-muted-foreground">
                    Note: Each document label must be unique.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      append({
                        label: "",
                        formats: [],
                        requirementType: "required",
                      })
                    }
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add document
                  </Button>
                </div>

                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 gap-6 items-center p-6  bg-card/40 dark:bg-gradient-to-br to-card from-card/50 rounded-md"
                    >
                      <FormField
                        control={form.control}
                        name={`documents.documents.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-between items-center">
                              <span>
                                {" "}
                                Document Label {index + 1}
                                <span className="text-red-800 ml-2">*</span>
                              </span>{" "}
                              <FormMessage />
                            </FormLabel>
                            <div className="flex gap-3 items-center">
                              <FormControl>
                                <Input placeholder="e.g. COR" {...field} />
                              </FormControl>
                              <Button
                                type="button"
                                variant="destructive"
                                disabled={fields.length === 1}
                                onClick={() => remove(index)}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name={`documents.documents.${index}.formats`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex justify-between items-center">
                                <span>
                                  {" "}
                                  Document Formats
                                  <span className="text-red-800 ml-2">*</span>
                                </span>
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
                        <FormField
                          control={form.control}
                          name={`documents.documents.${index}.requirementType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Type
                                <FormMessage />
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Requirement type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="required">
                                      Required
                                    </SelectItem>
                                    <SelectItem value="optional">
                                      Optional
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TourStep>
            <TourStep className="mt-" stepId="submit-forms">
              <div className="flex gap-3 p-6 ">
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
            </TourStep>
          </Form>
        </div>
      </div>
    </div>
  );
}

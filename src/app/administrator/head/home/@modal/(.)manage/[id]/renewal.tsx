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
  ArrowLeftFromLine,
  Building2,
  Calendar1,
  CalendarIcon,
  ClockIcon,
  Download,
  GraduationCap,
  Landmark,
  Maximize,
  MessagesSquare,
  Plus,
  Save,
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
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRedeployScholarship } from "@/hooks/admin/postRedeployHandler";
import { useModeStore } from "@/store/scholarshipModalStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useAdminStore } from "@/store/adminUserStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TourStep } from "@/components/tour-2/tour-step";
import { useTourContext } from "@/components/tour-2/tour-provider";
const options: Option[] = [
  { label: "PDF", value: "application/pdf" },
  { label: "JPEG Image", value: "image/jpeg" },
  { label: "PNG Image", value: "image/png" },
];
export default function RedeployScholarship({
  data,
  HandleCloseDrawer,
  setMode,
}: {
  data: scholarshipFormData;
  HandleCloseDrawer: (drawer: boolean) => void;
  setMode: (drawer: string) => void;
}) {
  const { admin } = useAdminStore();
  const {
    open,
    setOpen,
    handleSubmit,
    loading,
    form,
    fields,
    append,
    handleTriggerClick,
    remove,
  } = useRedeployScholarship({
    scholarshipId: data.scholarshipId,
    accountId: admin?.accountId,
    HandleCloseDrawer: HandleCloseDrawer,
  });
  const { isActive, activeTourName, currentStep } = useTourContext();
  return (
    <div>
      <ScrollArea className="max-h-[80vh] h-full bg-background rounded-t-lg">
        {" "}
        {isActive && (
          <div className="absolute z-20 inset-0 bg-black/70 backdrop-blur-sm"></div>
        )}
        <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg  ">
          {/* Header Section */}
          <div className="relative flex  lg:items-end items-center overflow-hidden  lg:py-8 py-4 lg:px-4 px-2">
            {/* <img
                  className="lg:w-70 w-43 absolute lg:right-0 -right-18 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
                  src={logo.src}
                  alt=""
                /> */}
            {/* <div className="absolute top-0 left-0 lg:h-86 h-60 w-full opacity-30   mask-gradient flex">
              <img
                className="w-full h-full object-cover blur-md "
                src={data?.cover}
                alt=""
              />
            </div> */}
            <div className=" flex items-end justify-center">
              <Avatar className="lg:size-25 size-20">
                <AvatarImage
                  src={data?.logo}
                  className="rounded-full object-cover"
                />
                <AvatarFallback
                  className="rounded-full text-white font-semibold flex items-center justify-center 
                                bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
                                dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
                >
                  1212
                </AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="uppercase absolute z-10">
                {" "}
                {data?.type}
              </Badge>
            </div>

            <div className="flex-1 px-4 py-2 z-10">
              <div className="flex items-center gap-3">
                <h1 className="text-base lg:text-xl font-medium text-foreground capitalize line-clamp-1">
                  {data?.title}
                </h1>
                <div className="space-x-1.5 lg:block hidden">
                  <Badge
                    variant="outline"
                    className="mt-2 uppercase bg-blue-800 text-gray-200"
                  >
                    {" "}
                    {getPhaseLabel(data?.phase)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`mt-2 uppercase text-gray-200 ${
                      data?.deadline &&
                      Date.now() > new Date(data.deadline).getTime()
                        ? "bg-red-800"
                        : "bg-green-800"
                    }`}
                  >
                    {data?.deadline &&
                    Date.now() > new Date(data.deadline).getTime()
                      ? "EXPIRED"
                      : "ACTIVE"}
                  </Badge>
                </div>
              </div>
              {/* <p className="font-medium font-mono text-base tracking-wide">
                              {data?.Scholarship_Provider.name}
                            </p>{" "} */}
              <p className="text-muted-foreground lg:text-sm text-xs">
                {data?.Scholarship_Provider?.name}
              </p>
            </div>
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 bg-card relative p-4 lg:p-6">
            <div className="space-y-1.5 lg:border-l lg:pl-4">
              <div className="flex items-center gap-2">
                <Calendar1 className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Posted on</h1>
              </div>

              <p className="font-medium lg:text-base text-sm text-foreground lg:border-l-0 border-l lg:pl-0 pl-5">
                {data?.dateCreated
                  ? format(data?.dateCreated, "yyyy/MM/dd")
                  : "—"}
              </p>
            </div>{" "}
            <div className="space-y-1.5 lg:border-l lg:pl-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Deadline</h1>
              </div>

              <span className="font-medium lg:text-base text-sm  text-foreground lg:border-l-0 border-l lg:pl-0 pl-5">
                {data?.deadline ? format(data?.deadline, "yyyy/MM/dd") : "—"}
              </span>
            </div>
            <div className="space-y-1.5 lg:border-l lg:pl-4 hidden lg:block">
              <div className="flex items-center gap-2">
                <Calendar1 className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">
                  Interview Requirement
                </h1>
              </div>

              <p className="font-medium lg:text-base text-sm  text-foreground lg:border-l-0 border-l lg:pl-0 pl-5">
                {data.interview ? "Interview Required" : "No Interview Needed"}
              </p>
            </div>
          </div>
        </div>
        <TourStep stepId="renew-3">
          <div className="h-full pb-10 px-6 space-y-8">
            <Form {...form}>
              <div className="space-y-8 grid grid-cols-2 mt-10">
                <div className="">
                  <FormField
                    control={form.control}
                    name="renewDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center justify-between">
                          Renewal Deadline <FormMessage />
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="secondary"
                                className={cn(
                                  "w-full  text-left font-normal bg-card",
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
                                        const updated =
                                          field.value ?? new Date();
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
                <div></div>
                <div>
                  <FormField
                    control={form.control}
                    name="interview"
                    render={({ field }) => (
                      <FormItem className=" has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md p-4 shadow-xs outline-none bg-card">
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
                              For Interview (Renewal)
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
                <div></div>
                <div className="space-y-3 col-span-2">
                  <div className="w-full flex items-center justify-end ">
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
                      Add Renewal Requirement
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
                            name={`renewDocuments.${index}.label`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex justify-between items-center">
                                  Document Label {index + 1} <FormMessage />
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. Certificate of Registration (COR)"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Formats */}
                        <div className="lg:col-span-2 col-span-3 flex gap-3 items-end">
                          <FormField
                            control={form.control}
                            name={`renewDocuments.${index}.formats`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel className="flex justify-between items-center">
                                  Accepted File Formats
                                  <FormMessage />
                                </FormLabel>
                                <FormControl>
                                  <MultipleSelector
                                    className="bg-white/5"
                                    commandProps={{
                                      label: "Select formats (PDF, Word, etc.)",
                                    }}
                                    value={options.filter((option) =>
                                      field.value?.includes(option.value)
                                    )}
                                    defaultOptions={options}
                                    placeholder="Select formats (PDF, Word, etc.)"
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
                            name={`renewDocuments.${index}.requirementType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <FormMessage />
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Requirement Status" />
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

                          <Button
                            type="button"
                            variant="destructive"
                            disabled={fields.length === 1}
                            onClick={() => remove(index)}
                            aria-label="Remove requirement"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </TourStep>
      </ScrollArea>{" "}
      <div className="p-4 bg-card  border-t">
        <div className="flex gap-3">
          <TourStep stepId="renew-4" className="flex-1">
            <DeleteDialog
              open={open}
              onOpenChange={setOpen}
              onConfirm={form.handleSubmit(handleSubmit)}
              loading={loading}
              red={false}
              title="Confirm Renewal Update?"
              description="The renewal requirements and deadline will be updated in the database."
              confirmText="Save Renewal"
              cancelText="Cancel"
              trigger={
                <Button className="w-full" onClick={handleTriggerClick}>
                  Post Renewal <Save />
                </Button>
              }
            />
          </TourStep>

          <Button
            onClick={() => setMode("details")}
            className="flex-1"
            variant="secondary"
          >
            Back <ArrowLeftFromLine />
          </Button>
        </div>
      </div>
    </div>
  );
}

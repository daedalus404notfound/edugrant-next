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
  CalendarIcon,
  ClockIcon,
  Download,
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
const options: Option[] = [
  { label: "PDF", value: "application/pdf" },
  { label: "JPEG Image", value: "image/jpeg" },
  { label: "PNG Image", value: "image/png" },
];
export default function RedeployScholarship({
  data,
  HandleCloseDrawer,
}: {
  data: scholarshipFormData;
  HandleCloseDrawer: (drawer: boolean) => void;
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
  const { setMode } = useModeStore();
  return (
    <div className="relative bg-background rounded-t-lg">
      <div className="absolute top-0 left-0 lg:h-86 h-60 w-full opacity-30   mask-gradient flex">
        <img
          className="w-full h-full object-cover blur-md "
          src={data?.cover}
          alt=""
        />
      </div>

      <div className="relative flex justify-center items-center ">
        <div className="absolute inset-0border-b-2 border-black bg-card" />
        <div className="absolute left-2 -bottom-18 z-10 lg:px-6  px-2 flex  items-end gap-3 ">
          <Avatar className="lg:size-30 size-20 border-background border-2 shadow-md">
            <AvatarImage className="object-cover" src={data?.logo} />
            <AvatarFallback>
              {data?.Scholarship_Provider?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <motion.span
              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                 flex items-center gap-1.5 lg:text-2xl text-xl font-semibold tracking-tight
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
              {data?.title}
            </motion.span>
            <p className="text-muted-foreground text-sm">
              by {data?.Scholarship_Provider?.name}
            </p>
          </div>
        </div>
        {data?.cover && (
          <img
            className="w-full lg:aspect-[16/4] aspect-[16/9]  object-cover   rounded-lg shadow-md"
            src={data?.cover}
            alt=""
          />
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute z-5  !bg-black/60 !text-gray-200"
              size="sm"
            >
              View <Maximize />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-4">
            <DialogHeader className="sr-only">
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="w-[300px]">
              <img className="h-full w-full" src={data?.cover} alt="" />
            </div>
            <Link
              className="w-full"
              href={(data?.cover && data?.cover) || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="w-full">
                <Download />
                Download
              </Button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 pt-30 pb-10 px-6 space-y-8">
        <div className="flex items-center justify-between mb-6 gap-3">
          <h3 className="text-lg font-semibold "> Renew {data?.title}</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Form {...form}>
          <div className="space-y-8 mt-10">
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

            <div>
              <FormField
                control={form.control}
                name="interview"
                render={({ field }) => (
                  <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
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
                          Check this if the approved application is selected for
                          an interview.
                        </p>
                      </div>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
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
      <div className="p-4 sticky bottom-0 bg-card  border-t">
        <div className="flex gap-3">
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
              <Button className="flex-1" onClick={handleTriggerClick}>
                Post Renewal <Save />
              </Button>
            }
          />

          {/* <Button
            onClick={() => setMode("details")}
            className="flex-1"
            variant="outline"
          >
            Back to Scholarship Details <ArrowLeftFromLine />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

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
  Landmark,
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
import { useUpdateScholarship } from "@/hooks/admin/postUpdateScholarship";
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
import { Checkbox } from "@/components/ui/checkbox";
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
export default function EditScholarship({
  data,
  setSection,
}: {
  data: scholarshipFormData;
  setSection: (section: "details" | "redeploy" | "edit") => void;
}) {
  const {
    open,
    setOpen,
    handleSubmit,
    loading,
    form,
    handleTriggerClick,
    documentFields,
    appendDocument,
    removeDocument,
  } = useUpdateScholarship(data);
  return (
    <div className=" bg-background rounded-t-lg">
      <div className="p-4  space-y-5">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                       flex items-center gap-1.5 text-2xl font-semibold tracking-tight
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
          Update {data?.title}
        </motion.span>

        <Form {...form}>
          <div className="space-y-5 mt-10">
            <div className="grid grid-cols-3 gap-x-3 gap-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Scholarship Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="gap-3 flex"
                      >
                        {/* Radio card #1 */}
                        <div className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                          <RadioGroupItem
                            value="government"
                            className="order-1 after:absolute after:inset-0"
                          />
                          <div className="flex grow items-center gap-3">
                            <Landmark />
                            <div className="grid grow gap-2">
                              <Label>
                                Government
                                <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                  (Sublabel)
                                </span>
                              </Label>
                              <p className="text-muted-foreground text-xs">
                                You can use this card with a label and a
                                description.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Radio card #2 */}
                        <div className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                          <RadioGroupItem
                            value="private"
                            className="order-1 after:absolute after:inset-0"
                          />
                          <div className="flex grow items-start gap-3">
                            <Building2 />
                            <div className="grid grow gap-2">
                              <Label>
                                Private
                                <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                  (Sublabel)
                                </span>
                              </Label>
                              <p className="text-muted-foreground text-xs">
                                You can use this card with a label and a
                                description.
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="title"
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
                  name="Scholarship_Provider.name"
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
                  name="deadline"
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
                        <PopoverContent
                          className="w-auto p-0 !pointer-events-auto"
                          align="start"
                        >
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
                  name="requiredGWA"
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
                  name="amount"
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
                  name="limit"
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
                  name="description"
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
                  name="cover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Details Cover
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
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
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Sponsor Logo/Image <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
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
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="form"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Scholarship Form <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <DragAndDropArea
                        label="scholarship form"
                        accept={["*/*"]}
                        onFilesChange={(files) => field.onChange(files[0])} // Single file
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
                        For Interview{" "}
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

          {/* Dynamic Required Documents */}
          <div className="space-y-5 mt-10">
            <div className="w-full flex items-center justify-end ">
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  appendDocument({
                    label: "",
                    formats: [],
                    requirementType: "required",
                  })
                }
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add requirements
              </Button>
            </div>

            <div className="space-y-5">
              {documentFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-3 gap-3 items-center"
                >
                  {/* Label */}
                  <div className="lg:col-span-1 col-span-3">
                    <FormField
                      control={form.control}
                      name={`documents.documents.${index}.label`}
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
                      name={`documents.documents.${index}.formats`}
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
                    <FormField
                      control={form.control}
                      name={`documents.documents.${index}.requirementType`}
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

                    <Button
                      type="button"
                      variant="destructive"
                      disabled={documentFields.length === 1}
                      onClick={() => removeDocument(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
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
            title="Apply Changes?"
            description="This will be saved to database."
            confirmText="Save"
            cancelText="Cancel"
            trigger={
              <Button
                className="flex-1"
                variant="secondary"
                onClick={handleTriggerClick}
              >
                Update Scholarship <Save />
              </Button>
            }
          />

          <Button
            onClick={() => setSection("details")}
            className="flex-1"
            variant="outline"
          >
            Back <ArrowLeftFromLine />
          </Button>
        </div>
      </div>
    </div>
  );
}

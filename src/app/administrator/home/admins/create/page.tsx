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
  Plus,
  RefreshCcw,
  Trash2,
  UserPen,
  X,
} from "lucide-react";

import { DragAndDropArea } from "@/components/ui/upload";

import { useCreateAdmin } from "@/hooks/admin/postCreateAdminHandler";

export default function CreateAdmin() {
  const {
    open,
    setOpen,
    handleSubmit,
    loading,
    resetCreateState,
    form,
    handleTriggerClick,
  } = useCreateAdmin();

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
          <UserPen strokeWidth={2} />
          Add New Admininstrator
        </motion.span>

        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new administrator.
        </p>
        <Form {...form}>
          <div className="space-y-5 mt-10">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        First Name <FormMessage />
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
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Middle Name <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Last Name <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(Optional)" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Contact
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="(Optional)" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Email
                        <FormMessage />
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Password
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Profile Image <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <DragAndDropArea
                      label="profile image"
                      accept={["image/png", "image/jpeg", "image/jpg"]}
                      onFilesChange={(files) => field.onChange(files[0])} // Single file
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                Continue <ArrowRight />
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

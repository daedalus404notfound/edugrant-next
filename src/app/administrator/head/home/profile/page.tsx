"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar1,
  Check,
  CheckIcon,
  CircleUserRound,
  EyeIcon,
  EyeOffIcon,
  GraduationCap,
  Loader,
  Mail,
  Map,
  Settings,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs } from "@/components/ui/vercel-tabs";
import TitleReusable from "@/components/ui/title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
import { useAdminProfileForm } from "@/hooks/head-profile-edit";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";
import { useEditAdministrator } from "@/hooks/staff-edit-handler";
import ChangePassword from "@/app/administrator/staff/home/profile/change-password";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
export default function Profile() {
  const { data, success, loading, isError } = useAuthenticatedUser();
  const { form, isChanged } = useAdminProfileForm(data?.safeData);
  const [tab, setTab] = useState("personal");
  const mutation = useEditAdministrator();

  console.log(form);

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Profile Settings"
          description="Manage your personal information, account details."
          Icon={Settings}
        />

        <div className=" max-w-5xl w-full mx-auto mt-15">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            >
              <div className=" w-full space-y-8">
                <div className="bg-gradient-to-br dark:to-card to-card/20 dark:from-card/50 from-card/10 shadow rounded-md overflow-hidden border-border/50 border dark:border-0">
                  {/* Header Section */}
                  <div className="relative flex  items-end  py-8 px-6  gap-4">
                    {/* <img
                          className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
                          src={logo.src}
                          alt=""
                        /> */}

                    <FormField
                      control={form.control}
                      name="ISPSU_Head.profileImg.publicUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <DragAndDropAreaProfile
                              isSuccess={mutation.isSuccess}
                              label="backdrop image"
                              accept={["image/png", "image/jpeg"]}
                              initialImageUrl={
                                data?.safeData?.ISPSU_Head?.profileImg
                                  ?.publicUrl || "https://github.com/shadcn.png"
                              }
                              onFilesChange={(files) =>
                                field.onChange(
                                  files[0]
                                    ? files[0]
                                    : data?.safeData?.ISPSU_Head?.profileImg
                                        ?.publicUrl ||
                                        "https://github.com/shadcn.png"
                                )
                              } // Single file
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div>
                      {loading ? (
                        <div className="flex flex-col gap-2 flex-1 px-4">
                          <Skeleton className="h-6 w-64" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-2">
                          <h1 className="text-xl font-semibold text-foreground jakarta">
                            {data?.safeData?.ISPSU_Head?.lName},{" "}
                            {data?.safeData?.ISPSU_Head?.fName}{" "}
                            {data?.safeData?.ISPSU_Head?.mName}
                          </h1>

                          <p className="text-muted-foreground text-sm">
                            {data?.safeData?.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-6 px-4  dark:bg-card bg-card/30 relative   border-border/50 border-t">
                    <div className="space-y-1.5  border-l pl-6">
                      <div className="flex items-center gap-2">
                        <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          User Role
                        </h1>
                      </div>
                      {loading ? (
                        <Skeleton className="h-5 w-20" />
                      ) : (
                        <p className="font-medium text-foreground">
                          {data?.safeData?.role}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5  border-l pl-6">
                      <div className="flex items-center gap-2">
                        <VenusAndMars className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          Gender
                        </h1>
                      </div>
                      {loading ? (
                        <Skeleton className="h-5 w-full" />
                      ) : (
                        <p className="font-medium text-foreground">
                          {data?.safeData?.ISPSU_Staff?.gender || "—"}
                        </p>
                      )}
                    </div>{" "}
                    <div className="space-y-1.5 border-l pl-6">
                      <div className="flex items-center gap-2">
                        <Calendar1 className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          Account Created
                        </h1>
                      </div>
                      {loading ? (
                        <Skeleton className="h-5 w-full" />
                      ) : (
                        <p className="font-medium text-foreground">
                          {(data?.safeData?.ISPSU_Head?.dateCreated &&
                            format(
                              data?.safeData?.ISPSU_Head?.dateCreated,
                              "PPP"
                            )) ||
                            "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 ">
                  <h3 className="text-base font-medium flex gap-2 items-center py-3">
                    <UserRoundCog className="h-4.5 w-4.5" /> Personal
                    Information
                  </h3>

                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 p-6 dark:bg-card bg-card/30 shadow rounded-md  border-border/50 border dark:border-0">
                    <FormField
                      control={form.control}
                      name="ISPSU_Head.fName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ISPSU_Head.mName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Middle Name
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder="(Optional)"
                                {...field}
                                className="rounded-r-none"
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <CircleUserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ISPSU_Head.lName"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-muted-foreground">
                            Last Name
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRoundCheck />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                                readOnly
                                disabled
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Mail />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ISPSU_Head.gender"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Gender
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="rounded-r-none w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <VenusAndMars />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <ChangePassword />{" "}
              <AnimatePresence>
                {isChanged && (
                  <div className="sticky bottom-16 lg:bottom-0 ">
                    <motion.div
                      className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          size="lg"
                          type="submit"
                          className="cursor-pointer"
                          disabled={mutation.isPending}
                        >
                          <Check />
                          {mutation.isPending ? "Saving..." : "Save Changes"}
                          {mutation.isPending && (
                            <Loader className="animate-spin" />
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>{" "}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

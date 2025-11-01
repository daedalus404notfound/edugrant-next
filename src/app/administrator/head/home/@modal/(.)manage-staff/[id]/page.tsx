"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import "ldrs/react/Ring.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Mail,
  UserRound,
  Check,
  Loader,
  UserRoundCog,
  CircleUserRound,
  UserRoundCheck,
  VenusAndMars,
  Trash,
  Trash2,
  PencilLine,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ProfileInfoSkeleton } from "../../../all-application/[id]/profile-skeleton";
import { Badge } from "@/components/ui/badge";
import useGetStaffLogs from "@/hooks/admin/getStaffByHeadById";
import ModalHeader from "@/components/ui/modal-header";
import { useTourContext } from "@/components/tour-2/tour-provider";
import { TourStep } from "@/components/tour-2/tour-step";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminProfileForm } from "@/hooks/head-profile-edit";
import useUpdateProfileStaff from "@/hooks/updateStaffProfile";
import useGetStaffById from "@/hooks/admin/getStaffByHeadById";

export default function InterceptManageStaff() {
  const { isActive } = useTourContext();
  const router = useRouter();
  const params = useParams();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [open, setOpen] = useState(false);
  const staffId = params.id as string;
  const { data: rawData, isLoading } = useGetStaffById(staffId);
  const data = rawData?.safeData;
  const HandleCloseDrawer = (value: boolean) => {
    setOpenDrawer(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };
  const mutation = useUpdateProfileStaff();
  const { form, isChanged } = useAdminProfileForm(data);
  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }, [mutation.isSuccess]);
  console.log("1212", data?.ISPSU_Staff?.validated);
  return (
    <Drawer
      open={openDrawer}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        onInteractOutside={(e) => {
          isActive ? e.preventDefault() : "";
        }}
        onEscapeKeyDown={(e) => {
          isActive ? e.preventDefault() : "";
        }}
        className="max-w-[1100px] w-full mx-auto outline-0 border-0 p-1"
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ModalHeader
          text="Staff Details"
          HandleCloseDrawer={HandleCloseDrawer}
        />
        <Form {...form}>
          <ScrollArea className="h-[80vh] bg-background rounded-t-md">
            {" "}
            {isActive && (
              <div className="absolute z-20 inset-0 bg-black/70 backdrop-blur-sm"></div>
            )}
            {isLoading ? (
              <div className="space-y-0">
                {/* Profile Image Section */}
                <div className="flex bg-gradient-to-br from-card/60 to-card p-4">
                  <Skeleton className="w-full h-48 rounded-md" />
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Header Section */}
                <div className="flex justify-between items-end bg-card p-4 rounded-b-md gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-3 items-center">
                      <Skeleton className="h-7 w-48" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </div>

                {/* Personal Information Section */}
                <div className="space-y-6 pt-4 pb-8 rounded-lg p-4">
                  {/* Section Header */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <div className="w-full h-px bg-gradient-to-r from-border to-transparent" />
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-12">
                    {/* First Name Field */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-64 rounded-md" />
                    </div>

                    {/* Middle Name Field */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-64 rounded-md" />
                    </div>

                    {/* Last Name Field */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-64 rounded-md" />
                    </div>

                    {/* Email Field */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-64 rounded-md" />
                    </div>

                    {/* Gender Field */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-64 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <TourStep stepId="activate-3">
                <div className="flex bg-gradient-to-br from-card/60 to-card p-4">
                  <FormField
                    control={form.control}
                    name="ISPSU_Staff.profileImg.publicUrl"
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
                              data?.ISPSU_Staff?.profileImg?.publicUrl ||
                              "https://github.com/shadcn.png"
                            }
                            // onFilesChange={(files) =>
                            //   field.onChange(
                            //     files[0]
                            //       ? files[0]
                            //       : data?.profileImg?.publicUrl ||
                            //           "https://github.com/shadcn.png"
                            //   )
                            // } // Single file
                            onFilesChange={(files) =>
                              field.onChange({
                                publicUrl: files[0]
                                  ? files[0]
                                  : data?.ISPSU_Staff?.profileImg?.publicUrl ||
                                    "https://github.com/shadcn.png",
                                path: data?.ISPSU_Staff?.profileImg?.path,
                              })
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex justify-between items-end bg-card p-4 rounded-b-md">
                  <div className="">
                    <div>
                      <span className="flex gap-3 items-center">
                        <h1 className="text-xl font-medium">
                          {data?.ISPSU_Staff?.lName || ""},{" "}
                          {data?.ISPSU_Staff?.fName || ""}{" "}
                          {data?.ISPSU_Staff?.mName || ""}
                        </h1>
                        <Badge variant="secondary">ISPSU STAFF</Badge>
                      </span>
                      <p className="text-muted-foreground text-sm mt-2">
                        Member Since:{" "}
                        {data?.ISPSU_Staff?.dateCreated &&
                          format(data?.ISPSU_Staff?.dateCreated, "PPP p")}
                      </p>
                    </div>
                  </div>{" "}
                  <div className="">
                    <div className="flex items-end ">
                      <TourStep stepId="activate-2">
                        <FormField
                          control={form.control}
                          name="ISPSU_Staff.validated"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  value={String(field.value)}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={
                                        field.value === "true"
                                          ? "Activated"
                                          : "Deactivated"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="true">
                                      Activated
                                    </SelectItem>
                                    <SelectItem value="false">
                                      Deactivated
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TourStep>
                    </div>
                  </div>
                </div>
                <div className="space-y-6  pt-4 pb-8 rounded-lg p-4">
                  <div className="">
                    <h3 className="text-base font-medium flex gap-2 items-center py-3">
                      <UserRoundCog className="h-4.5 w-4.5" /> Personal
                      Information
                    </h3>
                    <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="space-y-12">
                    <FormField
                      control={form.control}
                      name="ISPSU_Staff.fName"
                      render={({ field }) => (
                        <FormItem className="flex justify-between">
                          <FormLabel className="text-muted-foreground">
                            First Name
                          </FormLabel>
                          <FormControl className="w-md">
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
                      name="ISPSU_Staff.mName"
                      render={({ field }) => (
                        <FormItem className="flex justify-between">
                          <FormLabel className="text-muted-foreground">
                            Middle Name
                          </FormLabel>
                          <FormControl className="w-md">
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
                      name="ISPSU_Staff.lName"
                      render={({ field }) => (
                        <FormItem className="flex justify-between">
                          <FormLabel className="text-muted-foreground">
                            Last Name
                          </FormLabel>
                          <FormControl className="w-md">
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
                        <FormItem className="flex justify-between">
                          <FormLabel className="text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl className="w-md">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                                readOnly
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
                      name="ISPSU_Staff.gender"
                      render={({ field }) => (
                        <FormItem className="flex justify-between">
                          <FormLabel className="text-muted-foreground">
                            Gender
                          </FormLabel>
                          <FormControl className="w-md">
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
              </TourStep>
            )}
          </ScrollArea>
          <div className="p-4 flex gap-3">
            <TourStep className="flex-1" stepId="activate-4">
              <DeleteDialog
                open={open}
                onOpenChange={setOpen}
                onConfirm={form.handleSubmit((values) =>
                  mutation.mutate(values)
                )}
                loading={mutation.isPending}
                red={false}
                title="Apply Changes?"
                description="This will be saved to database."
                confirmTextLoading="Updating..."
                confirmText="Save"
                cancelText="Cancel"
                trigger={
                  <Button
                    size="lg"
                    type="button"
                    className="cursor-pointer w-full"
                    disabled={mutation.isPending || !isChanged}
                    onClick={() => setOpen(true)}
                  >
                    <PencilLine />
                    Save Changes
                  </Button>
                }
              />
            </TourStep>
          </div>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}

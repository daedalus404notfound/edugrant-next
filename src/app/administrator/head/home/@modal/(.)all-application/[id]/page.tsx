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
import { useState } from "react";

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
  Trash2,
  Map,
  Calendar1,
  Feather,
  Accessibility,
  IdCard,
  GraduationCap,
  BookMarked,
  LayoutPanelTop,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ProfileInfoSkeleton } from "../../../all-application/[id]/profile-skeleton";
import ModalHeader from "@/components/ui/modal-header";
import { useTourContext } from "@/components/tour-2/tour-provider";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { AnimatePresence, motion } from "motion/react";
import useStudentById from "@/hooks/admin/getStudentById";
import useDeleteStudent from "@/hooks/admin/postDeleteUserByHead";
import { useUpdateUserByHead } from "@/hooks/user/updateUserByHead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs } from "@/components/ui/vercel-tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function InterceptManageScholarship() {
  const { isActive } = useTourContext();
  const router = useRouter();
  const params = useParams();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [status, setStatus] = useState("info");
  const id = Number(params.id);
  const HandleCloseDrawer = (value: boolean) => {
    setOpenDrawer(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };
  const { data, isLoading: loading } = useStudentById(id);
  const { onSubmit, deleteLoading, openDelete, setOpenDelete } =
    useDeleteStudent({ id });
  const {
    form,
    handleSubmit,
    loading: ludeng,
    isChanged,
    reset,
    setReset,
  } = useUpdateUserByHead(data);
  const tabs = [
    { id: "info", label: "Personal Information", indicator: null },
    { id: "account", label: "Account Details", indicator: null },
    { id: "scholarship", label: "Scholarships", indicator: null },
  ];
  const [isIndigenousChecked, setIsIndigenousChecked] = useState(
    !!data?.indigenous
  );
  const [isPWDChecked, setIsPWDChecked] = useState(!!data?.PWD);

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
          text="Student Details"
          HandleCloseDrawer={HandleCloseDrawer}
        />
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <ScrollArea
                className={`bg-background rounded-t-lg ${
                  loading ? "h-[calc(100dvh-300px)]" : "h-[calc(100dvh-150px)]"
                }`}
              >
                <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-md overflow-hidden ">
                  {/* Header Section */}
                  <div className="relative flex  lg:items-end items-center  py-8 px-4">
                    {/* <img
                          className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
                          src={logo.src}
                          alt=""
                        /> */}
                    <div className=" flex items-end justify-center">
                      <Dialog>
                        <DialogTrigger asChild className="cursor-pointer">
                          <FormField
                            control={form.control}
                            name="profileImg.publicUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex justify-between items-center">
                                  <FormMessage />
                                </FormLabel>
                                <FormControl>
                                  <DragAndDropAreaProfile
                                    isSuccess={reset}
                                    setIsSuccess={setReset}
                                    label="backdrop image"
                                    accept={["image/png", "image/jpeg"]}
                                    initialImageUrl={
                                      data?.profileImg?.publicUrl ||
                                      "https://github.com/shadcn.png"
                                    }
                                    onFilesChange={(files) =>
                                      field.onChange(
                                        files[0]
                                          ? files[0]
                                          : data?.profileImg?.publicUrl ||
                                              "https://github.com/shadcn.png"
                                      )
                                    } // Single file
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </DialogTrigger>
                        <DialogContent className="lg:max-w-5xl w-full !p-0 overflow-hidden">
                          <DialogHeader className="sr-only">
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <img src={data?.profileImg?.publicUrl || ""} alt="" />
                        </DialogContent>
                      </Dialog>
                      <div className="absolute   flex items-center justify-center flex-col">
                        {data?.PWD && <Badge variant="secondary">PWD</Badge>}
                        {data?.indigenous && (
                          <Badge variant="secondary">INDIGENOUS</Badge>
                        )}
                      </div>
                    </div>

                    {loading ? (
                      <div className="flex flex-col gap-2 flex-1 px-4">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : (
                      <div className="flex-1 items-end px-4 py-2 z-10">
                        <div className="flex items-center gap-3">
                          <h1 className="text-xl font-medium text-foreground">
                            {data?.lName}, {data?.fName} {data?.mName}
                          </h1>
                          <div className="space-x-1.5">
                            <Badge variant="outline" className="mt-2 uppercase">
                              {data?.institute}
                            </Badge>
                            <Badge variant="outline" className="mt-2 uppercase">
                              {data?.course}-{data?.year.slice(0, 1)}
                              {data?.section}
                            </Badge>
                            <Badge variant="outline" className="mt-2 uppercase">
                              {data?.gender}
                            </Badge>
                          </div>
                        </div>
                        <p className="font-medium font-mono text-base tracking-wide">
                          {data?.Account.schoolId}
                        </p>{" "}
                        <p className="text-muted-foreground text-sm">
                          {data?.Account.email}
                        </p>
                      </div>
                    )}
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 px-4 bg-card relative ">
                    <div className="space-y-1.5  border-l-2 pl-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          Total Application
                        </h1>
                      </div>
                      {loading ? (
                        <Skeleton className="h-5 w-full" />
                      ) : (
                        <span className="font-medium text-foreground line-clamp-1">
                          1
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5  border-l-2 pl-4">
                      <div className="flex items-center gap-2">
                        <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          Approved Application
                        </h1>
                      </div>
                      {loading ? <Skeleton className="h-5 w-20" /> : "1"}
                    </div>
                    <div className="space-y-1.5  border-l-2 pl-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                        <h1 className="text-xs text-muted-foreground">
                          Pending Application
                        </h1>
                      </div>
                      {loading ? <Skeleton className="h-5 w-full" /> : "1"}
                    </div>{" "}
                    <div className="space-y-1.5 border-l-2 pl-4">
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
                          {(data?.dateCreated &&
                            format(data?.dateCreated, "PPP")) ||
                            "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b px-6">
                  <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
                </div>
                {status === "info" ? (
                  <div className="space-y-6 p-6">
                    <div className="">
                      <h3 className="text-base font-medium flex gap-2 items-center py-3">
                        <UserRoundCog className="h-4.5 w-4.5" /> Personal
                        Information
                      </h3>
                      <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                      <FormField
                        control={form.control}
                        name="fName"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                First Name
                              </FormLabel>
                              <FormMessage />
                            </div>
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mName"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                Middle Name
                              </FormLabel>
                              <FormMessage />
                            </div>
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lName"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                Last Name
                              </FormLabel>
                              <FormMessage />
                            </div>
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
                          </FormItem>
                        )}
                      />{" "}
                      <FormField
                        control={form.control}
                        name="gender"
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
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
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
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="lg:col-span-2">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                Address
                              </FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl className="">
                              <div className="flex items-center">
                                <Input
                                  placeholder=""
                                  className="rounded-r-none"
                                  {...field}
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Map />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                Date of Birth
                              </FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <div className="flex items-center">
                                <span className="flex items-center  border border-input border-r-0 rounded-l-md text-sm">
                                  <Popover
                                    open={openCalendar}
                                    onOpenChange={setOpenCalendar}
                                  >
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" id="date">
                                        <Calendar1 />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto overflow-hidden p-0 pointer-events-auto"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
                                        }
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                          field.onChange(
                                            date
                                              ? format(date, "yyyy-MM-dd")
                                              : ""
                                          );
                                          setOpenCalendar(false);
                                        }}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </span>
                                <Input
                                  value={field.value ? field.value : ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="rounded-l-none"
                                  placeholder="YYYY-MM-DD"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-muted-foreground">
                                Contact Number
                              </FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl className="">
                              <div className="flex">
                                {/* Fixed +639 prefix */}
                                <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                                  +63
                                </span>
                                <Input
                                  type="text"
                                  placeholder=""
                                  maxLength={10}
                                  value={field.value?.replace("+63", "") || ""}
                                  onChange={(e) => {
                                    const val = e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 10);
                                    field.onChange(`+63${val}`);
                                  }}
                                  className="rounded-l-none"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="indigenous"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel
                              htmlFor="ind"
                              className="flex items-center justify-between line-clamp-1"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isIndigenousChecked}
                                  id="ind"
                                  onChange={(e) =>
                                    setIsIndigenousChecked(e.target.checked)
                                  }
                                />
                                Indigenous Group (IG)
                              </div>
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  className="rounded-r-none"
                                  placeholder="Please specify your Indigenous group (if applicable)"
                                  {...field}
                                  disabled={!isIndigenousChecked}
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Feather />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="PWD"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel
                              htmlFor="pwdd"
                              className="flex items-center justify-between line-clamp-1"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isPWDChecked}
                                  id="pwdd"
                                  onChange={(e) =>
                                    setIsPWDChecked(e.target.checked)
                                  }
                                />
                                Person with Disability (PWD)
                              </div>
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  placeholder="Please specify your disability (if applicable)"
                                  {...field}
                                  className="rounded-r-none"
                                  disabled={!isPWDChecked}
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Accessibility />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ) : status === "account" ? (
                  <div className="space-y-6 p-6">
                    <div className="">
                      <h3 className="text-base font-medium flex gap-2 items-center py-3">
                        <Mail className="h-4.5 w-4.5" /> Account Information
                      </h3>
                      <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                      <FormField
                        control={form.control}
                        name="Account.schoolId"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-muted-foreground">
                              Student ID
                            </FormLabel>
                            <FormControl className="">
                              <div className="flex items-center">
                                {" "}
                                <Input
                                  placeholder=""
                                  className="rounded-r-none"
                                  type="number"
                                  {...field}
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <IdCard />
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
                        name="course"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-muted-foreground">
                              Course
                            </FormLabel>
                            <FormControl className="">
                              <div className="flex items-center">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="rounded-r-none w-full">
                                    <SelectValue placeholder="Select Course" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="BSIT">
                                      BSIT - Information Technology
                                    </SelectItem>
                                    <SelectItem value="BSCS">
                                      BSCS - Computer Science
                                    </SelectItem>
                                    <SelectItem value="BSGE">
                                      BSGE - Geodetic Engineering
                                    </SelectItem>
                                    <SelectItem value="BSFT">
                                      BSFT - Food Technology
                                    </SelectItem>
                                    <SelectItem value="BSABEN">
                                      BSABEN - Agricultural Engineering
                                    </SelectItem>
                                    <SelectItem value="BSED">
                                      BSED - Secondary Education
                                    </SelectItem>
                                    <SelectItem value="BSBA">
                                      BSBA - Business Administration
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <GraduationCap />
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
                        name="Account.email"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel className="text-muted-foreground">
                              Email
                            </FormLabel>
                            <FormControl className="">
                              <div className="flex items-center">
                                {" "}
                                <Input
                                  placeholder=""
                                  className="rounded-r-none"
                                  type="email"
                                  {...field}
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
                        name="year"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-muted-foreground">
                              Year Level
                            </FormLabel>
                            <FormControl className="">
                              <div className="flex items-center">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="rounded-r-none w-full">
                                    <SelectValue placeholder="Select Year Level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1st Year">
                                      1st Year
                                    </SelectItem>
                                    <SelectItem value="2nd Year">
                                      2nd Year
                                    </SelectItem>
                                    <SelectItem value="3rd Year">
                                      3rd Year
                                    </SelectItem>
                                    <SelectItem value="4th Year">
                                      4th Year
                                    </SelectItem>
                                    <SelectItem value="5th Year">
                                      5th Year
                                    </SelectItem>
                                    <SelectItem value="6th Year">
                                      6th Year
                                    </SelectItem>
                                    <SelectItem value="7th Year">
                                      7th Year
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <BookMarked />
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
                        name="section"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-muted-foreground">
                              Section
                            </FormLabel>
                            <FormControl className="">
                              <div className="flex items-center">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="rounded-r-none w-full">
                                    <SelectValue placeholder="Select Section" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                    <SelectItem value="E">E</SelectItem>
                                    <SelectItem value="F">F</SelectItem>
                                    <SelectItem value="G">G</SelectItem>
                                    <SelectItem value="H">H</SelectItem>
                                    <SelectItem value="I">I</SelectItem>
                                    <SelectItem value="J">J</SelectItem>
                                  </SelectContent>
                                </Select>
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <LayoutPanelTop />
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
                ) : status === "scholarship" ? (
                  ""
                ) : (
                  ""
                )}
              </ScrollArea>
              <div className="p-4 flex gap-3">
                <Button
                  className="cursor-pointer flex-1"
                  type="submit"
                  disabled={ludeng || !isChanged}
                >
                  <Check />
                  {ludeng ? "Saving..." : "Save Changes"}
                  {ludeng && <Loader className="animate-spin" />}
                </Button>
                <DeleteDialog
                  open={openDelete}
                  onOpenChange={setOpenDelete}
                  onConfirm={onSubmit}
                  loading={deleteLoading}
                  title="Delete Account?"
                  description="This will permanently delete account and cannot be undone."
                  confirmText="Delete"
                  cancelText="Keep Account"
                  trigger={
                    <Button
                      onClick={() => setOpenDelete(true)}
                      type="button"
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 /> Delete Account
                    </Button>
                  }
                />
              </div>
            </form>
          </Form>
        )}
      </DrawerContent>
    </Drawer>
  );
}
function ProfileSkeleton() {
  return (
    <div className="space-y-6 bg-background rounded-t-lg">
      {/* Header Skeleton */}
      <div>
        <div className="relative flex lg:items-end items-center py-8 px-4 gap-4 bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30">
          {/* Profile Image Skeleton */}
          <Skeleton className="h-24 w-24 rounded-full flex-shrink-0" />

          {/* Header Content Skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 px-4 bg-card ">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2 border-l-2 pl-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Form Section Skeleton */}
      <div className="space-y-6 p-6">
        {/* Section Header */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <div className="h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Form Fields Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

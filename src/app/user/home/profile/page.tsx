"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accessibility,
  AlertCircle,
  ArrowRight,
  BookMarked,
  Briefcase,
  Calendar1,
  Check,
  CheckIcon,
  CircleUserRound,
  EyeIcon,
  EyeOffIcon,
  Feather,
  GraduationCap,
  IdCard,
  Key,
  LayoutPanelTop,
  Loader,
  LoaderCircleIcon,
  Mail,
  Map,
  MapPinHouse,
  PhilippinePeso,
  Trash2,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logo from "@/assets/edugrant-logo.png";
import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useUpdateProfile } from "@/hooks/user/postProfileUpdate";
import { Separator } from "@/components/ui/separator";
import TitleReusable from "@/components/ui/title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useChangePasswordProfileUser } from "@/hooks/zod/user/changePasswordProfileZod";
import { useProfileUserChangePassword } from "@/hooks/user/profileUserChangePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useProfileUserChangeEmail } from "@/hooks/user/profileUserChangeEmail";
import { Skeleton } from "@/components/ui/skeleton";
export default function Profile() {
  const { user, loadingUser: useLoading } = useUserStore();
  const [openCalendar, setOpenCalendar] = useState(false);

  const { form, siblings, handleSubmit, loading, isChanged } =
    useUpdateProfile(user);

  const {
    open,
    setOpen,
    step,
    setStep,
    changePasswordForm,
    changePasswordOtpForm,
    handleSendCode,
    handleOtpVerification,
    authLoading,
    verifyLoading,
    requestNewCode,
    resendTimer,
  } = useProfileUserChangePassword();

  const {
    open: openChangeEmail,
    setOpen: setOpenChangeEmail,
    step: stepChangeEmail,
    setStep: setStepChangeEmail,
    changeEmailForm,
    changeEmailOtpForm,
    handleSendCode: handleSendCodeChangeEmail,
    handleOtpVerification: handleOtpVerificationChangeEmail,
    authLoading: authLoadingChangeEmail,
    verifyLoading: verifyLoadingChangeEmail,
    requestNewCode: requestNewCodeChangeEmail,
    resendTimer: resendTimerChangeEmail,
  } = useProfileUserChangeEmail();

  const [tab, setTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Student Information", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pb-10   w-full p-2 lg:p-0 mx-auto">
        <div className="py-8 space-y-8  mt-20 lg:w-[60%] w-full mx-auto">
          <div className=" lg:w-[60%] w-full flex items-end">
            {useLoading ? (
              <>
                {/* Avatar Skeleton */}
                <Skeleton className="size-25 rounded-full flex-shrink-0" />

                {/* Text Content Skeleton */}
                <div className="p-3 flex-1">
                  <Skeleton className="h-7 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </>
            ) : (
              <>
                {/* Avatar */}
                <div className="size-20 bg-emerald-900 rounded-full flex justify-center items-center text-2xl font-bold tracking-wide text-white shadow-lg flex-shrink-0">
                  JT
                </div>

                {/* Text Content */}
                <div className="p-3">
                  <h1 className="text-xl font-medium text-foreground">
                    {user?.Student?.lName}, {user?.Student?.fName}{" "}
                    {user?.Student?.mName}
                  </h1>
                  <p className="text-muted-foreground text-sm">{user?.role}</p>
                </div>
              </>
            )}
          </div>
          <div className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar ">
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </div>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                {tab === "personal" && (
                  <div className=" w-full space-y-12">
                    <div className="space-y-6">
                      <div className="">
                        <h3 className="text-base font-medium flex gap-2 items-center py-3">
                          <UserRoundCog className="h-4.5 w-4.5" /> Personal
                          Information
                        </h3>
                        <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <FormField
                          control={form.control}
                          name="Student.fName"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="text-muted-foreground">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    {...field}
                                    className="rounded-r-none"
                                  />
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
                          name="Student.mName"
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
                          name="Student.lName"
                          render={({ field }) => (
                            <FormItem className="">
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
                        />{" "}
                        <FormField
                          control={form.control}
                          name="Student.gender"
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
                          name="Student.address"
                          render={({ field }) => (
                            <FormItem className="lg:col-span-2">
                              <FormLabel className="text-muted-foreground">
                                Address
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
                                      <Map />
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
                          name="Student.dateOfBirth"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="text-muted-foreground">
                                Date of Birth
                              </FormLabel>
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="Student.contactNumber"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="text-muted-foreground">
                                Contact Number
                              </FormLabel>
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
                                    value={
                                      field.value?.replace("+63", "") || ""
                                    }
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="">
                        <h3 className="text-base font-medium flex gap-2 items-center py-3">
                          <Mail className="h-4.5 w-4.5" /> Account Information
                        </h3>
                        <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <FormField
                          control={form.control}
                          name="schoolId"
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
                                    disabled
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
                          name="Student.course"
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
                          name="Student.year"
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
                          name="Student.section"
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

                        <FormField
                          control={form.control}
                          name="Student.indigenous"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="flex items-center justify-between line-clamp-1">
                                Indigenous Group (IG) <FormMessage />
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    className="rounded-r-none"
                                    placeholder="Please specify your Indigenous group (if applicable)"
                                    {...field}
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
                          name="Student.PWD"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="flex items-center justify-between line-clamp-1">
                                Person with Disability (PWD) <FormMessage />
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    placeholder="Please specify your disability (if applicable)"
                                    {...field}
                                    className="rounded-r-none"
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
                  </div>
                )}

                {tab === "family" && (
                  <div className=" w-full ">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 pb-10">
                      {/* <p className="text-sm text-muted-foreground p-4 bg-card col-span-2 rounded-md flex gap-2 items-center">
                      <AlertCircle size={15} /> If no information available,
                      type <span className="font-medium">N/A.</span>
                    </p> */}
                      <div className="lg:col-span-2 col-span-1 space-y-4">
                        <div className="flex items-center gap-3 flex-col lg:flex-row">
                          <h3 className="text-lg font-medium flex gap-2 items-center">
                            Father Information
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                          <Controller
                            control={form.control}
                            name="Student.familyBackground.fatherStatus" // matches Zod schema
                            // default status
                            render={({ field }) => (
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Separated"
                                    id="fatherStatus-separated"
                                  />
                                  <Label htmlFor="fatherStatus-separated">
                                    Separated
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Living"
                                    id="fatherStatus-living"
                                  />
                                  <Label htmlFor="fatherStatus-living">
                                    Living
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Deceased"
                                    id="fatherStatus-deceased"
                                  />
                                  <Label htmlFor="fatherStatus-deceased">
                                    Deceased
                                  </Label>
                                </div>
                              </RadioGroup>
                            )}
                          />
                        </div>
                      </div>

                      {/* Father Full Name */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Full Name
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

                      {/* Father Address */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Address
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Map />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Father Contact Number */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherContactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Contact Number
                            </FormLabel>
                            <FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Father Occupation */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherOccupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Occupation
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Briefcase />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Father Highest Education */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherHighestEducation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Highest Education Attainment
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
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

                      {/* Father Taxable Income */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.fatherTotalParentsTaxableIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Taxable Income
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  {...field}
                                  className="rounded-r-none"
                                  type="number"
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <PhilippinePeso />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 py-10">
                      <div className="lg:col-span-2 col-span-1 space-y-4">
                        <div className="flex items-center gap-3 flex-col lg:flex-row">
                          <h3 className="text-lg font-medium flex gap-2 items-center">
                            Mother Information
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                          <Controller
                            control={form.control}
                            name="Student.familyBackground.motherStatus"
                            render={({ field }) => (
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Separated"
                                    id="motherStatus-separated"
                                  />
                                  <Label htmlFor="motherStatus-separated">
                                    Separated
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Living"
                                    id="motherStatus-living"
                                  />
                                  <Label htmlFor="motherStatus-living">
                                    Living
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Deceased"
                                    id="motherStatus-deceased"
                                  />
                                  <Label htmlFor="motherStatus-deceased">
                                    Deceased
                                  </Label>
                                </div>
                              </RadioGroup>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="Student.familyBackground.motherFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Full Name
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
                        name="Student.familyBackground.motherAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Address
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Map />
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
                        name="Student.familyBackground.motherContactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Contact Number
                            </FormLabel>
                            <FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Student.familyBackground.motherOccupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Occupation
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Briefcase />
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
                        name="Student.familyBackground.motherHighestEducation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Highest Education Attainment
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
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
                        name="Student.familyBackground.motherTotalParentsTaxableIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Taxable Income
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  {...field}
                                  className="rounded-r-none"
                                  type="number"
                                />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <PhilippinePeso />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                      <div className="lg:col-span-2 col-span-1 space-y-4">
                        <div className="flex items-center gap-3 flex-col lg:flex-row">
                          <h3 className="text-lg font-medium flex gap-2 items-center">
                            Guardian Information
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        </div>
                      </div>

                      {/* Guardian Full Name */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.guardianFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Full Name
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

                      {/* Guardian Address */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.guardianAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Address
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Map />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Guardian Contact Number */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.guardianContactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Contact Number
                            </FormLabel>
                            <FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Guardian Occupation */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.guardianOccupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Occupation
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
                                <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                  <Button variant="ghost">
                                    <Briefcase />
                                  </Button>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Guardian Highest Education */}
                      <FormField
                        control={form.control}
                        name="Student.familyBackground.guardianHighestEducation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Highest Education Attainment
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input {...field} className="rounded-r-none" />
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
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                      <div className="lg:col-span-2 col-span-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium flex gap-2 items-center">
                            Siblings Information
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                          <Button
                            size="sm"
                            onClick={() =>
                              siblings.append({
                                fullName: "",
                                age: "",
                                occupation: "",
                              })
                            }
                          >
                            + Add fields
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 col-span-3">
                        {siblings.fields.map(
                          (
                            item: {
                              id: string;
                              fullName: string;
                              age: string;
                              occupation: string;
                            },
                            index
                          ) => (
                            <div key={item.id} className="space-y-3 w-full">
                              <div className="flex gap-3 items-end ">
                                <FormField
                                  control={form.control}
                                  name={`Student.familyBackground.siblings.${index}.fullName`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormLabel className="text-muted-foreground">
                                        Full Name
                                      </FormLabel>
                                      <FormControl className="">
                                        <div className="flex-1">
                                          <Input
                                            {...field}
                                            className="w-full bg-card capitalize border-0 "
                                          />
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`Student.familyBackground.siblings.${index}.age`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormLabel className="text-muted-foreground">
                                        Age
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          className="w-full bg-card "
                                          type="number"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`Student.familyBackground.siblings.${index}.occupation`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormLabel className="text-muted-foreground">
                                        Occupation
                                      </FormLabel>
                                      <FormControl>
                                        <div className="w-full">
                                          <Input
                                            {...field}
                                            className="w-full bg-card capitalize border-0 "
                                          />
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => siblings.remove(index)}
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                            className="cursor-pointer"
                            type="submit"
                            disabled={loading}
                          >
                            <Check />
                            {loading ? "Saving..." : "Save Changes"}
                            {loading && <Loader className="animate-spin" />}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </Form>

            {tab === "security" && (
              <div className=" w-full space-y-8">
                <div className="flex items-center gap-3">
                  <h3 className=" font-medium text-sm flex gap-2 items-center">
                    Change Password
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Change</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Change Password</AlertDialogTitle>
                        <AlertDialogDescription>
                          Update your password to keep your account secure. This
                          action will replace your current password.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      {step === "email" && (
                        <Form {...changePasswordForm}>
                          <form
                            className="space-y-6"
                            onSubmit={changePasswordForm.handleSubmit(
                              handleSendCode
                            )}
                          >
                            <FormField
                              control={changePasswordForm.control}
                              name="oldPassword"
                              render={({ field }) => {
                                const [isVisible, setIsVisible] =
                                  useState(false);
                                const toggleVisibility = () =>
                                  setIsVisible((prev) => !prev);

                                return (
                                  <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                      Old Password
                                    </FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type={isVisible ? "text" : "password"}
                                          placeholder=""
                                          {...field}
                                          className="pe-9"
                                          disabled={authLoading}
                                        />
                                        <button
                                          type="button"
                                          onClick={toggleVisibility}
                                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
                                        >
                                          {isVisible ? (
                                            <EyeOffIcon size={16} />
                                          ) : (
                                            <EyeIcon size={16} />
                                          )}
                                        </button>
                                      </div>
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                            <FormField
                              control={changePasswordForm.control}
                              name="newPassword"
                              render={({ field }) => {
                                const [isVisible, setIsVisible] =
                                  useState(false);
                                const toggleVisibility = () =>
                                  setIsVisible((prev) => !prev);

                                const checkStrength = (pass: string) => {
                                  const requirements = [
                                    {
                                      regex: /.{8,}/,
                                      text: "At least 8 characters",
                                    },
                                    {
                                      regex: /[0-9]/,
                                      text: "At least 1 number",
                                    },
                                    {
                                      regex: /[a-z]/,
                                      text: "At least 1 lowercase letter",
                                    },
                                    {
                                      regex: /[A-Z]/,
                                      text: "At least 1 uppercase letter",
                                    },
                                  ];
                                  return requirements.map((req) => ({
                                    met: req.regex.test(pass),
                                    text: req.text,
                                  }));
                                };

                                const strength = checkStrength(
                                  field.value || ""
                                );
                                const strengthScore = strength.filter(
                                  (req) => req.met
                                ).length;

                                const getStrengthColor = (score: number) => {
                                  if (score === 0) return "bg-border";
                                  if (score <= 1) return "bg-red-500";
                                  if (score <= 2) return "bg-orange-500";
                                  if (score === 3) return "bg-amber-500";
                                  return "bg-emerald-500";
                                };

                                const getStrengthText = (score: number) => {
                                  if (score === 0) return "Enter a password";
                                  if (score <= 2) return "Weak password";
                                  if (score === 3) return "Medium password";
                                  return "Strong password";
                                };

                                return (
                                  <FormItem className="lg:col-span-2">
                                    <FormLabel className="flex items-center justify-between">
                                      Password <FormMessage />
                                    </FormLabel>

                                    {/* Password Input + Toggle */}
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type={isVisible ? "text" : "password"}
                                          placeholder=""
                                          {...field}
                                          className="pe-9"
                                          disabled={authLoading}
                                        />
                                        <button
                                          type="button"
                                          onClick={toggleVisibility}
                                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
                                        >
                                          {isVisible ? (
                                            <EyeOffIcon size={16} />
                                          ) : (
                                            <EyeIcon size={16} />
                                          )}
                                        </button>
                                      </div>
                                    </FormControl>

                                    {/* Strength Bar */}
                                    <div
                                      className="bg-border mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
                                      role="progressbar"
                                      aria-valuenow={strengthScore}
                                      aria-valuemin={0}
                                      aria-valuemax={4}
                                    >
                                      <div
                                        className={`h-full ${getStrengthColor(
                                          strengthScore
                                        )} transition-all duration-500`}
                                        style={{
                                          width: `${
                                            (strengthScore / 4) * 100
                                          }%`,
                                        }}
                                      />
                                    </div>

                                    {/* Strength Text */}
                                    <p className="text-sm font-medium mb-2">
                                      {getStrengthText(strengthScore)}. Must
                                      contain:
                                    </p>

                                    {/* Requirements */}
                                    <ul className="space-y-1.5">
                                      {strength.map((req, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-center gap-2"
                                        >
                                          {req.met ? (
                                            <CheckIcon
                                              size={16}
                                              className="text-emerald-500"
                                            />
                                          ) : (
                                            <XIcon
                                              size={16}
                                              className="text-muted-foreground/80"
                                            />
                                          )}
                                          <span
                                            className={`text-xs ${
                                              req.met
                                                ? "text-emerald-600"
                                                : "text-muted-foreground"
                                            }`}
                                          >
                                            {req.text}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={changePasswordForm.control}
                              name="confirmNewPassword"
                              render={({ field }) => {
                                const [isVisible, setIsVisible] =
                                  useState(false);
                                const toggleVisibility = () =>
                                  setIsVisible((prev) => !prev);

                                return (
                                  <FormItem className="lg:col-span-2">
                                    <FormLabel className="flex items-center justify-between">
                                      Confirm Password <FormMessage />
                                    </FormLabel>

                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type={isVisible ? "text" : "password"}
                                          placeholder=""
                                          {...field}
                                          className="pe-9"
                                          disabled={authLoading}
                                        />
                                        <button
                                          type="button"
                                          onClick={toggleVisibility}
                                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
                                        >
                                          {isVisible ? (
                                            <EyeOffIcon size={16} />
                                          ) : (
                                            <EyeIcon size={16} />
                                          )}
                                        </button>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />

                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={authLoading}>
                                Cancel
                              </AlertDialogCancel>
                              <Button type="submit" disabled={authLoading}>
                                {authLoading ? (
                                  <>
                                    Please wait...
                                    <Loader className=" animate-spin" />
                                  </>
                                ) : (
                                  <>
                                    Continue
                                    <ArrowRight />
                                  </>
                                )}
                              </Button>
                            </AlertDialogFooter>
                          </form>
                        </Form>
                      )}

                      {step === "otp" && (
                        <Form {...changePasswordOtpForm}>
                          <form
                            onSubmit={changePasswordOtpForm.handleSubmit(
                              handleOtpVerification
                            )}
                            className="space-y-6"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              <FormField
                                control={changePasswordOtpForm.control}
                                name="otp"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="flex justify-between items-center">
                                      <FormMessage />
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center justify-center">
                                        <InputOTP
                                          maxLength={6}
                                          value={field.value}
                                          onChange={(value) => {
                                            field.onChange(value);
                                          }}
                                          disabled={verifyLoading}
                                        >
                                          <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                          </InputOTPGroup>
                                        </InputOTP>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.7 }}
                              className="flex gap-3"
                            >
                              <Button
                                type="button"
                                className="flex-1 "
                                disabled={verifyLoading}
                                variant="outline"
                                onClick={() => setStep("email")}
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 "
                                disabled={verifyLoading}
                                variant={verifyLoading ? "outline" : "default"}
                              >
                                {verifyLoading ? (
                                  <>
                                    Verifying...
                                    <Loader
                                      className="-ms-1 animate-spin"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                  </>
                                ) : (
                                  <>
                                    Change Password
                                    <ArrowRight />
                                  </>
                                )}
                              </Button>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                              className="relative flex justify-center items-center gap-3 mt-7"
                            >
                              <div className=" border-b flex-1"></div>
                              {/* <Label>
                                                Didn&apos;t get the code?
                                                <span className="underline" onClick={requestNewCode}>
                                                  Resend Now
                                                </span>
                                              </Label> */}
                              <Button
                                variant="link"
                                size="sm"
                                type="button"
                                onClick={requestNewCode}
                                disabled={
                                  resendTimer > 0 ||
                                  authLoading ||
                                  verifyLoading
                                }
                              >
                                {resendTimer > 0
                                  ? `Resend in ${resendTimer}s`
                                  : "Resend Code"}
                              </Button>

                              <div className=" border-b flex-1"></div>
                            </motion.div>
                            {/* {expiresAt && Date.now() > expiresAt && (
                                              <p className="text-red-500 text-sm text-center">
                                                OTP expired. Please request a new code.
                                              </p>
                                            )} */}
                          </form>
                        </Form>
                      )}
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="flex items-center gap-3">
                  <h3 className=" font-medium text-sm flex gap-2 items-center">
                    Change Email
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Change</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Change Email</AlertDialogTitle>
                        <AlertDialogDescription>
                          Update your email to keep your account secure. This
                          action will replace your current email.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      {stepChangeEmail === "email" && (
                        <Form {...changeEmailForm}>
                          <form
                            className="space-y-6"
                            onSubmit={changeEmailForm.handleSubmit(
                              handleSendCodeChangeEmail
                            )}
                          >
                            <FormField
                              control={changeEmailForm.control}
                              name="newEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-muted-foreground">
                                    New Email
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder=""
                                      {...field}
                                      disabled={authLoadingChangeEmail}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />

                            <AlertDialogFooter>
                              <AlertDialogCancel
                                disabled={authLoadingChangeEmail}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <Button
                                type="submit"
                                disabled={authLoadingChangeEmail}
                              >
                                {authLoadingChangeEmail ? (
                                  <>
                                    Please wait...
                                    <Loader className=" animate-spin" />
                                  </>
                                ) : (
                                  <>
                                    Continue
                                    <ArrowRight />
                                  </>
                                )}
                              </Button>
                            </AlertDialogFooter>
                          </form>
                        </Form>
                      )}

                      {stepChangeEmail === "otp" && (
                        <Form {...changeEmailOtpForm}>
                          <form
                            onSubmit={changeEmailOtpForm.handleSubmit(
                              handleOtpVerificationChangeEmail
                            )}
                            className="space-y-6"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              <FormField
                                control={changeEmailOtpForm.control}
                                name="otp"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="flex justify-between items-center">
                                      <FormMessage />
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center justify-center">
                                        <InputOTP
                                          maxLength={6}
                                          value={field.value}
                                          onChange={(value) => {
                                            field.onChange(value);
                                          }}
                                          disabled={verifyLoadingChangeEmail}
                                        >
                                          <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                          </InputOTPGroup>
                                        </InputOTP>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.7 }}
                              className="flex gap-3"
                            >
                              <Button
                                type="button"
                                className="flex-1 "
                                disabled={verifyLoadingChangeEmail}
                                variant="outline"
                                onClick={() => setStep("email")}
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 "
                                disabled={verifyLoadingChangeEmail}
                                variant={
                                  verifyLoadingChangeEmail
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {verifyLoadingChangeEmail ? (
                                  <>
                                    Verifying...
                                    <Loader
                                      className="-ms-1 animate-spin"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                  </>
                                ) : (
                                  <>
                                    Change Email
                                    <ArrowRight />
                                  </>
                                )}
                              </Button>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                              className="relative flex justify-center items-center gap-3 mt-7"
                            >
                              <div className=" border-b flex-1"></div>
                              {/* <Label>
                                                Didn&apos;t get the code?
                                                <span className="underline" onClick={requestNewCode}>
                                                  Resend Now
                                                </span>
                                              </Label> */}
                              <Button
                                variant="link"
                                size="sm"
                                type="button"
                                onClick={requestNewCode}
                                disabled={
                                  resendTimer > 0 ||
                                  authLoading ||
                                  verifyLoading
                                }
                              >
                                {resendTimer > 0
                                  ? `Resend in ${resendTimer}s`
                                  : "Resend Code"}
                              </Button>

                              <div className=" border-b flex-1"></div>
                            </motion.div>
                            {/* {expiresAt && Date.now() > expiresAt && (
                                              <p className="text-red-500 text-sm text-center">
                                                OTP expired. Please request a new code.
                                              </p>
                                            )} */}
                          </form>
                        </Form>
                      )}
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//  <Button
//    size="lg"
//    className="cursor-pointer"
//    onClick={async () => {
//      console.log("Button clicked - starting validation");

//      // Get current form values
//      const currentValues = form.getValues();
//      console.log("Current form values:", currentValues);

//      // Manually validate with Zod schema
//      try {
//        const validationResult = UserSchema.parse(currentValues);
//        console.log("✅ Zod validation passed:", validationResult);

//        // Now try react-hook-form validation
//        const isValid = await form.trigger();
//        console.log("React Hook Form validation result:", isValid);

//        if (isValid) {
//          console.log("Calling handleSubmit with validated data");
//          handleSubmit(currentValues);
//        } else {
//          console.log("❌ React Hook Form validation failed");
//          const formErrors = form.formState.errors;
//          console.log("Form errors:", formErrors);
//        }
//      } catch (zodError) {
//        console.log("❌ Zod validation failed:", zodError);
//        if (zodError instanceof z.ZodError) {
//          console.log("Detailed Zod errors:", zodError.errors);
//          zodError.errors.forEach((error) => {
//            console.log(`Field: ${error.path.join(".")} - ${error.message}`);
//          });
//        }
//      }
//    }}
//    disabled={loading}
//  >
//    <Check />
//    {loading ? "Saving..." : "Save Changes"}
//    {loading && <Loader className="animate-spin" />}
//  </Button>;

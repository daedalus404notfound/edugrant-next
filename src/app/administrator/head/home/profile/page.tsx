"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar1,
  Check,
  CheckIcon,
  CircleUserRound,
  Crown,
  EyeIcon,
  EyeOffIcon,
  Loader,
  Mail,
  Map,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  XIcon,
} from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Tabs } from "@/components/ui/vercel-tabs";

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
const items = [
  {
    id: 1,
    date: new Date("2024-01-09T10:55:00"),
    description: "System backup completed successfully.",
  },
  {
    id: 2,
    date: new Date("2024-01-09T10:50:00"),
    description:
      "User authentication service restarted due to configuration update.",
  },
  {
    id: 3,
    date: new Date("2024-01-09T10:45:00"),
    description: "Warning: High CPU usage detected on worker node-03.",
  },
  {
    id: 4,
    date: new Date("2024-01-09T10:40:00"),
    description: "New deployment initiated for api-service v2.1.0.",
  },
];
import { useAdminStore } from "@/store/adminUserStore";
import { useUpdateProfileAdmin } from "@/hooks/head-edit-handler";
import { useProfileUserChangePassword } from "@/hooks/user/profileUserChangePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function Profile() {
  const { admin } = useAdminStore();
  const [openCalendar, setOpenCalendar] = useState(false);

  const { form, handleSubmit, loading, isChanged } = useUpdateProfileAdmin(
    admin ?? undefined
  );
  const [tab, setTab] = useState("personal");

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
  const tabs = [
    { id: "personal", label: "Head Information", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pt-10  pt-3 lg:w-3/4 w-full p-2 lg:p-0 mx-auto">
        {/* <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <TitleReusable
            title="Profile Settings"
            description="Manage and update your personal information and account preferences."
            Icon={UserRoundCog}
          />
        </motion.div> */}

        <div className="h-50 w-full rounded-md relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 shadow-md">
          <div className="absolute -bottom-20 left-4 flex items-end">
            <div className="size-30 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 rounded-full flex justify-center items-center text-2xl font-bold tracking-wide text-white shadow-lg">
              JT
            </div>
            <div className="p-3">
              <h1 className="text-xl font-medium text-foreground">
                Tecson, Jerome Laguyo
              </h1>
              <p className="text-muted-foreground text-sm">2022000493</p>
            </div>
          </div>
        </div>

        <div className="py-8 px-4 space-y-8 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar "
          >
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </motion.div>
          <Form {...form}>
            <div className="">
              {tab === "personal" && (
                <div className=" w-full space-y-5">
                  <h1>Personal Details</h1>
                  <div className="grid grid-cols-2  gap-8">
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
                    <FormField
                      control={form.control}
                      name="ISPSU_Head.address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
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
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                  <h1>Account Details</h1>
                  <div className="grid grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Role
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                disabled
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Crown />
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
                      name="dateCreated"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Date Created
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                disabled
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Calendar1 />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" /> */}
                  </div>
                </div>
              )}
            </div>
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
                              const [isVisible, setIsVisible] = useState(false);
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
                              const [isVisible, setIsVisible] = useState(false);
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

                              const strength = checkStrength(field.value || "");
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
                                        width: `${(strengthScore / 4) * 100}%`,
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
                              const [isVisible, setIsVisible] = useState(false);
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
                                resendTimer > 0 || authLoading || verifyLoading
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
                      onClick={form.handleSubmit(handleSubmit)}
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
        </div>
      </div>
    </div>
  );
}

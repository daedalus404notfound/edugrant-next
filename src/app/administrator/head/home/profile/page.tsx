"use client";
import React, { useState } from "react";
import { AnimatePresence, easeIn, easeInOut, motion } from "motion/react";
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
  Settings,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  XIcon,
} from "lucide-react";
import logo from "@/assets/edugrant-logo.png";
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

import { useAdminStore } from "@/store/adminUserStore";
import { useUpdateProfileAdmin } from "@/hooks/head-edit-handler";
import { useProfileUserChangePassword } from "@/hooks/user/profileUserChangePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Skeleton } from "@/components/ui/skeleton";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
export default function Profile() {
  const { admin, loading: loadingAdmin } = useAdminStore();
  const [openCalendar, setOpenCalendar] = useState(false);

  const { form, handleSubmit, loading, isChanged, reset, setReset } =
    useUpdateProfileAdmin(admin);
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
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Profile Settings"
          description="Manage your personal information, account details."
          Icon={Settings}
        />
        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
        </div>
        <div className="mt-15 lg:w-[60%] min-w-5xl w-full mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {tab === "personal" && (
                <div className=" w-full space-y-12">
                  <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
                    <div className="flex">
                      <div className="relative flex items-end gap-4">
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
                                  isSuccess={reset}
                                  setIsSuccess={setReset}
                                  label="backdrop image"
                                  accept={["image/png", "image/jpeg"]}
                                  initialImageUrl={
                                    admin?.ISPSU_Head.profileImg?.publicUrl
                                  }
                                  onFilesChange={(files) =>
                                    field.onChange(
                                      files[0]
                                        ? files[0]
                                        : admin?.ISPSU_Head.profileImg
                                            ?.publicUrl
                                    )
                                  } // Single file
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div>
                          <h1 className="text-lg font-medium">
                            {admin?.ISPSU_Head?.lName || ""},{" "}
                            {admin?.ISPSU_Head?.fName || ""}{" "}
                            {admin?.ISPSU_Head?.mName || ""}
                          </h1>
                          <p className="text-muted-foreground text-sm">
                            {admin?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
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
                  </div>

                  <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
                    <div className="">
                      <h3 className="text-base font-medium flex gap-2 items-center py-3">
                        <Mail className="h-4.5 w-4.5" /> Account Information
                      </h3>
                      <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
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
                              Member Since
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
                    </div>
                  </div>

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
              )}
            </form>
          </Form>

          {tab === "security" && (
            <div className=" w-full space-y-8">
              <div className="flex items-center justify-between bg-card p-4 rounded-md gap-3">
                <h3 className=" font-medium text-sm flex gap-2 items-center">
                  Change Password
                </h3>

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

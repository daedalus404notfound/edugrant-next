"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
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
  ArrowRight,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Loader,
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

import { Separator } from "@/components/ui/separator";

import { useProfileUserChangePassword } from "@/hooks/user/profileUserChangePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useProfileUserChangeEmail } from "@/hooks/user/profileUserChangeEmail";

export default function SecurityForm() {
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

  const [openPass, setOpenPass] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  return (
    <div className=" w-full space-y-8">
      <div className="flex items-center gap-3">
        <h3 className=" font-medium text-sm flex gap-2 items-center">
          Change Password
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button>Change</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Password</AlertDialogTitle>
              <AlertDialogDescription>
                Update your password to keep your account secure. This action
                will replace your current password.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {step === "email" && (
              <Form {...changePasswordForm}>
                <form
                  className="space-y-6"
                  onSubmit={changePasswordForm.handleSubmit(handleSendCode)}
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
                            {getStrengthText(strengthScore)}. Must contain:
                          </p>

                          {/* Requirements */}
                          <ul className="space-y-1.5">
                            {strength.map((req, idx) => (
                              <li key={idx} className="flex items-center gap-2">
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
                      disabled={resendTimer > 0 || authLoading || verifyLoading}
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
        <AlertDialog open={openChangeEmail} onOpenChange={setOpenChangeEmail}>
          <AlertDialogTrigger asChild>
            <Button>Change</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Email</AlertDialogTitle>
              <AlertDialogDescription>
                Update your email to keep your account secure. This action will
                replace your current email.
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
                    <AlertDialogCancel disabled={authLoadingChangeEmail}>
                      Cancel
                    </AlertDialogCancel>
                    <Button type="submit" disabled={authLoadingChangeEmail}>
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
                      variant={verifyLoadingChangeEmail ? "outline" : "default"}
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
                      disabled={resendTimer > 0 || authLoading || verifyLoading}
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
  );
}

"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Loader,
  Lock,
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
import { useProfileUserChangePassword } from "@/hooks/user/profileUserChangePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useProfileAdminChangePassword } from "@/hooks/head/profileUAdminChangePassword";

export default function ChangePassword() {
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
  } = useProfileAdminChangePassword();
  return (
    <div className="space-y-1 mt-8">
      <h3 className="text-base font-medium flex gap-2 items-center py-3">
        <Lock className="h-4.5 w-4.5" /> Account Security
      </h3>
      <div className="flex justify-between items-center dark:bg-card bg-card/30 dark:border-0  border-border/50 border shadow p-6 rounded-md">
        <h3 className=" font-medium text-sm flex gap-2 items-center">
          Change Password
        </h3>

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
                <form className="space-y-6">
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
                            New Password <FormMessage />
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
                    <Button
                      type="button"
                      disabled={authLoading}
                      onClick={changePasswordForm.handleSubmit(handleSendCode)}
                    >
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
                <form className="space-y-6">
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
                      type="button"
                      className="flex-1 "
                      disabled={verifyLoading}
                      onClick={changePasswordOtpForm.handleSubmit(
                        handleOtpVerification
                      )}
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
                </form>
              </Form>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

"use client";

import {
  ArrowRight,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Loader,
  Mail,
  XIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "motion/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLandingChangePassword } from "@/hooks/admin/adminChangePassword";

export default function LoginClientModal() {
  const router = useRouter();

  const {
    open,
    setOpen,
    step,
    changePasswordForm,
    changePasswordOtpForm,
    handleSendCode,
    handleOtpVerification,
    authLoading,
    verifyLoading,
    requestNewCode,
    resendTimer,
  } = useLandingChangePassword();
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset your password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your email address below and we&apos;ll send you a code to
            reset your password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {step === "email" && (
          <Form {...changePasswordForm}>
            <form
              onSubmit={changePasswordForm.handleSubmit(handleSendCode)}
              className="space-y-6"
            >
              <FormField
                control={changePasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Email <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={authLoading}
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <Button
                  variant="outline"
                  disabled={authLoading}
                  onClick={() => HandleCloseDrawer(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={authLoading}>
                  {authLoading ? (
                    <>
                      Sending Code... <Loader className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Reset Code <ArrowRight />
                    </>
                  )}
                </Button>
              </AlertDialogFooter>
            </form>{" "}
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
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FormField
                  control={changePasswordOtpForm.control}
                  name="password"
                  render={({ field }) => {
                    const [isVisible, setIsVisible] = useState(false);
                    const toggleVisibility = () =>
                      setIsVisible((prev) => !prev);

                    const checkStrength = (pass: string) => {
                      const requirements = [
                        { regex: /.{8,}/, text: "At least 8 characters" },
                        { regex: /[0-9]/, text: "At least 1 number" },
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
                              disabled={verifyLoading}
                              className="pe-9"
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
                />{" "}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FormField
                  control={changePasswordOtpForm.control}
                  name="confirmPassword"
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
                              disabled={verifyLoading}
                              className="pe-9"
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

                        {/* Optional Live Mismatch Warning */}
                        {/* {accountForm.watch("confirmPassword") &&
                            accountForm.watch("password") !==
                              accountForm.watch("confirmPassword") && (
                              <p className="text-xs text-red-500 mt-2">
                                Passwords do not match.
                              </p>
                            )} */}
                      </FormItem>
                    );
                  }}
                />{" "}
              </motion.div>
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
                        Enter 6-digit code
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
              >
                <Button
                  type="submit"
                  className="w-full "
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
                  disabled={resendTimer > 0 || authLoading}
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
  );
}

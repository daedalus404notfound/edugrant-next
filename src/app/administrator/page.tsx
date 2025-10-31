"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import logo from "@/assets/edugrant-logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import BlurText from "@/components/ui/blur";

import { useLoginHandler } from "@/hooks/postLoginHandler";
import { Loader, ArrowRight, EyeOffIcon, EyeIcon } from "lucide-react";
import { ModeToggle } from "@/components/ui/dark-mode";
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
import { Checkbox } from "@/components/ui/checkbox";
import useRememberAdminStore from "@/store/rememberMe-admin";
import Link from "next/link";
import Lamp from "@/components/ui/lamp";
import { Separator } from "@/components/ui/separator";

export default function LoginAdmin() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const {
    step,
    // setStep,
    LoginForm,
    otpForm,
    // LoginData,
    handleLogin,
    handleOtpVerification,
    authLoading,
    // authError,
    verifyLoading,
    // verifyError,
    // verifySuccess,
    requestNewCode,
    resendTimer,
    expiresAt,
  } = useLoginHandler();

  const { remember, setRemember } = useRememberAdminStore();
  return (
    <div className="relative flex justify-center items-center min-h-[100dvh] overflow-hidden bg-background">
      <Lamp />
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>
      <div className="absolute top-8 left-8 flex items-center">
        <img className="object-contain size-13" src={logo.src} alt="" />
      </div>
      <div className="flex gap-4  max-w-md w-full z-10">
        {step === "login" && (
          <div className="w-full">
            <form
              onSubmit={LoginForm.handleSubmit(handleLogin)}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col  gap-2 text-center space-y-3"
              >
                <h1 className="text-lg font-semibold">
                  Sign In to Administrator
                </h1>
                <div className="flex justify-center items-center gap-3">
                  <Separator className="flex-1" />
                  <p className=" text-sm">or</p>
                  <Separator className="flex-1" />
                </div>
                <Link className="w-full" href="/">
                  <Button className="w-full" variant="outline">
                    Login as student <ArrowRight />
                  </Button>
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-muted-foreground text-sm text-balance text-center"
              >
                Enter your credentials below to login your account.
              </motion.p>
              <div className="space-y-8">
                <Form {...LoginForm}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col  gap-2"
                  >
                    <FormField
                      control={LoginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="flex justify-between items-center">
                            Email <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              disabled={authLoading}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col  gap-2"
                  >
                    <FormField
                      control={LoginForm.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormItem className="">
                            <FormLabel className="flex justify-between items-center">
                              Password <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter your password"
                                  {...field}
                                  disabled={authLoading}
                                  className="pe-9"
                                  type={isVisible ? "text" : "password"}
                                />
                                <button
                                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                  type="button"
                                  onClick={toggleVisibility}
                                  aria-label={
                                    isVisible
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                  aria-pressed={isVisible}
                                  aria-controls="password"
                                >
                                  {isVisible ? (
                                    <EyeOffIcon size={16} aria-hidden="true" />
                                  ) : (
                                    <EyeIcon size={16} aria-hidden="true" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="flex justify-between items-center mt-3"
                    >
                      <span className="flex gap-1.5 items-center ">
                        <Checkbox
                          id="remember-admin"
                          disabled={authLoading}
                          checked={remember}
                          onCheckedChange={(checked: boolean) =>
                            setRemember(checked)
                          }
                        />
                        <Label htmlFor="remember-admin">Remember me</Label>
                      </span>

                      <Link href={`/administrator/change-password`}>
                        <Label className="hover:underline cursor-pointer">
                          Forgot password?
                        </Label>
                      </Link>
                    </motion.div>
                  </motion.div>
                </Form>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col  gap-2"
              >
                <Button type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? (
                    <>
                      Logging in...
                      <Loader className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        )}
        {step === "otp" && (
          <div className="w-full">
            <form
              onSubmit={otpForm.handleSubmit(handleOtpVerification)}
              className="space-y-12"
            >
              <Form {...otpForm}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h1 className="text-xl font-semibold">Email Verification</h1>
                  <p className="text-sm text-muted-foreground">
                    Enter 6-character verification code sent to your email.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className=" mt-5"
                >
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <div className="flex items-center">
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
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </Form>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className=""
                >
                  <Button
                    className="w-full"
                    disabled={verifyLoading}
                    variant={verifyLoading ? "outline" : "default"}
                    type="submit"
                  >
                    {verifyLoading ? (
                      <>
                        Logging In...
                        <Loader className=" animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Login
                        <ArrowRight />
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative flex justify-center items-center"
                >
                  <p className="text-sm font-medium">
                    Didn&apos;t get the code?
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-yellow-500 underline"
                    type="button"
                    onClick={requestNewCode}
                    disabled={resendTimer > 0 || authLoading || verifyLoading}
                  >
                    {resendTimer > 0 ? ` ${resendTimer}s` : "Resend Now"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

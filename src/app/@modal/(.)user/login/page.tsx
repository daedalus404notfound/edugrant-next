"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeClosed,
  IdCard,
  Loader,
  LockOpen,
  MailCheck,
} from "lucide-react";
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
import { useLoginHandler } from "@/hooks/user/postLoginHandler";
import { ModeToggle } from "@/components/ui/dark-mode";

import { Checkbox } from "@/components/ui/checkbox";

import useRememberStore from "@/store/rememberMe";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ModalHeader from "@/components/ui/modal-header";

export default function LoginClientModal() {
  const router = useRouter();

  const {
    open,
    setOpen,
    step,
    LoginForm,
    loginOtpForm,
    handleLogin,
    handleOtpVerification,
    authLoading,
    verifyLoading,
    requestNewCode,

    resendTimer,
    expiresAt,
  } = useLoginHandler();
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };
  const { remember, setRemember } = useRememberStore();
  const [hidden, setHidden] = useState(true);
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        onInteractOutside={(e) => {
          if (verifyLoading || authLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (verifyLoading || authLoading) e.preventDefault();
        }}
        className={`  lg:p-2 p-1 !border-0 !outline-0 ${
          isMobile ? "!bg-card mx-auto w-[98%]" : "!bg-transparent w-full"
        }`}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        {isMobile && (
          <ModalHeader text="Login" HandleCloseDrawer={HandleCloseDrawer} />
        )}
        <div className="relative z-10 flex justify-center items-center w-full  h-full lg:p-4 pt-4 rounded-2xl bg-background  dark:bg-card backdrop-blur-md">
          {/* <Button
            className="absolute top-6 left-6"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft />
          </Button> */}

          {step === "login" && (
            <div className="overflow-hidden w-full flex justify-center items-center flex-col p-4">
              <div className="  max-w-md w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col gap-4 justify-center"
                >
                  <h1 className="text-xl font-semibold text-center">
                    Sign In to Edugrant
                  </h1>

                  <div className="relative flex justify-center items-center gap-3">
                    <div className=" border-b flex-1"></div>
                    <Label>or</Label>
                    <div className=" border-b flex-1"></div>
                  </div>
                  <Link href={`/user/register`} prefetch>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={authLoading}
                    >
                      Sign up
                    </Button>
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-sm text-muted-foreground text-center mt-7"
                >
                  Welcome back! Please sign in to continue.
                </motion.p>
                <Form {...LoginForm}>
                  <form onSubmit={LoginForm.handleSubmit(handleLogin)}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <FormField
                        control={LoginForm.control}
                        name="studentId"
                        render={({ field }) => (
                          <FormItem className="mt-5">
                            <FormLabel className="flex justify-between items-center">
                              <span className="flex items-center gap-1.5">
                                <IdCard className="h-6" /> Student ID
                              </span>{" "}
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder=""
                                {...field}
                                aria-invalid={undefined}
                                disabled={authLoading}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <FormField
                        control={LoginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="mt-5">
                            <FormLabel className="flex justify-between items-center">
                              <span className="flex items-center gap-1.5">
                                <LockOpen className="h-5" /> Password
                              </span>
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={hidden ? "password" : "text"}
                                  placeholder=""
                                  {...field}
                                  disabled={authLoading}
                                />
                                <Button
                                  className="absolute right-0 top-0"
                                  variant="ghost"
                                  type="button"
                                  onClick={() => setHidden(!hidden)}
                                >
                                  {hidden ? <EyeClosed /> : <Eye />}
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="flex justify-between items-center mt-3"
                    >
                      <span className="flex gap-1.5 items-center ">
                        <Checkbox
                          id="remember"
                          disabled={authLoading}
                          checked={remember}
                          onCheckedChange={(checked: boolean) =>
                            setRemember(checked)
                          }
                        />
                        <Label htmlFor="remember">Remember me</Label>
                      </span>
                      <Link href={`/user/change-password`}>
                        <Label className="hover:underline cursor-pointer">
                          Forgot password?
                        </Label>
                      </Link>
                      {/* <AlertDialog>
                        <AlertDialogTrigger asChild></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Reset your password
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Enter your email address below and we&apos;ll send
                              you a link to reset your password.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <Input type="email" placeholder="Enter your email" />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              Send Reset Link <ArrowRight />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog> */}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="mt-7"
                    >
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={authLoading}
                        variant={authLoading ? "outline" : "default"}
                      >
                        {authLoading ? (
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
                            Continue
                            <ArrowRight />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="text-xs text-center p-4"
              >
                By clicking continue, you agree to our <br />
                <Link
                  scroll={false}
                  prefetch={true}
                  href={`/privacy-policy`}
                  className="underline text-blue-500 cursor-pointer"
                >
                  Privacy Policy
                </Link>
                &nbsp; and &nbsp;
                <Link
                  scroll={false}
                  prefetch={true}
                  href={`/terms&conditions`}
                  className="underline text-blue-500 cursor-pointer"
                >
                  Terms of Service
                </Link>
              </motion.p>
            </div>
          )}
          {step === "otp" && (
            <div className="overflow-hidden w-full flex justify-center items-center flex-col p-4">
              <div className="   max-w-md w-full ">
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div>
                    <h1 className="text-xl font-semibold">
                      Email Verification
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Enter 6-digit verification code sent to your email.
                    </p>
                  </div>
                  <MailCheck size={40} strokeWidth={1.5} />
                </motion.div>

                <Form {...loginOtpForm}>
                  <form
                    onSubmit={loginOtpForm.handleSubmit(handleOtpVerification)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <FormField
                        control={loginOtpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="mt-7">
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
                                    if (value.length === 6) {
                                      loginOtpForm.handleSubmit(
                                        handleOtpVerification
                                      )();
                                    }
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
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="w-full mt-7"
                        disabled={verifyLoading}
                        variant={verifyLoading ? "outline" : "default"}
                      >
                        {verifyLoading ? (
                          <>
                            Logging In...
                            <Loader
                              className="-ms-1 animate-spin"
                              size={16}
                              aria-hidden="true"
                            />
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
                      className="relative flex justify-center items-center gap-3 mt-7"
                    >
                      <div className=" border-b flex-1"></div>
                      {/* <Label>
                        Didn&apos;t get the code?
                        <span className="underline" onClick={requestNewCode}>
                          Resend Now
                        </span>
                      </Label> */}
                      {/* <Button
                        variant="link"
                        size="sm"
                        type="button"
                        onClick={requestNewCode}
                        disabled={resendTimer > 0 || authLoading}
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend Code"}
                      </Button> */}
                      <p className="text-sm text-muted-foreground">
                        Didn't recieve the code?{" "}
                        <button
                          className="underline text-foreground cursor-pointer"
                          onClick={requestNewCode}
                          disabled={
                            resendTimer > 0 || authLoading || verifyLoading
                          }
                        >
                          {resendTimer > 0
                            ? `Resend in ${resendTimer}s`
                            : "Resend Now"}
                        </button>
                      </p>
                      <div className=" border-b flex-1"></div>
                    </motion.div>
                    {/* {expiresAt && Date.now() > expiresAt && (
                      <p className="text-red-500 text-sm text-center">
                        OTP expired. Please request a new code.
                      </p>
                    )} */}
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

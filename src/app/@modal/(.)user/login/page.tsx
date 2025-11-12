"use client";
import {
  ArrowRight,
  Eye,
  EyeClosed,
  IdCard,
  Loader,
  Lock,
  LockOpen,
  MailCheck,
  UserRound,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import useRememberStore from "@/store/rememberMe";
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
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import { loginUserHandler } from "@/hooks/student-login/postLoginHandler";
import { useLoginUser } from "@/hooks/student-login/userLoginZod";
import { useCountdown } from "@/hooks/useCountdown";
import { FormInputField } from "@/components/input-components/reusable-input";

export default function LoginClientModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<"login" | "otp">("login");
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };
  const { remember, setRemember } = useRememberStore();
  const { timeLeft, start } = useCountdown();
  const [hidden, setHidden] = useState(true);
  const isMobile = useIsMobile();
  const { sendCodeForm, verifyOtpForm } = useLoginUser();
  const { sendCode, verifyCode, resendCode } = loginUserHandler();

  useEffect(() => {
    if (sendCode.isSuccess) {
      setStep("otp");
    }
  }, [sendCode.isSuccess]);
  useEffect(() => {
    if (verifyCode.isSuccess && open) {
      setOpen(false);
      router.replace("/user/home");
    }
  }, [verifyCode.isSuccess, open]);
  useEffect(() => {
    if (sendCode.isSuccess && sendCode.data?.resendAvailableIn) {
      start(sendCode.data.resendAvailableIn);
    }
  }, [sendCode.isSuccess]);
  useEffect(() => {
    if (resendCode.isSuccess && resendCode.data?.resendAvailableIn) {
      start(resendCode.data.resendAvailableIn);
    }
  }, [resendCode.isSuccess]);

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
          if (verifyCode.isPending || sendCode.isPending) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (verifyCode.isPending || sendCode.isPending) e.preventDefault();
        }}
        className={`  lg:p-2 px-1 border-0! outline-0! ${
          isMobile ? "bg-card! mx-auto w-[98%]" : "bg-transparent! w-full"
        }`}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>

        <div className="relative z-10 flex justify-center items-center w-full  h-full lg:p-4 pt-4 rounded-2xl bg-background  backdrop-blur-md">
          {step === "login" && (
            <div className="overflow-hidden w-full flex justify-center items-center flex-col p-4">
              <div className="  max-w-md w-full space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
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
                      disabled={sendCode.isPending}
                    >
                      Sign up
                    </Button>
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-sm text-muted-foreground text-center"
                >
                  Welcome back! Please sign in to continue.
                </motion.p>
                <Form {...sendCodeForm}>
                  <form
                    onSubmit={sendCodeForm.handleSubmit((values) =>
                      sendCode.mutate(values)
                    )}
                  >
                    <FormInputField
                      control={sendCodeForm.control}
                      name="studentId"
                      label="Student ID"
                      type="number"
                      icon={UserRound}
                      disabled={sendCode.isPending}
                      placeholder="Enter your student ID"
                      motionProps={{
                        transition: { duration: 0.3, delay: 0.3 },
                      }}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <FormField
                        control={sendCodeForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="mt-5">
                            <FormLabel className="flex justify-between items-center">
                              Password
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                                <span className="absolute px-2 border-r">
                                  <Lock className="size-4 opacity-50" />
                                </span>
                                <Input
                                  type={hidden ? "password" : "text"}
                                  className="pl-10"
                                  placeholder=""
                                  {...field}
                                  disabled={sendCode.isPending}
                                />{" "}
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
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex justify-between items-center mt-3"
                    >
                      <span className="flex gap-1.5 items-center ">
                        <Checkbox
                          id="remember"
                          disabled={sendCode.isPending}
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
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="mt-7"
                    >
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={sendCode.isPending}
                        variant={sendCode.isPending ? "outline" : "default"}
                      >
                        {sendCode.isPending ? (
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
                  className="flex justify-between items-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div>
                    <h1 className="text-xl font-semibold">
                      Email Verification
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Enter 6-digit verification code sent to your email.
                    </p>
                  </div>
                  <MailCheck />
                </motion.div>

                <Form {...verifyOtpForm}>
                  <form
                    onSubmit={verifyOtpForm.handleSubmit((otpValues) =>
                      verifyCode.mutate({
                        loginData: sendCodeForm.getValues(),
                        otpData: otpValues,
                      })
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <FormField
                        control={verifyOtpForm.control}
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
                                  disabled={verifyCode.isPending}
                                  onChange={(value) => {
                                    field.onChange(value);
                                    if (value.length === 6) {
                                      {
                                        verifyOtpForm.handleSubmit(
                                          (otpValues) =>
                                            verifyCode.mutate({
                                              loginData:
                                                sendCodeForm.getValues(),
                                              otpData: otpValues,
                                            })
                                        )();
                                      }
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
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="relative flex justify-center items-center gap-3 mt-7"
                    >
                      <div className=" border-b flex-1"></div>

                      <p className="text-sm text-muted-foreground">
                        Didn't recieve the code?{" "}
                        <button
                          type="button"
                          className="underline text-foreground cursor-pointer"
                          onClick={() =>
                            resendCode.mutate(sendCodeForm.getValues())
                          }
                          disabled={
                            timeLeft > 0 ||
                            sendCode.isPending ||
                            verifyCode.isPending ||
                            resendCode.isPending
                          }
                        >
                          {timeLeft > 0
                            ? `Resend in ${timeLeft}s`
                            : resendCode.isPending
                            ? "Resending..."
                            : "Resend Now"}
                        </button>
                      </p>
                      <div className=" border-b flex-1"></div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Button
                        type="submit"
                        className="w-full mt-7"
                        disabled={verifyCode.isPending}
                        variant={verifyCode.isPending ? "outline" : "default"}
                      >
                        {verifyCode.isPending ? (
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

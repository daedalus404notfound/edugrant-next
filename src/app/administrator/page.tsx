"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import logo from "@/assets/basclogo.png";
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
import {
  GalleryVerticalEnd,
  Loader,
  LoaderCircleIcon,
  MailCheck,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react";
import { ModeToggle } from "@/components/ui/dark-mode";

import { useCreateAdmin } from "@/hooks/postCreateAdminHandler";

export default function LoginAdmin() {
  const router = useRouter();
  const [state, setState] = useState<"login" | "register">("login");
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
  } = useLoginHandler();
  const {
    reset,
    setReset,
    open,
    setOpen,
    handleSubmit,
    loading,
    resetCreateState,
    form,
    handleTriggerClick,
  } = useCreateAdmin();
  return (
    <div className="relative min-h-[100dvh] grid grid-cols-2  overflow-hidden">
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>{" "}
      <div className="relative z-40 space-y-8 p-15 w-full shadow flex flex-col justify-center ">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="-translate-x-1"
          >
            <motion.span
              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-primary/70 
text-5xl  havelock tracking-[-8px] 
"
              initial={{ backgroundPosition: "200% 0" }}
              animate={{ backgroundPosition: "-200% 0" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 7,
                ease: "linear",
              }}
            >
              Edugrant Admin
            </motion.span>
          </motion.div>
          <BlurText
            text="Manage everything in one place. Secure. Efficient. Reliable."
            delay={30}
            animateBy="words"
            direction="top"
            className="text-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-card">
        {step === "login" && (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <form
                onSubmit={LoginForm.handleSubmit(handleLogin)}
                className="flex flex-col gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col  gap-2"
                >
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                  </p>
                </motion.div>

                <div className="grid gap-6">
                  <Form {...LoginForm}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
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
                      transition={{ duration: 0.6, delay: 0.4 }}
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
                                <Input
                                  placeholder="Enter your password"
                                  {...field}
                                  disabled={authLoading}
                                  type="password"
                                />
                              </FormControl>
                              <Dialog>
                                <DialogTrigger className="ml-auto text-sm underline-offset-4 hover:underline">
                                  Forgot password?
                                </DialogTrigger>
                                <DialogContent className="w-lg p-4">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Reset your password
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-muted-foreground">
                                      Enter your email address and we’ll send
                                      you a link to reset your password.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex-1 w-full">
                                    <Input placeholder="Enter your email" />
                                  </div>
                                  <Button className="mt-4 w-full">
                                    Send reset link
                                  </Button>
                                </DialogContent>
                              </Dialog>
                            </FormItem>
                          );
                        }}
                      />
                    </motion.div>
                  </Form>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col  gap-2"
                  >
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={authLoading}
                    >
                      {authLoading ? (
                        <>
                          Logging in...
                          <Loader className="animate-spin" />
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col  gap-2"
                  >
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Don&apos;t have an account?{" "}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col  gap-2"
                  >
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setState("register")}
                    >
                      <UserRoundPlus />
                      Register
                    </Button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        )}
        {step === "otp" && (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-md">
              <Form {...otpForm}>
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className=" mt-5"
                >
                  <Button
                    className="w-full"
                    onClick={otpForm.handleSubmit(handleOtpVerification)}
                    disabled={verifyLoading}
                    variant={verifyLoading ? "outline" : "default"}
                  >
                    {verifyLoading ? (
                      <>
                        Logging In...
                        <LoaderCircleIcon
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative flex justify-center items-center gap-3 mt-5"
                >
                  <div className=" border-b flex-1"></div>
                  <Label>
                    Didn&apos;t get the code?{" "}
                    <span onClick={requestNewCode} className="underline">
                      Resend Now
                    </span>
                  </Label>
                  <div className=" border-b flex-1"></div>
                </motion.div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

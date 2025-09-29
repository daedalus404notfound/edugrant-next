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
  EyeOffIcon,
  EyeIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/ui/dark-mode";

import { useCreateAdmin } from "@/hooks/postCreateAdminHandler";
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

export default function LoginAdmin() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
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
    resendTimer,
    expiresAt,
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

  const { remember, setRemember } = useRememberAdminStore();
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
                                      <EyeOffIcon
                                        size={16}
                                        aria-hidden="true"
                                      />
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
                        transition={{ duration: 0.4, delay: 0.6 }}
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

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Label className="hover:underline cursor-pointer">
                              Forgot password?
                            </Label>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Reset your password
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Enter your email address below and we&apos;ll
                                send you a link to reset your password.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                            />
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>
                                Send Reset Link <ArrowRight />
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </motion.div>
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
                    {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Don&apos;t have an account?{" "}
                      </span>
                    </div> */}
                  </motion.div>
                  {/* <motion.div
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
                  </motion.div> */}
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
                      Enter 6-character verification code sent to your email.
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
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

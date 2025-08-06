"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  KeySquare,
  SecurityUser,
} from "iconsax-reactjs";
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
export default function Login() {
  const {
    step,
    // setStep,
    LoginForm,
    // LoginData,
    loginOtpForm,
    handleLogin,
    handleOtpVerification,
    authLoading,
    // authError,
    // verifyLoading,
    // verifyError,
    // verifySuccess,
  } = useLoginHandler();
  return (
    <main className="relative h-[100dvh] w-full bg-black dark:bg-gradient-to-b from-black to-emerald-500/10 overflow-hidden">
      <div className="w-full lg:h-[90%] h-[98%] transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 overflow-hidden flex justify-center ">
        {/* Lamp Effect Background */}
        <div className="absolute top-15 lg:top-0 isolate z-0 hidden dark:flex w-screen flex-1 items-start justify-center transform scale-60 lg:scale-100 ">
          {/* Optional Blur Layer */}
          <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

          {/* Main glow */}
          <div className="absolute inset-auto z-50 h-40 w-[28rem] -translate-y-[-30%] rounded-full bg-[rgba(30, 175, 115, 0.6)] opacity-80 blur-3xl" />

          {/* Lamp effect pulse */}
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            transition={{ ease: "easeInOut", delay: 0, duration: 1 }}
            className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-[rgba(30, 175, 115, 0.6)] blur-2xl"
          />

          {/* Top line */}
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            transition={{ ease: "easeInOut", delay: 0, duration: 1 }}
            className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-[rgba(30, 175, 115, 0.6)]"
          />

          {/* Left conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(from 80deg at center top, rgba(30, 175, 115, 0.6), transparent, transparent)",
            }}
            className="absolute inset-auto right-1/2 h-56 w-[30rem]"
          >
            <div className="absolute w-full left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-full left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(from 280deg at center top, transparent, transparent, rgba(30,175,115,0.6))",
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem]"
          >
            <div className="absolute w-40 h-full right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
        </div>
      </div>
      <Link href={"/"} prefetch={true} className="absolute top-3 left-3 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button variant="outline">
            <ArrowLeft />
          </Button>
        </motion.div>
      </Link>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-3 right-3 z-20"
      >
        <ModeToggle />
      </motion.div>
      <div className="relative z-10 flex justify-center items-center w-full  h-full">
        {step === "login" && (
          <div className="overflow-hidden w-full flex justify-center items-center flex-col p-4">
            <div className="  lg:w-md w-full space-y-7">
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
                  <Label>Or</Label>
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
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm text-muted-foreground text-center"
              >
                Welcome back! Please sign in to continue.
              </motion.p>
              <Form {...LoginForm}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <FormField
                    control={LoginForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <SecurityUser size="20" color="#15803d" /> Student
                            ID
                          </span>{" "}
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder=""
                            {...field}
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
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <FormField
                    control={LoginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <KeySquare size="20" color="#15803d" /> Password
                          </span>
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder=""
                            {...field}
                            disabled={authLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button
                      className="w-full"
                      onClick={LoginForm.handleSubmit(handleLogin)}
                      disabled={authLoading}
                    >
                      {authLoading && (
                        <LoaderCircleIcon
                          className="-ms-1 animate-spin"
                          size={16}
                          aria-hidden="true"
                        />
                      )}
                      Continue
                      <ArrowRight />
                    </Button>
                  </motion.div>
                </div>
              </Form>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xs text-center mt-1 p-4"
            >
              By clicking continue, you agree to our <br />
              <span className="underline text-green-700 italic">
                {" "}
                Terms of Service{" "}
              </span>{" "}
              &nbsp; and &nbsp;
              <span className="underline text-green-700 italic">
                {" "}
                Privacy Policy
              </span>
              .
            </motion.p>
          </div>
        )}
        {step === "otp" && (
          <div className="overflow-hidden w-full flex justify-center items-center flex-col p-4">
            <div className="  lg:w-md w-full space-y-7">
              <div className=" space-y-1.5">
                <h1 className="text-2xl font-semibold">Verification</h1>
              </div>
              <Form {...loginOtpForm}>
                <div className="space-y-4">
                  <FormField
                    control={loginOtpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          <p>Enter verification code sent to your email.</p>
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

                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" className="flex-1" disabled>
                      Resend (0s)
                    </Button>
                    <Button
                      onClick={loginOtpForm.handleSubmit(handleOtpVerification)}
                      className="flex-1"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
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
import axios from "axios";
import { Label } from "@/components/ui/label";
import BlurText from "@/components/ui/blur";
import { CanvasRevealEffect } from "@/components/ui/matrix";
import { useLoginHandler } from "@/hooks/admin/postLoginHandler";
import { LoaderCircleIcon, MailCheck, User } from "lucide-react";
import { ArrowRight } from "iconsax-reactjs";

export default function LoginAdmin() {
  const router = useRouter();
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
  } = useLoginHandler();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminTokenAuthentication`,
          {
            withCredentials: true,
          }
        );

        console.log("token", response.data);
        if (response.status === 200) {
          router.push("/administrator/home");
          console.log("authenticated");
        }
      } catch (error) {
        console.log("No valid token found", error);
      }
    };
    checkToken();
  }, [router]);

  return (
    <div className="relative h-screen">
      <CanvasRevealEffect
        animationSpeed={3}
        containerClassName="bg-black !fixed inset-0"
        colors={[[52, 211, 153]]}
        dotSize={5}
        reverse={false}
      />
      <div className="relative flex justify-center items-center h-full w-full  z-10">
        <div className="flex-1  flex flex-col justify-center items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-green-500/70 
text-5xl  zxczxc tracking-[-9px] -translate-x-2 bg-amber-400
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
              className="text-2xl mt-3"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border border-[var(--eclipse)] h-[80%]"
        ></motion.div>
        <div className="flex-1 flex   h-full justify-center items-center">
          <div className="max-w-md  w-full">
            {step === "login" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div>
                    <h1 className="text-xl font-semibold">
                      Sign In to Edugrant
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials to accees your account.
                    </p>
                  </div>
                </motion.div>

                <Form {...LoginForm}>
                  <FormField
                    control={LoginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-7">
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

                  <FormField
                    control={LoginForm.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem className="mt-7">
                          <FormLabel className="flex justify-between items-center">
                            Password <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              {...field}
                              disabled={authLoading}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  <Button
                    className="w-full mt-9"
                    onClick={LoginForm.handleSubmit(handleLogin)}
                    variant={authLoading ? "outline" : "default"}
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <>
                        Verifying...
                        <LoaderCircleIcon
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
                </Form>
              </motion.div>
            )}

            {step === "otp" && (
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
                    <span className="underline">Resend Now</span>
                  </Label>
                  <div className=" border-b flex-1"></div>
                </motion.div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

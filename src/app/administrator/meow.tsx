"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import bascLogo from "@/assets/basclogo.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Mail, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  adminEmail: z.string().email({ message: "Valid email required" }),
  adminPassword: z.string().min(1, "Password required."),
  remember: z.boolean().optional(),
});

const otpSchema = z.object({
  otp: z.string().min(6, "Please enter the complete OTP"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

export default function LoginForm() {
  const [step, setStep] = React.useState<"login" | "otp">("login");
  const [userEmail, setUserEmail] = React.useState("");
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      adminEmail: "",
      adminPassword: "",
      remember: false,
    },
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onLoginSubmit(values: LoginFormValues) {
    console.log("Login submitted:", values);

    try {
      const response = await fetch(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminEmail: values.adminEmail,
            adminPassword: values.adminPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);
      setUserEmail(values.adminEmail);
      setStep("otp");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function onOTPSubmit(values: OTPFormValues) {
    console.log("OTP submitted:", values);

    try {
      // Code verification endpoint
      const response = await fetch(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminCodeAuthentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminEmail: userEmail,
            code: values.otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Code verification failed");
      }

      console.log("Code verification successful:", data);

      // If verification successful, proceed with token authentication
      await authenticateWithToken(data.token || data.authToken);
    } catch (error) {
      console.error("Code verification error:", error);
    }
  }

  async function authenticateWithToken(token: string) {
    try {
      const response = await fetch(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token authentication failed");
      }

      console.log("Token authentication successful:", data);

      // Store token for future requests
      localStorage.setItem("adminToken", token);

      // Redirect to dashboard or handle success
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Token authentication error:", error);
    }
  }

  function handleBackToLogin() {
    setStep("login");
    otpForm.reset();
  }

  async function handleResendCode() {
    try {
      // Resend code by calling the login endpoint again
      const response = await fetch(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminEmail: userEmail,
            adminPassword: loginForm.getValues().adminPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend code");
      }

      console.log("Code resent successfully");
      // You might want to show a success message to the user
    } catch (error) {
      console.error("Resend code error:", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6 your-class">
      <div className="flex flex-col gap-6 w-sm">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img className="size-14" src={bascLogo.src} alt="Logo" />
          <div>
            <h1 className="text-2xl tracking-[-4px] zxczxc">Edugrant Admin.</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "login"
                ? "Sign in to access the admin dashboard"
                : "Enter the 6-digit code sent to your email"}
            </p>
          </div>
        </div>

        {/* Login Form */}
        {step === "login" && (
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Email Field */}
              <FormField
                control={loginForm.control}
                name="adminEmail"
                render={({ field, fieldState }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel
                      htmlFor="email"
                      className="w-full flex justify-between"
                    >
                      Email <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <span className="flex gap-2 relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className={`pl-10 border ${
                            fieldState.invalid
                              ? "border-red-500"
                              : "border-input"
                          } focus:border-blue-500 focus-visible:ring-0`}
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          className="absolute left-0"
                          type="button"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </span>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={loginForm.control}
                name="adminPassword"
                render={({ field, fieldState }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel
                      htmlFor="password"
                      className="w-full flex justify-between"
                    >
                      Password <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <span className="flex gap-2 relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className={`pl-10 border ${
                            fieldState.invalid
                              ? "border-red-500"
                              : "border-input"
                          } focus:border-blue-500 focus-visible:ring-0`}
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          className="absolute left-0"
                          type="button"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                      </span>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Remember Me + Forgot Password */}
              <FormField
                control={loginForm.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span>Remember me</span>
                    </Label>
                    <Label className="text-sm cursor-pointer">
                      Forgot password?
                    </Label>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        )}

        {/* OTP Form */}
        {step === "otp" && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOTPSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Back Button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToLogin}
                className="w-fit p-0 h-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>

              {/* OTP Field */}
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel className="text-center">
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
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

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto"
                  onClick={handleResendCode}
                >
                  Resend code
                </Button>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Verify & Continue
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

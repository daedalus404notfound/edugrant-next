// /app/administrator

"use client";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import axios from "axios";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a vali email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .max(20, "Password must be at least 8 characters long"),
});

const optSchema = z.object({
  otp: z
    .string()
    .min(1, "One time password is required")
    .max(6, "OTP must be 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type otpFormData = z.infer<typeof optSchema>;

export default function LoginAdmin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const LoginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(optSchema),

    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
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

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log(`Login attempt with email: ${data.email}, ${data.password}`);

    try {
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminLogin`,
        {
          adminEmail: data.email,
          adminPassword: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login successful:", response.data);
      setCredentials({
        email: data.email,
        password: data.password,
      });
      setStep("otp");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login error:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const onOtpSubmit = async (data: otpFormData) => {
    console.log(
      "sent to backend",
      credentials.email,
      credentials.password,
      data.otp
    );
    try {
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminCodeAuthentication`,
        {
          adminEmail: credentials.email,
          adminPassword: credentials.password,
          code: data.otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Code verification successful:", response.data);
      router.push("/administrator/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Verification error:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Verification error:", error);
      }
    }
  };

  const [step, setStep] = useState<"login" | "otp">("login");

  return (
    <div className="h-screen flex justify-center items-center">
      {step === "login" && (
        <Form {...LoginForm}>
          <div className="min-w-md space-y-5">
            <FormField
              control={LoginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={LoginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel onClick={() => setShowPassword(!showPassword)}>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <Button onClick={LoginForm.handleSubmit(onLoginSubmit)}>
              Login
            </Button>
          </div>
        </Form>
      )}

      {step === "otp" && (
        <Form {...otpForm}>
          <div className="space-y-5">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
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

                      <Button
                        variant="outline"
                        onClick={otpForm.handleSubmit(onOtpSubmit)}
                      >
                        Verify
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      )}
    </div>
  );
}

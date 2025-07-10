"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import bascLogo from "@/assets/basclogo.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Mail } from "lucide-react";

const formSchema = z.object({
  adminEmail: z.string().email({ message: "Valid email required" }),
  adminPassword: z.string().min(1, "Password required."),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminEmail: "",
      adminPassword: "",
      remember: false,
    },
  });

  async function onSubmit(values: FormValues) {
    console.log("Submitted:", values);

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
    } catch (error) {
      console.error("Login error:", error);
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
              Sign in to access the admin dashboard
            </p>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
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
                          fieldState.invalid ? "border-red-500" : "border-input"
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
              control={form.control}
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
                          fieldState.invalid ? "border-red-500" : "border-input"
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
              control={form.control}
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
      </div>
    </div>
  );
}

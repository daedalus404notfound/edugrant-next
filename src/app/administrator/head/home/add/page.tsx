"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Lock,
  Phone,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import TitleReusable from "@/components/ui/title";
import { useCreateAdmin } from "@/hooks/postCreateAdminHandler";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeleteDialog } from "@/components/ui/delete-dialog";

export default function CreateStaffAccountPanel() {
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
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto max-w-4xl w-full py-10">
        <div className="space-y-8 w-full">
          <Form {...form}>
            <TitleReusable
              title="Add New Staff"
              description="Applicants currently waiting for review."
              Icon={UserRoundPlus}
            />

            <div className="space-y-8   rounded-md">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <UserRound className="h-5 w-5" /> Personal Information
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        First Name <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter first name" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Middle Name
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter middle name (optional)"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="flex justify-between items-center">
                        Last Name
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter last name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="space-y-8   rounded-md">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <Phone className="h-5 w-5" /> Contact Information
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-6 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Email Address
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter email address"
                          type="email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Phone Number
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="space-y-8   rounded-md">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <Lock className="h-5 w-5" /> Account Security
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Password
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter secure password"
                          type="password"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Password must be at least 8 characters long
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Confirm Password
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm password"
                          type="password"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Confirm password
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="flex flex-col gap-4  sm:flex-row sm:justify-end">
              <Button type="button" variant="outline">
                Cancel
              </Button>

              <DeleteDialog
                open={open}
                red={false}
                onOpenChange={setOpen}
                onConfirm={form.handleSubmit(handleSubmit)}
                loading={loading}
                confirmTextLoading="Creating..."
                title="Confirm Account Creation"
                description="You are about to create a new staff account. Please confirm to proceed."
                confirmText="Create Account"
                cancelText="Cancel"
                trigger={
                  <Button onClick={() => setOpen(true)}>
                    Add Staff
                  </Button>
                }
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Lock,
  Phone,
  UserRound,
  UserRoundPlus,
  XIcon,
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
import { useState } from "react";
import { useTourStore } from "@/store/useTourStore";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { TourStep } from "@/components/tour-2/tour-step";

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
  const { openStaff, setOpenStaff } = useTourStore();
  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {" "}
      <Dialog open={openStaff} onOpenChange={setOpenStaff}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable title="Post scholarship guide" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenStaff(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenStaff(false);
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="addStaff"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
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

              <TourStep stepId="staff-1">
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
              </TourStep>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <TourStep stepId="staff-2">
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
            </TourStep>

            <TourStep stepId="staff-3">
              <div className="space-y-8   rounded-md">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium flex gap-2 items-center">
                    <Lock className="h-5 w-5" /> Account Security
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    name="password"
                    render={({ field }) => {
                      const [isVisible, setIsVisible] = useState(false);
                      const toggleVisibility = () =>
                        setIsVisible((prev) => !prev);

                      const checkStrength = (pass: string) => {
                        const requirements = [
                          { regex: /.{8,}/, text: "At least 8 characters" },
                          { regex: /[0-9]/, text: "At least 1 number" },
                          {
                            regex: /[a-z]/,
                            text: "At least 1 lowercase letter",
                          },
                          {
                            regex: /[A-Z]/,
                            text: "At least 1 uppercase letter",
                          },
                        ];
                        return requirements.map((req) => ({
                          met: req.regex.test(pass),
                          text: req.text,
                        }));
                      };

                      const strength = checkStrength(field.value || "");
                      const strengthScore = strength.filter(
                        (req) => req.met
                      ).length;

                      const getStrengthColor = (score: number) => {
                        if (score === 0) return "bg-border";
                        if (score <= 1) return "bg-red-500";
                        if (score <= 2) return "bg-orange-500";
                        if (score === 3) return "bg-amber-500";
                        return "bg-emerald-500";
                      };

                      const getStrengthText = (score: number) => {
                        if (score === 0) return "Enter a password";
                        if (score <= 2) return "Weak password";
                        if (score === 3) return "Medium password";
                        return "Strong password";
                      };

                      return (
                        <FormItem className="lg:col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            Password <FormMessage />
                          </FormLabel>

                          {/* Password Input + Toggle */}
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={isVisible ? "text" : "password"}
                                placeholder=""
                                {...field}
                                disabled={loading}
                                className="pe-9"
                              />
                              <button
                                type="button"
                                onClick={toggleVisibility}
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
                              >
                                {isVisible ? (
                                  <EyeOffIcon size={16} />
                                ) : (
                                  <EyeIcon size={16} />
                                )}
                              </button>
                            </div>
                          </FormControl>

                          {/* Strength Bar */}
                          <div
                            className="bg-border mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
                            role="progressbar"
                            aria-valuenow={strengthScore}
                            aria-valuemin={0}
                            aria-valuemax={4}
                          >
                            <div
                              className={`h-full ${getStrengthColor(
                                strengthScore
                              )} transition-all duration-500`}
                              style={{
                                width: `${(strengthScore / 4) * 100}%`,
                              }}
                            />
                          </div>

                          {/* Strength Text */}
                          <p className="text-sm font-medium mb-2">
                            {getStrengthText(strengthScore)}. Must contain:
                          </p>

                          {/* Requirements */}
                          <ul className="space-y-1.5">
                            {strength.map((req, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                {req.met ? (
                                  <CheckIcon
                                    size={16}
                                    className="text-emerald-500"
                                  />
                                ) : (
                                  <XIcon
                                    size={16}
                                    className="text-muted-foreground/80"
                                  />
                                )}
                                <span
                                  className={`text-xs ${
                                    req.met
                                      ? "text-emerald-600"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {req.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="confirmPassword"
                    render={({ field }) => {
                      const [isVisible, setIsVisible] = useState(false);
                      const toggleVisibility = () =>
                        setIsVisible((prev) => !prev);

                      return (
                        <FormItem className="lg:col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            Confirm Password <FormMessage />
                          </FormLabel>

                          <FormControl>
                            <div className="relative">
                              <Input
                                type={isVisible ? "text" : "password"}
                                placeholder=""
                                {...field}
                                disabled={loading}
                                className="pe-9"
                              />
                              <button
                                type="button"
                                onClick={toggleVisibility}
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
                              >
                                {isVisible ? (
                                  <EyeOffIcon size={16} />
                                ) : (
                                  <EyeIcon size={16} />
                                )}
                              </button>
                            </div>
                          </FormControl>

                          {/* Optional Live Mismatch Warning */}
                          {/* {accountForm.watch("confirmPassword") &&
                                           accountForm.watch("password") !==
                                             accountForm.watch("confirmPassword") && (
                                             <p className="text-xs text-red-500 mt-2">
                                               Passwords do not match.
                                             </p>
                                           )} */}
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            </TourStep>

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
                  <Button onClick={() => setOpen(true)}>Add Staff</Button>
                }
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircleIcon,
  MessagesSquare,
  UserRound,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

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
import { Calendar } from "@/components/ui/calendar";

import { useRegisterHandler } from "@/hooks/user/postRegisterHandler";
import { Checkbox } from "@/components/ui/checkbox";
const steps = [
  {
    step: 1,
    title: "Personal",
  },
  {
    step: 2,
    title: "Account",
  },

  {
    step: 4,
    title: "Verification",
  },
];
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import basc from "@/assets/BASCjf5989_03 copy.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { format } from "date-fns";

export default function RegisterStudent() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const {
    // Stepper state
    stepper,
    setStepper,

    // Main functions
    HandleRegister,
    HandleOtpVerification,

    // Forms
    personalForm,
    accountForm,
    otpForm,
    personalData,
    accountData,

    // Loading states
    sendAuthCode,
    verifyRegister,

    // Utility functions
    // resetAuthState,
    // resetVerifyState,
    // resetAllStates,
    // requestNewCode,
  } = useRegisterHandler();

  const handlePrevStepper = () => {
    setStepper((prev) => prev - 1);
  };

  const handlePersonalSubmit = () => {
    setStepper(2);
  };

  return (
    <Drawer
      direction="bottom"
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className=" w-1/2   mx-auto p-1 !border-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>

        <div className="relative flex-1 flex justify-center items-center bg-background/50 rounded-lg p-8 overflow-auto">
        
          <div className="w-full space-y-10">
            <div className="space-y-3">
              <Stepper
                defaultValue={1}
                value={stepper}
                className="items-start gap-3 "
              >
                {steps.map(({ step, title }) => (
                  <StepperItem key={step} step={step} className="flex-1">
                    <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                      <StepperIndicator
                        asChild
                        className="bg-border h-1 w-full"
                      >
                        <span className="sr-only">{step}</span>
                      </StepperIndicator>
                      <div className="space-y-0.5">
                        <StepperTitle>{title}</StepperTitle>
                      </div>
                    </StepperTrigger>
                  </StepperItem>
                ))}
              </Stepper>
            </div>
            {stepper === 1 && (
              <Form {...personalForm}>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-lg font-semibold">
                      Personal Information
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                      Tell us about yourself.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
                    <FormField
                      control={personalForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            First Name <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Middle Name <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your middle name"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Last Name <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Contact number <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your contact number"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Gender <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Date of Birth <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Popover
                              open={openCalendar}
                              onOpenChange={setOpenCalendar}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="date"
                                  className="w-full justify-between font-normal"
                                >
                                  {field.value
                                    ? new Date(field.value).toLocaleDateString()
                                    : "Select date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0 pointer-events-auto"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    field.onChange(
                                      date ? format(date, "yyyy-MM-dd") : ""
                                    );
                                    setOpenCalendar(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            Address (Street, Barangay, City/Municipality,
                            Province) <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your complete address"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalForm.control}
                      name="indigenous"
                      render={({ field }) => (
                        <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              className="order-1 after:absolute after:inset-0"
                              aria-describedby="for-interview-description"
                            />
                          </FormControl>

                          <div className="flex grow items-center gap-3">
                            {/* SVG Icon */}
                            <UserRound />

                            {/* Label + Description */}

                            <FormLabel>
                              Indigenous
                              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                (Optional)
                              </span>
                            </FormLabel>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalForm.control}
                      name="pwd"
                      render={({ field }) => (
                        <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              className="order-1 after:absolute after:inset-0"
                              aria-describedby="for-interview-description"
                            />
                          </FormControl>

                          <div className="flex grow items-center gap-3">
                            {/* SVG Icon */}
                            <Accessibility />

                            {/* Label + Description */}

                            <FormLabel>
                              Person with disability
                              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                (Optional)
                              </span>
                            </FormLabel>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    onClick={personalForm.handleSubmit(handlePersonalSubmit)}
                    className="w-full mt-4"
                  >
                    Next <ArrowRight />
                  </Button>
                </div>
              </Form>
            )}
            {stepper === 2 && (
              <form
                onSubmit={accountForm.handleSubmit((accountFormData) =>
                  HandleRegister({
                    personalData,
                    accountData: accountFormData,
                  })
                )}
                className="space-y-6"
              >
                <Form {...accountForm}>
                  <div>
                    <h1 className="text-lg font-semibold">
                      Account Information
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                      Fill out all required fields to start scholarship
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <FormField
                      control={accountForm.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem className=" col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            Student ID <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your student ID"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Email <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="institute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Institute <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="w-full"
                                disabled={sendAuthCode.isLoading}
                              >
                                <SelectValue placeholder="Select Institute" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ICS">
                                  ICS - Institute Computer Studies
                                </SelectItem>
                                <SelectItem value="IAS">
                                  IAS - Institute of Arts and Sciences
                                </SelectItem>
                                <SelectItem value="IED">
                                  IED - Institute of Education
                                </SelectItem>
                                <SelectItem value="IEAT">
                                  IEAT - Institute of Engineering and Applied
                                  Technology
                                </SelectItem>
                                <SelectItem value="IM">
                                  IM - Institute of Management
                                </SelectItem>
                                <SelectItem value="CAVM">
                                  CAVM - College of Agriculture and Veterinary
                                  Medicine
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            Course <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your course"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex col-span-2 gap-4">
                      <FormField
                        control={accountForm.control}
                        name="yearLevel"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="flex items-center justify-between">
                              Year Level <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Select
                                disabled={sendAuthCode.isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Year Level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1st Year">
                                    1st Year
                                  </SelectItem>
                                  <SelectItem value="2nd Year">
                                    2nd Year
                                  </SelectItem>
                                  <SelectItem value="3rd Year">
                                    3rd Year
                                  </SelectItem>
                                  <SelectItem value="4th Year">
                                    4th Year
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={accountForm.control}
                        name="section"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="flex items-center justify-between">
                              Section <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your section"
                                {...field}
                                disabled={sendAuthCode.isLoading}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={accountForm.control}
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
                          <FormItem className="col-span-2">
                            <FormLabel className="flex items-center justify-between">
                              Password <FormMessage />
                            </FormLabel>

                            {/* Password Input + Toggle */}
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={isVisible ? "text" : "password"}
                                  placeholder="Enter your password"
                                  {...field}
                                  disabled={sendAuthCode.isLoading}
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
                                <li
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
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
                  </div>

                  <div className="flex gap-3 mt-13 items-center">
                    <Button
                      type="button"
                      onClick={handlePrevStepper}
                      variant="outline"
                      className="flex-1"
                      disabled={sendAuthCode.isLoading}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={sendAuthCode.isLoading}
                      className="flex-1"
                      type="submit"
                    >
                      {sendAuthCode.isLoading ? (
                        <>
                          Registering...
                          <LoaderCircleIcon
                            className="-ms-1 animate-spin"
                            size={16}
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        <>
                          Register
                          <ArrowRight />
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </form>
            )}

            {stepper === 3 && (
              <form
                onSubmit={otpForm.handleSubmit(HandleOtpVerification)}
                className="space-y-6 flex justify-center items-center flex-col"
              >
                <Form {...otpForm}>
                  <div className="w-full  space-y-5">
                    <div className="">
                      <h1 className="text-lg font-semibold">
                        Code Verifcation
                      </h1>
                      <p className="text-sm mt-1 text-muted-foreground">
                        Enter the code we sent to your gmail.
                      </p>
                    </div>

                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            Enter 6-digit code
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              disabled={verifyRegister.isLoading}
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
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 mt-13">
                      <Button variant="outline" className="flex-1" disabled>
                        Resend (0s)
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={verifyRegister.isLoading}
                      >
                        {verifyRegister.isLoading ? (
                          <>
                            Verifying code...
                            <LoaderCircleIcon
                              className="-ms-1 animate-spin"
                              size={16}
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          <>
                            Verify
                            <ArrowRight />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </form>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Calendar1,
  CheckIcon,
  ChevronDownIcon,
  CircleUserRound,
  EyeIcon,
  EyeOffIcon,
  Feather,
  GraduationCap,
  IdCard,
  Landmark,
  LayoutPanelTop,
  LoaderCircleIcon,
  MailIcon,
  MapPinHouse,
  School,
  UserRound,
  UserRoundCheck,
  VenusAndMars,
  XIcon,
} from "lucide-react";

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
import { AnimatePresence, motion } from "motion/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { format } from "date-fns";

export default function RegisterStudent() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isIndigenousChecked, setIsIndigenousChecked] = useState(false);
  const [isPWDChecked, setIsPWDChecked] = useState(false);
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
    requestNewCode,

    resendTimer,
    expiresAt,
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
      <DrawerContent className=" lg:w-1/2 w-[98%] h-auto !max-h-[90dvh]  mx-auto  !border-0 bg-background backdrop-blur-lg overflow-hidden p-1 outline-0 lg:min-w-4xl">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <Stepper
          defaultValue={1}
          value={stepper}
          className="items-start gap-3  lg:pt-8 lg:pb-6 lg:px-8 px-2 py-4 "
        >
          {steps.map(({ step, title }) => (
            <StepperItem key={step} step={step} className="flex-1">
              <StepperTrigger className="w-full flex-col items-start gap-2 rounded ">
                <StepperIndicator asChild className=" h-1 w-full">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
                <div className="space-y-0.5">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
        <div className="w-full space-y-10 pb-0 overflow-auto no-scrollbar">
          {stepper === 1 && (
            <Form {...personalForm}>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:pt-8 lg:px-8 pt-6 px-2"
                >
                  <h1 className="text-lg font-semibold">
                    Personal Information
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Tell us about yourself.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 lg:p-8 px-2 py-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="flex items-center justify-between">
                            First Name <FormMessage />
                          </FormLabel>

                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                                disabled={sendAuthCode.isLoading}
                              />
                              <span className="flex items-center  border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Middle Name <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder="(Optional)"
                                {...field}
                                className="rounded-r-none"
                                disabled={sendAuthCode.isLoading}
                              />
                              <span className="flex items-center  border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <CircleUserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Last Name <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                                disabled={sendAuthCode.isLoading}
                              />
                              <span className="flex items-center  border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRoundCheck />
                                </Button>
                              </span>
                            </div>
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
                      control={personalForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Contact number <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex">
                              {/* Fixed +639 prefix */}
                              <span className="flex items-center px-4 border rounded-l-md text-sm">
                                +639
                              </span>
                              <Input
                                type="text"
                                placeholder=""
                                maxLength={10}
                                value={field.value?.replace("+639", "") || ""}
                                onChange={(e) => {
                                  const val = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 9);
                                  field.onChange(`+639${val}`);
                                }}
                                disabled={sendAuthCode.isLoading}
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Gender <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="rounded-r-none w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="flex items-center  border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <VenusAndMars />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            Date of Birth <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="flex items-center border rounded-l-md text-sm">
                                <Popover
                                  open={openCalendar}
                                  onOpenChange={setOpenCalendar}
                                >
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" id="date">
                                      <Calendar1 />
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
                              </span>
                              <Input
                                value={field.value ? field.value : ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="rounded-l-none"
                                placeholder="YYYY-MM-DD"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="lg:col-span-2"
                  >
                    <FormField
                      control={personalForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between line-clamp-1">
                            Address (Street, Barangay, City/Municipality,
                            Province) <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                                disabled={sendAuthCode.isLoading}
                              />
                              <span className="flex items-center  border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <MapPinHouse />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="indigenous"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="ind"
                            className="flex items-center justify-between line-clamp-1"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isIndigenousChecked}
                                id="ind"
                                onChange={(e) =>
                                  setIsIndigenousChecked(e.target.checked)
                                }
                              />
                              Indigenous Group (IG)
                            </div>
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                className="rounded-r-none"
                                placeholder="Please specify your Indigenous group (if applicable)"
                                {...field}
                                disabled={
                                  !isIndigenousChecked || sendAuthCode.isLoading
                                }
                              />
                              <span className="flex items-center border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Feather />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* PWD Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <FormField
                      control={personalForm.control}
                      name="pwd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="pwdd"
                            className="flex items-center justify-between line-clamp-1"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isPWDChecked}
                                id="pwdd"
                                onChange={(e) =>
                                  setIsPWDChecked(e.target.checked)
                                }
                              />
                              Person with Disability (PWD)
                            </div>
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder="Please specify your disability (if applicable)"
                                {...field}
                                className="rounded-r-none"
                                disabled={
                                  !isPWDChecked || sendAuthCode.isLoading
                                }
                              />
                              <span className="flex items-center border rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Accessibility />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  {/* <FormField
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
                         
                          <UserRound />


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
                  /> */}
                  {/* <FormField
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
                         
                          <Accessibility />

                        

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
                  /> */}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="w-full sticky bottom-0 lg:px-8 lg:py-6 py-4 px-2 border-t bg-background/50 "
                >
                  <Button
                    onClick={personalForm.handleSubmit(handlePersonalSubmit)}
                    className="w-full dark:bg-green-800 bg-green-700"
                  >
                    Next <ArrowRight />
                  </Button>
                </motion.div>
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
                <div className="lg:pt-8 lg:px-8 pt-6 px-2">
                  <h1 className="text-lg font-semibold">Account Information</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Fill out all required fields to start scholarship
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 lg:p-8 px-2 py-6">
                  <FormField
                    control={accountForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem className=" lg:col-span-2">
                        <FormLabel className="flex items-center justify-between">
                          Student ID <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            {" "}
                            <Input
                              placeholder=""
                              className="rounded-r-none"
                              type="number"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <IdCard />
                              </Button>
                            </span>
                          </div>
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
                          <div className="flex items-center">
                            <Input
                              type="email"
                              placeholder=""
                              className="rounded-r-none"
                              {...field}
                              disabled={sendAuthCode.isLoading}
                            />
                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <MailIcon />
                              </Button>
                            </span>
                          </div>
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
                          <div className="flex items-center">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="rounded-r-none w-full"
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
                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <School />
                              </Button>
                            </span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2">
                        <FormLabel className="flex items-center justify-between">
                          Course <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="rounded-r-none w-full"
                                disabled={sendAuthCode.isLoading}
                              >
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BSAGRI-ANSCI">
                                  BS in Agriculture (Animal Science)
                                </SelectItem>
                                <SelectItem value="BSAGRI-HORTI">
                                  BS in Agriculture (CRSC-Horti)
                                </SelectItem>
                                <SelectItem value="BSAGRI-AGRONOMY">
                                  BS in Agriculture (CRSC-Agronomy)
                                </SelectItem>
                                <SelectItem value="BSAGRI-AGEX">
                                  BS in Agriculture (AgEx)
                                </SelectItem>
                                <SelectItem value="BSAGRI-CROP">
                                  BS in Agriculture (Crop Science)
                                </SelectItem>
                                <SelectItem value="CAS">
                                  Certificate of Agricultural Sciences
                                </SelectItem>
                                <SelectItem value="BSAGRO">
                                  BS in Agroforestry
                                </SelectItem>
                                <SelectItem value="DVM">
                                  Doctor of Veterinary Medicine
                                </SelectItem>
                                <SelectItem value="BSABE">
                                  BS in Agricultural and Biosystems Engineering
                                </SelectItem>
                                <SelectItem value="BSGE">
                                  BS in Geodetic Engineering
                                </SelectItem>
                                <SelectItem value="BSIT">
                                  BS in Information Technology
                                </SelectItem>
                                <SelectItem value="BSFT">
                                  BS in Food Technology
                                </SelectItem>
                                <SelectItem value="BEED">
                                  Bachelor of Elementary Education
                                </SelectItem>
                                <SelectItem value="BSED-ENGLISH">
                                  Bachelor of Secondary Education (English)
                                </SelectItem>
                                <SelectItem value="BSED-SCIENCE">
                                  Bachelor of Secondary Education (Science)
                                </SelectItem>
                                <SelectItem value="BSAB">
                                  BS in Agribusiness
                                </SelectItem>
                                <SelectItem value="BSBA">
                                  BS in Business Administration
                                </SelectItem>
                                <SelectItem value="BSABM">
                                  BS in Agribusiness Management
                                </SelectItem>
                                <SelectItem value="BSHM">
                                  BS in Hospitality Management
                                </SelectItem>
                                <SelectItem value="BSDC">
                                  BS in Development Communication
                                </SelectItem>
                                <SelectItem value="MSAGRI">
                                  Master of Science in Agriculture
                                </SelectItem>
                                <SelectItem value="MAED">
                                  Master of Arts in Education
                                </SelectItem>
                                <SelectItem value="PHD-AGRI">
                                  Doctor of Philosophy in Agricultural Sciences
                                </SelectItem>
                                <SelectItem value="PHD-EDMAN">
                                  Doctor of Philosophy in Educational Management
                                </SelectItem>
                                <SelectItem value="TECC">
                                  Teacher Education Certificate Course
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <GraduationCap />
                              </Button>
                            </span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="yearLevel"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="flex items-center justify-between">
                          Year Level <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Select
                              disabled={sendAuthCode.isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="rounded-r-none w-full">
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
                                <SelectItem value="5th Year">
                                  5th Year
                                </SelectItem>
                                <SelectItem value="6th Year">
                                  6th Year
                                </SelectItem>
                                <SelectItem value="7th Year">
                                  7th Year
                                </SelectItem>
                                <SelectItem value="8th Year">
                                  8th Year
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <BookMarked />
                              </Button>
                            </span>
                          </div>
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
                          <div className="flex items-center">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="rounded-r-none w-full"
                                disabled={sendAuthCode.isLoading}
                              >
                                <SelectValue placeholder="Select Section" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">Section A</SelectItem>
                                <SelectItem value="B">Section B</SelectItem>
                                <SelectItem value="C">Section C</SelectItem>
                                <SelectItem value="D">Section D</SelectItem>
                                <SelectItem value="E">Section E</SelectItem>
                                <SelectItem value="F">Section F</SelectItem>
                                <SelectItem value="G">Section G</SelectItem>
                                <SelectItem value="H">Section H</SelectItem>
                                <SelectItem value="I">Section I</SelectItem>
                                <SelectItem value="J">Section J</SelectItem>
                              </SelectContent>
                            </Select>
                            <span className="flex items-center  border rounded-r-md text-sm">
                              <Button variant="ghost">
                                <LayoutPanelTop />
                              </Button>
                            </span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

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
                    control={accountForm.control}
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

                <div className="w-full sticky bottom-0 lg:px-8 p-2 lg:py-6 border-t bg-background flex flex-col-reverse lg:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={handlePrevStepper}
                    variant="outline"
                    className="flex-1"
                    disabled={sendAuthCode.isLoading}
                  >
                    <ArrowLeft /> Previous
                  </Button>
                  <Button
                    disabled={sendAuthCode.isLoading}
                    className="flex-1 !dark:bg-green-800 bg-green-700 "
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
              className="space-y-6 flex justify-center items-center flex-col "
            >
              <Form {...otpForm}>
                <div className="w-full  space-y-5">
                  <div className="lg:pt-8 lg:px-8 pt-6 px-2">
                    <h1 className="text-lg font-semibold">Code Verifcation</h1>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Enter the code we sent to your gmail.
                    </p>
                  </div>

                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="lg: max-w-lg w-full mx-auto lg:p-10 p-2 py-6">
                        <FormLabel className="flex justify-between items-center">
                          Enter 6-character code
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

                  <div className="w-full sticky bottom-0 lg:px-8 lg:py-6 py-4 px-2 flex-col-reverse lg:flex-row border-t bg-background flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={requestNewCode}
                      disabled={
                        resendTimer > 0 ||
                        verifyRegister.isLoading ||
                        sendAuthCode.isLoading
                      }
                    >
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Code"}
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
      </DrawerContent>
    </Drawer>
  );
}

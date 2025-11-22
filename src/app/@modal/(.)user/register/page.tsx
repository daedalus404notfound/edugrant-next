"use client";

import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CircleUserRound,
  Feather,
  GraduationCap,
  IdCard,
  LayoutPanelTop,
  Loader,
  MailIcon,
  Map,
  School,
  UserRound,
  UserRoundCheck,
  UsersRound,
  VenusAndMars,
} from "lucide-react";
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
import { motion } from "motion/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RegisterUserHandler } from "@/hooks/student-register/postRegisterHandler";
import { useRegisterUser } from "@/hooks/student-register/userRegisterZod";
import { useCountdown } from "@/hooks/useCountdown";
import { FormInputField } from "@/components/input-components/reusable-input";
import { FormPhoneField } from "@/components/input-components/reusable-contact-input";
import { FormSelectField } from "@/components/input-components/reusable-select";
import { FormDateField } from "@/components/input-components/reusable-birthdate";
import { FormCheckboxInputField } from "@/components/input-components/reusable-checkbox-input";
import { FormPasswordField } from "@/components/input-components/reusable-password";
import { FormConfirmPasswordField } from "@/components/input-components/reusable-confimpassword";
import { FormCheckboxField } from "@/components/input-components/reusable-checkbox-only";

export default function RegisterStudent() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const [indigenous, setIndigenous] = useState(false);
  const [pwd, setPwd] = useState(false);
  const { timeLeft, start } = useCountdown();
  const { sendCode, verifyCode, resendCode } = RegisterUserHandler();
  const { personalForm, accountForm, otpForm, personalData, accountData } =
    useRegisterUser();
  const [stepper, setStepper] = useState(1);

  const handlePrevStepper = () => {
    setStepper((prev) => prev - 1);
  };

  const handlePersonalSubmit = () => {
    setStepper(2);
  };

  useEffect(() => {
    if (sendCode.isSuccess) {
      setStepper(3);
    }
    if (sendCode.isSuccess && sendCode.data?.resendAvailableIn) {
      start(sendCode.data.resendAvailableIn);
    }
  }, [sendCode.isSuccess]);

  useEffect(() => {
    if (resendCode.isSuccess && resendCode.data?.resendAvailableIn) {
      start(resendCode.data.resendAvailableIn);
    }
  }, [resendCode.isSuccess]);

  useEffect(() => {
    if (verifyCode.isSuccess && open) {
      router.push("/user/login");
    }
  }, [verifyCode.isSuccess, open]);
  return (
    <Drawer
      direction="bottom"
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
      repositionInputs={false}
    >
      <DrawerContent className=" max-w-5xl bg-card px-1 mx-auto w-[98%] outline-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>

        <div className="bg-background rounded-md">
          <Stepper
            defaultValue={1}
            value={stepper}
            className="flex lg:p-6 py-6 px-4 lg:gap-3 gap-1"
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
          <div>
            {stepper === 1 && (
              <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}>
                <Form {...personalForm}>
                  <ScrollArea className="lg:max-h-[70dvh] max-h-[55dvh]">
                    {" "}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:px-6 px-4"
                    >
                      <h1 className="lg:text-lg text-base font-semibold">
                        Personal Information
                      </h1>
                      <p className="text-muted-foreground text-sm mt-1">
                        Tell us about yourself.
                      </p>
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 lg:px-6 px-4 py-6 lg:py-8">
                      <FormInputField
                        control={personalForm.control}
                        name="firstName"
                        label="First Name"
                        type="text"
                        icon={UserRound}
                        disabled={sendCode.isPending}
                        placeholder="Enter your first name"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                      />
                      <FormInputField
                        control={personalForm.control}
                        name="middleName"
                        label="Middle Name"
                        type="text"
                        icon={CircleUserRound}
                        disabled={sendCode.isPending}
                        placeholder="Enter your middle name (optional)"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                      />
                      <FormInputField
                        control={personalForm.control}
                        name="prefixName"
                        label="Prefix Name"
                        type="text"
                        icon={CircleUserRound}
                        disabled={sendCode.isPending}
                        placeholder="Enter your prefix name (optional)"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                      />
                      <FormInputField
                        control={personalForm.control}
                        name="lastName"
                        label="Last Name"
                        type="text"
                        icon={UserRoundCheck}
                        disabled={sendCode.isPending}
                        placeholder="Enter your last name"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.2 },
                        }}
                      />
                      <FormSelectField
                        control={personalForm.control}
                        name="civilStatus"
                        label="Civil Status"
                        placeholder="Select status"
                        options={[
                          { label: "Single", value: "single" },
                          { label: "Married", value: "married" },
                          { label: "Separated", value: "separated" },
                          { label: "Widowed", value: "widowed" },
                          { label: "Live-in", value: "live-in" },
                        ]}
                        icon={UsersRound}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.3 },
                        }}
                        enableOthers
                      />
                      <FormPhoneField
                        control={personalForm.control}
                        name="contactNumber"
                        label="Contact number"
                        disabled={sendCode.isPending}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.2 },
                        }}
                      />
                      <FormSelectField
                        control={personalForm.control}
                        name="gender"
                        label="Gender"
                        placeholder="Select gender"
                        options={[
                          { label: "Male", value: "Male" },
                          { label: "Female", value: "Female" },
                        ]}
                        icon={VenusAndMars}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.3 },
                        }}
                      />
                      <FormDateField
                        control={personalForm.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.3 },
                        }}
                      />
                      <FormInputField
                        control={personalForm.control}
                        name="address"
                        label="Address "
                        type="text"
                        icon={Map}
                        disabled={sendCode.isPending}
                        placeholder="(Street, Barangay, City/Municipality,
                              Province)"
                        className="lg:col-span-2"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                      />
                      <FormCheckboxField
                        control={personalForm.control}
                        name="dswd"
                        label="DSWD"
                        description="Part of DSWD?"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                      />
                      <FormCheckboxField
                        control={personalForm.control}
                        name="fourPs"
                        label="4p's"
                        description="Part of 4ps?"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                      />
                      <FormCheckboxInputField
                        control={personalForm.control}
                        name="indigenous"
                        label="Indigenous Group"
                        checkboxLabel="Indigenous Group"
                        placeholder="Specify your Indigenous group (if applicable)"
                        icon={Feather}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                        checked={indigenous}
                        onCheckedChange={setIndigenous}
                      />
                      <FormCheckboxInputField
                        control={personalForm.control}
                        name="pwd"
                        label="Person with Disability (PWD)"
                        checkboxLabel="Person with Disability (PWD)"
                        placeholder="Specify your disabilty (if applicable)"
                        icon={Accessibility}
                        checked={pwd}
                        onCheckedChange={setPwd}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.5 },
                        }}
                      />
                    </div>
                  </ScrollArea>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="p-4 bg-card"
                  >
                    <Button
                      onClick={personalForm.handleSubmit(handlePersonalSubmit)}
                      className="w-full"
                    >
                      Next <ArrowRight />
                    </Button>
                  </motion.div>
                </Form>
              </form>
            )}
            {stepper === 2 && (
              <form
                onSubmit={accountForm.handleSubmit((values) =>
                  sendCode.mutate({
                    personalData: personalForm.getValues(),
                    accountData: values,
                  })
                )}
              >
                <Form {...accountForm}>
                  <ScrollArea className="lg:max-h-[70dvh] max-h-[55dvh]">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:px-6 px-4"
                    >
                      <h1 className="lg:text-lg text-base font-semibold">
                        Account Information
                      </h1>
                      <p className="text-muted-foreground text-sm mt-1">
                        Fill out all required fields to start scholarship
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 lg:px-6 px-4 py-6 lg:py-8">
                      <FormInputField
                        control={accountForm.control}
                        name="studentId"
                        label="Student ID"
                        type="number"
                        icon={IdCard}
                        disabled={sendCode.isPending}
                        placeholder="Enter your student ID"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                      />
                      <FormSelectField
                        control={accountForm.control}
                        name="studentType"
                        label="Student Type"
                        placeholder="Select Student Type"
                        options={[
                          {
                            label: "Regular",
                            value: "regular",
                          },
                          {
                            label: "Irregular",
                            value: "irregular",
                          },
                          {
                            label: "Freshmen",
                            value: "freshmen",
                          },
                          {
                            label: "Transferee",
                            value: "transferee",
                          },
                          {
                            label: "Second Couse",
                            value: "secondCourse",
                          },
                        ]}
                        icon={UserRound}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.2 },
                        }}
                      />

                      <FormInputField
                        control={accountForm.control}
                        name="email"
                        label="Email"
                        type="email"
                        icon={MailIcon}
                        disabled={sendCode.isPending}
                        placeholder="Enter your email"
                        className="lg:col-span-2"
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                      />

                      <FormSelectField
                        control={accountForm.control}
                        name="institute"
                        label="Institute"
                        enableOthers
                        placeholder="Select Institute"
                        options={[
                          {
                            label: "ICS - Institute of Computer Studies",
                            value: "ICS",
                          },
                          {
                            label: "IAS - Institute of Arts and Sciences",
                            value: "IAS",
                          },
                          {
                            label: "IED - Institute of Education",
                            value: "IED",
                          },
                          {
                            label:
                              "IEAT - Institute of Engineering and Applied Technology",
                            value: "IEAT",
                          },
                          {
                            label: "IM - Institute of Management",
                            value: "IM",
                          },
                          {
                            label:
                              "CAVM - College of Agriculture and Veterinary Medicine",
                            value: "CAVM",
                          },
                        ]}
                        icon={School}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.2 },
                        }}
                      />

                      <FormSelectField
                        control={accountForm.control}
                        name="course"
                        label="Course"
                        placeholder="Select Course"
                        enableOthers
                        options={[
                          {
                            label: "BS in Agriculture (Animal Science)",
                            value: "BSAGRI-ANSCI",
                          },
                          {
                            label: "BS in Agriculture (CRSC-Horti)",
                            value: "BSAGRI-HORTI",
                          },
                          {
                            label: "BS in Agriculture (CRSC-Agronomy)",
                            value: "BSAGRI-AGRONOMY",
                          },
                          {
                            label: "BS in Agriculture (AgEx)",
                            value: "BSAGRI-AGEX",
                          },
                          {
                            label: "BS in Agriculture (Crop Science)",
                            value: "BSAGRI-CROP",
                          },
                          {
                            label: "Certificate of Agricultural Sciences",
                            value: "CAS",
                          },
                          { label: "BS in Agroforestry", value: "BSAGRO" },
                          {
                            label: "Doctor of Veterinary Medicine",
                            value: "DVM",
                          },
                          {
                            label:
                              "BS in Agricultural and Biosystems Engineering",
                            value: "BSABE",
                          },
                          {
                            label: "BS in Geodetic Engineering",
                            value: "BSGE",
                          },
                          {
                            label: "BS in Information Technology",
                            value: "BSIT",
                          },
                          { label: "BS in Food Technology", value: "BSFT" },
                          {
                            label: "Bachelor of Elementary Education",
                            value: "BEED",
                          },
                          {
                            label: "Bachelor of Secondary Education (English)",
                            value: "BSED-ENGLISH",
                          },
                          {
                            label: "Bachelor of Secondary Education (Science)",
                            value: "BSED-SCIENCE",
                          },
                          { label: "BS in Agribusiness", value: "BSAB" },
                          {
                            label: "BS in Business Administration",
                            value: "BSBA",
                          },
                          {
                            label: "BS in Agribusiness Management",
                            value: "BSABM",
                          },
                          {
                            label: "BS in Hospitality Management",
                            value: "BSHM",
                          },
                          {
                            label: "BS in Development Communication",
                            value: "BSDC",
                          },
                          {
                            label: "Master of Science in Agriculture",
                            value: "MSAGRI",
                          },
                          {
                            label: "Master of Arts in Education",
                            value: "MAED",
                          },
                          {
                            label:
                              "Doctor of Philosophy in Agricultural Sciences",
                            value: "PHD-AGRI",
                          },
                          {
                            label:
                              "Doctor of Philosophy in Educational Management",
                            value: "PHD-EDMAN",
                          },
                          {
                            label: "Teacher Education Certificate Course",
                            value: "TECC",
                          },
                        ]}
                        icon={GraduationCap}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.2 },
                        }}
                      />

                      <FormSelectField
                        control={accountForm.control}
                        name="yearLevel"
                        label="Year Level"
                        placeholder="Select Year Level"
                        enableOthers
                        options={[
                          { label: "1st Year", value: "1st Year" },
                          { label: "2nd Year", value: "2nd Year" },
                          { label: "3rd Year", value: "3rd Year" },
                          { label: "4th Year", value: "4th Year" },
                          { label: "5th Year", value: "5th Year" },
                          { label: "6th Year", value: "6th Year" },
                          { label: "7th Year", value: "7th Year" },
                          { label: "8th Year", value: "8th Year" },
                        ]}
                        icon={BookMarked}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.3 },
                        }}
                      />

                      <FormSelectField
                        control={accountForm.control}
                        name="section"
                        label="Section"
                        placeholder="Select Section"
                        enableOthers
                        options={[
                          { label: "Section A", value: "A" },
                          { label: "Section B", value: "B" },
                          { label: "Section C", value: "C" },
                          { label: "Section D", value: "D" },
                          { label: "Section E", value: "E" },
                          { label: "Section F", value: "F" },
                          { label: "Section G", value: "G" },
                          { label: "Section H", value: "H" },
                          { label: "Section I", value: "I" },
                          { label: "Section J", value: "J" },
                        ]}
                        icon={LayoutPanelTop}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.3 },
                        }}
                      />

                      <FormPasswordField
                        control={accountForm.control}
                        name="password"
                        label="Password"
                        disabled={sendCode.isPending}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                      />

                      <FormConfirmPasswordField
                        control={accountForm.control}
                        name="confirmPassword"
                        passwordField="password"
                        watch={accountForm.watch}
                        disabled={sendCode.isPending}
                        motionProps={{
                          transition: { duration: 0.3, delay: 0.4 },
                        }}
                      />
                    </div>
                  </ScrollArea>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="p-4 bg-card grid grid-cols-2 gap-3"
                  >
                    <Button
                      type="button"
                      onClick={handlePrevStepper}
                      variant="outline"
                      className="flex-1"
                      disabled={sendCode.isPending}
                    >
                      <ArrowLeft /> Previous
                    </Button>
                    <Button
                      disabled={sendCode.isPending}
                      className="flex-1 "
                      type="submit"
                    >
                      {sendCode.isPending ? (
                        <>
                          Registering...
                          <Loader
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
                  </motion.div>
                </Form>
              </form>
            )}

            {stepper === 3 && (
              <form
                onSubmit={otpForm.handleSubmit((values) =>
                  verifyCode.mutate({
                    personalData: personalForm.getValues(),
                    accountData: accountForm.getValues(),
                    otp: values,
                  })
                )}
                className="space-y-6 flex justify-center items-center flex-col "
              >
                <Form {...otpForm}>
                  <div className="w-full  space-y-5 lg:p-6 p-2">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="lg: max-w-lg w-full mx-auto lg:p-10 p-2 lg:py-6">
                          <FormLabel className="flex justify-between items-center">
                            Enter 6-digit code
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              disabled={verifyCode.isPending}
                              onChange={(value) => {
                                field.onChange(value);
                                if (value.length === 6) {
                                  accountForm.handleSubmit((values) =>
                                    verifyCode.mutate({
                                      personalData: personalForm.getValues(),
                                      accountData: values,
                                      otp: otpForm.getValues(),
                                    })
                                  )();
                                }
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
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative flex justify-center items-center gap-3 lg:px-6 px-2"
                    >
                      <div className=" border-b flex-1"></div>

                      <p className="text-sm text-muted-foreground">
                        Didn't recieve the code?{" "}
                        <button
                          type="button"
                          className="underline text-foreground cursor-pointer"
                          onClick={accountForm.handleSubmit((values) =>
                            resendCode.mutate({
                              personalData: personalForm.getValues(),
                              accountData: values,
                            })
                          )}
                          disabled={
                            timeLeft > 0 ||
                            sendCode.isPending ||
                            verifyCode.isPending ||
                            resendCode.isPending
                          }
                        >
                          {timeLeft > 0
                            ? `Resend in ${timeLeft}s`
                            : resendCode.isPending
                            ? "Resending..."
                            : "Resend Now"}
                        </button>
                      </p>
                      <div className=" border-b flex-1"></div>
                    </motion.div>
                  </div>{" "}
                  <div className="p-4 bg-card w-full">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={verifyCode.isPending}
                    >
                      {verifyCode.isPending ? (
                        <>
                          Verifying code...
                          <Loader
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
                </Form>
              </form>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

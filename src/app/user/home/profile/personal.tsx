"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileForm, UserFormData } from "@/hooks/user/zodUserProfile";
import { format } from "date-fns";
import {
  Accessibility,
  BookMarked,
  Calendar1,
  Check,
  CircleUserRound,
  Feather,
  GraduationCap,
  IdCard,
  LayoutPanelTop,
  Loader,
  Mail,
  MailIcon,
  Map,
  School,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  UsersRound,
  VenusAndMars,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useEditUserProfile } from "@/hooks/user/postProfileUpdate";
import { AnimatePresence, motion } from "motion/react";
import { FormInputField } from "@/components/input-components/reusable-input";
import { FormSelectField } from "@/components/input-components/reusable-select";
import { FormDateField } from "@/components/input-components/reusable-birthdate";
import { FormPhoneField } from "@/components/input-components/reusable-contact-input";
import { FormCheckboxField } from "@/components/input-components/reusable-checkbox-only";
import { FormCheckboxInputField } from "@/components/input-components/reusable-checkbox-input";
export default function PersonalProfile() {
  const { data, loading } = useAuthenticatedUser();
  const { form, isChanged } = useProfileForm(data?.userData);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isIndigenousChecked, setIsIndigenousChecked] = useState(
    !!data?.userData?.Student.indigenous
  );
  const [isPWDChecked, setIsPWDChecked] = useState(
    !!data?.userData?.Student.PWD
  );
  const mutation = useEditUserProfile();
  const indigenous = data?.userData.Student.indigenous;
  const pwd = data?.userData.Student.PWD;
  useEffect(() => {
    if (indigenous) {
      setIsIndigenousChecked(true);
    } else {
      setIsIndigenousChecked(false);
    }
  }, [indigenous]);

  useEffect(() => {
    if (pwd) {
      setIsPWDChecked(true);
    } else {
      setIsPWDChecked(false);
    }
  }, [pwd]);
  return (
    <div className=" w-full lg:space-y-12 space-y-6">
      {/* <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
        <div className="flex">
          <div className="relative flex items-end gap-4">
            <FormField
              control={form.control}
              name="Student.profileImg.publicUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <DragAndDropAreaProfile
                      isSuccess={isSuccess}
                      label="backdrop image"
                      accept={["image/png", "image/jpeg"]}
                      initialImageUrl={
                        data?.userData?.Student.profileImg?.publicUrl
                      }
                      onFilesChange={(files) =>
                        field.onChange(
                          files[0]
                            ? files[0]
                            : data?.userData?.Student.profileImg?.publicUrl
                        )
                      } // Single file
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <h1 className="text-xl font-medium">{`${
                data?.userData?.Student.lName
              }, ${data?.userData?.Student.fName} ${
                data?.userData?.Student.mName
                  ? data?.userData?.Student.mName
                  : ""
              }`}</h1>
              <p className="text-muted-foreground">
                {data?.userData?.schoolId}
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="space-y-8"
        >
          <div className="bg-gradient-to-br dark:to-card to-card/20 dark:from-card/50 from-card/10 shadow rounded-md overflow-hidden border-border/50 border dark:border-0">
            {/* Header Section */}
            <div className="relative flex flex-col lg:flex-row  lg:items-end items-center  lg:py-8 py-2 lg:px-6 px-2  lg:gap-4 gap-2">
              {/* <img
                          className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
                          src={logo.src}
                          alt=""
                        /> */}

              <FormField
                control={form.control}
                name="Student.profileImg.publicUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <DragAndDropAreaProfile
                        isSuccess={mutation.isSuccess}
                        label="backdrop image"
                        accept={["image/png", "image/jpeg"]}
                        initialImageUrl={
                          data?.userData.Student?.profileImg?.publicUrl ||
                          "https://github.com/shadcn.png"
                        }
                        onFilesChange={(files) =>
                          field.onChange(
                            files[0]
                              ? files[0]
                              : data?.userData.Student?.profileImg?.publicUrl ||
                                  "https://github.com/shadcn.png"
                          )
                        } // Single file
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                {loading ? (
                  <div className="flex flex-col gap-2 flex-1 px-4">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ) : (
                  <div className="space-y-1.5 py-2">
                    <h1 className="lg:text-xl  font-semibold text-foreground jakarta tracking-wide">
                      {data?.userData.Student?.lName},{" "}
                      {data?.userData.Student?.fName}{" "}
                      {data?.userData.Student?.mName}
                    </h1>

                    <p className="text-muted-foreground text-sm">
                      {data?.userData.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            {/* Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:py-6 py-4 lg:px-4 px-2  dark:bg-card bg-card/30 relative   border-border/50 border-t">
              <div className="space-y-1.5  border-l lg:pl-6 pl-4 hidden lg:block">
                <div className="flex items-center gap-2">
                  <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                  <h1 className="text-xs text-muted-foreground">User Role</h1>
                </div>
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : (
                  <p className="font-medium text-foreground  line-clamp-1 lg:text-base text-sm">
                    {data?.userData?.role}
                  </p>
                )}
              </div>
              <div className="space-y-1.5  border-l lg:pl-6 pl-4">
                <div className="flex items-center gap-2">
                  <VenusAndMars className="w-3.5 h-3.5 text-muted-foreground" />
                  <h1 className="text-xs text-muted-foreground">Gender</h1>
                </div>
                {loading ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  <p className="font-medium text-foreground  line-clamp-1 lg:text-base text-sm">
                    {data?.userData?.Student.gender || "—"}
                  </p>
                )}
              </div>{" "}
              <div className="space-y-1.5 border-l lg:pl-6 pl-4">
                <div className="flex items-center gap-2">
                  <Calendar1 className="w-3.5 h-3.5 text-muted-foreground" />
                  <h1 className="text-xs text-muted-foreground">
                    Account Created
                  </h1>
                </div>
                {loading ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  <p className="font-medium text-foreground  line-clamp-1 lg:text-base text-sm">
                    {(data?.userData.Student?.dateCreated &&
                      format(data?.userData.Student?.dateCreated, "PPP")) ||
                      "N/A"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-medium flex gap-2 items-center py-3">
              <UserRoundCog className="h-4.5 w-4.5" /> Personal Information
            </h3>

            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 lg:p-6 py-4 px-2 bg-card/30 shadow dark:bg-card rounded-md">
              <FormInputField
                control={form.control}
                name="Student.fName"
                label="First Name"
                type="text"
                icon={UserRound}
                disabled={mutation.isPending}
                placeholder="Enter your first name"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={form.control}
                name="Student.mName"
                label="Middle Name"
                type="text"
                icon={CircleUserRound}
                disabled={mutation.isPending}
                placeholder="Enter your middle name (optional)"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={form.control}
                name="Student.prefixName"
                label="Prefix Name"
                type="text"
                icon={CircleUserRound}
                disabled={mutation.isPending}
                placeholder="Enter your prefix name (optional)"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={form.control}
                name="Student.lName"
                label="Last Name"
                type="text"
                icon={UserRoundCheck}
                disabled={mutation.isPending}
                placeholder="Enter your last name"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormSelectField
                control={form.control}
                name="Student.civilStatus"
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
              <FormSelectField
                control={form.control}
                name="Student.gender"
                label="Gender"
                placeholder="Select gender"
                disabled={mutation.isPending}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                icon={VenusAndMars}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.3 },
                }}
              />
              <FormInputField
                control={form.control}
                name="Student.address"
                label="Address "
                type="text"
                icon={Map}
                disabled={mutation.isPending}
                placeholder="(Street, Barangay, City/Municipality,
                              Province)"
                className="lg:col-span-2"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.4 },
                }}
              />
              <FormDateField
                control={form.control}
                name="Student.dateOfBirth"
                label="Date of Birth"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.3 },
                }}
              />
              <FormPhoneField
                control={form.control}
                name="Student.contactNumber"
                label="Contact number"
                disabled={mutation.isPending}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormCheckboxField
                control={form.control}
                name="Student.dswd"
                label="DSWD"
                description="Part of DSWD?"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.4 },
                }}
              />
              <FormCheckboxField
                control={form.control}
                name="Student.fourPs"
                label="4p's"
                description="Part of 4ps?"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.4 },
                }}
              />
              <FormCheckboxInputField
                control={form.control}
                name="Student.indigenous"
                label="Indigenous Group"
                checkboxLabel="Indigenous Group"
                placeholder="Specify your Indigenous group (if applicable)"
                icon={Feather}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.4 },
                }}
                checked={isIndigenousChecked}
                onCheckedChange={setIsIndigenousChecked}
              />
              <FormCheckboxInputField
                control={form.control}
                name="Student.PWD"
                label="Person with Disability (PWD)"
                checkboxLabel="Person with Disability (PWD)"
                placeholder="Specify your disabilty (if applicable)"
                icon={Accessibility}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.5 },
                }}
                checked={isPWDChecked}
                onCheckedChange={setIsPWDChecked}
              />
            </div>
          </div>

          <div className="space-y-1">
            {/* Header */}

            <h3 className="text-base font-medium flex gap-2 items-center py-2">
              <Mail className="h-4.5 w-4.5" /> Account Information
            </h3>

            {/* Form Grid */}
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 lg:p-6 py-4 px-2 bg-card/30 shadow dark:bg-card rounded-md">
              {/* Student ID */}

              <FormInputField
                control={form.control}
                name="schoolId"
                label="Student ID"
                type="number"
                icon={IdCard}
                disabled={mutation.isPending}
                placeholder="Enter your student ID"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />

              <FormSelectField
                control={form.control}
                name="Student.studentType"
                label="Student Type"
                placeholder="Select Student Type"
                options={[
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

              <FormSelectField
                control={form.control}
                name="Student.institute"
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
                control={form.control}
                name="Student.course"
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
                    label: "BS in Agricultural and Biosystems Engineering",
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
                    label: "Doctor of Philosophy in Agricultural Sciences",
                    value: "PHD-AGRI",
                  },
                  {
                    label: "Doctor of Philosophy in Educational Management",
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
                control={form.control}
                name="Student.year"
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
                control={form.control}
                name="Student.section"
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

              {/* Course */}
              <FormInputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                icon={MailIcon}
                disabled={mutation.isPending}
                placeholder="Enter your email"
                className="lg:col-span-2"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
            </div>
          </div>

          <AnimatePresence>
            {isChanged && (
              <div className="sticky bottom-16 lg:bottom-0 ">
                <motion.div
                  className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      size="lg"
                      className="cursor-pointer"
                      type="submit"
                      disabled={mutation.isPending}
                    >
                      <Check />
                      {mutation.isPending ? "Saving..." : "Save Changes"}
                      {mutation.isPending && (
                        <Loader className="animate-spin" />
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}

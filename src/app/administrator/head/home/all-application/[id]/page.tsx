"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowLeft,
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
  Map,
  Trash2,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  X,
} from "lucide-react";

import { useUpdateUserByHead } from "@/hooks/user/updateUserByHead";

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
import { Calendar } from "@/components/ui/calendar";
import { AnimatePresence, motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import useDeleteStudent from "@/hooks/admin/postDeleteUserByHead";
import { Tabs } from "@/components/ui/vercel-tabs";
import useStudentById from "@/hooks/admin/getStudentById";
import { Skeleton } from "@/components/ui/skeleton";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
import { ProfileInfoSkeleton } from "./profile-skeleton";

export default function InterceptReviewApplicants() {
  const params = useParams();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [status, setStatus] = useState("info");

  const id = Number(params.id);
  const { data, isLoading } = useStudentById(id);
  const { onSubmit, deleteLoading, openDelete, setOpenDelete } =
    useDeleteStudent({ id });
  const {
    form,
    handleSubmit,
    loading: ludeng,
    isChanged,
    reset,
    setReset,
  } = useUpdateUserByHead(data);
  const [isIndigenousChecked, setIsIndigenousChecked] = useState(
    !!data?.indigenous
  );
  const [isPWDChecked, setIsPWDChecked] = useState(!!data?.PWD);
  const router = useRouter();
  const tabs = [
    { id: "info", label: "Student Information", indicator: null },
    { id: "scholarships", label: "Scholarships", indicator: null },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <Button className="mb-6" onClick={() => router.back()}>
          <ArrowLeft />
          Back
        </Button>

        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </div>
        <div className="mt-15 lg:w-[60%] min-w-5xl w-full mx-auto">
          {isLoading ? (
            <ProfileInfoSkeleton />
          ) : status === "info" ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className=" w-full space-y-12"
              >
                <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
                  <div className="flex justify-between items-end">
                    <div className="relative flex items-end gap-4">
                      <FormField
                        control={form.control}
                        name="profileImg.publicUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-between items-center">
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <DragAndDropAreaProfile
                                isSuccess={reset}
                                setIsSuccess={setReset}
                                label="backdrop image"
                                accept={["image/png", "image/jpeg"]}
                                initialImageUrl={
                                  data?.profileImg?.publicUrl ||
                                  "https://github.com/shadcn.png"
                                }
                                onFilesChange={(files) =>
                                  field.onChange(
                                    files[0]
                                      ? files[0]
                                      : data?.profileImg?.publicUrl ||
                                          "https://github.com/shadcn.png"
                                  )
                                } // Single file
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div>
                        <h1 className="text-xl font-medium">{`${data?.lName}, ${data?.fName} ${data?.mName}`}</h1>
                        <p className="text-muted-foreground">
                          {data?.Account?.schoolId}
                        </p>
                      </div>
                    </div>
                    <DeleteDialog
                      open={openDelete}
                      onOpenChange={setOpenDelete}
                      onConfirm={onSubmit}
                      loading={deleteLoading}
                      title="Delete Account?"
                      description="This will permanently delete account and cannot be undone."
                      confirmText="Delete"
                      cancelText="Keep Account"
                      trigger={
                        <Button
                          onClick={() => setOpenDelete(true)}
                          type="button"
                          variant="destructive"
                        >
                          <Trash2 /> Delete Account
                        </Button>
                      }
                    />
                  </div>
                </div>

                <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
                  <div className="">
                    <h3 className="text-base font-medium flex gap-2 items-center py-3">
                      <UserRoundCog className="h-4.5 w-4.5" /> Personal
                      Information
                    </h3>
                    <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    <FormField
                      control={form.control}
                      name="fName"
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              First Name
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mName"
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              Middle Name
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder="(Optional)"
                                {...field}
                                className="rounded-r-none"
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <CircleUserRound />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lName"
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              Last Name
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <UserRoundCheck />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />{" "}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Gender
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
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <VenusAndMars />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="lg:col-span-2">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              Address
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Map />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              Date of Birth
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="flex items-center  border border-input border-r-0 rounded-l-md text-sm">
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
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-muted-foreground">
                              Contact Number
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl className="">
                            <div className="flex">
                              {/* Fixed +639 prefix */}
                              <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                                +63
                              </span>
                              <Input
                                type="text"
                                placeholder=""
                                maxLength={10}
                                value={field.value?.replace("+63", "") || ""}
                                onChange={(e) => {
                                  const val = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10);
                                  field.onChange(`+63${val}`);
                                }}
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="indigenous"
                      render={({ field }) => (
                        <FormItem className="">
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
                                disabled={!isIndigenousChecked}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Feather />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="PWD"
                      render={({ field }) => (
                        <FormItem className="">
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
                                disabled={!isPWDChecked}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Accessibility />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
                  <div className="">
                    <h3 className="text-base font-medium flex gap-2 items-center py-3">
                      <Mail className="h-4.5 w-4.5" /> Account Information
                    </h3>
                    <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    <FormField
                      control={form.control}
                      name="Account.schoolId"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Student ID
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              {" "}
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                type="number"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <IdCard />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Course
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="rounded-r-none w-full">
                                  <SelectValue placeholder="Select Course" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="BSIT">
                                    BSIT - Information Technology
                                  </SelectItem>
                                  <SelectItem value="BSCS">
                                    BSCS - Computer Science
                                  </SelectItem>
                                  <SelectItem value="BSGE">
                                    BSGE - Geodetic Engineering
                                  </SelectItem>
                                  <SelectItem value="BSFT">
                                    BSFT - Food Technology
                                  </SelectItem>
                                  <SelectItem value="BSABEN">
                                    BSABEN - Agricultural Engineering
                                  </SelectItem>
                                  <SelectItem value="BSED">
                                    BSED - Secondary Education
                                  </SelectItem>
                                  <SelectItem value="BSBA">
                                    BSBA - Business Administration
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <GraduationCap />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Account.email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              {" "}
                              <Input
                                placeholder=""
                                className="rounded-r-none"
                                type="email"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Mail />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Year Level
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Select
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
                                </SelectContent>
                              </Select>

                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <BookMarked />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="section"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Section
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="rounded-r-none w-full">
                                  <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                  <SelectItem value="E">E</SelectItem>
                                  <SelectItem value="F">F</SelectItem>
                                  <SelectItem value="G">G</SelectItem>
                                  <SelectItem value="H">H</SelectItem>
                                  <SelectItem value="I">I</SelectItem>
                                  <SelectItem value="J">J</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <LayoutPanelTop />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                            disabled={ludeng}
                          >
                            <Check />
                            {ludeng ? "Saving..." : "Save Changes"}
                            {ludeng && <Loader className="animate-spin" />}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          ) : (
            status === "scholarships" && (
              <div className="grid grid-cols-3  gap-4">
                {isLoading ? (
                  [...Array(2)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="bg-background/40 relative rounded-md space-y-3"
                    >
                      <Skeleton className="h-40" />
                    </motion.div>
                  ))
                ) : data?.Application.length === 0 ? (
                  <div className="flex justify-center items-center w-full p-4">
                    <p>No application found.</p>
                  </div>
                ) : (
                  data?.Application.slice(0, 2).map((scholarship, index) => (
                    <motion.div
                      key={scholarship.scholarshipId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="shadow-sm hover:shadow-md transition-all duration-200 lg:p-1  p-0.5  lg:rounded-lg rounded-md border bg-card"
                    >
                      <div className="relative lg:rounded-lg rounded-md bg-background overflow-hidden">
                        <img
                          className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs`}
                          src={scholarship.Scholarship?.cover}
                          alt=""
                        />
                        <div className="relative z-10">
                          <div className="relative lg:aspect-[16/8.5] aspect-[16/10] w-full lg:rounded-md rounded-sm overflow-hidden">
                            <div className=" gap-1.5 absolute top-0 right-2 z-20 hidden lg:flex"></div>

                            <img
                              className="h-full w-full object-cover"
                              src={scholarship.Scholarship?.cover}
                              alt=""
                            />
                          </div>

                          <div className="lg:p-4 p-2 space-y-2 lg:space-y-6 ">
                            <div className="flex items-center gap-3">
                              {scholarship ? (
                                <img
                                  src={scholarship.Scholarship?.logo}
                                  alt={scholarship.Scholarship?.title}
                                  className="w-10 h-10 rounded-full object-cover border hidden lg:block"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                  No Logo
                                </div>
                              )}{" "}
                              <div className="w-full">
                                <h3 className="font-semibold lg:text-sm text-xs line-clamp-1">
                                  {scholarship?.Scholarship?.title}
                                </h3>

                                <p className="lg:text-sm text-xs text-muted-foreground">
                                  {scholarship?.Scholarship
                                    ?.Scholarship_Provider?.name ||
                                    "Unknown Provider"}
                                </p>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1 lg:text-sm text-xs text-muted-foreground">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <span className="text-xs">Deadline</span>
                                <span className="font-medium text-foreground line-clamp-1">
                                  {scholarship?.dateCreated
                                    ? format(scholarship?.dateCreated, "PPP")
                                    : "—"}
                                </span>
                              </div>
                              <div className="hidden lg:flex items-center justify-between">
                                <span className="text-xs">
                                  Scholarship Type
                                </span>
                                <span className="font-medium text-foreground">
                                  {scholarship?.Scholarship?.type || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

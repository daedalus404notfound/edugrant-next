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
  Map,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
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
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
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
              <FormField
                control={form.control}
                name="Student.fName"
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
                name="Student.mName"
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
                name="Student.lName"
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
                name="Student.gender"
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
                name="Student.address"
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
                name="Student.dateOfBirth"
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
                name="Student.contactNumber"
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
                        {/* Fixed +63 prefix */}
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
                name="Student.indigenous"
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
                name="Student.PWD"
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
                          onChange={(e) => setIsPWDChecked(e.target.checked)}
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

          <div className="space-y-1">
            {/* Header */}

            <h3 className="text-base font-medium flex gap-2 items-center py-2">
              <Mail className="h-4.5 w-4.5" /> Account Information
            </h3>

            {/* Form Grid */}
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 lg:p-6 py-4 px-2 bg-card/30 shadow dark:bg-card rounded-md">
              {/* Student ID */}
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground">
                      Student ID
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Input
                          type="number"
                          {...field}
                          disabled
                          className="flex-1 rounded-r-none"
                        />
                        <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

              {/* Course */}
              <FormField
                control={form.control}
                name="Student.course"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground">
                      Course
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="flex-1 rounded-r-none">
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
                        <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full col-span-1 lg:col-span-2">
                    <FormLabel className="text-muted-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Input
                          type="email"
                          {...field}
                          disabled
                          className="flex-1 rounded-r-none"
                        />
                        <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

              {/* Year Level */}
              <FormField
                control={form.control}
                name="Student.year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground">
                      Year Level
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="flex-1 rounded-r-none">
                            <SelectValue placeholder="Select Year Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                            <SelectItem value="5th Year">5th Year</SelectItem>
                            <SelectItem value="6th Year">6th Year</SelectItem>
                            <SelectItem value="7th Year">7th Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

              {/* Section */}
              <FormField
                control={form.control}
                name="Student.section"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground">
                      Section
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="flex-1 rounded-r-none">
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "A",
                              "B",
                              "C",
                              "D",
                              "E",
                              "F",
                              "G",
                              "H",
                              "I",
                              "J",
                            ].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

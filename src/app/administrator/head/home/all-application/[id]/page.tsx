"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Banknote,
  BookMarked,
  Calendar1,
  Check,
  CircleUserRound,
  Feather,
  GraduationCap,
  IdCard,
  Landmark,
  LayoutPanelTop,
  Loader,
  Mail,
  Map,
  Save,
  Trash2,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
  X,
} from "lucide-react";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { useUpdateUserByHead } from "@/hooks/user/updateUserByHead";
import { Separator } from "@/components/ui/separator";
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
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import useStudentById from "@/hooks/admin/getStudentById";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [status, setStatus] = useState("info");
  const [edit, setEdit] = useState(false);
  const id = Number(params.id);
  const { data, loading } = useStudentById(id);
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete } =
    useDeleteStudent({ id });
  const {
    form,

    handleSubmit,
    loading: ludeng,
    isChanged,
  } = useUpdateUserByHead(data);

  const tabs = [
    { id: "info", label: "Student Information", indicator: null },
    { id: "scholarships", label: "Scholarships", indicator: null },
  ];
  return (
    <div className="bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[75%] lg:py-10  pt-3 space-y-8">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button onClick={() => router.back()}>
            <ArrowLeft /> Back
          </Button>
        </motion.div>
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <TitleReusable
            title="Update & View Student"
            description="Manage staff information and review their activity logs, including scholarship approvals and updates."
            Icon={UserRoundCog}
          />
        </motion.div>
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </motion.div>
        <div className="   space-y-8">
          {status === "info" && (
            <Form {...form}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium flex gap-2 items-center">
                    <Mail className="h-4.5 w-4.5" /> Personal Information
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            <span className="flex items-center  ">
                              <Button variant="secondary" size="lg">
                                <UserRound />
                              </Button>
                            </span>
                            <Input {...field} className="h-11 border-0" />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Middle Name
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center">
                              <Button variant="secondary" size="lg">
                                <CircleUserRound />
                              </Button>
                            </span>
                            <Input
                              placeholder="(Optional)"
                              {...field}
                              className="border-0 h-11"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Last Name
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <UserRoundCheck />
                              </Button>
                            </span>{" "}
                            <Input
                              placeholder=""
                              className="border-0 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <span className="flex items-center ">
                                <Button variant="secondary" size="lg">
                                  <VenusAndMars />
                                </Button>
                              </span>
                              <SelectTrigger className="!h-11 border-0 w-full">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            <span className="flex items-center  ">
                              <Popover
                                open={openCalendar}
                                onOpenChange={setOpenCalendar}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="secondary"
                                    size="lg"
                                    id="date"
                                  >
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
                              className="h-11 border-0"
                              placeholder="YYYY-MM-DD"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Contact Number
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center px-4 bg-card h-11 rounded-md">
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
                              className="h-11 border-0"
                            />
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
                      <FormItem className="col-span-2">
                        <FormLabel className="text-muted-foreground">
                          Address
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <Map />
                              </Button>
                            </span>{" "}
                            <Input
                              placeholder=""
                              className="border-0 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="indigenous"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between line-clamp-1">
                          Indigenous Group (IG) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <Feather />
                              </Button>
                            </span>{" "}
                            <Input
                              className="border-0 h-11"
                              placeholder="N/A"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="PWD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between line-clamp-1">
                          Person with Disability (PWD) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <Accessibility />
                              </Button>
                            </span>{" "}
                            <Input
                              placeholder="N/A"
                              {...field}
                              className="border-0 h-11"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium flex gap-2 items-center">
                    <Mail className="h-4.5 w-4.5" /> Account Information
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="Account.schoolId"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground">
                          Student ID
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center  gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <IdCard />
                              </Button>
                            </span>
                            <Input
                              placeholder=""
                              className="border-0 h-11"
                              type="number"
                              {...field}
                            />
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
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <Mail />
                              </Button>
                            </span>{" "}
                            <Input
                              placeholder=""
                              className="border-0 h-11"
                              {...field}
                            />
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
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Course
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <Landmark />
                              </Button>
                            </span>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="!h-11 border-0 w-full">
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
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Year Level
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <BookMarked />
                              </Button>
                            </span>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="!h-11 border-0 w-full">
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
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Section
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center gap-1">
                            <span className="flex items-center ">
                              <Button variant="secondary" size="lg">
                                <LayoutPanelTop />
                              </Button>
                            </span>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="!h-11 border-0 w-full">
                                <SelectValue placeholder="Select Section" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>

                                <SelectItem value="C">C</SelectItem>
                                <SelectItem value="D">D</SelectItem>
                                <SelectItem value="E">E</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DeleteDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                onConfirm={onSubmit}
                loading={deleteLoading}
                title="Delete Account?"
                description="This will permanently delete application and cannot be undone."
                confirmText="Delete"
                cancelText="Keep Account"
                trigger={
                  <Button
                    onClick={() => setOpenDelete(true)}
                    className="w-full"
                    variant="destructive"
                  >
                    <Trash2 /> Delete Account
                  </Button>
                }
              />

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
                          onClick={form.handleSubmit(handleSubmit)}
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
            </Form>
          )}

          {status === "scholarships" && (
            <div className="grid grid-cols-1  gap-4">
              {loading ? (
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
                <>No application found.</>
              ) : (
                data?.Application.slice(0, 2).map((meow) => (
                  <div
                    key={meow.scholarshipId}
                    className="group relative flex flex-col justify-between bg-card rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 gap-6"
                  >
                    {/* Logo + Provider */}
                    {/* <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {meow ? (
                          <img
                            src={meow.logo}
                            alt={meow.title}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                            No Logo
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {meow.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {meow.Scholarship_Provider?.name ||
                              "Unknown Provider"}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/user/home/scholarships/${meow.scholarshipId}`}
                      >
                        <Button className="w-full" size="sm">
                          View <ArrowRight />
                        </Button>
                      </Link>
                    </div> */}

                    {/* Details */}
                    {/* <div className="grid grid-cols-3 gap-1 text-sm text-muted-foreground">
                      <div className="flex flex-col border-l px-4">
                        <span className="text-xs">Deadline:</span>
                        <span className="font-medium text-foreground text-base">
                          {meow.deadline ? format(meow.deadline, "PPP") : "—"}
                        </span>
                      </div>
                      <div className="flex flex-col border-l px-4">
                        <span className="text-xs">Required GWA:</span>
                        <span className="font-medium text-foreground text-base">
                          {meow.requiredGWA || "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-col border-l px-4">
                        <span className="text-xs">Submitted Documents:</span>
                        <span className="font-medium text-foreground text-base">
                          3 / 3
                        </span>
                      </div>
                    </div> */}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

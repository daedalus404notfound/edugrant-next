"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminStore } from "@/store/adminUserStore";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  BookMarked,
  Calendar1,
  CircleUserRound,
  Feather,
  GraduationCap,
  IdCard,
  LayoutPanelTop,
  Mail,
  Map,
  Save,
  Trash2,
  UserRound,
  UserRoundCheck,
  VenusAndMars,
  X,
} from "lucide-react";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { Tabs } from "@/components/ui/vercel-tabs";
import FamilyStaff from "../../(.)application/[id]/family";
import StudentStaff from "../../(.)application/[id]/student";
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

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [activeSection, setActiveSection] = useState("student");
  const [edit, setEdit] = useState(false);
  const id = Number(params.id);
  const { data, loading } = useApplicationById(id);
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete } =
    useDeleteStudent({ id });
  const {
    form,
    siblings,
    handleSubmit,
    loading: ludeng,
  } = useUpdateUserByHead(data?.Student);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const navigationTabs = [
    { id: "student", label: "Student Info", indicator: null },
    { id: "family", label: "Family Background", indicator: null },
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px]  w-full mx-auto  outline-0 border-0 ">
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between lg:pb-2 ">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
              variant="ghost"
              size="sm"
            >
              <UserRound />
              Student Details
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="ghost"
              variant="ghost"
              size="sm"
              onClick={() => HandleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>
        {edit ? (
          <Form {...form}>
            <div className="  overflow-auto bg-background p-6 no-scrollbar">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium flex gap-2 items-center">
                    <Mail className="h-4.5 w-4.5" /> Personal Information
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <div className="">
                  <div className="grid lg:grid-cols-3 lg:gap-5">
                    <FormField
                      control={form.control}
                      name="fName"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            First Name
                          </FormLabel>
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

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mName"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            Middle Name
                          </FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lName"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            Last Name
                          </FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                  <div className="grid lg:grid-cols-2 lg:gap-5">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
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
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            Date of Birth
                          </FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                  <div className="grid lg:grid-cols-2 lg:gap-5">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            Address
                          </FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem className="lg:py-8 py-4">
                          <FormLabel className="text-muted-foreground">
                            Contact Number
                          </FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium flex gap-2 items-center">
                    <Mail className="h-4.5 w-4.5" /> Account Information
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-5">
                  <FormField
                    control={form.control}
                    name="Account.schoolId"
                    render={({ field }) => (
                      <FormItem className="lg:py-8 py-4">
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
                              disabled
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
                    name="Account.email"
                    render={({ field }) => (
                      <FormItem className="lg:py-8 py-4">
                        <FormLabel className="text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl className="">
                          <div className="flex items-center">
                            {" "}
                            <Input
                              placeholder=""
                              className="rounded-r-none"
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
                    name="course"
                    render={({ field }) => (
                      <FormItem className="lg:py-8 py-4">
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
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                <div className="grid lg:grid-cols-2 lg:gap-5">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="lg:py-8 py-4">
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
                      <FormItem className="lg:py-8 py-4">
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

                <div className="grid lg:grid-cols-2 lg:gap-5">
                  <FormField
                    control={form.control}
                    name="indigenous"
                    render={({ field }) => (
                      <FormItem className="lg:py-8 py-4">
                        <FormLabel className="flex items-center justify-between line-clamp-1">
                          Indigenous Group (IG) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              className="rounded-r-none"
                              placeholder="N/A"
                              {...field}
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
                      <FormItem className="lg:py-8 py-4">
                        <FormLabel className="flex items-center justify-between line-clamp-1">
                          Person with Disability (PWD) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              placeholder="N/A"
                              {...field}
                              className="rounded-r-none"
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
            </div>
          </Form>
        ) : (
          <div className="  overflow-auto bg-background p-6 no-scrollbar">
            <div className="">
              <Tabs
                tabs={navigationTabs}
                onTabChange={(tabId) => setActiveSection(tabId)}
                className="pb-6"
              />
            </div>
            {activeSection === "student" && (
              <StudentStaff data={data} loading={loading} />
            )}
            {activeSection === "family" && (
              <FamilyStaff data={data} loading={loading} />
            )}
          </div>
        )}

        {/* Enhanced Footer */}
        <DrawerFooter className="bg-gradient-to-r from-card/50 to-card border-t p-4 grid grid-cols-2 gap-3">
          {edit ? (
            <DeleteDialog
              open={openAlert}
              onOpenChange={setOpenAlert}
              onConfirm={form.handleSubmit(handleSubmit)}
              loading={ludeng}
              red={false}
              title="Update Student Info?"
              description="This will update user details."
              confirmText="Update"
              cancelText="Cancel"
              trigger={
                <Button>
                  <Save /> Update
                </Button>
              }
            />
          ) : (
            <Button onClick={() => setEdit(true)}>Edit</Button>
          )}

          {edit ? (
            <Button variant="secondary" onClick={() => setEdit(false)}>
              Back
            </Button>
          ) : (
            <DeleteDialog
              open={openDelete}
              onOpenChange={setOpenDelete}
              onConfirm={onSubmit}
              loading={deleteLoading}
              title="Delete application?"
              description="This will permanently delete application and cannot be undone."
              confirmText="Delete All"
              cancelText="Keep Account"
              trigger={
                <Button variant="destructive">
                  <Trash2 /> Delete
                </Button>
              }
            />
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

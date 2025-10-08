"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accessibility,
  AlertCircle,
  BookMarked,
  Briefcase,
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
  MapPinHouse,
  PhilippinePeso,
  Trash2,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useUpdateProfile } from "@/hooks/user/postProfileUpdate";
import { Separator } from "@/components/ui/separator";
import TitleReusable from "@/components/ui/title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
export default function Profile() {
  const { user } = useUserStore();
  const [openCalendar, setOpenCalendar] = useState(false);

  const { form, siblings, handleSubmit, loading, isChanged } =
    useUpdateProfile(user);
  const [tab, setTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Student Information", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pt-10  pt-3 lg:w-3/4 w-full p-2 lg:p-0 mx-auto">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <TitleReusable
            title="Profile Settings"
            description="Manage and update your personal information and account preferences."
            Icon={UserRoundCog}
          />
        </motion.div>

        <div className="py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar "
          >
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </motion.div>
          <Form {...form}>
            <div className="">
              {tab === "personal" && (
                <div className=" w-full space-y-5">
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
                          name="Student.fName"
                          render={({ field }) => (
                            <FormItem className="lg:py-8 py-4">
                              <FormLabel className="text-muted-foreground">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    {...field}
                                    className="rounded-r-none"
                                  />
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
                          name="Student.mName"
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
                          name="Student.lName"
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
                          name="Student.gender"
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
                                      <SelectItem value="Female">
                                        Female
                                      </SelectItem>
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
                          name="Student.dateOfBirth"
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
                                              date
                                                ? format(date, "yyyy-MM-dd")
                                                : ""
                                            );
                                            setOpenCalendar(false);
                                          }}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </span>
                                  <Input
                                    value={field.value ? field.value : ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
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
                          name="Student.address"
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
                          name="Student.contactNumber"
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
                                    value={
                                      field.value?.replace("+63", "") || ""
                                    }
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
                        name="schoolId"
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
                        name="Student.course"
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
                        name="Student.year"
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
                        name="Student.section"
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
                        name="Student.indigenous"
                        render={({ field }) => (
                          <FormItem className="lg:py-8 py-4">
                            <FormLabel className="flex items-center justify-between line-clamp-1">
                              Indigenous Group (IG) <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  className="rounded-r-none"
                                  placeholder="Please specify your Indigenous group (if applicable)"
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
                        name="Student.PWD"
                        render={({ field }) => (
                          <FormItem className="lg:py-8 py-4">
                            <FormLabel className="flex items-center justify-between line-clamp-1">
                              Person with Disability (PWD) <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  placeholder="Please specify your disability (if applicable)"
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
              )}

              {tab === "family" && (
                <div className=" w-full ">
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 pb-10">
                    {/* <p className="text-sm text-muted-foreground p-4 bg-card col-span-2 rounded-md flex gap-2 items-center">
                      <AlertCircle size={15} /> If no information available,
                      type <span className="font-medium">N/A.</span>
                    </p> */}
                    <div className="lg:col-span-2 col-span-1 space-y-4">
                      <div className="flex items-center gap-3 flex-col lg:flex-row">
                        <h3 className="text-lg font-medium flex gap-2 items-center">
                          Father Information
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <Controller
                          control={form.control}
                          name="Student.familyBackground.fatherStatus" // matches Zod schema
                          // default status
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Separated"
                                  id="fatherStatus-separated"
                                />
                                <Label htmlFor="fatherStatus-separated">
                                  Separated
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Living"
                                  id="fatherStatus-living"
                                />
                                <Label htmlFor="fatherStatus-living">
                                  Living
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Deceased"
                                  id="fatherStatus-deceased"
                                />
                                <Label htmlFor="fatherStatus-deceased">
                                  Deceased
                                </Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                      </div>
                    </div>

                    {/* Father Full Name */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Full Name
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

                    {/* Father Address */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Address
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
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

                    {/* Father Contact Number */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherContactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Contact Number
                          </FormLabel>
                          <FormControl>
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

                    {/* Father Occupation */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Occupation
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Briefcase />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Father Highest Education */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherHighestEducation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Highest Education Attainment
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
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

                    {/* Father Total Parents Taxable Income */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.fatherTotalParentsTaxableIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Total Parents Taxable Income
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                {...field}
                                className="rounded-r-none"
                                type="number"
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <PhilippinePeso />
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
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 py-10">
                    <div className="lg:col-span-2 col-span-1 space-y-4">
                      <div className="flex items-center gap-3 flex-col lg:flex-row">
                        <h3 className="text-lg font-medium flex gap-2 items-center">
                          Mother Information
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <Controller
                          control={form.control}
                          name="Student.familyBackground.motherStatus"
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Separated"
                                  id="motherStatus-separated"
                                />
                                <Label htmlFor="motherStatus-separated">
                                  Separated
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Living"
                                  id="motherStatus-living"
                                />
                                <Label htmlFor="motherStatus-living">
                                  Living
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Deceased"
                                  id="motherStatus-deceased"
                                />
                                <Label htmlFor="motherStatus-deceased">
                                  Deceased
                                </Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="Student.familyBackground.motherFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Full Name
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
                      name="Student.familyBackground.motherAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Address
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
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
                      name="Student.familyBackground.motherContactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Contact Number
                          </FormLabel>
                          <FormControl>
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

                    <FormField
                      control={form.control}
                      name="Student.familyBackground.motherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Occupation
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Briefcase />
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
                      name="Student.familyBackground.motherHighestEducation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Highest Education Attainment
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
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
                      name="Student.familyBackground.motherTotalParentsTaxableIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Total Parents Taxable Income
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                {...field}
                                className="rounded-r-none"
                                type="number"
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <PhilippinePeso />
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
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                    <div className="lg:col-span-2 col-span-1 space-y-4">
                      <div className="flex items-center gap-3 flex-col lg:flex-row">
                        <h3 className="text-lg font-medium flex gap-2 items-center">
                          Guardian Information
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                      </div>
                    </div>

                    {/* Guardian Full Name */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.guardianFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Full Name
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

                    {/* Guardian Address */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.guardianAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Address
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
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

                    {/* Guardian Contact Number */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.guardianContactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Contact Number
                          </FormLabel>
                          <FormControl>
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

                    {/* Guardian Occupation */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.guardianOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Occupation
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input {...field} className="rounded-r-none" />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Briefcase />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Guardian Highest Education */}
                    <FormField
                      control={form.control}
                      name="Student.familyBackground.guardianHighestEducation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Highest Education Attainment
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                {...field}
                                className="rounded-r-none"
                                type="number"
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <PhilippinePeso />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                    <div className="lg:col-span-2 col-span-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium flex gap-2 items-center">
                          Siblings Information
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <Button
                          size="sm"
                          onClick={() =>
                            siblings.append({
                              fullName: "",
                              age: "",
                              occupation: "",
                            })
                          }
                        >
                          + Add fields
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 col-span-3">
                      {siblings.fields.map(
                        (
                          item: {
                            id: string;
                            fullName: string;
                            age: string;
                            occupation: string;
                          },
                          index
                        ) => (
                          <div key={item.id} className="space-y-3 w-full">
                            <div className="flex gap-3 items-end ">
                              <FormField
                                control={form.control}
                                name={`Student.familyBackground.siblings.${index}.fullName`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel className="text-muted-foreground">
                                      Full Name
                                    </FormLabel>
                                    <FormControl className="">
                                      <div className="flex-1">
                                        <Input
                                          {...field}
                                          className="w-full bg-card capitalize border-0 "
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`Student.familyBackground.siblings.${index}.age`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel className="text-muted-foreground">
                                      Age
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="w-full bg-card "
                                        type="number"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`Student.familyBackground.siblings.${index}.occupation`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel className="text-muted-foreground">
                                      Occupation
                                    </FormLabel>
                                    <FormControl>
                                      <div className="w-full">
                                        <Input
                                          {...field}
                                          className="w-full bg-card capitalize border-0 "
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => siblings.remove(index)}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {tab === "security" && (
                <div className=" w-full space-y-8">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      Change Password
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="Student.contactNumber"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-muted-foreground">
                            Old Password
                          </FormLabel>
                          <FormControl className="">
                            <div className="relative w-full">
                              <Input
                                {...field}
                                className="rounded-r-none"
                                type="password"
                              />
                              <Button
                                variant="ghost"
                                className="absolute right-1 top-0"
                              >
                                <UserRound className="opacity-80" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Student.contactNumber"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-muted-foreground">
                            New Password
                          </FormLabel>
                          <FormControl className="">
                            <div className="relative w-full flex items-center gap-3">
                              <Input
                                {...field}
                                className="rounded-r-none"
                                type="password"
                              />
                              <Button>
                                <UserRound className="opacity-80" />
                                Change Password
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                </div>
              )}
            </div>
          </Form>
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
                      disabled={loading}
                    >
                      <Check />
                      {loading ? "Saving..." : "Save Changes"}
                      {loading && <Loader className="animate-spin" />}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

//  <Button
//    size="lg"
//    className="cursor-pointer"
//    onClick={async () => {
//      console.log("Button clicked - starting validation");

//      // Get current form values
//      const currentValues = form.getValues();
//      console.log("Current form values:", currentValues);

//      // Manually validate with Zod schema
//      try {
//        const validationResult = UserSchema.parse(currentValues);
//        console.log("✅ Zod validation passed:", validationResult);

//        // Now try react-hook-form validation
//        const isValid = await form.trigger();
//        console.log("React Hook Form validation result:", isValid);

//        if (isValid) {
//          console.log("Calling handleSubmit with validated data");
//          handleSubmit(currentValues);
//        } else {
//          console.log("❌ React Hook Form validation failed");
//          const formErrors = form.formState.errors;
//          console.log("Form errors:", formErrors);
//        }
//      } catch (zodError) {
//        console.log("❌ Zod validation failed:", zodError);
//        if (zodError instanceof z.ZodError) {
//          console.log("Detailed Zod errors:", zodError.errors);
//          zodError.errors.forEach((error) => {
//            console.log(`Field: ${error.path.join(".")} - ${error.message}`);
//          });
//        }
//      }
//    }}
//    disabled={loading}
//  >
//    <Check />
//    {loading ? "Saving..." : "Save Changes"}
//    {loading && <Loader className="animate-spin" />}
//  </Button>;

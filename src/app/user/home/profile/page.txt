"use client";
import React, { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertCircle,
  Check,
  Loader,
  Lock,
  Mail,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
export default function Profile() {
  const { user } = useUserStore();
  const { form, siblings, hasChanges, handleSubmit, loading } =
    useUpdateProfile(user ?? undefined);
  // useEffect(() => {
  //   if (user) {
  //     form.reset(user);
  //   }
  // }, [user, form]);
  const [tab, setTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Student Information", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className="relative  bg-background lg:px-4  ">
      <Form {...form}>
        <div className="mx-auto w-[95%] lg:w-4xl lg:pt-10  pt-3">
          <div className="flex justify-between flex-col  lg:flex-row gap-5   rounded-md">
            <div className="flex flex-col gap-5 items-center lg:flex-row">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-second rounded-full flex items-center justify-center  font-bold text-2xl text-white">
                  {user?.Student.fName.slice(0, 1)}
                  {user?.Student.lName.slice(0, 1)}
                </div>
                <div className="absolute bottom-1 right-1 size-3 bg-green-500 rounded-full border"></div>
              </div>
              <div className="lg:text-left text-center">
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
              text-2xl font-semibold flex items-center gap-1.5
              "
                  initial={{ backgroundPosition: "200% 0" }}
                  animate={{ backgroundPosition: "-200% 0" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 7,
                    ease: "linear",
                  }}
                >
                  {user?.Student.fName} {user?.Student.mName}{" "}
                  {user?.Student.lName}
                </motion.span>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.schoolId}
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-y-hidden overflow-x-auto py-11 no-scrollbar ">
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </div>
          {tab === "personal" && (
            <div className=" w-full space-y-8">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <UserRound className="h-5 w-5" /> Personal Information
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="Student.fName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        First Name
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.mName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Middle Name
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.lName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Last Name
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.gender"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Gender
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Date of Birth
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.address"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Address
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                        Contact Number
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <Mail className="h-5 w-5" /> Account Information
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className=" w-full grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Student ID
                      </FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
                            disabled
                          />
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
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Course
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.year"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Year Level
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
                  name="Student.section"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-muted-foreground">
                        Section
                      </FormLabel>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            {...field}
                            className="bg-card w-full capitalize border-0"
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
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          )}

          {tab === "family" && (
            <div className=" w-full ">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 pb-10">
                <p className="text-sm text-muted-foreground p-4 bg-card col-span-2 rounded-md flex gap-2 items-center">
                  <AlertCircle size={15} /> If no information available, type{" "}
                  <span className="font-medium">N/A.</span>
                </p>
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <UserRound className="h-5 w-5" /> Father Information
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
                            <Label htmlFor="fatherStatus-living">Living</Label>
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 py-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <UserRound className="h-5 w-5" /> Mother Information
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
                            <Label htmlFor="motherStatus-living">Living</Label>
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <UserRound className="h-5 w-5" /> Guardian Information
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Guardian Status */}
                <FormField
                  control={form.control}
                  name="Student.familyBackground.guardianStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize border-0"
                        />
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
                      <UserRound className="h-5 w-5" /> Siblings Information
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
                                      className="w-full bg-card capitalize border-0"
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
                                    className="w-full bg-card"
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
                                      className="w-full bg-card capitalize border-0"
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
                  <UserRound className="h-5 w-5" />
                  Change Password
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-8">
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
                            className="bg-card w-full capitalize border-0"
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
                            className="bg-card w-full capitalize border-0"
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

              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          )}
        </div>
      </Form>
      <AnimatePresence>
        {hasChanges && (
          <div className="sticky bottom-0 ">
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
                  onClick={() => {
                    console.log("Button clicked"); // Test this first
                    form.handleSubmit(handleSubmit)();
                  }}
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
  );
}

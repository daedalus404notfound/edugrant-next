"use client";
import React, { useState } from "react";

import { motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Save, Trash2, UserRound, X } from "lucide-react";
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
    { id: "personal", label: "Personal", indicator: null },
    { id: "account", label: "Account", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className="relative  bg-background lg:px-4  pb-20 ">
      <Form {...form}>
        <div className="mx-auto w-[95%] lg:w-4xl lg:pt-10  pt-3">
          <div className="flex justify-between flex-col  lg:flex-row gap-5">
            <div className="flex flex-col gap-2 items-center lg:flex-row">
              <div className="size-20 rounded-full border flex justify-center items-center text-3xl font-semibold bg-emerald-700">
                {user?.Student.fName.slice(0, 1)}
              </div>
              <div className="lg:text-left text-center">
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
              text-xl font-semibold flex items-center gap-1.5
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
                <div className="flex gap-2 mt-2 items-center justify-center uppercase">
                  <Badge variant="outline">{user?.Student.course}</Badge>
                  <Badge variant="outline">{user?.Student.year}</Badge>
                  <Badge variant="outline">
                    Section {user?.Student.section}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {hasChanges && (
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("Button clicked"); // Test this first
                    form.handleSubmit(handleSubmit)();
                  }}
                  disabled={loading}
                >
                  <Save />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
          <div className="overflow-y-hidden overflow-x-auto py-11 no-scrollbar ">
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </div>
          {tab === "personal" && (
            <div className=" w-full space-y-5">
              <FormField
                control={form.control}
                name="Student.fName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Gender</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Address</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                  <FormItem className="">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
          )}
          {tab === "account" && (
            <div className=" w-full space-y-10">
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Student ID</FormLabel>
                    <FormControl className="">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Course</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Year Level</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
                    <FormLabel>Section</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="bg-card w-full capitalize"
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
          )}

          {tab === "family" && (
            <div className=" w-full divide-y">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 pb-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-center flex justify-between">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
        text-lg font-semibold flex items-center gap-1.5"
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-200% 0" }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 7,
                        ease: "linear",
                      }}
                    >
                      Father
                    </motion.span>
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
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 flex justify-between items-center">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-emerald-600/70
          text-lg font-semibold flex items-center gap-1.5"
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-200% 0" }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 7,
                        ease: "linear",
                      }}
                    >
                      Mother
                    </motion.span>
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
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-start flex justify-between">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-emerald-600/70
          text-lg font-semibold flex items-center gap-1.5"
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-200% 0" }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 7,
                        ease: "linear",
                      }}
                    >
                      Legal Guardian
                    </motion.span>
                  </div>
                </div>

                {/* Guardian Full Name */}
                <FormField
                  control={form.control}
                  name="Student.familyBackground.guardianFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
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
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card capitalize"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6 py-10">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-start flex justify-between">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-emerald-600/70 text-lg font-semibold flex items-center gap-1.5"
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-200% 0" }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 7,
                        ease: "linear",
                      }}
                    >
                      Siblings
                    </motion.span>
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
                                <FormLabel>Full Name</FormLabel>
                                <FormControl className="">
                                  <div className="flex-1">
                                    <Input
                                      {...field}
                                      className="w-full bg-card capitalize"
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
                                <FormLabel>Age</FormLabel>
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
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                  <div className="w-full">
                                    <Input
                                      {...field}
                                      className="w-full bg-card capitalize"
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
            <div className=" w-full mt-10 space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <Button variant="outline">
                  <Lock />
                </Button>
                <h2 className="text-lg font-semibold text-muted-foreground">
                  Account Security
                </h2>
              </div>
              {/* <div className="grid grid-cols-2  gap-x-3 gap-y-6">
                <FormField
                  control={form.control}
                  name="userPassword"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Password</FormLabel>
                      <FormControl className="">
                        <Input {...field} className="capitalize" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

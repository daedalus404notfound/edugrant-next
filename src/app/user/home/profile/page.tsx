"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "motion/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Camera,
  Check,
  Edit,
  GraduationCap,
  Lock,
  Mail,
  UserPen,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProfileZod } from "@/hooks/user/zodGetUser";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Label } from "@/components/ui/label";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(true);
  const { user } = useUserStore();
  const { form } = useProfileZod(user);
  const [tab, setTab] = useState("personal");
  console.log("meow", user?.userId);
  const tabs = [
    { id: "personal", label: "Personal", indicator: null },
    { id: "account", label: "Account", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className="  bg-background lg:px-4  pb-20 ">
      <Form {...form}>
        <div className="mx-auto w-[95%] lg:w-4xl lg:pt-10  pt-3">
          <div className="flex justify-between flex-col  lg:flex-row gap-5">
            <div className="flex flex-col gap-2 items-center lg:flex-row">
              <div className="size-20 rounded-full border flex justify-center items-center text-3xl font-semibold bg-emerald-700">
                {user?.firstName.slice(0, 1)}
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
                  {user?.firstName} {user?.middleName} {user?.lastName}
                </motion.span>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.studentId}
                </p>
                <div className="flex gap-2 mt-2 items-center justify-center">
                  <Badge variant="outline">{user?.course}</Badge>
                  <Badge variant="outline">{user?.year}</Badge>
                  <Badge variant="outline">Section {user?.section}</Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {isEdit ? (
                <Button variant="secondary" onClick={() => setIsEdit(false)}>
                  <Edit />
                  Edit Profile
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setIsEdit(true)}>
                  <Edit />
                  Save Changes
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
                name="firstName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="middleName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="lastName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Gender</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="address"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Address</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="contactNumber"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 ">
                    <FormLabel>Email</FormLabel>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <FormControl className="">
                          <Input {...field} className=" " disabled />
                        </FormControl>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <Mail />
                            Change Email
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Change Email Address
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Please enter your new email address below. A
                              confirmation link will be sent to the new address
                              to verify the change.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <Input
                            placeholder="newemail@example.com"
                            type="email"
                            className="w-full"
                          />

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Update Email</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Student ID</FormLabel>
                    <FormControl className="">
                      <div className="w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
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
                name="course"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Course</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="year"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Year Level</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
                name="section"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Section</FormLabel>
                    <FormControl className="">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className={`capitalize w-full bg-card ${
                            isEdit ? "" : ""
                          }`}
                          disabled={isEdit}
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
            <div className=" w-full space-y-10">
              <div className="  grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-start flex justify-between">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-yellow-600/70
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
                      Father
                    </motion.span>
                    <RadioGroup
                      defaultValue=""
                      className="flex  w-full lg:w-[unset] justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Separated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Living</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">Deceased</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                </div>
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="  grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-start flex justify-between ">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-yellow-600/70
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
                      Mother
                    </motion.span>
                    <RadioGroup
                      defaultValue=""
                      className="flex w-full lg:w-[unset] justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Separated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Living</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">Deceased</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                </div>
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="  grid lg:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6">
                <div className="lg:col-span-2 col-span-1 space-y-4">
                  <div className="lg:flex-row flex-col gap-5 items-start flex justify-between">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-yellow-600/70
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
                      Legal Guardian
                    </motion.span>
                  </div>
                  <Separator />
                </div>
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
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
                    <FormItem className="">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="">
                        <div className="w-full">
                          <Input
                            {...field}
                            className={`capitalize w-full bg-card ${
                              isEdit ? "" : ""
                            }`}
                            disabled={isEdit}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div className="grid grid-cols-2  gap-x-3 gap-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Password</FormLabel>
                      <FormControl className="">
                        <Input
                          {...field}
                          className="capitalize"
                          disabled={isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

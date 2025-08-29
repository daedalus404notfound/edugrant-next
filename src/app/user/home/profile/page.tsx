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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Camera,
  Check,
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
    { id: "personal", label: "Personal", indicator: "" },
    { id: "account", label: "Account", indicator: "" },
    { id: "family", label: "Family Composition", indicator: "!" },
    { id: "security", label: "Account Security", indicator: "" },
  ];
  return (
    <div className="bg-background  px-4">
      <Form {...form}>
        <div className="w-full max-w-4xl mx-auto py-10 space-y-12">
          <div className="flex items-center gap-6 ">
            {/* Profile Image */}
            <div className="relative">
              <div className="size-22 rounded-full  border-2  shadow-sm flex items-center justify-center overflow-hidden text-3xl font-semibold">
                {user?.firstName.slice(0, 1)}
              </div>
            </div>

            {/* Name and Info */}
            <div>
              <h1 className="text-2xl font-semibold text-muted-foreground mb-1 capitalize">
                {user?.firstName} {user?.middleName} {user?.lastName}
              </h1>
              <p className="text-sm text-gray-500 mb-3">
                Student ID: {user?.studentId}
              </p>
              <div className="flex gap-2">
                <Badge>{user?.course}</Badge>
                <Badge>{user?.year}</Badge>
                <Badge>Section {user?.section}</Badge>
              </div>
            </div>
          </div>

          <Tabs tabs={tabs} onTabChange={(tabsId) => setTab(tabsId)} />

          {tab === "personal" && (
            <div className=" w-full space-y-10">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="middleName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Gender</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="address"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Address</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="contactNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
                          disabled={isEdit}
                        />
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
                        <FormControl className="col-span-3">
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
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Student ID</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Course</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="year"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Year Level</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
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
                name="section"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel>Section</FormLabel>
                    <FormControl className="col-span-3">
                      <div className="w-full">
                        <Input
                          {...field}
                          className="capitalize w-full"
                          disabled={isEdit}
                        />
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
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium">Father</h1>
                  <RadioGroup defaultValue="" className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Separated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Living</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Deceased</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
                            disabled={isEdit}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium">Mother</h1>
                  <RadioGroup defaultValue="" className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Separated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Living</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Deceased</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
                            disabled={isEdit}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium">Legal Guardian</h1>
                </div>
                <Separator />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Highest Education Attainment</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Total Parents Taxable Income</FormLabel>
                      <FormControl className="col-span-3">
                        <div className="w-full">
                          <Input
                            {...field}
                            className="capitalize w-full"
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
                    <FormItem className="grid grid-cols-4">
                      <FormLabel>Password</FormLabel>
                      <FormControl className="col-span-3">
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

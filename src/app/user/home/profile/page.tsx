"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

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
export default function Profile() {
  const [isEdit, setIsEdit] = useState(true);

  const path = usePathname();
  const segmentedPath = path.split("/");
  const { user } = useUserStore();
  const { form } = useProfileZod(user);

  console.log("meow", user?.userId);

  return (
    <div className="bg-background min-h-screen px-4">
     

      <Form {...form}>
        <div className="w-full max-w-4xl mx-auto py-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full  border-2  shadow-sm flex items-center justify-center overflow-hidden">
                  <UserRound className="w-10 h-10 text-gray-400" />
                </div>
                {!isEdit && (
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
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

            <Button
              onClick={() => setIsEdit(!isEdit)}
              variant={isEdit ? "default" : "outline"}
              className={
                isEdit
                  ? "bg-black hover:bg-gray-800 text-white border-black"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }
            >
              <UserPen className="w-4 h-4 mr-2" />
              {isEdit ? "Edit Profile" : "Cancel Edit"}
            </Button>
          </div>

          <div className=" w-full mt-10 space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="outline">
                <UserRound className="" />
              </Button>
              <h2 className="text-lg font-semibold text-muted-foreground">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
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
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
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
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
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
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
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

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
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
          <div className=" w-full mt-10 space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="outline">
                <Mail />
              </Button>
              <h2 className="text-lg font-semibold text-muted-foreground">
                Contact Information
              </h2>
            </div>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 ">
                    <FormLabel>Email</FormLabel>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <FormControl>
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
              />{" "}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="capitalize"
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
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
          <div className=" w-full mt-10 space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="outline">
                <GraduationCap />
              </Button>
              <h2 className="text-lg font-semibold text-muted-foreground">
                Academic Information
              </h2>
            </div>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} className="capitalize" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <div className="grid grid-cols-3 gap-3 col-span-2">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="capitalize"
                          disabled={isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Level</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="capitalize"
                          disabled={isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="capitalize"
                          disabled={isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
            </div>
          </div>
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
                  <FormItem className="col-span-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
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
          {!isEdit && (
            <>
              {" "}
              <Separator className="mt-10" />
              <div className=" w-full mt-10 space-y-5">
                <div>
                  <h1 className="text-2xl font-semibold flex gap-2 items-center">
                    Save Changes?
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your current password to save changes.
                  </p>
                </div>

                <div className="grid grid-cols-2  gap-x-3 gap-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
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
                <div className="flex gap-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex-1 bg-black hover:bg-gray-800 text-white h-10">
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Profile Update
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to save these changes to your
                          profile? Once updated, the new information will
                          replace your current details.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Update Profile</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-gray-400 hover:bg-gray-50 h-10"
                    onClick={() => setIsEdit(true)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}

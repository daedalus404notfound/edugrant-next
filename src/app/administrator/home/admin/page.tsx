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
import { motion } from "motion/react";
import {
  Mail,
  UserRound,
  User,
  Lock,
  MoreHorizontal,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProfileZod } from "@/hooks/admin/zodGetAdmin";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAdminStore } from "@/store/adminUserStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("overview");;
  const { admin } = useAdminStore();
  const { form } = useProfileZod(admin);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "personal-details", label: "Personal Information", icon: UserRound },
    { id: "account-details", label: "Account Information", icon: Mail },
    { id: "security", label: "Other details", icon: MoreHorizontal },
  ];

  return (
    <div className="min-h-screen px-2">
     

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Minimal Sidebar */}
          <nav className="lg:col-span-1">
            <div className="sticky top-15">
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-2xl font-semibold flex items-center gap-1.5 p-3
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
                <UsersRound />
                Profile
              </motion.span>

              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                        activeSection === item.id
                          ? " bg-emerald-600/10 text-emerald-500 font-semibold"
                          : " text-muted-foreground hover:text-primary hover:bg-background/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8 py-14">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-42">
              <Card className="border-0 shadow-sm bg-card">
                <CardContent>
                  <div className="flex items-center gap-5">
                    <div className="size-25 rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {admin?.profileImage ? (
                        <img
                          src={admin?.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserRound className="w-8 h-8 " />
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold capitalize">
                        {admin?.firstName} {admin?.middleName} {admin?.lastName}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {admin?.email}
                      </p>
                      <div className="mt-3">
                        <Badge
                          variant="secondary"
                          className="bg-red-800 text-gray-200 font-medium"
                        >
                          {admin?.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Form {...form}>
              {/* Personal Details */}
              <section id="personal-details" className="scroll-mt-42">
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <UserRound />
                      </Button>

                      <div>
                        <CardTitle className="text-base font-semibold">
                          Personal Information
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Update your personal details
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
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
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Account Details */}
              <section id="account-details" className="scroll-mt-42">
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <Mail />
                      </Button>

                      <div>
                        <CardTitle className="text-base font-semibold">
                          Account Information
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Manage your account credentials
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                                    confirmation link will be sent to the new
                                    address to verify the change.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <Input
                                  placeholder="newemail@example.com"
                                  type="email"
                                  className="w-full"
                                />

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>
                                    Update Email
                                  </AlertDialogAction>
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
                      name="password"
                      render={({ field }) => (
                        <FormItem className="col-span-2 ">
                          <FormLabel>Password</FormLabel>
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <FormControl>
                                <Input {...field} className=" " disabled />
                              </FormControl>
                            </div>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                  <Lock />
                                  Change Password
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Change Password
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Please enter your new Password. A
                                    confirmation link will be sent to the new
                                    address to verify the change.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <Input type="password" className="w-full" />

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>
                                    Update Password
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Security Section */}
              <section id="security" className="scroll-mt-42">
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <MoreHorizontal />
                      </Button>

                      <div>
                        <CardTitle className="text-base font-semibold">
                          Other Details
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          View other details
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Date Created</Label>
                        {admin?.dateCreate && (
                          <Input
                            defaultValue={format(admin?.dateCreate, "PPP")}
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Last Login</Label>
                        {admin?.dateCreate && (
                          <Input
                            defaultValue={format(admin?.lastLogin, "PPP")}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

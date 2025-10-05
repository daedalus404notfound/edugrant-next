"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Calendar1,
  Check,
  CircleUserRound,
  Crown,
  Loader,
  Mail,
  Map,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
} from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";
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

import { Tabs } from "@/components/ui/vercel-tabs";

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
const items = [
  {
    id: 1,
    date: new Date("2024-01-09T10:55:00"),
    description: "System backup completed successfully.",
  },
  {
    id: 2,
    date: new Date("2024-01-09T10:50:00"),
    description:
      "User authentication service restarted due to configuration update.",
  },
  {
    id: 3,
    date: new Date("2024-01-09T10:45:00"),
    description: "Warning: High CPU usage detected on worker node-03.",
  },
  {
    id: 4,
    date: new Date("2024-01-09T10:40:00"),
    description: "New deployment initiated for api-service v2.1.0.",
  },
];
import { useAdminStore } from "@/store/adminUserStore";
import { useUpdateProfileAdmin } from "@/hooks/head-edit-handler";
export default function Profile() {
  const { admin } = useAdminStore();
  const [openCalendar, setOpenCalendar] = useState(false);

  const { form, handleSubmit, loading, isChanged } = useUpdateProfileAdmin(
    admin ?? undefined
  );
  const [tab, setTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Head Information", indicator: null },
    { id: "logs", label: "Activity Logs", indicator: null },
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
                  <h1>Personal Details</h1>
                  <div className="grid grid-cols-2  gap-8">
                    <FormField
                      control={form.control}
                      name="ISPSU_Head.fName"
                      render={({ field }) => (
                        <FormItem className="">
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
                      name="ISPSU_Head.mName"
                      render={({ field }) => (
                        <FormItem className="">
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
                      name="ISPSU_Head.lName"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
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

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Email
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
                      name="ISPSU_Head.gender"
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
                      name="ISPSU_Head.address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
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
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
                  <h1>Account Details</h1>
                  <div className="grid grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Role
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                disabled
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Crown />
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
                      name="dateCreated"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Date Created
                          </FormLabel>
                          <FormControl className="">
                            <div className="flex items-center">
                              <Input
                                placeholder=""
                                disabled
                                className="rounded-r-none"
                                {...field}
                              />
                              <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                                <Button variant="ghost">
                                  <Calendar1 />
                                </Button>
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" /> */}
                  </div>
                </div>
              )}
              {tab === "logs" && (
                <div className="">
                  <Timeline className="divide-y rounded-lg border">
                    {items.map((item) => (
                      <TimelineItem
                        key={item.id}
                        step={item.id}
                        className="m-0! px-4! py-3!"
                      >
                        <TimelineContent className="text-foreground">
                          {item.description}
                          <TimelineDate className="mt-1">
                            {item.date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            at{" "}
                            {item.date.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </TimelineDate>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                  <div className="flex justify-center items-center mt-5">
                    <Button variant="ghost">See more</Button>
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
                  <div className="grid lg:grid-cols-2 gap-8">1212</div>

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

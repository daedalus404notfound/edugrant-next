"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineTitle,
} from "@/components/ui/timeline";

import useGetStaffLogs from "@/hooks/admin/getStaffLogs";
import { useAdminStore } from "@/store/adminUserStore";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  Logs,
  Mail,
  UserRound,
  UserRoundCheck,
  X,
  Calendar1,
  Check,
  Crown,
  Loader,
  Map,
  UserRoundCog,
  VenusAndMars,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs } from "@/components/ui/vercel-tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfileStaff } from "@/hooks/updateStaffProfile";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import TitleReusable from "@/components/ui/title";
export default function InterceptManageStaff() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();


  const accountId = admin?.accountId;
  const staffId = params.id as string;
  const [status, setStatus] = useState("info");


  const tabs = [
    { id: "info", label: "Staff Information", indicator: null },
    { id: "log", label: "Activity Logs", indicator: null },
  ];

  const { data, loading } = useGetStaffLogs(staffId, accountId ? accountId : 3);
  const {
    form,
    handleSubmit,
    loading: loadingUpdate,
    isChanged,
  } = useUpdateProfileStaff(data);
  return (
    <div className="bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  pt-3 space-y-8">
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
            title="Update Staff & View Logs"
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
        {status === "info" &&
          (loading ? (
            <div className="h-[50vh] flex justify-center items-center">
              <Ring
                size="40"
                stroke="5"
                bgOpacity="0"
                speed="2"
                color="green"
              />
            </div>
          ) : (
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col"
              >
                <div className="border  size-25 rounded-full overflow-hidden p-1 border-green-950">
                  <div className="bg-gradient-to-r from-green-800 to-green-900  tracking-wide h-full w-full rounded-full text-3xl font-semibold uppercase flex justify-center items-center border border-green-800">
                    {data?.fName.slice(0, 2)}
                  </div>
                </div>
                <h1 className="text-lg font-medium mt-2 capitalize">
                  {data?.lName}, {data?.fName} {data?.mName}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since{" "}
                  {data?.dateCreated && format(data?.dateCreated, "PPP")}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-8">
                <Form {...form}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
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
                              <span className="flex items-center  border-l-0 rounded-r-md text-sm">
                                <Button variant="secondary" size="lg">
                                  <UserRound />
                                </Button>
                              </span>
                              <Input
                                {...field}
                                className=" border-0 h-11 capitalize"
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    {" "}
                    <FormField
                      control={form.control}
                      name="mName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Middle Name
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-1">
                              <span className="flex items-center  border-l-0 rounded-r-md text-sm">
                                <Button variant="secondary" size="lg">
                                  <UserRound />
                                </Button>
                              </span>
                              <Input
                                {...field}
                                className=" border-0 h-11 capitalize"
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    {" "}
                    <FormField
                      control={form.control}
                      name="lName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-1">
                              <span className="flex items-center  border-l-0 rounded-r-md text-sm">
                                <Button variant="secondary" size="lg">
                                  <UserRound />
                                </Button>
                              </span>
                              <Input
                                {...field}
                                className=" border-0 h-11 capitalize"
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    {" "}
                    <FormField
                      control={form.control}
                      name="Account.email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-1">
                              <span className="flex items-center  border-l-0 rounded-r-md text-sm">
                                <Button variant="secondary" size="lg">
                                  <Mail />
                                </Button>
                              </span>
                              <Input {...field} className=" border-0 h-11 " />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </Form>

                <AnimatePresence>
                  {isChanged && (
                    <div className="sticky bottom-16 lg:bottom-0 col-span-2">
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
                            disabled={loadingUpdate}
                          >
                            <Check />
                            {loadingUpdate ? "Saving..." : "Save Changes"}
                            {loadingUpdate && (
                              <Loader className="animate-spin" />
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        {status === "log" &&
          (loading ? (
            <div className="h-[50vh] flex justify-center items-center">
              <Ring
                size="40"
                stroke="5"
                bgOpacity="0"
                speed="2"
                color="green"
              />
            </div>
          ) : data?.Staff_Logs.length ? (
            <Timeline className="">
              {data.Staff_Logs.map((item, index) => (
                <div key={index} className="p-4">
                  <TimelineHeader>
                    <TimelineTitle className="mt-0.5 font-medium text-foreground">
                      {item.action}
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent className="text-foreground mt-2 rounded-md px-4 py-3 bg-card">
                    {/* <p>
                          You approved the scholarship application of{" "}
                          <strong>
                            {item.application.Student.lName},{" "}
                            {item.application.Student.fName}{" "}
                            {item.application.Student.mName || ""}
                          </strong>{" "}
                          for the program{" "}
                          <strong>{item.scholarship.title}</strong>.
                        </p> */}
                    <TimelineDate className="mt-2 text-xs text-muted-foreground">
                      {format(item.dateCreated, "PPP p")}
                    </TimelineDate>
                  </TimelineContent>
                </div>
              ))}
            </Timeline>
          ) : (
            <div className="h-[50vh] flex items-center justify-center text-sm text-muted-foreground">
              No activity logs found.
            </div>
          ))}
      </div>
    </div>
  );
}

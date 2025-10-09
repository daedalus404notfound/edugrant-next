"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function InterceptManageStaff() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);

  const accountId = admin?.accountId;
  const staffId = params.id as string;
  const [status, setStatus] = useState("info");
  const [edit, setEdit] = useState(false);
  const handleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };
  const tabs = [
    { id: "info", label: "Staff Information", indicator: null },
    { id: "log", label: "Activity Logs", indicator: null },
  ];
  const {
    form,
    handleSubmit,
    loading: loadingMeow,
    isChanged,
  } = useUpdateProfileStaff(admin ?? undefined);
  const { data, loading } = useGetStaffLogs(staffId, accountId);
  console.log("Data", data?.Staff_Logs);
  // export const getPersonalInformation = (data: ApplicationFormData | null) => [
  //   {
  //     label: "First Name",
  //     icon: UserRound,
  //     value: data?.Student.fName ?? "",
  //   },
  //   {
  //     label: "Middle Name",
  //     icon: UserRound,
  //     value: data?.Student.mName ?? "",
  //   },
  //   {
  //     label: "Last Name",
  //     icon: UserRound,
  //     value: data?.Student.lName ?? "",
  //   },
  //   {
  //     label: "Gender",
  //     icon: VenusAndMars,
  //     value: data?.Student.gender ?? "",
  //   },
  //   {
  //     label: "Date of Birth",
  //     icon: Calendar,
  //     value: data?.Student?.dateOfBirth
  //       ? format(data.Student.dateOfBirth, "PPP")
  //       : "",
  //   },
  //   {
  //     label: "Contact No.",
  //     icon: Phone,
  //     value: data?.Student.contactNumber ?? "",
  //   },
  //   {
  //     label: "Address",
  //     icon: Map,
  //     value: data?.Student.address ?? "",
  //   },

  //   {
  //     label: "Email",
  //     icon: Mail,
  //     value: data?.Student.Account.email ?? "",
  //   },
  // ];
  return (
    <Drawer open={open} onOpenChange={(value) => handleCloseDrawer(value)}>
      <DrawerContent className="max-w-[1200px] w-full mx-auto !max-h-[90vh] h-full outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Staff Activity Logs</DrawerTitle>
          <DrawerDescription>
            View recent staff actions and updates.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex items-center justify-between lg:pb-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative justify-start"
            >
              <UserRound />
              Staff Details
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>

        {edit ? (
          <div className="p-4 flex-1 bg-background rounded-t-lg overflow-auto space-y-6">
            <Form {...form}>
              <div className="">
                <div className=" w-full space-y-5">
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
              </div>
            </Form>
          </div>
        ) : (
          <div className="p-4 flex-1 bg-background rounded-t-lg overflow-auto space-y-6">
            <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />

            {status === "info" && (
              <div className="p-4 flex flex-col justify-center items-center">
                <div className="bg-card size-30 rounded-full flex justify-center items-center text-2xl font-semibold tracking-wider">
                  JE
                </div>
                <h1 className="text-lg font-medium mt-2">
                  Tecson, Jerome Laguyo
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since Jan 06, 2025
                </p>

                {/* <div className="grid gap-4 grid-cols-2">
                  {personalInformation.map((info, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
                      <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                        <info.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-emerald-600/60 transition-colors" />
                        <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
                          {info.label}
                        </p>
                      </div>
                      <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
            {status === "log" &&
              (loading ? (
                <p className="text-sm text-muted-foreground">
                  Loading staff activity...
                </p>
              ) : data?.Staff_Logs.length ? (
                <Timeline className="">
                  {data.Staff_Logs.map((item, index) => (
                    <div key={index} className="p-4">
                      <TimelineHeader>
                        <TimelineTitle className="mt-0.5 font-medium text-foreground">
                          Application Approved
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
                <p className="text-sm text-muted-foreground">
                  No activity logs found.
                </p>
              ))}
          </div>
        )}
        <DrawerFooter className="grid grid-cols-2 gap-3">
          {edit ? (
            <Button className="flex-1">Save</Button>
          ) : (
            <Button className="flex-1" onClick={() => setEdit(true)}>
              Edit
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setEdit(false)}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

"use client";
import "ldrs/react/Ring.css";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useClientApplications from "@/hooks/user/getApplications";
import logo from "@/assets/edugrant-logo.png";
import TitleReusable from "@/components/ui/title";
import {
  Ban,
  Calendar,
  CircleAlert,
  CircleCheck,
  Clock,
  GraduationCap,
  PenLine,
  UserRoundCheck,
  X,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";
import DocsStudent from "./docs";
import EditApplication from "./update-application-docs";
import { Skeleton } from "@/components/ui/skeleton";
import ScholarshipModal from "@/components/ui/scholarship-modal";
import ModalHeader from "@/components/ui/modal-header";
import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusAlertIndicator } from "@/app/administrator/head/home/@modal/(.)application/[id]/status-indicator";
import { format } from "date-fns";
import { getPhaseLabel } from "@/lib/phaseLevel";
import useApplicationUserById from "@/hooks/user/getApplicationData";

export default function InterceptManageApplicationClient() {
  const [activeSection, setActiveSection] = useState("documents");
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = Number(params.id);

  const user = useUserStore((state) => state.user);
  const userId = user?.accountId;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  const { data, loading, error, isError, refetch } = useApplicationUserById({
    id,
  });

  // const navigationTabs = [
  //   { id: "documents", label: "Submitted Documents", indicator: null },

  //   { id: "scholarship", label: "Scholarship Details", indicator: null },
  // ];

  const processedInterviewDate = data?.Interview_Decision[0]?.dateCreated;
  const processedApprovedDate = data?.Interview_Decision[0]?.dateCreated;

  const meoww = processedInterviewDate
    ? format(processedInterviewDate, "PPP p")
    : processedApprovedDate
    ? format(processedApprovedDate, "PPP p")
    : "—";
  // console.log(processedDate);


  
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] bg-card w-[98%] lg:min-w-5xl mx-auto outline-0 border-0 lg:p-1  ${
          loading ? " lg:h-[75dvh] h-[68dvh]" : "h-[90dvh] "
        }`}
      >
        <DrawerHeader className="p-0">
          <div className="sr-only">
            <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </div>
        </DrawerHeader>
        <ModalHeader
          HandleCloseDrawer={HandleCloseDrawer}
          scholarship={false}
        />
        <div className=" h-full w-full overflow-auto no-scrollbar  bg-background rounded-t-md">
          {edit ? (
            <EditApplication
              data={data}
              setEdit={setEdit}
              // setUpdateDocument={setUpdateDocument}
            />
          ) : (
            <div>
              <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-md overflow-hidden ">
                {/* Header Section */}
                <div className="relative flex  lg:items-end items-center  py-8 px-4">
                  <img
                    className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
                    src={logo.src}
                    alt=""
                  />
                  <div className=" flex items-end justify-center">
                    <Avatar className="lg:size-25 size-20">
                      <AvatarImage
                        src={data?.Scholarship.logo}
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback
                        className="rounded-full text-white font-semibold flex items-center justify-center 
                          bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
                          dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
                      >
                        {data?.Student.lName.slice(0, 1)}
                        {data?.Student.fName.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge
                      variant="secondary"
                      className="uppercase absolute z-10"
                    >
                      {" "}
                      {data?.Scholarship.type}
                    </Badge>
                  </div>

                  {loading ? (
                    <div className="flex flex-col gap-2 flex-1 px-4">
                      <Skeleton className="h-6 w-64" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : (
                    <div className="flex-1 px-4 py-2 z-10">
                      <div className="flex items-center gap-3">
                        <h1 className="text-base lg:text-xl font-medium text-foreground capitalize line-clamp-1">
                          {data?.Scholarship.title}
                        </h1>
                        <div className="space-x-1.5 hidden lg:block">
                          <Badge
                            variant="outline"
                            className="mt-2 uppercase bg-blue-800 text-gray-200"
                          >
                            {data?.Scholarship &&
                              getPhaseLabel(data?.Scholarship?.phase)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`mt-2 uppercase text-gray-200 ${
                              data?.Scholarship?.deadline &&
                              Date.now() >
                                new Date(data.Scholarship.deadline).getTime()
                                ? "bg-red-800"
                                : "bg-green-800"
                            }`}
                          >
                            {data?.Scholarship?.deadline &&
                            Date.now() >
                              new Date(data.Scholarship.deadline).getTime()
                              ? "EXPIRED"
                              : "ACTIVE"}
                          </Badge>
                        </div>
                      </div>
                      {/* <p className="font-medium font-mono text-base tracking-wide">
                        {data?.Scholarship.Scholarship_Provider.name}
                      </p>{" "} */}
                      <p className="text-muted-foreground lg:text-sm text-xs">
                        {data?.Scholarship?.Scholarship_Provider?.name}
                      </p>
                    </div>
                  )}
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:py-6 py-4 lg:px-4 px-2 bg-card relative z-10">
                  <div className="space-y-1.5 border-l-2 pl-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <h1 className="text-xs text-muted-foreground">
                        Application Date
                      </h1>
                    </div>
                    {loading ? (
                      <Skeleton className="h-5 w-full" />
                    ) : (
                      <p className="font-medium text-foreground">
                        {data?.dateCreated &&
                          format(data?.dateCreated, "PPP p")}
                      </p>
                    )}
                  </div>{" "}
                  <div className="space-y-1.5  border-l-2 pl-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                      <h1 className="text-xs text-muted-foreground">
                        Scholarship Deadline
                      </h1>
                    </div>
                    {loading ? (
                      <Skeleton className="h-5 w-full" />
                    ) : (
                      <span className="font-medium text-foreground">
                        {data?.Scholarship.deadline
                          ? format(data?.Scholarship.deadline, "PPP p")
                          : "—"}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5  border-l-2 pl-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <h1 className="text-xs text-muted-foreground">
                        Processed Date
                      </h1>
                    </div>
                    {loading ? (
                      <Skeleton className="h-5 w-full" />
                    ) : (
                      <p className="font-medium text-foreground">{meoww}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:p-4 p-4 space-y-6">
                {data?.status === "PENDING" ? (
                  <StatusAlertIndicator
                    status="PENDING"
                    title="Application Submitted"
                    description="Your application has been submitted and is currently under review."
                  />
                ) : data?.status === "APPROVED" ? (
                  <StatusAlertIndicator
                    status="APPROVED"
                    title="Application Approved"
                    description="Congratulations! Your application has been approved for this scholarship."
                  />
                ) : data?.status === "DECLINED" ? (
                  <StatusAlertIndicator
                    status="DECLINED"
                    title="Application Declined"
                    description="Unfortunately, your application was not approved for this scholarship."
                  />
                ) : data?.status === "INTERVIEW" ? (
                  <StatusAlertIndicator
                    status="INTERVIEW"
                    title="Interview Required"
                    description="You've passed the initial review and are now invited for an interview."
                  />
                ) : data?.status === "BLOCKED" ? (
                  <StatusAlertIndicator
                    status="BLOCKED"
                    title="Application Blocked"
                    description="Your application is blocked due to an existing approved government scholarship."
                  />
                ) : (
                  ""
                )}

                {data?.status === "PENDING" &&
                  Date.now() <=
                    new Date(data.Scholarship.deadline).getTime() && (
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Edit document will be disabled after scholarship
                        expired.
                      </p>

                      <Button
                        className="underline"
                        variant="ghost"
                        onClick={() => setEdit(true)}
                      >
                        <PenLine /> Edit Documents
                      </Button>
                    </div>
                  )}
                <DocsStudent data={data} loading={loading} />
              </div>
              {/* <div className="sticky bottom-0 z-50">
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex gap-3 bg-background lg:p-4 p-2">
                  <Button
                    className="flex-1"
                    onClick={() => setEdit(true)}
                    disabled={data?.status !== "PENDING"}
                  >
                    <PenLine /> Edit Documents
                  </Button>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

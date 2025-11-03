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

import { Button } from "@/components/ui/button";

import logo from "@/assets/edugrant-logo.png";
import { Calendar, GraduationCap, PenLine } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import DocsStudent from "./docs";
import EditApplication from "./update-application-docs";
import { Skeleton } from "@/components/ui/skeleton";

import ModalHeader from "@/components/ui/modal-header";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusAlertIndicator } from "@/app/administrator/head/home/@modal/(.)application/[id]/status-indicator";
import { format } from "date-fns";
import { getPhaseLabel } from "@/lib/phaseLevel";
import useApplicationUserById from "@/hooks/user/getApplicationData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";

export default function InterceptManageApplicationClient() {
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = Number(params.id);

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
  const submittedDocuments = Object.keys(data?.submittedDocuments || {});
  // KUKUNIN ILAN LAHAT NG PHASE
  const phaseLength = submittedDocuments.length;
  // KUKUNIN LAST PHASE KEY
  const getLastPhase = phaseLength > 0 ? submittedDocuments.at(-1) : undefined;
  const phaseDecision = getLastPhase
    ? data?.submittedDocuments?.[getLastPhase]?.Application_Decision
    : null;

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] bg-card w-[98%] lg:min-w-5xl mx-auto outline-0 border-0 lg:p-1 `}
      >
        <DrawerHeader className="p-0">
          <div className="sr-only">
            <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </div>
        </DrawerHeader>
        <ModalHeader
          HandleCloseDrawer={HandleCloseDrawer}
          text="Application Details"
        />

        {loading ? (
          <ScholarshipModalLoading />
        ) : edit ? (
          <EditApplication
            data={data}
            setEdit={setEdit}
            // setUpdateDocument={setUpdateDocument}
          />
        ) : (
          <div>
            <ScrollArea className="lg:h-[80dvh] h-[70dvh] bg-background rounded-t-lg">
              <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-md overflow-hidden ">
                {/* Header Section */}
                <div className="relative flex  lg:items-end items-center  py-8 px-4">
                  <img
                    className="lg:w-70 w-43 absolute lg:right-0 -right-18 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:py-6 py-4 lg:px-4 px-2 bg-card relative ">
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
                          format(data?.dateCreated, "yyyy/MM/dd")}
                      </p>
                    )}
                  </div>{" "}
                  <div className="space-y-1.5  border-l-2 pl-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                      <h1 className="text-xs text-muted-foreground">
                        Deadline
                      </h1>
                    </div>
                    {loading ? (
                      <Skeleton className="h-5 w-full" />
                    ) : (
                      <span className="font-medium text-foreground">
                        {data?.Scholarship.deadline
                          ? format(data?.Scholarship.deadline, "yyyy/MM/dd")
                          : "—"}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5  border-l-2 pl-4 hidden lg:block">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <h1 className="text-xs text-muted-foreground">
                        Processed Date
                      </h1>
                    </div>
                    {loading ? (
                      <Skeleton className="h-5 w-full" />
                    ) : (
                      <p className="font-medium text-foreground">
                        {phaseDecision?.dateCreated
                          ? format(phaseDecision?.dateCreated, "PPP p")
                          : "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:p-4 p-2   space-y-6">
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

                {/* {data?.status === "PENDING" &&
                Date.now() <= new Date(data.Scholarship.deadline).getTime() && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Edit document will be disabled after scholarship expired.
                    </p>

                    <Button
                      className="underline"
                      variant="ghost"
                      onClick={() => setEdit(true)}
                    >
                      <PenLine /> Edit Documents
                    </Button>
                  </div>
                )} */}
                <DocsStudent data={data} loading={loading} />
              </div>
            </ScrollArea>
            <div className="">
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="flex gap-3  lg:p-4 p-2 pb-4">
                <Button
                  className="flex-1"
                  onClick={() => setEdit(true)}
                  disabled={data?.status !== "PENDING"}
                >
                  <PenLine /> Edit Documents
                </Button>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

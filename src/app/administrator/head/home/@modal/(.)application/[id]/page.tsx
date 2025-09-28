"use client";

// import { Ring } from "ldrs/react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Download,
  GraduationCap,
  Phone,
  UserRound,
  Mail,
  PhilippinePeso,
  StickyNote,
  Briefcase,
  Locate,
  VenusAndMars,
  Building2,
  UsersRound,
  Inbox,
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { BGPattern } from "@/components/ui/grid";
import ScholarshipModal from "@/components/ui/scholarship-modal";
const mimeToLabelMap: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "image/jpeg": "JPG",
  "image/png": "PNG",
};

const statusColors = {
  APPROVED: "bg-green-800/20 text-green-500",
  REJECTED: "bg-red-800/20 text-red-500",
  PENDING: "bg-yellow-800/20 text-yellow-500 ",
};

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("documents");
  const id = Number(params.id);
  const { data, loading } = useApplicationById(id);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };
  const documentPhases = Object.keys(data?.submittedDocuments ?? {}).filter(
    (key) => key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.submittedDocuments?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const matchedDoc = lastPhase.find(
    (doc) => !!data?.Application_Decision?.message?.[doc.document]
  );

  const matchedStatus =
    matchedDoc && data?.Application_Decision?.message
      ? data.Application_Decision.message[matchedDoc.document]?.status ?? ""
      : "";

  const matchedComment =
    matchedDoc && data?.Application_Decision?.message
      ? data.Application_Decision.message[matchedDoc.document]?.comment ?? ""
      : "";
  console.log("2323", matchedStatus);

  const fatherDetails = [
    {
      label: "Father Full Name",
      icon: UserRound,
      value: data?.Student.familyBackground.fatherFullName,
    },
    {
      label: "Status",
      icon: UserRound,
      value: data?.Student.familyBackground.fatherStatus,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.familyBackground.fatherContactNumber,
    },
    {
      label: "Address",
      icon: Locate,
      value: data?.Student.familyBackground.fatherAddress,
    },

    {
      label: "Occupation",
      icon: Briefcase,
      value: data?.Student.familyBackground.fatherOccupation,
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: data?.Student.familyBackground.fatherHighestEducation,
    },
    {
      label: "Total Parents Taxable Income",
      icon: PhilippinePeso,
      value: data?.Student.familyBackground.fatherTotalParentsTaxableIncome,
    },
  ];

  const motherDetails = [
    {
      label: "Mother Full Name",
      icon: UserRound,
      value: data?.Student.familyBackground.motherFullName,
    },
    {
      label: "Status",
      icon: Locate,
      value: data?.Student.familyBackground.motherStatus,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.familyBackground.motherContactNumber,
    },
    {
      label: "Address",
      icon: UserRound,
      value: data?.Student.familyBackground.motherAddress,
    },

    {
      label: "Occupation",
      icon: Briefcase,
      value: data?.Student.familyBackground.motherOccupation,
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: data?.Student.familyBackground.motherHighestEducation,
    },
    {
      label: "Total Parents Taxable Income",
      icon: PhilippinePeso,
      value: data?.Student.familyBackground.motherTotalParentsTaxableIncome,
    },
  ];

  const guardianDetails = [
    {
      label: "Guardian Full Name",
      icon: UserRound,
      value: data?.Student.familyBackground.guardianFullName,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.familyBackground.guardianContactNumber,
    },
    {
      label: "Occupation",
      icon: Briefcase,
      value: data?.Student.familyBackground.guardianOccupation,
    },
    {
      label: "Address",
      icon: Locate,
      value: data?.Student.familyBackground.guardianAddress,
    },

    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: data?.Student.familyBackground.guardianHighestEducation,
    },
  ];

  const personalInformation = [
    {
      label: "First Name",
      icon: UserRound,
      value: data?.Student.fName,
    },
    {
      label: "Middle Name",
      icon: UserRound,
      value: data?.Student.mName,
    },
    {
      label: "Last Name",
      icon: UserRound,
      value: data?.Student.lName,
    },
    {
      label: "Gender",
      icon: VenusAndMars,
      value: data?.Student.gender,
    },
    {
      label: "Date of Birth",
      icon: Calendar,
      value: data?.Student.gender,
    },
    {
      label: "Address",
      icon: Locate,
      value: data?.Student.address,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.contactNumber,
    },

    {
      label: "Email",
      icon: Mail,
      value: data?.Student.Account.email,
    },
  ];
  const academicInformation = [
    {
      label: "Student Id",
      icon: Building2,
      value: data?.Student.Account.schoolId,
    },
    {
      label: "Institute",
      icon: Building2,
      value: data?.Student.institute,
    },
    {
      label: "Course",
      icon: Building2,
      value: data?.Student.course,
    },
    {
      label: "Year",
      icon: Building2,
      value: data?.Student.year,
    },
    {
      label: "Section",
      icon: Building2,
      value: data?.Student.section,
    },
  ];
  const applicationDetails = [
    {
      label: "Reviewed Date",
      icon: Building2,
      value: data?.Application_Decision.dateCreated
        ? new Date(data.Application_Decision.dateCreated).toLocaleString()
        : "",
    }, 
    {
      label: "Reviewed by",
      icon: Building2,
      value: `${data?.Application_Decision.ISPSU_Staff.fName} ${data?.Application_Decision.ISPSU_Staff.fName}`,
    },
    {
      label: "Status",
      icon: Building2,
      value: data?.Application_Decision.status,
    },
  ];
  const navigationTabs = [
    { id: "documents", label: "Documents", indicator: null },

    { id: "student", label: "Student Info", indicator: null },
    { id: "family", label: "Family Background", indicator: null },
    { id: "scholarship", label: "Scholarship Details", indicator: null },
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px] w-full mx-auto h-[95vh] outline-0 border-0 p-0.5">
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="bg-background rounded-lg flex-1 overflow-auto flex flex-col ">
          {/* Enhanced Header */}
          <div className="  bg-gradient-to-r from-background to-card">
            <div className="relative p-4 ">
              <BGPattern
                variant="grid"
                className="top-0  z-1 opacity-30 hidden dark:block mask-gradient"
                size={40}
              />
              <div className="relative flex items-start justify-between z-20">
                <div className="">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium text-foreground">
                      {data?.Student.lName}, {data?.Student.fName}{" "}
                      {data?.Student.mName}
                    </h1>
                    <Badge
                      className={` ${
                        data?.status === "PENDING"
                          ? statusColors.PENDING
                          : data?.status === "APPROVED"
                          ? statusColors.APPROVED
                          : statusColors.REJECTED
                      }`}
                    >
                      {data?.status || "PENDING"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm">
                    ID: {data?.Student.Account.schoolId}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-xl font-semibold text-foreground">
                    {data?.Scholarship.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {data?.Scholarship.Scholarship_Provider.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="p-4  bg-card/70 backdrop-blur-sm sticky top-0">
            <Tabs
              tabs={navigationTabs}
              onTabChange={(tabId) => setActiveSection(tabId)}
            />
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Content Area */}
          <div className="flex-1">
            <div className="p-6">
              {/* Documents Section */}
              {activeSection === "documents" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <StickyNote className="h-5 w-5" /> Review Details
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-6">
                      {/* <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium flex gap-2 items-center">
                        <UserRound className="h-5 w-5" /> Personal Information
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div> */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {applicationDetails.map((info, index) => (
                          <div
                            key={index}
                            className={` ${
                              info.label === "Address" || info.label === "Email"
                                ? "md:col-span-2"
                                : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted-foreground mb-1">
                                  {info.label}
                                </p>
                                <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                  <info.icon size={16} />
                                  <p>{info.value}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <StickyNote className="h-5 w-5" /> Submitted Documents
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  {loading ? (
                    <div className="grid grid-cols-1 divide-y">
                      <div className="flex gap-5 py-6">
                        <Skeleton className="h-35 w-70" />
                        <div className="flex-1 space-y-3 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Skeleton className="h-10 flex-1" />
                              <Skeleton className="h-10 w-10" />
                            </div>
                            <Skeleton className="h-10 w-40" />
                          </div>
                          <div className="flex gap-3">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-30" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 py-3">
                        <Skeleton className="h-35 w-70" />
                        <div className="flex-1 space-y-3 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Skeleton className="h-10 flex-1" />
                              <Skeleton className="h-10 w-10" />
                            </div>
                            <Skeleton className="h-10 w-40" />
                          </div>
                          <div className="flex gap-3">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-30" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 py-3">
                        <Skeleton className="h-35 w-70" />
                        <div className="flex-1 space-y-3 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Skeleton className="h-10 flex-1" />
                              <Skeleton className="h-10 w-10" />
                            </div>
                            <Skeleton className="h-10 w-40" />
                          </div>
                          <div className="flex gap-3">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-30" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 divide-y">
                      {lastPhase &&
                        lastPhase
                          .filter(
                            (meow) =>
                              meow.requirementType &&
                              meow.requirementType.trim() !== ""
                          ) // ✅ filter out empty requirementType
                          .map((meow, index) => (
                            <div key={index} className="flex gap-5 py-8">
                              <Reviewer
                                fileFormat={mimeToLabelMap[meow.fileFormat]}
                                resourceType={meow.resourceType}
                                fileUrl={meow.fileUrl}
                                document={meow.document}
                                supabasePath={meow.supabasePath}
                                requirementType={meow.requirementType}
                              />

                              <div className="flex-1 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">
                                      {meow.document}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="secondary"
                                        className="uppercase bg-red-800/20 text-red-700"
                                      >
                                        {/* {mimeToLabelMap[meow.fileFormat]} */}
                                        {meow.requirementType}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-1">
                                    {" "}
                                    <Textarea
                                      placeholder="Staff comment..."
                                      defaultValue={matchedComment}
                                      className="min-h-9"
                                      disabled
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button>{matchedStatus}</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  )}
                </div>
              )}

              {/* Student Information Section */}
              {activeSection === "student" && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium flex gap-2 items-center">
                        <UserRound className="h-5 w-5" /> Personal Information
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {personalInformation.map((info, index) => (
                        <div
                          key={index}
                          className={` ${
                            info.label === "Address" || info.label === "Email"
                              ? "md:col-span-2"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                {info.label}
                              </p>
                              <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                <info.icon size={16} />
                                <p className="">{info.value}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium flex gap-2 items-center">
                        <GraduationCap className="h-5 w-5" /> Academic
                        Information
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {academicInformation.map((info, index) => (
                        <div
                          key={index}
                          className={` ${
                            info.label === "Address" || info.label === "Email"
                              ? "md:col-span-2"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                {info.label}
                              </p>
                              <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                <info.icon size={16} />
                                <p className="">{info.value}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Family Background Section */}
              {activeSection === "family" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium flex gap-2 items-center">
                      <UsersRound className="h-5 w-5" /> Family Composition
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>

                  {/* Father Details */}
                  <div className="space-y-4">
                    <TitleReusable title="Father" description="" />
                    <div className="">
                      <div className="grid grid-cols-3 gap-4">
                        {fatherDetails.map((detail, index) => (
                          <div
                            key={index}
                            className={` ${
                              detail.label === "Address" ? "md:col-span-3" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted-foreground mb-1">
                                  {detail.label}
                                </p>
                                <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                  <detail.icon size={16} />
                                  <p className="">{detail.value}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  {/* Mother Details */}
                  <div className="space-y-4">
                    <TitleReusable title="Mother" description="" />
                    <div className="">
                      <div className="grid grid-cols-3 gap-4">
                        {motherDetails.map((detail, index) => (
                          <div
                            key={index}
                            className={` ${
                              detail.label === "Address" ? "md:col-span-3" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted-foreground mb-1">
                                  {detail.label}
                                </p>
                                <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                  <detail.icon size={16} />
                                  <p className="">{detail.value}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  {/* Guardian Details */}
                  <div className="space-y-4 lg:col-span-2">
                    <TitleReusable title="Guardian" description="" />
                    <div className="">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {guardianDetails.map((detail, index) => (
                          <div
                            key={index}
                            className={` ${
                              detail.label === "Address" ? "md:col-span-2" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted-foreground mb-1">
                                  {detail.label}
                                </p>
                                <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                                  <detail.icon size={16} />
                                  <p className="">{detail.value}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scholarship Details Section */}
              {activeSection === "scholarship" && data && (
                <ScholarshipModal data={data?.Scholarship} />
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
      </DrawerContent>
    </Drawer>
  );
}

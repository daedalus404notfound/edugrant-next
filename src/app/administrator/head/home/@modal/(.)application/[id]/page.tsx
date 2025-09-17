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
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeftFromLine,
  Calendar,
  CheckCheck,
  Download,
  FolderOpen,
  GraduationCap,
  IdCard,
  Loader,
  Phone,
  TableOfContents,
  UserCheck2,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  Mail,
  UserMinus2,
  UserX2,
  PhilippinePeso,
  Building,
  StickyNote,
  Briefcase,
  Library,
  Locate,
  VenusAndMars,
  Building2,
  Clock,
  FileText,
  Users,
  Info,
  AlertTriangle,
  Eye,
  Maximize,
  UsersRound,
  Inbox,
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useRecjectHandler } from "@/hooks/admin/postDeclineHandler";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";
import { useInterviewdHandler } from "@/hooks/admin/postReviewedHandler";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import Link from "next/link";
import { BGPattern } from "@/components/ui/grid";
import AnimatedNumberCountdown from "@/components/ui/countdown";
import { AnimatePresence, motion } from "motion/react";
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
  console.log("123", data?.submittedDocuments);
  const [reviewData, setReviewData] = useState<
    Record<string, { comment: string; status: string }>
  >({});
  const updateReviewData = (
    docKey: string,
    field: "comment" | "status",
    value: string
  ) => {
    setReviewData((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        [field]: value,
      },
    }));
  };

  const totalDocs = data?.Scholarship.documents
    ? Object.keys(data?.Scholarship.documents).length
    : 0;

  const totalRequiredDocs = data
    ? Object.entries(data.submittedDocuments.documents).filter(
        ([_, doc]) =>
          doc.requirementType && doc.requirementType.trim() !== "optional"
      ).length
    : 0;
  console.log("totalRequiredDocs;'", totalRequiredDocs);
  const reviewedDocs = data?.submittedDocuments.documents
    ? Object.entries(data.submittedDocuments.documents).filter(([key, doc]) => {
        return (
          doc.rejectMessage?.status ||
          (reviewData[key]?.status && doc.requirementType.trim() === "required")
        );
      }).length
    : 0;
  const progressValue = totalDocs > 0 ? (reviewedDocs / totalDocs) * 100 : 0;

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const {
    handleInterview,
    loadingInterview,
    setOpenInterview,
    openInterview,
    isSuccessInterview,
  } = useInterviewdHandler({
    id,
    adminId: admin?.accountId,
    documentUpdate: reviewData,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  const {
    handleApprove,
    loadingApprove,
    setOpenApprove,
    openApprove,
    isSuccessApprove,
  } = useApprovedHandler({
    id,
    adminId: admin?.accountId,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  const {
    handleReject,
    loadingReject,
    openReject,
    setOpenReject,
    isSuccessReject,
  } = useRecjectHandler({
    id,
    adminId: admin?.accountId,
    documentUpdate: reviewData,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  useEffect(() => {
    if (isSuccessInterview || isSuccessReject) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessInterview, isSuccessReject]);

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
                <div className="flex items-center justify-center gap-3">
                  <Avatar className="size-18 border-2 border-border ">
                    <AvatarFallback className="text-2xl font-semibold">
                      JT
                    </AvatarFallback>
                  </Avatar>

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
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-semibold text-foreground">
                    {data?.Scholarship.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {data?.Scholarship.providerName}
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
                      <StickyNote className="h-5 w-5" /> Submitted Documents
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  {loading ? (
                    <div className="grid grid-cols-1 gap-6">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 divide-y">
                      {data?.submittedDocuments.documents &&
                        Object.entries(data.submittedDocuments.documents)
                          .filter(
                            ([_, doc]) =>
                              doc.requirementType &&
                              doc.requirementType.trim() !== ""
                          ) // ✅ filter out empty requirementType
                          .map(([key, doc], index) => (
                            <div key={index} className="flex gap-5 py-8">
                              <Reviewer
                                fileFormat={mimeToLabelMap[doc.fileFormat]}
                                resourceType={doc.resourceType}
                                fileUrl={doc.fileUrl}
                                document={doc.document}
                                supabasePath={doc.supabasePath}
                                docStatus={doc.rejectMessage?.status}
                                requirementType={doc.requirementType}
                                docComment={doc.rejectMessage?.comment}
                                onUpdate={(field, value) =>
                                  updateReviewData(key, field, value)
                                }
                              />

                              <div className="flex-1 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">
                                      {doc.document}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="secondary"
                                        className="uppercase bg-red-800/20 text-red-700"
                                      >
                                        {/* {mimeToLabelMap[doc.fileFormat]} */}
                                        {doc.requirementType}
                                      </Badge>
                                      {doc.rejectMessage?.status && (
                                        <Badge
                                          className={`text-xs ${
                                            doc.rejectMessage.status ===
                                            "APPROVED"
                                              ? statusColors.APPROVED
                                              : statusColors.REJECTED
                                          }`}
                                        >
                                          {doc.rejectMessage.status}
                                        </Badge>
                                      )}
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
                                      placeholder="Add review comment..."
                                      value={
                                        doc.rejectMessage?.comment ||
                                        reviewData[key]?.comment ||
                                        ""
                                      }
                                      disabled={!!doc.rejectMessage?.status}
                                      onChange={(e) =>
                                        updateReviewData(
                                          key,
                                          "comment",
                                          e.target.value
                                        )
                                      }
                                      className="min-h-9"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant={
                                        doc.rejectMessage?.status ===
                                          "APPROVED" ||
                                        reviewData[key]?.status === "APPROVED"
                                          ? "default"
                                          : "outline"
                                      }
                                      className={`font-medium transition-all ${
                                        doc.rejectMessage?.status ===
                                          "APPROVED" ||
                                        reviewData[key]?.status === "APPROVED"
                                          ? ""
                                          : "hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                                      }`}
                                      onClick={() => {
                                        updateReviewData(
                                          key,
                                          "status",
                                          "APPROVED"
                                        );
                                      }}
                                      disabled={!!doc.rejectMessage?.status}
                                    >
                                      {doc.rejectMessage?.status ===
                                      "APPROVED" ? (
                                        <>
                                          <CheckCheck className="w-4 h-4 mr-2" />
                                          Accepted
                                        </>
                                      ) : (
                                        <>
                                          <UserCheck2 className="w-4 h-4 mr-2" />
                                          Accept
                                        </>
                                      )}
                                    </Button>
                                    <Button
                                      variant={
                                        doc.rejectMessage?.status ===
                                          "REJECTED" ||
                                        reviewData[key]?.status === "REJECTED"
                                          ? "destructive"
                                          : "outline"
                                      }
                                      className={`font-medium transition-all ${
                                        doc.rejectMessage?.status !==
                                          "REJECTED" &&
                                        reviewData[key]?.status !== "REJECTED"
                                          ? "hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        updateReviewData(
                                          key,
                                          "status",
                                          "REJECTED"
                                        );
                                      }}
                                      disabled={!!doc.rejectMessage?.status}
                                    >
                                      {doc.rejectMessage?.status ===
                                      "REJECTED" ? (
                                        <>
                                          <UserRoundX className="w-4 h-4 mr-2" />
                                          Rejected
                                        </>
                                      ) : (
                                        <>
                                          <UserX2 className="w-4 h-4 mr-2" />
                                          Reject
                                        </>
                                      )}
                                    </Button>
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
              {activeSection === "scholarship" && (
                <div className="relative h-full w-full overflow-auto  bg-background rounded-t-md flex flex-col no-scrollbar">
                  <div className="absolute top-0 left-0 lg:h-86 h-60 w-full opacity-30   mask-gradient flex">
                    <img
                      className="w-full h-full object-cover blur-md "
                      src={data?.Scholarship.cover}
                      alt=""
                    />
                  </div>

                  <div className="relative flex justify-center items-center ">
                    <div className="absolute inset-0border-b-2 border-black bg-card" />
                    <div className="absolute left-2 -bottom-18 z-10 lg:px-6  px-2 flex  items-end gap-3 ">
                      <Avatar className="lg:size-30 size-20 border-background border-2 shadow-md">
                        <AvatarImage
                          className="object-cover"
                          src={data?.Scholarship.logo}
                        />
                        <AvatarFallback>
                          {data?.Scholarship.Scholarship_Provider?.name &&
                            data?.Scholarship.Scholarship_Provider.name.slice(
                              0,
                              2
                            )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="">
                        <motion.span
                          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                 flex items-center gap-1.5 lg:text-2xl text-xl font-semibold tracking-tight
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
                          {data?.Scholarship.title}
                          {data?.Scholarship.deadline &&
                          new Date(data.Scholarship.deadline).getTime() <
                            Date.now() ? (
                            <Badge className="bg-red-800 text-gray-200 tracking-wide">
                              EXPIRED
                            </Badge>
                          ) : (
                            <Badge className="bg-green-800 text-gray-200 tracking-wide">
                              ACTIVE
                            </Badge>
                          )}
                        </motion.span>
                        <p className="text-muted-foreground text-sm">
                          by {data?.Scholarship.Scholarship_Provider?.name}
                        </p>
                      </div>
                    </div>
                    {data?.Scholarship.cover && (
                      <img
                        className="w-full lg:aspect-[16/4] aspect-[16/9]  object-cover   rounded-lg shadow-md"
                        src={data?.Scholarship.cover}
                        alt=""
                      />
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="absolute z-5  !bg-black/60 !text-gray-200"
                          size="sm"
                        >
                          View <Maximize />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-4">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="w-[300px]">
                          <img
                            className="h-full w-full"
                            src={data?.Scholarship.cover}
                            alt=""
                          />
                        </div>
                        <Link
                          className="w-full"
                          href={
                            (data?.Scholarship.cover &&
                              data?.Scholarship.cover) ||
                            ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="secondary" className="w-full">
                            <Download />
                            Download
                          </Button>
                        </Link>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex-1 pt-30 pb-10 px-6 space-y-8">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">About</p>
                      <p>{data?.Scholarship.description}</p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex gap-3 items-center">
                        <h1 className="font-medium">Scholarship Details</h1>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        {data?.Scholarship.amount && (
                          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                            <PhilippinePeso />
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Scholarship Amount
                              </p>
                              <h1 className="text-lg font-medium font-mono">
                                {data?.Scholarship.amount}.00
                              </h1>
                            </div>
                          </div>
                        )}
                        {data?.Scholarship.limit && (
                          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                            <Inbox />
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Scholarship Limit
                              </p>
                              <h1 className="text-lg font-medium font-mono">
                                {data?.Scholarship.limit}
                              </h1>
                            </div>
                          </div>
                        )}
                        {data?.Scholarship.requiredGWA && (
                          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                            <Inbox />
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Required GWA
                              </p>
                              <h1 className="text-lg font-medium font-mono">
                                {data?.Scholarship.requiredGWA}
                              </h1>
                            </div>
                          </div>
                        )}
                        {data?.Scholarship.requiredGWA && (
                          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                            <Inbox />
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Required GWA
                              </p>
                              <h1 className="text-lg font-medium font-mono">
                                {data?.Scholarship.requiredGWA}
                              </h1>
                            </div>
                          </div>
                        )}
                        <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <Building />
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Scholarship Type
                            </p>
                            <h1 className="text-lg font-medium capitalize">
                              {data?.Scholarship.type}
                            </h1>
                          </div>
                        </div>

                        <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <Calendar />
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Scholarship Deadline
                            </p>
                            <h1 className="text-lg font-medium">
                              {data?.Scholarship.deadline
                                ? format(
                                    new Date(data?.Scholarship.deadline),
                                    "PPP"
                                  )
                                : "No deadline"}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {" "}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xs font-medium text-muted-foreground  tracking-wide">
                              Required Documents
                            </h3>
                            <p className="font-medium text-lg">
                              {
                                Object.keys(data?.Scholarship.documents || {})
                                  .length
                              }
                            </p>
                          </div>

                          <div className=" divide-y">
                            {Object.values(
                              data?.Scholarship.documents.documents || {}
                            ).map((doc, index) => (
                              <div
                                className="flex justify-between items-center py-5"
                                key={doc.label}
                              >
                                <div>
                                  <span> {index + 1}. </span>
                                  {doc.label}
                                </div>
                                <Badge
                                  className={`${
                                    doc.requirementType === "required"
                                      ? "bg-red-700/20 text-red-700"
                                      : doc.requirementType === "optional"
                                      ? "bg-blue-700/20 text-blue-700"
                                      : ""
                                  } capitalize `}
                                >
                                  {doc.requirementType}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-card rounded-md">
                        <h1 className="text-center text-sm font-medium">
                          Hurry before it ends
                        </h1>
                        <div className="transform scale-85 lg:scale-100">
                          {data?.Scholarship.deadline && (
                            <AnimatedNumberCountdown
                              endDate={new Date(data?.Scholarship.deadline)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <DrawerFooter className="bg-gradient-to-r from-card/50 to-card border-t p-6">
          {loading ? (
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {/* Approve Button */}
              {data?.status === "PENDING" &&
                data.Scholarship.interview === false && (
                  <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                    <DialogTrigger asChild>
                      <Button
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3 shadow-sm hover:shadow-md transition-all duration-200"
                        disabled={totalDocs > reviewedDocs}
                      >
                        <UserRoundCheck className="w-4 h-4 mr-2" />
                        Approve Application
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-lg p-6 rounded-xl"
                      onInteractOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      showCloseButton={false}
                    >
                      <DialogHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                          <UserRoundCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-green-700 dark:text-green-300">
                          Approve Application
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground leading-relaxed">
                          This will approve the scholarship application and
                          notify the student of the positive decision. This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpenApprove(false)}
                          disabled={loadingApprove}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleApprove}
                          disabled={loadingApprove}
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                        >
                          {loadingApprove ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCheck className="w-4 h-4 mr-2" />
                              Confirm Approval
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              {data?.status === "INTERVIEW" &&
                data.Scholarship.interview === true && (
                  <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                    <DialogTrigger asChild>
                      <Button
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3 shadow-sm hover:shadow-md transition-all duration-200"
                        disabled={totalDocs > reviewedDocs}
                      >
                        <UserRoundCheck className="w-4 h-4 mr-2" />
                        Approve Application
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-lg p-6 rounded-xl"
                      onInteractOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      showCloseButton={false}
                    >
                      <DialogHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                          <UserRoundCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-green-700 dark:text-green-300">
                          Approve Application
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground leading-relaxed">
                          This will approve the scholarship application and
                          notify the student of the positive decision. This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpenApprove(false)}
                          disabled={loadingApprove}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleApprove}
                          disabled={loadingApprove}
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                        >
                          {loadingApprove ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCheck className="w-4 h-4 mr-2" />
                              Confirm Approval
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

              {/* Approve for Interview Button */}
              {data?.status === "PENDING" &&
                data.Scholarship.interview === true && (
                  <Dialog open={openInterview} onOpenChange={setOpenInterview}>
                    <DialogTrigger asChild>
                      <Button
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3 shadow-sm hover:shadow-md transition-all duration-200"
                        disabled={totalRequiredDocs !== reviewedDocs}
                      >
                        <UserRoundCheck className="w-4 h-4 mr-2" />
                        Approve for Interview
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-lg p-6 rounded-xl"
                      onInteractOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                      showCloseButton={false}
                    >
                      <DialogHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-green-700 dark:text-green-300">
                          Approve for Interview
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground leading-relaxed">
                          This will approve the application for the interview
                          stage and notify the student. This action cannot be
                          undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpenInterview(false)}
                          disabled={loadingInterview}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInterview}
                          disabled={loadingInterview}
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                        >
                          {loadingInterview ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCheck className="w-4 h-4 mr-2" />
                              Confirm Approval
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

              {/* Decline Button */}
              <Dialog open={openReject} onOpenChange={setOpenReject}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex-1 font-medium py-3 shadow-sm hover:shadow-md transition-all duration-200"
                    disabled={
                      data?.status === "APPROVED" ||
                      data?.status === "DECLINED" ||
                      totalRequiredDocs !== reviewedDocs
                    }
                  >
                    <UserRoundX className="w-4 h-4 mr-2" />
                    Decline Application
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg p-6 rounded-xl"
                  onInteractOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
                  showCloseButton={false}
                >
                  <DialogHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                      <UserRoundX className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <DialogTitle className="text-xl font-semibold text-red-700 dark:text-red-300">
                      Decline Application
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground leading-relaxed">
                      This will decline the scholarship application and notify
                      the student with the review feedback. This action cannot
                      be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setOpenReject(false)}
                      disabled={loadingReject}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={loadingReject}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {loadingReject ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Declining...
                        </>
                      ) : (
                        <>
                          <UserRoundX className="w-4 h-4 mr-2" />
                          Confirm Decline
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Back Button */}
              <Button
                variant="outline"
                className="flex-1 font-medium py-3 border-2 hover:bg-muted/50 transition-all duration-200"
                onClick={() => HandleCloseDrawer(false)}
              >
                <ArrowLeftFromLine className="w-4 h-4 mr-2" />
                Back to Applications
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

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
    ? Object.values(data.submittedDocuments.documents).filter(
        (doc) =>
          doc.requirementType && doc.requirementType.trim() !== "optional"
      ).length
    : 0;

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
      label: "Address",
      icon: Locate,
      value: data?.Student.familyBackground.fatherAddress,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.familyBackground.fatherContactNumber,
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
      label: "Address",
      icon: UserRound,
      value: data?.Student.familyBackground.motherAddress,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.familyBackground.motherContactNumber,
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
      label: "Address",
      icon: Locate,
      value: data?.Student.familyBackground.guardianAddress,
    },
    {
      label: "Occupation",
      icon: Briefcase,
      value: data?.Student.familyBackground.guardianOccupation,
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: data?.Student.familyBackground.guardianHighestEducation,
    },
  ];

  const studentInformation = [
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.Student.contactNumber,
    },
    {
      label: "Gender",
      icon: VenusAndMars,
      value: data?.Student.gender,
    },
    {
      label: "Address",
      icon: Locate,
      value: data?.Student.address,
    },
    {
      label: "Email",
      icon: Mail,
      value: data?.Student.Account.email,
    },
    {
      label: "Institute",
      icon: Building2,
      value: data?.Student.institute,
    },
    {
      label: "Course, Year & Section",
      icon: GraduationCap,
      value: `${data?.Student.course} - ${data?.Student.year.slice(0, 1)}${
        data?.Student.section
      }`,
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
        <div className="bg-background rounded-lg flex-1 overflow-auto flex flex-col divide-y">
          {/* Enhanced Header */}
          <div className="  bg-gradient-to-r from-background to-card">
            <div className="relative p-4 h-35">
              <BGPattern
                variant="grid"
                className="top-0  z-1 opacity-30 hidden dark:block mask-gradient"
                size={40}
              />
              <div className="relative flex items-start justify-between z-20">
                <div className="flex items-center justify-center gap-5">
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

          <div className="p-4 b bg-card/30 sticky top-0">
            <Tabs
              tabs={navigationTabs}
              onTabChange={(tabId) => setActiveSection(tabId)}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="p-6">
              {/* Documents Section */}
              {activeSection === "documents" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">
                      Submitted Documents
                    </h2>
                  </div>
                  {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Skeleton className="h-80 w-full" />
                      <Skeleton className="h-80 w-full" />
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
                                        className="text-xs"
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
                                          ? "!bg-green-700 hover:!bg-green-800"
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
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <UserRound className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">
                      Student Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentInformation.map((info, index) => (
                      <div
                        key={index}
                        className={`bg-card border rounded-lg p-4 hover:shadow-sm transition-all duration-200 ${
                          info.label === "Address" || info.label === "Email"
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <info.icon className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              {info.label}
                            </p>
                            <p className="font-medium text-foreground">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Family Background Section */}
              {activeSection === "family" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Family Background</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Father Details */}
                    <div className="space-y-4">
                      <TitleReusable title="Father" description="" />
                      <div className="bg-card border rounded-lg p-6">
                        <div className="space-y-4">
                          {fatherDetails.map((detail, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
                            >
                              <detail.icon className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {detail.label}
                                </p>
                                <p className="font-medium text-sm mt-1">
                                  {detail.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mother Details */}
                    <div className="space-y-4">
                      <TitleReusable title="Mother" description="" />
                      <div className="bg-card border rounded-lg p-6">
                        <div className="space-y-4">
                          {motherDetails.map((detail, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
                            >
                              <detail.icon className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {detail.label}
                                </p>
                                <p className="font-medium text-sm mt-1">
                                  {detail.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Guardian Details */}
                    <div className="space-y-4 lg:col-span-2">
                      <TitleReusable title="Guardian" description="" />
                      <div className="bg-card border rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {guardianDetails.map((detail, index) => (
                            <div
                              key={index}
                              className={`flex items-start gap-3 ${
                                detail.label === "Address"
                                  ? "md:col-span-2 lg:col-span-3"
                                  : ""
                              }`}
                            >
                              <detail.icon className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {detail.label}
                                </p>
                                <p className="font-medium text-sm mt-1">
                                  {detail.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scholarship Details Section */}
              {activeSection === "scholarship" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Building className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">
                      Scholarship Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-card border rounded-lg p-6 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <PhilippinePeso className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Scholarship Amount
                            </p>
                            <h3 className="text-2xl font-bold text-foreground font-mono">
                              ₱{data?.Scholarship.amount}.00
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card border rounded-lg p-6 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Scholarship Type
                            </p>
                            <h3 className="text-xl font-semibold capitalize">
                              {data?.Scholarship.type}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card border rounded-lg p-6 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Application Deadline
                            </p>
                            <h3 className="text-lg font-semibold">
                              {data?.Scholarship?.deadline
                                ? format(
                                    new Date(data.Scholarship.deadline),
                                    "PPP"
                                  )
                                : "No deadline"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border rounded-lg p-6 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                          <StickyNote className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Scholarship Description
                          </p>
                        </div>
                      </div>
                      <div className="pl-12">
                        <p className="text-sm leading-relaxed text-foreground">
                          {data?.Scholarship.description ||
                            "No description available"}
                        </p>
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
                        disabled={reviewedDocs < totalRequiredDocs}
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
                        disabled={reviewedDocs < totalRequiredDocs}
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
                        disabled={reviewedDocs < totalRequiredDocs}
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
                      reviewedDocs < totalRequiredDocs
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

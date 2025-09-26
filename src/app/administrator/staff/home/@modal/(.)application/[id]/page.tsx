"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  GraduationCap,
  UserCheck2,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  UserX2,
  PhilippinePeso,
  Building,
  StickyNote,
  Maximize,
  UsersRound,
  Inbox,
  UserX,
  UserCheck,
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
import { DeleteDialog } from "@/components/ui/delete-dialog";
import StudentStaff from "./student";
import FamilyStaff from "./family";
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
  useEffect(() => {
    if (data?.Interview_Decision?.message) {
      setReviewData(data.Interview_Decision.message);
    }
  }, [data]);
  const documentPhases = Object.keys(data?.submittedDocuments ?? {}).filter(
    (key) => key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.submittedDocuments?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const totalRequiredDocs = lastPhase.filter(
    (meow) => meow.requirementType === "required"
  ).length;

  const reviewedDocs = lastPhase.filter((doc) => {
    const hasExistingStatus = doc.rejectMessage?.status;
    const hasNewReviewStatus = reviewData[doc.document]?.status;
    const isRequired = doc.requirementType?.trim() === "required";

    return isRequired && (hasExistingStatus || hasNewReviewStatus);
  }).length;
  const isThereRejected = Object.values(reviewData).find(
    (meow) => meow.status === "REJECTED"
  );
  const isButtonDisabled = totalRequiredDocs !== reviewedDocs;

  // const progressValue = totalDocs > 0 ? (reviewedDocs / totalDocs) * 100 : 0;

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
    documentUpdate: reviewData,
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

  // Close drawer when interview is successful
  useEffect(() => {
    if (isSuccessInterview) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessInterview]);

  // Close drawer when approval is successful
  useEffect(() => {
    if (isSuccessApprove) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessApprove]);

  // Close drawer when reject is successful
  useEffect(() => {
    if (isSuccessReject) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessReject]);

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
                      {lastPhase &&
                        lastPhase
                          .filter(
                            (doc) =>
                              doc.requirementType &&
                              doc.requirementType.trim() !== ""
                          )
                          .map((doc, index) => {
                            // Get the current status from either existing data or new review data
                            const currentStatus =
                              reviewData[doc.document]?.status ||
                              doc.rejectMessage?.status;
                            const currentComment =
                              reviewData[doc.document]?.comment ||
                              doc.rejectMessage?.comment ||
                              "";

                            console.log("111", currentStatus, currentComment);

                            return (
                              <div key={index} className="flex gap-5 py-8">
                                <Reviewer
                                  fileFormat={mimeToLabelMap[doc.fileFormat]}
                                  resourceType={doc.resourceType}
                                  fileUrl={doc.fileUrl}
                                  document={doc.document}
                                  supabasePath={doc.supabasePath}
                                  docStatus={currentStatus}
                                  requirementType={doc.requirementType}
                                  docComment={currentComment}
                                  onUpdate={(field, value) =>
                                    updateReviewData(doc.document, field, value)
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
                                          {doc.requirementType}
                                        </Badge>
                                        {/* Show current status badge */}
                                        {currentStatus && (
                                          <Badge
                                            className={`text-xs ${
                                              currentStatus === "APPROVED"
                                                ? statusColors.APPROVED
                                                : statusColors.REJECTED
                                            }`}
                                          >
                                            {currentStatus}
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
                                      <Textarea
                                        placeholder="Add review comment..."
                                        value={currentComment}
                                        disabled={!!doc.rejectMessage?.status}
                                        onChange={(e) =>
                                          updateReviewData(
                                            doc.document,
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
                                          currentStatus === "APPROVED"
                                            ? "default"
                                            : "outline"
                                        }
                                        className={`font-medium transition-all ${
                                          currentStatus === "APPROVED"
                                            ? ""
                                            : "hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                                        }`}
                                        onClick={() =>
                                          updateReviewData(
                                            doc.document,
                                            "status",
                                            "APPROVED"
                                          )
                                        }
                                        disabled={!!doc.rejectMessage?.status}
                                      >
                                        {currentStatus === "APPROVED" ? (
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
                                          currentStatus === "REJECTED"
                                            ? "destructive"
                                            : "outline"
                                        }
                                        className={`font-medium transition-all ${
                                          currentStatus !== "REJECTED"
                                            ? "hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          updateReviewData(
                                            doc.document,
                                            "status",
                                            "REJECTED"
                                          )
                                        }
                                        disabled={!!doc.rejectMessage?.status}
                                      >
                                        {currentStatus === "REJECTED" ? (
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
                            );
                          })}
                    </div>
                  )}
                </div>
              )}

              {/* Student Information Section */}
              {activeSection === "student" && data && (
                <StudentStaff {...data} />
              )}

              {/* Family Background Section */}
              {activeSection === "family" && data && <FamilyStaff {...data} />}

              {/* Scholarship Details Section */}
              {activeSection === "scholarship" && data && (
                <ScholarshipModal data={data?.Scholarship} />
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
                  <DeleteDialog
                    open={openApprove}
                    onOpenChange={setOpenApprove}
                    onConfirm={handleApprove}
                    loading={loadingApprove}
                    title="Approve Application"
                    red={false} // make it visually destructive since this is a rejection
                    description="This will approve the application and notify the student. This action cannot be undone."
                    confirmText="Approve"
                    confirmTextLoading="Approving..."
                    cancelText="Cancel"
                    trigger={
                      <Button disabled={isButtonDisabled || !!isThereRejected}>
                        <UserCheck /> Approve Application
                      </Button>
                    }
                  />
                )}
              {data?.status === "INTERVIEW" &&
                data.Scholarship.interview === true && (
                  <DeleteDialog
                    open={openApprove}
                    onOpenChange={setOpenApprove}
                    onConfirm={handleApprove}
                    loading={loadingApprove}
                    title="Approve Application"
                    red={false} // make it visually destructive since this is a rejection
                    description="This will approve the application and notify the student. This action cannot be undone."
                    confirmText="Approve"
                    confirmTextLoading="Approving..."
                    cancelText="Cancel"
                    trigger={
                      <Button disabled={isButtonDisabled || !!isThereRejected}>
                        <UserCheck /> Approve Application
                      </Button>
                    }
                  />
                )}

              {/* Approve for Interview Button */}
              {data?.status === "PENDING" &&
                data.Scholarship.interview === true && (
                  <DeleteDialog
                    open={openInterview}
                    onOpenChange={setOpenInterview}
                    onConfirm={handleInterview}
                    loading={loadingInterview}
                    title="Approve for Interview"
                    red={false}
                    description="This will approve the application for the interview stage and notify the student. This action cannot be undone."
                    confirmText="Approve"
                    confirmTextLoading="Approving..."
                    cancelText="Cancel"
                    trigger={
                      <Button
                        disabled={
                          totalRequiredDocs !== reviewedDocs ||
                          !!isThereRejected
                        }
                      >
                        <UserRoundCheck /> Approve for Interview
                      </Button>
                    }
                  />
                )}

              {/* Decline Button */}
              <DeleteDialog
                open={openReject}
                onOpenChange={setOpenReject}
                onConfirm={handleReject}
                loading={loadingReject}
                title="Reject Application"
                red={true} // make it visually destructive since this is a rejection
                description="This will reject the application and notify the student. This action cannot be undone."
                confirmText="Reject"
                confirmTextLoading="Rejecting..."
                cancelText="Cancel"
                trigger={
                  <Button
                    variant="destructive"
                    disabled={
                      data?.status === "APPROVED" ||
                      data?.status === "DECLINED" ||
                      isButtonDisabled
                    }
                  >
                    <UserX /> Reject Application
                  </Button>
                }
              />

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

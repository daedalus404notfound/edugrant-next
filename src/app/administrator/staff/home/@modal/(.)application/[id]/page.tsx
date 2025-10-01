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
  Download,
  UserCheck2,
  UserRoundCheck,
  UserRoundX,
  UserX2,
  UserX,
  UserCheck,
  Check,
  TriangleAlert,
  CheckCircle2,
  CloudUpload,
  RefreshCcw,
  X,
  Mail,
  IdCard,
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
import { ar } from "date-fns/locale";
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
  const totalSubmitted = lastPhase.filter((meow) => meow.fileUrl).length;
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
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1500px] w-full mx-auto h-[95vh] outline-0 border-0 ">
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="bg-background rounded-lg flex-1 overflow-auto  flex gap-5 p-2">
          {/* Enhanced Header */}
          {/* <div className="  bg-gradient-to-r from-background to-card ">
            <div className="relative p-4 ">
              <BGPattern
                variant="grid"
                className="top-0  z-1 opacity-30 hidden dark:block mask-gradient"
                size={40}
              />
              <div className="relative flex items-start justify-between z-20">
                <div className="flex items-center justify-center gap-3">
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
          </div> */}
          <div className="w-120 space-y-8 p-8 gap-8 sticky top-0">
            <div className="space-y-3">
              <Avatar className=" size-30 p-1 border-2">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-medium text-foreground">
                  {data?.Student.lName}, {data?.Student.fName}{" "}
                  {data?.Student.mName}
                </h1>
                <p className=" font-mono text-sm tracking-wide mt-1 flex gap-2 items-center">
                  <IdCard className="w-5 h-5" />{" "}
                  {data?.Student.Account.schoolId}
                </p>
                <div className="mt-3 space-x-2">
                  <Badge variant="outline">
                    {data?.Student.course}-{data?.Student.year.slice(0, 1)}
                    {data?.Student.section}
                  </Badge>
                  <Badge variant="outline">{data?.Student.institute}</Badge>
                </div>
              </div>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <h1>Quick Stats</h1>
            <div className="flex-1">
              <div className="py-4">
                <h1 className="text-sm text-muted-foreground">Scholarship</h1>
                <p className="font-medium tracking-wide">
                  {data?.Scholarship.title}
                </p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <div className="py-4">
                <h1 className="text-sm text-muted-foreground">Phase</h1>
                <p className="font-medium tracking-wide">
                  Phase {data?.Scholarship.phase}
                </p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <div className="py-4">
                <h1 className="text-sm text-muted-foreground">
                  Application Date
                </h1>
                <p className="font-medium tracking-wide">
                  {data?.dateCreated && format(data?.dateCreated, "PPP p")}
                </p>
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <div className="py-4">
                <h1 className="text-sm text-muted-foreground">
                  Total Submitted Documents
                </h1>
                <p className="font-medium tracking-wide">{totalSubmitted}</p>
              </div>
              {data?.Student.indigenous && (
                <div className="py-4">
                  <h1 className="text-sm text-muted-foreground">
                    Indigenous Group
                  </h1>
                  <p className="font-medium tracking-wide">
                    {data.Student.indigenous}
                  </p>
                </div>
              )}
              {data?.Student.PWD && (
                <div className="py-4">
                  <h1 className="text-sm text-muted-foreground">PWD</h1>
                  <p className="font-medium tracking-wide">
                    {data.Student.PWD}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="p-4  bg-card backdrop-blur-sm sticky top-0 z-60 flex rounded-md">
              <Tabs
                tabs={navigationTabs}
                onTabChange={(tabId) => setActiveSection(tabId)}
                className="flex-1"
              />
              <Button onClick={() => HandleCloseDrawer(false)}>
                <X />
              </Button>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="flex-1">
              {/* <div className="space-y-6 p-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <CloudUpload /> Review Overview
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className=" grid grid-cols-3">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Reviewed By</p>
                  <p>Jerome</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Reviewed Date</p>
                  <p>August 10, 2025 11:00 am</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">
                    Reviewed Decision
                  </p>
                  <p>APPROVED</p>
                </div>
              </div>
            </div> */}
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="py-6">
                {/* Documents Section */}
                {activeSection === "documents" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-medium flex gap-2 items-center">
                        <CloudUpload /> Submitted Documents
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 ">
                      {loading ? (
                        <>loading</>
                      ) : (
                        lastPhase &&
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

                            return (
                              <div
                                key={index}
                                className="bg-card p-6 rounded-lg space-y-6"
                              >
                                {doc.fileFormat ? (
                                  <div className="flex gap-3 items-center">
                                    <div className="rounded-md flex-1 bg-green-600/10 text-green-600 px-4 py-2.5 ">
                                      <div className="flex gap-3">
                                        <CheckCircle2
                                          className="mt-0.5 shrink-0 opacity-60"
                                          size={16}
                                          aria-hidden="true"
                                        />
                                        <div className="flex grow justify-between gap-3">
                                          <p className="text-sm">
                                            Document provided
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <Button size="lg" variant="secondary">
                                      <Download />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="rounded-md  bg-red-600/10 text-red-600 px-4 py-2.5 ">
                                    <div className="flex gap-3">
                                      <TriangleAlert
                                        className="mt-0.5 shrink-0 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                      <div className="flex grow justify-between gap-3">
                                        <p className="text-sm">
                                          Failed to submit
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="pt-8 pb-6">
                                  <div className="flex flex-col justify-center items-center gap-5">
                                    <Reviewer
                                      fileFormat={
                                        mimeToLabelMap[doc.fileFormat]
                                      }
                                      resourceType={doc.resourceType}
                                      fileUrl={doc.fileUrl}
                                      document={doc.document}
                                      supabasePath={doc.supabasePath}
                                      docStatus={currentStatus}
                                      requirementType={doc.requirementType}
                                      docComment={currentComment}
                                      onUpdate={(field, value) =>
                                        updateReviewData(
                                          doc.document,
                                          field,
                                          value
                                        )
                                      }
                                    />
                                    <div className="flex items-start justify-between w-full">
                                      <div className="flex-1">
                                        <div className="flex gap-2 items-center justify-center">
                                          <h4 className="text-lg font-semibold mb-1 ">
                                            {doc.document}
                                          </h4>
                                          <Badge
                                            variant="outline"
                                            className="uppercase tracking-wide"
                                          >
                                            {doc.requirementType}
                                          </Badge>
                                        </div>
                                        {/* <div className=" items-center gap-2 capitalize mt-2">
                                          <div className="flex items-center gap-1.5">
                                            <p className="text-sm text-muted-foreground">
                                              Document Type:
                                            </p>
                                            <p className="uppercase tracking-wide">
                                              {doc.requirementType}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <p className="text-sm text-muted-foreground">
                                              Document Format:
                                            </p>
                                            <p className="uppercase tracking-wide">
                                              {doc.fileFormat || "N/A"}
                                            </p>
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-1 grid grid-cols-2 gap-3">
                                  <Button
                                    variant={
                                      currentStatus === "APPROVED"
                                        ? "default"
                                        : "outline"
                                    }
                                    className={`font-medium transition-all flex-1  !border-0 ${
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
                                    disabled={
                                      !!doc.rejectMessage?.status ||
                                      !doc.fileFormat
                                    }
                                  >
                                    {currentStatus === "APPROVED" ? (
                                      <>
                                        <Check className="w-4 h-4 mr-2" />
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
                                    className={`font-medium transition-all flex-1  !border-0 ${
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
                                    disabled={
                                      !!doc.rejectMessage?.status ||
                                      !doc.fileFormat
                                    }
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
                                  <Textarea
                                    placeholder="Add review comment..."
                                    value={currentComment}
                                    disabled={
                                      !!doc.rejectMessage?.status ||
                                      !doc.fileFormat
                                    }
                                    onChange={(e) =>
                                      updateReviewData(
                                        doc.document,
                                        "comment",
                                        e.target.value
                                      )
                                    }
                                    className="min-h-20 col-span-2 bg-background border-0"
                                  />
                                </div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </div>
                )}

                {/* Student Information Section */}
                {activeSection === "student" &&
                  (loading ? (
                    <>loading.</>
                  ) : (
                    data && <StudentStaff {...data} />
                  ))}

                {/* Family Background Section */}
                {activeSection === "family" &&
                  (loading ? <>loa</> : data && <FamilyStaff {...data} />)}
              </div>
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
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset Review
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

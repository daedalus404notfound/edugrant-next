"use client";

// import { Ring } from "ldrs/react";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  CheckCheck,
  Download,
  File,
  FileText,
  GraduationCap,
  IdCard,
  LoaderCircleIcon,
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import { useRejectHandler } from "@/hooks/admin/postDeclineHandler";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [reviewData, setReviewData] = useState<
    Record<string, { comment: string; status: string }>
  >({});

  // Default values shown

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

  const id = params.id as string;
  const { data, loading } = useApplicationById(id);

  const totalDocs = data?.scholarship?.scholarshipDocuments?.length || 0;
  const reviewedDocs = Object.keys(reviewData).length;
  const progressValue = totalDocs > 0 ? (reviewedDocs / totalDocs) * 100 : 0;

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const { handleApprove, loadingApprove } = useApprovedHandler({
    id,
    setOpenApprove,
    adminId: admin?.adminId.toString(),
  });

  const { handleDecline, loadingReject } = useRejectHandler({
    id,
    setOpenReject,
    adminId: admin?.adminId.toString(),
    documentUpdate: reviewData,
  });

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px] w-full mx-auto h-[98vh] outline-0 border-0 ">
        {/* Header Status - Vercel-style clean status indicators */}
        <DrawerHeader className="sr-only">
          <div className="sr-only">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </div>
        </DrawerHeader>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Quantum size="45" speed="1.75" color="yellow" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-auto h-full no-scrollbar"
          >
            {/* Left Panel - Student Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
                {/* Student Avatar & Name */}
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 text-white dark:text-neutral-900 text-2xl font-semibold mb-4"
                  >
                    {data?.student.firstName.slice(0, 1).toUpperCase()}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent"
                      whileHover={{
                        borderColor: "rgb(115, 115, 115)",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <div className="flex justify-center items-center">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-2xl font-semibold flex items-center gap-1.5 capitalize
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
                      {`${data?.student.firstName} ${data?.student.middleName} ${data?.student.lastName}`}
                    </motion.span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    <Badge className="uppercase bg-transparent text-neutral-50">
                      {data?.student.course}
                    </Badge>
                    <Badge className="uppercase bg-transparent text-neutral-50">
                      {data?.student.year}
                    </Badge>
                    <Badge className="uppercase bg-transparent text-neutral-50">
                      Section {data?.student.section}
                    </Badge>
                  </div>
                </div>

                {/* Student Details */}
                <div className="space-y-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <Calendar className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Date Submitted
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
                        {data?.applicationDate
                          ? format(data?.applicationDate, "MMM d, yyyy")
                          : ""}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <GraduationCap className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Scholarship
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
                        {data?.scholarship.scholarshipTitle}
                      </p>
                    </div>
                  </motion.div>

                  <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4" />

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <IdCard className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Student ID
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium font-mono">
                        {data?.student.studentId}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium truncate">
                        {data?.student.studentEmail}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium font-mono">
                        {data?.student.contactNumber}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <Calendar className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Date of Birth
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
                        {data?.student.dateOfBirth
                          ? format(data.student.dateOfBirth, "MMM d, yyyy")
                          : ""}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Documents */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6 relative p-4"
            >
              {/* Subtle background pattern */}

              {/* Documents Header */}

              <div className="flex items-center gap-3 ">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <File className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Submitted Documents
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Review and approve all required documentation
                  </p>
                </div>
              </div>
              <Separator />
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Skeleton className="h-14 w-full rounded-lg" />
                  </motion.div>
                ) : data?.status === "APPROVE" ? (
                  <motion.div
                    key="approved"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="rounded-md  border border-green-700 bg-green-700/10 p-4 "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Button variant="secondary">
                          <CheckCheck />
                        </Button>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-green-700">
                            Application Approved
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {data.applicationResponseDate &&
                              format(
                                data.applicationResponseDate,
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Reviewed by
                          </p>
                          <p className="text-sm font-medium">Admin Jerome</p>
                        </div>
                        <Button variant="outline">
                          <UserRound />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : data?.status === "DECLINE" ? (
                  <motion.div
                    key="declined"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                          <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-900 dark:text-red-100">
                            Application Declined
                          </p>
                          <p className="text-xs text-red-700 dark:text-red-300">
                            August 18, 2025 at 2:30 PM
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Reviewed by
                        </p>
                        <p className="text-sm font-medium text-red-900 dark:text-red-100">
                          Admin Jerome
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Review Progress
                  </p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {reviewedDocs} of {totalDocs} documents
                  </p>
                </div>

                <Progress
                  value={progressValue}
                  className="h-2 bg-neutral-200 dark:bg-neutral-800"
                />
              </div>
              {/* Documents Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {data?.userDocuments &&
                  Object.entries(data.userDocuments).map(
                    ([key, doc], index) => (
                      <motion.div
                        key={key}
                        variants={itemVariants}
                        custom={index}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <div className="flex flex-col gap-3 border rounded-md p-4 bg-neutral-950">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5  rounded-lg  transition-colors">
                                <FileText className="w-4 h-4 " />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium ">
                                  {doc.document}
                                </h4>
                                <p className="text-xs font-mono">
                                  {doc.fileFormat.toUpperCase()}
                                </p>
                              </div>
                            </div>

                            <Button size="sm" variant="outline">
                              <Download className="w-3.5 h-3.5 " />
                            </Button>
                          </div>
                          <Reviewer
                            fileFormat={doc.fileFormat}
                            resourceType={doc.resourceType}
                            fileUrl={doc.fileUrl}
                            document={doc.document}
                            cloudinaryId={doc.cloudinaryId}
                            onUpdate={(field, value) =>
                              updateReviewData(key, field, value)
                            }
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className={`flex-1 font-medium ${
                                reviewData[key]?.status === "APPROVED"
                                  ? " border text-green-700 !bg-green-700/10 !border-green-700"
                                  : ""
                              }`}
                              onClick={() => {
                                updateReviewData(key, "status", "APPROVED");
                              }}
                              size="sm"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              className={`flex-1 font-medium ${
                                reviewData[key]?.status === "REJECTED"
                                  ? " border text-red-700 !bg-red-700/10 !border-red-700"
                                  : ""
                              }`}
                              size="sm"
                              onClick={() => {
                                updateReviewData(key, "status", "REJECTED");
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Add review comment.."
                            value={reviewData[key]?.comment || ""}
                            disabled={reviewData[key]?.status === "APPROVED"}
                            onChange={(e) =>
                              updateReviewData(key, "comment", e.target.value)
                            }
                          />
                        </div>
                      </motion.div>
                    )
                  )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <DrawerFooter className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          {/* Progress Bar */}

          {/* Action Buttons */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex gap-3"
            >
              {/* Approve Button */}
              <AlertDialog open={openApprove} onOpenChange={setOpenApprove}>
                <AlertDialogTrigger asChild>
                  {data?.userDocuments && (
                    <Button
                      className="flex-1 h-11 !bg-green-800"
                      variant="outline"
                      disabled={
                        data?.status === "APPROVE" ||
                        data?.status === "DECLINE" ||
                        reviewedDocs !== totalDocs
                      }
                    >
                      <CheckCheck className="w-4 h-4 mr-2" />
                      Approve Application
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-green-700 dark:text-green-400">
                      Approve Application
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-600 dark:text-neutral-400">
                      This will approve the applicant and notify them of the
                      decision. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loadingApprove}>
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleApprove}
                      disabled={loadingApprove}
                    >
                      {loadingApprove && (
                        <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Confirm Approval
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Reject Button */}
              <AlertDialog open={openReject} onOpenChange={setOpenReject}>
                <AlertDialogTrigger asChild>
                  {data?.userDocuments && (
                    <Button
                      variant="destructive"
                      className="flex-1 h-11  "
                      disabled={
                        data?.status === "APPROVE" ||
                        data?.status === "DECLINE" ||
                        reviewedDocs !== totalDocs
                      }
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Application
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-700 dark:text-red-400">
                      Reject Application
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-600 dark:text-neutral-400">
                      This will reject the application and notify the applicant.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loadingReject}>
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleDecline}
                      disabled={loadingReject}
                    >
                      {loadingReject && (
                        <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Confirm Rejection
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Back Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full h-11 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200"
                  onClick={() => HandleCloseDrawer(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </motion.div>
            </motion.div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

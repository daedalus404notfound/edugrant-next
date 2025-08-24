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
import { motion, AnimatePresence } from "motion/react";
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
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import { useRecjectHandler } from "@/hooks/admin/postDeclineHandler";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";

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
  const id = params.id as string;
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

  const {
    handleApprove,
    loadingApprove,
    setOpenApprove,
    openApprove,
    isSuccessApprove,
  } = useApprovedHandler({
    id,
    adminId: admin?.adminId.toString(),
  });

  const {
    handleReject,
    loadingReject,
    openReject,
    setOpenReject,
    isSuccessReject,
  } = useRecjectHandler({
    id,
    adminId: admin?.adminId.toString(),
    documentUpdate: reviewData,
  });

  useEffect(() => {
    if (isSuccessApprove || isSuccessReject) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessApprove, isSuccessReject]);

  const applicationDetails = [
    {
      label: "Date Submitted",
      icon: Calendar,
      value: data?.applicationDate
        ? format(data?.applicationDate, "MMM d, yyyy")
        : "",
    },
    {
      label: "Scholarship",
      icon: GraduationCap,
      value: data?.scholarship.scholarshipTitle,
    },

    {
      label: "Student ID",
      icon: IdCard,
      value: data?.student.studentId,
    },
    {
      label: "Email",
      icon: Mail,
      value: data?.student.studentEmail,
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: data?.student.contactNumber,
    },
    {
      label: "Date Of Birth",
      icon: Calendar,
      value: data?.student.dateOfBirth
        ? format(data.student.dateOfBirth, "MMM d, yyyy")
        : "",
    },
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px] w-full mx-auto h-[95vh] outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Button className="relative" variant="ghost" size="sm">
              <TableOfContents />
              Application Details
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {data?.status === "APPROVED" && (
              <Button className="relative" variant="link" size="sm">
                Approved <UserCheck2 />
              </Button>
            )}
            {data?.status === "PENDING" && (
              <Button className="relative" variant="link" size="sm">
                Pending <UserMinus2 />
              </Button>
            )}
            {data?.status === "DECLINED" && (
              <Button className="relative" variant="link" size="sm">
                Declined <UserX2 />
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 h-full overflow-auto gap-2 no-scrollbar bg-background p-4 rounded-t-xl">
          {loading ? (
            <div>
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="space-y-2 flex flex-col"
            >
              <div className="flex flex-col items-center justify-center h-50">
                <Avatar className="size-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-2xl font-semibold flex items-center gap-1.5 capitalize mt-2
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
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  <Badge className="uppercase bg-green-800/10 text-white">
                    {data?.student.course}
                  </Badge>
                  <Badge className="uppercase bg-green-800/10 text-white">
                    {data?.student.year}
                  </Badge>
                  <Badge className="uppercase bg-green-800/10 text-white">
                    Section {data?.student.section}
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                {applicationDetails.map((meow) => (
                  <motion.div
                    key={meow.label}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-4  rounded-lg hover:bg-background transition-colors duration-100"
                  >
                    <meow.icon className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        {meow.label}
                      </p>
                      <p className=" font-medium text-sm">{meow.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="col-span-2  space-y-6 relative p-4">
            <div className="space-y-1">
              <div className="text-lg font-semibold flex gap-2 items-center">
                <FolderOpen />
                Submitted Documents
              </div>
              <p className="text-sm text-muted-foreground">
                Review and approve all required documentation
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Review Progress
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {reviewedDocs} of {totalDocs} documents
                </p>
              </div>

              <Progress value={progressValue} className="border-red-500" />
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <Skeleton className="h-14 w-full rounded-lg" />
              ) : data?.status === "APPROVED" ? (
                <motion.div
                  key="approved"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-xl   text-green-600 py-2 "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <CheckCheck />
                      </Button>
                      <div className="space-y-1">
                        <p className=" font-medium ">Application Approved</p>
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
                        <p className="text-sm font-medium text-blue-800">
                          Admin {data.admin.firstName}
                        </p>
                      </div>
                      <Avatar>
                        <AvatarImage src={data.admin.profileImage} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </motion.div>
              ) : data?.status === "DECLINED" ? (
                <motion.div
                  key="approved"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-xl  bg-red-500/10 p-4 text-red-600 "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <CheckCheck />
                      </Button>
                      <div className="space-y-1">
                        <p className=" font-medium ">Application Declined</p>
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
              ) : null}
            </AnimatePresence>

            <Separator />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {loading ? (
                <>
                  <Skeleton className="aspect-square w-full" />

                  <Skeleton className="aspect-square w-full" />
                </>
              ) : (
                data?.userDocuments &&
                Object.entries(data.userDocuments).map(([key, doc], index) => (
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
                    <div className="flex flex-col gap-3 rounded-2xl p-4 bg-card">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-medium ">
                            {doc.document}
                          </h4>
                          <p className="text-xs font-mono uppercase">
                            {doc.fileFormat}
                          </p>
                        </div>

                        <Button size="sm" variant="outline">
                          <Download />
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
                              ? "  text-green-700 !bg-green-700/10"
                              : ""
                          }`}
                          onClick={() => {
                            updateReviewData(key, "status", "APPROVED");
                          }}
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          className={`flex-1 font-medium ${
                            reviewData[key]?.status === "REJECTED"
                              ? "  text-red-700 !bg-red-700/10 "
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
                ))
              )}
            </motion.div>
          </div>
        </div>

        <DrawerFooter className=" grid grid-cols-3 gap-3 bg-background">
          {loading ? (
            <>
              {" "}
              <Skeleton className="h-9 flex-1 rounded-lg" />
              <Skeleton className="h-9 flex-1 rounded-lg" />
              <Skeleton className="h-9 flex-1 rounded-lg" />
            </>
          ) : (
            <>
              {" "}
              <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                <DialogTrigger asChild>
                  {data?.userDocuments && (
                    <Button
                      className="flex-1 !bg-green-800"
                      variant="outline"
                      disabled={
                        data?.status === "APPROVED" ||
                        data?.status === "DECLINED"
                      }
                    >
                      Approve <UserRoundCheck />
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg p-6"
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  onEscapeKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  showCloseButton={false}
                >
                  <DialogHeader>
                    <DialogTitle className="text-green-600 ">
                      Approve Application?
                    </DialogTitle>
                    <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                      This will approve the applicant and notify them of the
                      decision. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenApprove(false)}
                      disabled={loadingApprove}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="!bg-green-700 !hover:bg-green-600"
                      variant="outline"
                      onClick={handleApprove}
                      disabled={loadingApprove}
                    >
                      {loadingApprove ? (
                        <>
                          Approving ...
                          <Loader className="animate-spin" />
                        </>
                      ) : (
                        "Confirm Approve"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={openReject} onOpenChange={setOpenReject}>
                <DialogTrigger asChild>
                  {data?.userDocuments && (
                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={
                        data?.status === "APPROVED" ||
                        data?.status === "DECLINED"
                      }
                    >
                      Decline <UserRoundX />
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg p-6"
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  onEscapeKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  showCloseButton={false}
                >
                  <DialogHeader>
                    <DialogTitle className="text-red-600">
                      Decline Application?
                    </DialogTitle>
                    <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                      This will decline the application and notify the
                      applicant. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenReject(false)}
                      disabled={loadingReject}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      className="!bg-red-700 hover:!bg-red-600"
                      onClick={handleReject}
                      disabled={loadingReject}
                    >
                      {loadingReject ? (
                        <>
                          Declining ...
                          <Loader className="animate-spin" />
                        </>
                      ) : (
                        "Confirm Decline"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="w-full border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200"
                onClick={() => HandleCloseDrawer(false)}
              >
                Back
                <ArrowLeftFromLine />
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

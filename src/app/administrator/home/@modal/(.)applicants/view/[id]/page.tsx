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
const mimeToLabelMap: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "image/jpeg": "JPG",
  "image/png": "PNG",
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

  const totalDocs = data?.scholarship?.scholarshipDocuments
    ? Object.keys(data.scholarship.scholarshipDocuments).length
    : 0;
  console.log("tota;'", data?.scholarship.scholarshipDocuments);
  const reviewedDocs = data?.userDocuments
    ? Object.entries(data.userDocuments).filter(([key, doc]) => {
        // Document is considered reviewed if:
        // 1. It has a status from the API (doc.rejectMessage?.status exists)
        // 2. OR it has been reviewed locally (reviewData[key]?.status exists)
        return doc.rejectMessage?.status || reviewData[key]?.status;
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
    adminId: admin?.adminId.toString(),
    documentUpdate: reviewData,
    scholarshipId: data?.scholarship.scholarshipId
      ? data?.scholarship.scholarshipId
      : "",
  });

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
    if (isSuccessInterview || isSuccessReject) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessInterview, isSuccessReject]);

  const fatherDetails = [
    {
      label: "Father Full Name",
      icon: UserRound,
      value: "Juan Dela Cruz",
    },
    {
      label: "Address",
      icon: Locate,
      value: "San Ildefonso, Bulacan",
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: "09703488043",
    },
    {
      label: "Occupation",
      icon: Briefcase,
      value: "Senator",
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: "Senator",
    },
    {
      label: "Total Parents Taxable Income",
      icon: PhilippinePeso,
      value: "2000.00",
    },
  ];
  const motherDetails = [
    {
      label: "Mother Full Name",
      icon: UserRound,
      value: "Juana Dela Cruz",
    },
    {
      label: "Address",
      icon: Locate,
      value: "San Miguel, Bulacan",
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: "09703488043",
    },
    {
      label: "Occupation",
      icon: Briefcase,
      value: "Senator",
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: "Senator",
    },
    {
      label: "Total Parents Taxable Income",
      icon: PhilippinePeso,
      value: "2000.00",
    },
  ];

  const guardianDetails = [
    {
      label: "Guardian Full Name",
      icon: UserRound,
      value: "Juan Dela Cruz",
    },
    {
      label: "Contact No.",
      icon: Phone,
      value: "09703488043",
    },
    {
      label: "Address",
      icon: Locate,
      value: "San Ildefonso, Bulacan",
    },

    {
      label: "Occupation",
      icon: Briefcase,
      value: "Senator",
    },
    {
      label: "Highest Education Attainment",
      icon: GraduationCap,
      value: "Senator",
    },
    {
      label: "Total Parents Taxable Income",
      icon: PhilippinePeso,
      value: "2000.00",
    },
  ];

  const studentInformation = [
    {
      label: "Contact No.",
      icon: Phone,
      value: "09703488043",
    },
    {
      label: "Gender",
      icon: VenusAndMars,
      value: "Male",
    },

    {
      label: "Address",
      icon: Locate,
      value: "San Ildefonso, Bulacan",
    },

    {
      label: "Email",
      icon: Briefcase,
      value: "jerometecson@gmail.com",
    },
    {
      label: "Institute",
      icon: Building2,
      value: "IEAT ",
    },
    {
      label: "Course, Year & Section",
      icon: GraduationCap,
      value: "BSIT - 4C",
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
        <div className="bg-background rounded-lg flex-1 overflow-auto">
          <div className=" p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card p-4 rounded-md">
                <h1 className="text-lg font-medium">Tecson, Jerome L.</h1>
                <p className="mt-1 text-sm">2022000493</p>
              </div>
              <div className="bg-card p-4 rounded-md">
                <h1 className="text-lg font-medium">Kuya Win Scholarship</h1>
                <p className="mt-1 text-sm">Win Gatchalian</p>
              </div>
            </div>
            <div className="space-y-3">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Student Information
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-3">
                      {studentInformation.map((meow) => (
                        <motion.div
                          key={meow.label}
                          variants={itemVariants}
                          className={`flex items-start gap-3 py-4 bg-card p-4 rounded-md  ${
                            meow.label === "Address"
                              ? "col-span-2"
                              : meow.label === "Email"
                              ? "col-span-2"
                              : ""
                          }`}
                        >
                          <meow.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {meow.label}
                            </p>
                            <p className=" font-medium text-sm">{meow.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Submitted Documents
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2 gap-5">
                    {loading ? (
                      <>
                        <Skeleton className="aspect-square w-full" />

                        <Skeleton className="aspect-square w-full" />
                      </>
                    ) : (
                      data?.userDocuments &&
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
                            <div className="flex flex-col gap-3 rounded-lg p-4 space-y-8 bg-card">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="text-base font-medium ">
                                    {doc.document}
                                  </h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed uppercase">
                                    {mimeToLabelMap[doc.fileFormat]}
                                  </p>
                                </div>

                                <Button size="sm">
                                  <Download />
                                </Button>
                              </div>
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
                              <div className="space-y-3">
                                <div className="flex gap-2">
                                  <Button
                                    variant="secondary"
                                    className={`flex-1 font-medium ${
                                      // Check if doc has approved status OR local review data is approved
                                      doc.rejectMessage?.status ===
                                        "APPROVED" ||
                                      reviewData[key]?.status === "APPROVED"
                                        ? " !bg-green-700"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      updateReviewData(
                                        key,
                                        "status",
                                        "APPROVED"
                                      );
                                    }}
                                    disabled={
                                      // Disable if doc already has any status (approved or rejected)
                                      !!doc.rejectMessage?.status
                                    }
                                  >
                                    {/* Show checkmark if approved, otherwise show Accept */}
                                    {doc.rejectMessage?.status ===
                                    "APPROVED" ? (
                                      <>
                                        <CheckCheck className="w-4 h-4 mr-1" />
                                        Accepted
                                      </>
                                    ) : (
                                      "Accept"
                                    )}
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    className={`flex-1 font-medium ${
                                      // Check if doc has rejected status OR local review data is rejected
                                      doc.rejectMessage?.status ===
                                        "REJECTED" ||
                                      reviewData[key]?.status === "REJECTED"
                                        ? "!bg-red-700"
                                        : ""
                                    }`}
                                    size="sm"
                                    onClick={() => {
                                      updateReviewData(
                                        key,
                                        "status",
                                        "REJECTED"
                                      );
                                    }}
                                    disabled={
                                      // Disable if doc already has any status (approved or rejected)
                                      !!doc.rejectMessage?.status
                                    }
                                  >
                                    {/* Show X mark if rejected, otherwise show Reject */}
                                    {doc.rejectMessage?.status ===
                                    "REJECTED" ? (
                                      <>
                                        <UserRoundX className="w-4 h-4 mr-1" />
                                        Rejected
                                      </>
                                    ) : (
                                      "Reject"
                                    )}
                                  </Button>
                                </div>
                                <Textarea
                                  placeholder="Add review comment.."
                                  value={
                                    doc.rejectMessage?.comment
                                      ? doc.rejectMessage?.comment
                                      : reviewData[key]?.comment || ""
                                  }
                                  disabled={!!doc.rejectMessage?.status}
                                  onChange={(e) =>
                                    updateReviewData(
                                      key,
                                      "comment",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </motion.div>
                        )
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Family Background
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2 gap-5">
                    <div className="space-y-2 p-4">
                      <TitleReusable title="Father" description="" />
                      <div>
                        {fatherDetails.map((meow) => (
                          <motion.div
                            key={meow.label}
                            variants={itemVariants}
                            className="flex items-start gap-3 py-4  hover:bg-background transition-colors duration-100"
                          >
                            <meow.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {meow.label}
                              </p>
                              <p className=" font-medium text-sm">
                                {meow.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <TitleReusable title="Guardian" description="" />
                      <div className="grid grid-cols-2">
                        {guardianDetails.map((meow) => (
                          <motion.div
                            key={meow.label}
                            variants={itemVariants}
                            className={`flex items-start gap-3  py-5    hover:bg-background transition-colors duration-100 ${
                              meow.label === "Address" ? "col-span-2" : ""
                            }`}
                          >
                            <meow.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {meow.label}
                              </p>
                              <p className=" font-medium text-sm">
                                {meow.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <TitleReusable title="Mother" description="" />
                      <div>
                        {motherDetails.map((meow) => (
                          <motion.div
                            key={meow.label}
                            variants={itemVariants}
                            className="flex items-start gap-3 py-4  hover:bg-background transition-colors duration-100"
                          >
                            <meow.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {meow.label}
                              </p>
                              <p className=" font-medium text-sm">
                                {meow.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <TitleReusable title="Siblings" description="" />
                      <div className="flex-1"></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Scholarship Details
                  </AccordionTrigger>
                  <AccordionContent className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div className="space-y-3">
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <PhilippinePeso />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Amount
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data?.scholarship.scholarshipAmount}.00
                          </h1>
                        </div>
                      </div>
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Building />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Type
                          </p>
                          <h1 className="text-lg font-medium capitalize">
                            {data?.scholarship.scholarshipType}
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
                            {data?.scholarship?.scholarshipDeadline
                              ? format(
                                  new Date(
                                    data.scholarship.scholarshipDeadline
                                  ),
                                  "PPP"
                                )
                              : "No deadline"}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className=" p-4 space-y-2  rounded-md bg-card">
                      <div className="flex gap-3 items-center">
                        <StickyNote />
                        <p className="text-muted-foreground text-sm">
                          Scholarship Details
                        </p>
                      </div>

                      <h1>{data?.scholarship.scholarshipDescription}</h1>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Other Application
                  </AccordionTrigger>
                  <AccordionContent>1</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
              {data?.status === "PENDING" &&
                data.scholarship.interview === false && (
                  <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                    <DialogTrigger asChild>
                      {data?.userDocuments && (
                        <Button
                          className="flex-1 !bg-green-800"
                          variant="outline"
                          disabled={totalDocs !== reviewedDocs}
                        >
                          <UserRoundCheck /> Approve
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
                          Accept Application?
                        </DialogTitle>
                        <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                          This will accept the applicant and notify them of the
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
                          className="!bg-green-700 !hover:bg-blue-600"
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
                )}
              {data?.status === "PENDING" &&
                data.scholarship.interview === true && (
                  <Dialog open={openInterview} onOpenChange={setOpenInterview}>
                    <DialogTrigger asChild>
                      {data?.userDocuments && (
                        <Button
                          className="flex-1 !bg-green-800"
                          variant="outline"
                          disabled={totalDocs !== reviewedDocs}
                        >
                          <UserRoundCheck /> Approve (For Interview)
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
                          Accept Application?
                        </DialogTitle>
                        <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                          This will accept the applicant and notify them of the
                          decision. This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setOpenInterview(false)}
                          disabled={loadingInterview}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="!bg-green-700 !hover:bg-blue-600"
                          variant="outline"
                          onClick={handleInterview}
                          disabled={loadingInterview}
                        >
                          {loadingInterview ? (
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
                )}

              <Dialog open={openReject} onOpenChange={setOpenReject}>
                <DialogTrigger asChild>
                  {data?.userDocuments && (
                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={
                        data?.status === "APPROVED" ||
                        data?.status === "DECLINED" ||
                        totalDocs !== reviewedDocs
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
                variant="secondary"
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

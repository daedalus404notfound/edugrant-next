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
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useClientApplications from "@/hooks/user/getApplications";
import GlassFolder from "@/components/ui/folder";

import ApplicationViewer from "./viewer";
import { Badge } from "@/components/ui/badge";
const mimeToLabelMap: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "image/jpeg": "JPG",
  "image/png": "PNG",
};
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import TitleReusable from "@/components/ui/title";
import {
  ArrowRight,
  ArrowRightIcon,
  Building,
  Calendar,
  Check,
  CheckCircle,
  CircleAlert,
  CircleCheck,
  CircleCheckIcon,
  CircleX,
  Clock,
  Download,
  Edit,
  Eye,
  GraduationCap,
  Inbox,
  Info,
  Link,
  Maximize,
  MoreHorizontal,
  MoreVertical,
  Pen,
  PhilippinePeso,
  StickyNote,
  TableOfContents,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Doc } from "zod/v4/core";
import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";

export default function InterceptManageApplicationClient() {
  const [activeSection, setActiveSection] = useState("documents");
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const id = params.id as string;
  const isMobile = useIsMobile();
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
  const { data, loading } = useClientApplications({
    applicationId: id,
    userId: userId?.toString(),
  });
  const navigationTabs = [
    { id: "documents", label: "Documents", indicator: null },

    { id: "scholarship", label: "Scholarship Details", indicator: null },
  ];

  console.log(data[0]);
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="lg:w-[56%] w-[98%] mx-auto max-lg:h-[95dvh] max-h-[90dvh] outline-0 border-0 lg:p-1">
        <DrawerHeader className="p-0">
          <div className="sr-only">
            <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </div>
          {data[0]?.status === "DECLINED" && (
            <div className="relative z-20 dark bg-red-800 text-foreground px-4 py-3">
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div className="flex grow gap-3">
                  <CircleX
                    className="mt-0.5 shrink-0 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
                    <p className="text-sm">
                      Your <strong>{data[0].Scholarship.title}</strong>{" "}
                      application has been
                      <strong> Rejected</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {data[0]?.status === "BLOCKED" && (
            <div className=" px-4 py-3 text-white bg-amber-700 dark:bg-amber-800">
              <p className="lg:text-sm text-xs">
                <TriangleAlert
                  className="lg:me-3 me-1 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Your {data[0].Scholarship.title} application was blocked because
                you already have an approved
                <strong> government </strong>
                scholarship.
              </p>
            </div>
          )}
          {data[0]?.status === "APPROVED" && (
            <div className=" flex gap-2 items-center px-4 py-3 bg-green-700">
              <CheckCircle
                className="lg:me-3 me-1 -mt-0.5 inline-flex opacity-60"
                size={16}
                aria-hidden="true"
              />
              <p className="lg:text-sm text-xs">
                Your <strong>{data[0].Scholarship.title}</strong> application
                has been
                <strong> approved</strong>.
              </p>
            </div>
          )}
          {data[0]?.status === "REVIEWED" && (
            <div className="px-4 py-3 bg-blue-800">
              <p className="lg:text-sm text-xs">
                <CheckCircle
                  className="lg:me-3 me-1 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Your <strong>{data[0].Scholarship.title}</strong> documents have
                been <strong>reviewed</strong> and are awaiting final checking.
              </p>
            </div>
          )}
        </DrawerHeader>
        {loading ? (
          <>loading</>
        ) : (
          <div className="flex-1 flex flex-col bg-background overflow-auto ">
            <div className="p-4">
              <TitleReusable
                title={data[0]?.Scholarship.title}
                description={
                  data[0]?.Scholarship.Scholarship_Provider?.name
                    ? data[0]?.Scholarship.Scholarship_Provider?.name
                    : ""
                }
              />
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="p-4  bg-card/70 backdrop-blur-sm sticky top-0">
              <Tabs
                tabs={navigationTabs}
                onTabChange={(tabId) => setActiveSection(tabId)}
              />
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            {activeSection === "documents" && (
              <div className="flex-1 space-y-1 p-4">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-5 ">
                    <p>
                      <span className="text-sm text-muted-foreground">
                        Required
                      </span>{" "}
                      &nbsp;
                      <span className="text-lg font-medium font-mono">
                        {data[0]?.Scholarship.documents.documents &&
                          Object.entries(
                            data[0]?.Scholarship.documents.documents
                          ).filter(
                            ([_, doc]) => doc?.requirementType === "required"
                          ).length}
                      </span>
                    </p>
                    <span className="text-primary/50">|</span>
                    <p>
                      <span className="text-sm text-muted-foreground">
                        Optional
                      </span>{" "}
                      &nbsp;
                      <span className="text-lg font-medium font-mono">
                        {data[0]?.Scholarship.documents.documents &&
                          Object.entries(
                            data[0]?.Scholarship.documents.documents
                          ).filter(
                            ([key, doc]) => doc?.requirementType === "optional"
                          ).length}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="grid  lg:grid-cols-1 grid-cols-1 divide-y">
                  {data?.[0]?.submittedDocuments.documents &&
                    Object.entries(data[0].submittedDocuments.documents).map(
                      ([key, doc]) => (
                        <div key={key} className="lg:py-10 py-8 space-y-2">
                          <div className="flex lg:gap-5 gap-3">
                            <ApplicationViewer
                              fileFormat={mimeToLabelMap[doc.fileFormat]}
                              resourceType={doc.resourceType}
                              fileUrl={doc.fileUrl}
                              document={doc.document}
                              supabasePath={doc.supabasePath}
                              requirementType={doc.requirementType}
                            />
                            <div className="flex-1 flex flex-col lg:justify-end justify-between gap-5 relative">
                              <div>
                                {!isMobile && (
                                  <div className="flex gap-3 capitalize">
                                    <p className="font-medium lg:text-base text-sm">
                                      {key}
                                    </p>
                                    <Badge
                                      variant="outline"
                                      className="hidden lg:block"
                                    >
                                      {doc.requirementType}
                                    </Badge>
                                  </div>
                                )}
                                <p className="uppercase lg:text-sm text-xs text-muted-foreground lg:mt-1">
                                  {doc.fileFormat}
                                </p>
                              </div>

                              {doc.rejectMessage?.status === "REJECTED" &&
                                !isMobile && (
                                  <div className="rounded-md px-4 py-3 bg-card">
                                    <p className="text-sm line-clamp-1">
                                      <TriangleAlert
                                        className="me-3 -mt-0.5 inline-flex text-red-500"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                      {doc.rejectMessage?.comment ||
                                        "Document has been rejected"}
                                    </p>
                                  </div>
                                )}
                              {data[0]?.status === "PENDING" && !isMobile && (
                                <div className="rounded-md px-4 py-3 bg-card">
                                  <p className="text-sm line-clamp-1">
                                    <Clock
                                      className="me-3 -mt-0.5 inline-flex text-yellow-500"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                    Your document is awaiting verification.
                                  </p>
                                </div>
                              )}

                              {doc.rejectMessage?.status === "APPROVED" &&
                                !isMobile && (
                                  <div className=" rounded-md border px-4 py-3 bg-card">
                                    <p className="text-sm">
                                      <CircleCheckIcon
                                        className="me-3 -mt-0.5 inline-flex text-emerald-500"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                      Document has been approved
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>
                          {isMobile && (
                            <div className="flex gap- justify-between items-center capitalize">
                              <p className="font-medium lg:text-base text-sm">
                                {key}
                              </p>
                              <Badge variant="outline" className="">
                                {doc.requirementType}
                              </Badge>
                            </div>
                          )}
                          {doc.rejectMessage?.status === "REJECTED" &&
                            isMobile && (
                              <div className="rounded-md px-4 py-3 bg-card">
                                <p className="text-sm line-clamp-1">
                                  <TriangleAlert
                                    className="me-3 -mt-0.5 inline-flex text-red-500"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                  {doc.rejectMessage?.comment ||
                                    "Document has been rejected"}
                                </p>
                              </div>
                            )}
                          {data[0]?.status === "PENDING" && isMobile && (
                            <div className="rounded-md px-4 py-3 bg-card">
                              <p className="text-sm line-clamp-1">
                                <Clock
                                  className="me-3 -mt-0.5 inline-flex text-yellow-500"
                                  size={16}
                                  aria-hidden="true"
                                />
                                Your document is awaiting verification.
                              </p>
                            </div>
                          )}

                          {doc.rejectMessage?.status === "APPROVED" &&
                            isMobile && (
                              <div className=" rounded-md  px-4 py-3 bg-card">
                                <p className="text-sm">
                                  <CircleCheckIcon
                                    className="me-3 -mt-0.5 inline-flex text-emerald-500"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                  Document has been approved
                                </p>
                              </div>
                            )}
                        </div>
                      )
                    )}
                </div>
              </div>
            )}
            {activeSection === "scholarship" && (
              <div className="flex-1 p-4 space-y-8">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">About</p>
                  <p>{data[0]?.Scholarship.description}</p>
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3 items-center">
                    <h1 className="font-medium">Scholarship Details</h1>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    {data[0]?.Scholarship.amount && (
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <PhilippinePeso />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Amount
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data[0]?.Scholarship.amount}.00
                          </h1>
                        </div>
                      </div>
                    )}
                    {data[0]?.Scholarship.limit && (
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Inbox />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Limit
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data[0]?.Scholarship.limit}
                          </h1>
                        </div>
                      </div>
                    )}
                    {data[0]?.Scholarship.requiredGWA && (
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Inbox />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Required GWA
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data[0]?.Scholarship.requiredGWA}
                          </h1>
                        </div>
                      </div>
                    )}
                    {data[0]?.Scholarship.requiredGWA && (
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Inbox />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Required GWA
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data[0]?.Scholarship.requiredGWA}
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
                          {data[0]?.Scholarship.type}
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
                          {data[0]?.Scholarship.deadline
                            ? format(
                                new Date(data[0]?.Scholarship.deadline),
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
                            Object.keys(data[0]?.Scholarship.documents || {})
                              .length
                          }
                        </p>
                      </div>

                      <div className=" divide-y">
                        {Object.values(
                          data[0]?.Scholarship.documents.documents || {}
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
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 p-4">
          <Button className="flex-1">Edit Documents</Button>
          <Button className="flex-1">Close</Button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="lg:w-[56%] w-full">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DrawerContent>
    </Drawer>
  );
}

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
import EditApplication from "./edi-application";
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

export default function InterceptManageApplicationClient() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const id = params.id as string;
  const isMobile = useIsMobile();

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
    userId: "2",
  });
  const items = [
    {
      id: 1,
      date: data[0]?.applicationDate,
      title: "Submitted",
      description:
        "Your scholarship application has been successfully submitted.",
    },
    {
      id: 2,
      date: data[0]?.applicationDate,
      title: "Pending",
      description: "Your document is awaiting verification.",
    },
    {
      id: 3,
      date: data[0]?.applicationResponseDate,
      title: "Under Review",
      description: "Your application is currently under review by the OSAS.",
    },
    {
      id: 4,
      date: data[0]?.applicationResponseDate,
      title: "Final Decision",
      description:
        data[0]?.status === "APPROVED"
          ? "✅ Congratulations! Your scholarship application has been approved."
          : data[0]?.status === "DECLINED"
          ? "❌ Unfortunately, your scholarship application was declined."
          : data[0]?.status === "BLOCKED"
          ? "⚠️ Your scholarship application was blocked because you already have an approved government scholarship."
          : "A final decision has been made regarding your scholarship application.",
    },
  ];

  console.log(data[0]);
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="lg:w-[56%] w-[98%] mx-auto lg:h-[95dvh] h-[90dvh] outline-0 border-0 lg:p-1">
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
                      Your{" "}
                      <strong>{data[0].scholarship.scholarshipTitle}</strong>{" "}
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
                Your {data[0].scholarship.scholarshipTitle} application was
                blocked because you already have an approved
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
                Your <strong>{data[0].scholarship.scholarshipTitle}</strong>{" "}
                application has been
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
                Your <strong>{data[0].scholarship.scholarshipTitle}</strong>{" "}
                documents have been <strong>reviewed</strong> and are awaiting
                final checking.
              </p>
            </div>
          )}
        </DrawerHeader>
        {loading ? (
          <>loading</>
        ) : (
          <div className="flex-1 flex flex-col bg-background overflow-auto ">
            <div className="flex-1 space-y-1 ">
              <div className="relative flex justify-center items-center ">
                <div className="absolute inset-0border-b-2 border-black bg-card" />
                <div className="absolute left-2 -bottom-15 z-10 lg:px-8  px-2 flex  items-center ">
                  <Avatar className="lg:size-25 size-20 border-background border-2 shadow-md">
                    <AvatarImage
                      className="object-cover"
                      src={data[0]?.scholarship.scholarshipLogo}
                    />
                    <AvatarFallback>
                      {data[0]?.scholarship.scholarshipProvider.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {data[0].scholarship.scholarshipCover && (
                  <img
                    className="w-full lg:aspect-[16/4] aspect-[16/9]  object-cover   rounded-lg shadow-md"
                    src={data[0].scholarship.scholarshipCover}
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
                  <DialogContent className="lg:w-3/4 w-full p-4">
                    <img
                      className="h-full w-full"
                      src={data[0]?.scholarship.scholarshipCover}
                      alt=""
                    />
                    <Link
                      className="w-full"
                      href={
                        (data[0]?.scholarship.scholarshipCover &&
                          data[0]?.scholarship.scholarshipCover) ||
                        ""
                      }
                      target="_blank"
                    >
                      <Button variant="secondary" className="w-full">
                        <Download />
                        Download
                      </Button>
                    </Link>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="lg:p-4 p-2 mt-15">
                <div className="lg:space-y-1">
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
                    {data[0]?.scholarship.scholarshipTitle}
                  </motion.span>
                  <p className="text-muted-foreground text-sm">
                    by {data[0]?.scholarship.scholarshipProvider}
                  </p>
                </div>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">
                      Submitted Documents
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-5 ">
                          <p>
                            <span className="text-sm text-muted-foreground">
                              Required
                            </span>{" "}
                            &nbsp;
                            <span className="text-lg font-medium font-mono">
                              {data[0]?.scholarship.scholarshipDocuments
                                .documents &&
                                Object.entries(
                                  data[0]?.scholarship.scholarshipDocuments
                                    .documents
                                ).filter(
                                  ([_, doc]) =>
                                    doc?.requirementType === "required"
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
                              {data[0]?.scholarship.scholarshipDocuments
                                .documents &&
                                Object.entries(
                                  data[0]?.scholarship.scholarshipDocuments
                                    .documents
                                ).filter(
                                  ([key, doc]) =>
                                    doc?.requirementType === "optional"
                                ).length}
                            </span>
                          </p>
                        </div>
                        {/* <div className="lg:hidden">
                        {data[0]?.scholarship.scholarshipDocuments &&
                          Object.entries(
                            data[0]?.scholarship.scholarshipDocuments
                          ).map(([_, doc]) => doc?.requirementType).length}{" "}
                        /
                        {data[0]?.userDocuments &&
                          Object.entries(data[0]?.userDocuments).map(
                            ([_, doc]) => doc?.requirementType
                          ).length}
                      </div> */}
                      </div>
                      <div className="grid  lg:grid-cols-1 grid-cols-1 divide-y">
                        {data?.[0]?.userDocuments &&
                          Object.entries(data[0].userDocuments).map(
                            ([key, doc]) => (
                              <div
                                key={key}
                                className="lg:py-10 py-8 space-y-2"
                              >
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
                                    <DropdownMenu>
                                      <DropdownMenuTrigger className="absolute top-0 right-0">
                                        <MoreVertical size={20} />
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className="line-clamp-1">
                                          {doc.document}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <Eye />
                                          View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => setOpenDialog(true)}
                                          disabled={
                                            doc.rejectMessage?.status ===
                                              "APPROVED" ||
                                            doc.rejectMessage?.status ===
                                              "REJECTED"
                                          }
                                        >
                                          <Edit />
                                          Change
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <TableOfContents />
                                          Details
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
                                    {data[0]?.status === "PENDING" &&
                                      !isMobile && (
                                        <div className="rounded-md px-4 py-3 bg-card">
                                          <p className="text-sm line-clamp-1">
                                            <Clock
                                              className="me-3 -mt-0.5 inline-flex text-yellow-500"
                                              size={16}
                                              aria-hidden="true"
                                            />
                                            Your document is awaiting
                                            verification.
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">
                      Application Timeline
                    </AccordionTrigger>
                    <AccordionContent className="py-5">
                      <Timeline
                        value={
                          data[0]?.status === "PENDING"
                            ? 2
                            : data[0]?.status === "REVIEWED"
                            ? 3
                            : ["APPROVED", "DECLINED", "BLOCKED"].includes(
                                data[0]?.status
                              )
                            ? 4
                            : 1
                        }
                      >
                        {items.map((item) => (
                          <TimelineItem
                            key={item.id}
                            step={item.id}
                            className="group-data-[orientation=vertical]/timeline:sm:ms-28 "
                          >
                            <TimelineHeader>
                              <TimelineSeparator />
                              <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                                {item.date && format(item.date, "PP")}
                              </TimelineDate>
                              <TimelineTitle className="sm:-mt-0.5">
                                {item.title}
                              </TimelineTitle>
                              <TimelineIndicator />
                            </TimelineHeader>
                            <TimelineContent className="text-foreground mt-2 rounded-lg px-4 py-3 bg-card">
                              {item.description}
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">
                      {data[0]?.scholarship.scholarshipTitle} Details
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
                              {data[0]?.scholarship.scholarshipAmount}.00
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
                              {data[0]?.scholarship.scholarshipType}
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
                              {data[0]?.scholarship?.scholarshipDeadline
                                ? format(
                                    new Date(
                                      data[0].scholarship.scholarshipDeadline
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

                        <h1>{data[0]?.scholarship.scholarshipDescription}</h1>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* {data[0]?.status === "DECLINED" && (
              <div className="bg-background/70 backdrop-blur-sm space-y-3  sticky bottom-0 lg:p-4 p-2 border-t z-50 ">
                <div className="flex gap-3">
                  {" "}
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setEdit(true)}
                  >
                    Re-Apply {data[0].scholarship.scholarshipTitle}{" "}
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        )}
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

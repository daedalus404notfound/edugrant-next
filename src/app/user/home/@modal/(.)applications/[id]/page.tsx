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
  Building,
  Calendar,
  Check,
  CircleCheck,
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

const steps = [
  {
    step: 1,
    title: "Submitted",
    description: "Jan 1st, 2025",
  },
  {
    step: 2,
    title: "Reviewed",
    description: "Jan 1st, 2025",
  },
  {
    step: 3,
    title: "Decision",
    description: "Jan 1st, 2025",
  },
];

export default function InterceptManageApplicationClient() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(false);
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

  console.log(data[0]);
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="lg:w-[56%] w-[98%] mx-auto lg:h-[95dvh] h-[90dvh] outline-0 border-0 lg:p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {edit ? (
          <EditApplication data={data[0]} setEdit={setEdit} />
        ) : (
          <div className="flex-1 flex flex-col bg-background rounded-t-lg overflow-auto no-scrollbar">
            {/* <div className="relative flex justify-center items-center ">
              <div className="absolute inset-0border-b-2 border-black bg-card" />
              <div className="absolute left-2 -bottom-3 z-10 lg:px-8  px-2 flex  items-center ">
                <Avatar className="lg:size-25 size-20">
                  <AvatarImage
                    className="object-cover"
                    src={data[0]?.scholarship.scholarshipLogo}
                  />
                  <AvatarFallback>
                    {data[0]?.scholarship.scholarshipProvider.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              {data[0]?.scholarship.scholarshipCover && (
                <img
                  className="w-full lg:aspect-[16/3.5] aspect-[16/7]  object-cover   rounded-t-md mask-gradient"
                  src={data[0]?.scholarship.scholarshipCover}
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
            </div> */}
            <div className="lg:p-8 p-2 lg:space-y-8 space-y-5">
              <div className="">
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                             flex items-center gap-1.5 lg:text-3xl text-xl font-semibold tracking-tight
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
              <div className=" space-y-10">
                <div className="">
                  <Stepper
                    defaultValue={2}
                    className="flex-col md:flex-row hidden lg:flex"
                  >
                    {steps.map(({ step, title, description }) => (
                      <StepperItem
                        key={step}
                        step={step}
                        className="not-last:flex-1 max-md:items-start"
                      >
                        <StepperTrigger className="gap-4 rounded max-md:flex-col">
                          <StepperIndicator />
                          <div className="text-center md:-order-1 md:text-left">
                            <StepperTitle>{title}</StepperTitle>
                            <StepperDescription className="max-sm:hidden">
                              {description}
                            </StepperDescription>
                          </div>
                        </StepperTrigger>
                        {step < steps.length && (
                          <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                        )}
                      </StepperItem>
                    ))}
                  </Stepper>
                  <Stepper
                    defaultValue={2}
                    orientation="vertical"
                    className="lg:hidden"
                  >
                    {steps.map(({ step, title, description }) => (
                      <StepperItem
                        key={step}
                        step={step}
                        className="relative items-start not-last:flex-1"
                      >
                        <StepperTrigger className="items-start rounded pb-12 last:pb-0">
                          <StepperIndicator />
                          <div className="mt-0.5 space-y-0.5 px-2 text-left">
                            <StepperTitle>{title}</StepperTitle>
                            <StepperDescription>
                              {description}
                            </StepperDescription>
                          </div>
                        </StepperTrigger>
                        {step < steps.length && (
                          <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
                        )}
                      </StepperItem>
                    ))}
                  </Stepper>
                </div>
                <div>
                  <div className="flex justify-between items-center py-4">
                    <h1>Submitted Documents</h1>
                    <div className="lg:flex items-center gap-5 hidden">
                      <p>
                        <span className="text-sm text-muted-foreground">
                          Required
                        </span>{" "}
                        &nbsp;
                        {data[0]?.scholarship.scholarshipDocuments &&
                          Object.entries(
                            data[0]?.scholarship.scholarshipDocuments
                          ).filter(
                            ([_, doc]) => doc?.requirementType === "required"
                          ).length}
                      </p>
                      <span className="text-primary/50">|</span>
                      <p>
                        <span className="text-sm text-muted-foreground">
                          Optional
                        </span>{" "}
                        &nbsp;
                        {data[0]?.scholarship.scholarshipDocuments &&
                          Object.entries(
                            data[0]?.scholarship.scholarshipDocuments
                          ).filter(
                            ([key, doc]) => doc?.requirementType === "optional"
                          ).length}
                      </p>
                    </div>
                    <div className="lg:hidden">
                      {data[0]?.scholarship.scholarshipDocuments &&
                        Object.entries(
                          data[0]?.scholarship.scholarshipDocuments
                        ).map(([_, doc]) => doc?.requirementType).length}{" "}
                      /
                      {data[0]?.userDocuments &&
                        Object.entries(data[0]?.userDocuments).map(
                          ([_, doc]) => doc?.requirementType
                        ).length}
                    </div>
                  </div>

                  <div className="grid  lg:grid-cols-2 grid-cols-1  gap-8">
                    {data?.[0]?.userDocuments &&
                      Object.entries(data[0].userDocuments).map(
                        ([key, doc]) => (
                          <div key={key} className="space-y-3 py-4">
                            <div className="flex gap-5">
                              <ApplicationViewer
                                fileFormat={mimeToLabelMap[doc.fileFormat]}
                                resourceType={doc.resourceType}
                                fileUrl={doc.fileUrl}
                                document={doc.document}
                                supabasePath={doc.supabasePath}
                                requirementType={doc.requirementType}
                              />
                              <div className="flex-1 flex justify-between items-start ">
                                <div className=" flex-col flex flex-1">
                                  <p className=" lg:text-base text-sm">{key}</p>
                                  {doc.rejectMessage?.status &&
                                  doc.rejectMessage?.status === "APPROVED" ? (
                                    <Badge className="bg-green-800 text-gray-200">
                                      Approved
                                    </Badge>
                                  ) : doc.rejectMessage?.status ===
                                    "REJECTED" ? (
                                    <Badge className="bg-red-800 text-gray-200">
                                      Rejected
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical />
                                    </Button>
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
                                        doc.rejectMessage?.status === "REJECTED"
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
                              </div>
                            </div>
                            {doc.rejectMessage?.comment && (
                              <Textarea
                                className="pointer-events-none"
                                defaultValue={doc.rejectMessage?.comment}
                              />
                            )}
                          </div>
                          // <div
                          //   key={key}
                          //   className=" flex justify-center items-center pt-6 gap-5 p-4 rounded-lg "
                          // >
                          //   <div className="flex flex-col gap-3">
                          //     <ApplicationViewer
                          //       fileFormat={mimeToLabelMap[doc.fileFormat]}
                          //       resourceType={doc.resourceType}
                          //       fileUrl={doc.fileUrl}
                          //       document={doc.document}
                          //       supabasePath={doc.supabasePath}
                          //       requirementType={doc.requirementType}
                          //     />
                          //     <Button variant="outline">Change</Button>
                          //   </div>

                          //   <div className="flex flex-1 gap-2 flex-col  w-full lg:w-[unset]">
                          //     <p
                          //       className={`font-semibold text-sm ${
                          //         doc.rejectMessage.status === "REJECTED"
                          //           ? "text-red-500"
                          //           : doc.rejectMessage.status === "APPROVED"
                          //           ? "text-green-500"
                          //           : ""
                          //       }`}
                          //     >
                          //       {key}
                          //     </p>
                          //     <Badge variant="secondary" className="uppercase">
                          //       {doc.fileFormat}
                          //     </Badge>
                          //   </div>
                          // </div>
                        )
                      )}
                  </div>
                </div>
                <div>
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-base">
                        {data[0]?.scholarship.scholarshipTitle} Details
                      </AccordionTrigger>
                      <AccordionContent className="grid grid-cols-2 gap-3">
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <GraduationCap />
                          <div>
                            <p className="text-muted-foreground">
                              Scholarship Title
                            </p>
                            <h1 className="font-medium">
                              {data[0]?.scholarship.scholarshipTitle}
                            </h1>
                          </div>
                        </div>
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <UserRound />
                          <div>
                            <p className="text-muted-foreground">
                              Scholarship Sponsor
                            </p>
                            <h1 className="">
                              {data[0]?.scholarship.scholarshipProvider}
                            </h1>
                          </div>
                        </div>
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <PhilippinePeso />
                          <div>
                            <p className="text-muted-foreground">
                              Scholarship Amount
                            </p>
                            <h1 className="">
                              {data[0]?.scholarship.scholarshipAmount}
                            </h1>
                          </div>
                        </div>
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <Building />
                          <div>
                            <p className="text-muted-foreground">
                              Scholarship Type
                            </p>
                            <h1 className=" capitalize">
                              {data[0]?.scholarship.scholarshipType}
                            </h1>
                          </div>
                        </div>
                        <div className=" p-4 space-y-2 col-span-2 rounded-md ">
                          <div className="flex gap-3 items-center">
                            <StickyNote />
                            <p className="text-muted-foreground ">
                              Scholarship Details
                            </p>
                          </div>

                          <h1>{data[0]?.scholarship.scholarshipDescription}</h1>
                        </div>
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <Calendar />
                          <div>
                            <p className="text-muted-foreground">
                              Scholarship Deadline
                            </p>
                            <h1 className="">
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
                        <div className=" p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                          <UserRound />
                          <div>
                            {" "}
                            <p className="text-muted-foreground">
                              Scholarship Title
                            </p>
                            <h1 className="">
                              {data[0]?.scholarship.scholarshipTitle}
                            </h1>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">
                      Applicant Details
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}
                </div>
              </div>
            </div>

            {data[0]?.status === "DECLINED" && (
              <div className="bg-background/70 backdrop-blur-sm space-y-3  sticky bottom-0 p-4 border-t z-50 ">
                <div className="flex gap-3">
                  {" "}
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setEdit(true)}
                  >
                    Re-apply
                  </Button>
                </div>
              </div>
            )}
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

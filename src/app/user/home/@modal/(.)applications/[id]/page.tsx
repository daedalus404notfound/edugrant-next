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
  CircleAlert,
  CircleCheck,
  CircleCheckIcon,
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
            <div className="lg:p-4 p-2 lg:space-y-8 space-y-5">
              {data[0]?.status === "DECLINED" && (
                <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                  <p className="text-sm">
                    <CircleAlert
                      className="me-3 -mt-0.5 inline-flex opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Some documents were rejected. Please review the feedback
                    below and resubmit the required documents to continue your
                    application.
                  </p>
                </div>
              )}
              {/* <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
                <p className="text-sm">
                  <CircleCheckIcon
                    className="me-3 -mt-0.5 inline-flex opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Completed successfully!
                </p>
              </div> */}

              {/* <TitleReusable
                title={data[0]?.scholarship.scholarshipTitle}
                description={data[0]?.scholarship.scholarshipProvider}
                Icon={GraduationCap}
              /> */}
              <div className=" space-y-10">
                <Accordion type="single" collapsible defaultValue="item-1">
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
                            <p className="text-muted-foreground"text-sm>
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
                            <p className="text-muted-foreground"text-sm>
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
                {/* <div className="">
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
                </div> */}
                <div>
                  <div className="flex justify-between items-center py-4">
                    <h1 className="text-sm">Submitted Documents</h1>
                    <div className="lg:flex items-center gap-5 hidden">
                      <p>
                        <span className="text-sm text-muted-foreground">
                          Required
                        </span>{" "}
                        &nbsp;
                        <span className="text-lg font-medium font-mono">
                          {data[0]?.scholarship.scholarshipDocuments &&
                            Object.entries(
                              data[0]?.scholarship.scholarshipDocuments
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
                          {data[0]?.scholarship.scholarshipDocuments &&
                            Object.entries(
                              data[0]?.scholarship.scholarshipDocuments
                            ).filter(
                              ([key, doc]) =>
                                doc?.requirementType === "optional"
                            ).length}
                        </span>
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

                  <div className="grid  lg:grid-cols-1 grid-cols-1 divide-y">
                    {data?.[0]?.userDocuments &&
                      Object.entries(data[0].userDocuments).map(
                        ([key, doc]) => (
                          <div key={key} className="flex  gap-5 lg:py-8 py-4 ">
                            <ApplicationViewer
                              fileFormat={mimeToLabelMap[doc.fileFormat]}
                              resourceType={doc.resourceType}
                              fileUrl={doc.fileUrl}
                              document={doc.document}
                              supabasePath={doc.supabasePath}
                              requirementType={doc.requirementType}
                            />
                            <div className="flex-1 flex flex-col justify-end gap-5 relative">
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  className="absolute top-0 right-0"
                                >
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
                              <div>
                                <div className="flex gap-3 capitalize">
                                  <p className="font-medium ">{key}</p>
                                  <Badge variant="outline">
                                    {doc.requirementType}
                                  </Badge>
                                </div>
                                <p className="uppercase text-sm text-muted-foreground mt-1">
                                  {doc.fileFormat}
                                </p>
                              </div>

                              {doc.rejectMessage?.status === "REJECTED" && (
                                <div className="rounded-md border px-4 py-3">
                                  <p className="text-sm line-clamp-1">
                                    <TriangleAlert
                                      className="me-3 -mt-0.5 inline-flex text-amber-500"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                    {doc.rejectMessage?.comment ||
                                      "Document has been rejected"}
                                  </p>
                                </div>
                              )}

                              {doc.rejectMessage?.status === "APPROVED" && (
                                <div className="border-eborder rounded-md border px-4 py-3">
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
                          // <div className="flex-1 flex justify-between items-start ">
                          //         <div className="  flex justify-between  w-full">
                          //           {doc.rejectMessage?.status &&
                          //           doc.rejectMessage?.status === "APPROVED" ? (
                          //             <Badge className="bg-green-700/10 text-green-600 uppercase">
                          //               Approved
                          //             </Badge>
                          //           ) : doc.rejectMessage?.status === "REJECTED" ? (
                          //             <Badge className="bg-red-700/10 text-red-600 uppercase">
                          //               Rejected
                          //             </Badge>
                          //           ) : (
                          //             ""
                          //           )}
                          //           <DropdownMenu>
                          //             <DropdownMenuTrigger asChild>
                          //               <Button variant="ghost" size="sm">
                          //                 <MoreVertical />
                          //               </Button>
                          //             </DropdownMenuTrigger>
                          //             <DropdownMenuContent align="end">
                          //               <DropdownMenuLabel className="line-clamp-1">
                          //                 {doc.document}
                          //               </DropdownMenuLabel>
                          //               <DropdownMenuSeparator />
                          //               <DropdownMenuItem>
                          //                 <Eye />
                          //                 View
                          //               </DropdownMenuItem>
                          //               <DropdownMenuItem
                          //                 onClick={() => setOpenDialog(true)}
                          //                 disabled={
                          //                   doc.rejectMessage?.status ===
                          //                     "APPROVED" ||
                          //                   doc.rejectMessage?.status === "REJECTED"
                          //                 }
                          //               >
                          //                 <Edit />
                          //                 Change
                          //               </DropdownMenuItem>
                          //               <DropdownMenuItem>
                          //                 <TableOfContents />
                          //                 Details
                          //               </DropdownMenuItem>
                          //             </DropdownMenuContent>
                          //           </DropdownMenu>
                          //         </div>
                          //       </div>
                          //       <div className=" flex justify-center items-center relative">
                          //         <ApplicationViewer
                          //           fileFormat={mimeToLabelMap[doc.fileFormat]}
                          //           resourceType={doc.resourceType}
                          //           fileUrl={doc.fileUrl}
                          //           document={doc.document}
                          //           supabasePath={doc.supabasePath}
                          //           requirementType={doc.requirementType}
                          //         />
                          //       </div>

                          //       <p className=" lg:text-base text-sm text-center">
                          //         {key}
                          //       </p>

                          //       {doc.rejectMessage?.comment && (
                          //         <div className="rounded-md border px-4 py-3">
                          //           <p className="text-sm">
                          //             <TriangleAlert
                          //               className="me-3 -mt-0.5 inline-flex text-amber-500"
                          //               size={16}
                          //               aria-hidden="true"
                          //             />
                          //             {doc.rejectMessage?.comment}
                          //           </p>
                          //         </div>
                          //       )}
                        )
                      )}
                  </div>
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

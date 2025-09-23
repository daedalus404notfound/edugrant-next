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
  Ban,
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
import DocsStudent from "./docs";
import ScholarDetails from "./scholarship";
import EditApplication from "./edi-application";
import { Skeleton } from "@/components/ui/skeleton";

export default function InterceptManageApplicationClient() {
  const [activeSection, setActiveSection] = useState("documents");
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
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
    { id: "documents", label: "Submitted Documents", indicator: null },

    { id: "scholarship", label: "Scholarship Details", indicator: null },
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] w-[98%] mx-auto outline-0 border-0 lg:p-1 bg-background ${
          loading ? " lg:h-[75dvh] h-[68dvh]" : " lg:h-[95dvh] h-[90dvh]"
        }`}
      >
        <DrawerHeader className="p-0">
          <div className="sr-only">
            <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
              variant="ghost"
              size="sm"
            >
              <GraduationCap />
              Application Details
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="ghost"
              variant="ghost"
              size="sm"
              onClick={() => HandleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="h-full w-full">
            <Skeleton className="flex-1 lg:aspect-[16/5] aspect-[16/9] w-full" />
            <div className="lg:space-y-15 space-y-10 lg:px-6 px-2 mt-5">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <div className="space-y-3">
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="flex-1 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        ) : edit ? (
          <EditApplication data={data[0]} setEdit={setEdit} />
        ) : (
          <>
            <div className=" flex-1 flex flex-col bg-background overflow-auto rounded-t-lg space-y-2 no-scrollbar">
              <div className="relative">
                <div className="absolute top-0 left-0 lg:h-70 h-60 w-full opacity-30   mask-gradient flex">
                  <img
                    className="w-full h-full object-cover blur-md "
                    src={data[0]?.Scholarship.cover}
                    alt=""
                  />
                </div>
                <div className="relative flex justify-center items-center ">
                  <div className="absolute inset-0border-b-2 border-black bg-card" />
                  <div className="absolute left-2 -bottom-18 z-10 lg:px-6  px-2 flex  items-end gap-3 ">
                    <Avatar className="lg:size-30 size-20 border-background border-2 shadow-md">
                      <AvatarImage
                        className="object-cover"
                        src={data[0]?.Scholarship.logo}
                      />
                      <AvatarFallback>
                        {data[0]?.Scholarship.Scholarship_Provider?.name.slice(
                          0,
                          2
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
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
                        {data[0]?.Scholarship.title}
                        {data[0]?.Scholarship.deadline &&
                        new Date(data[0].Scholarship.deadline).getTime() <
                          Date.now() ? (
                          <Badge className="bg-red-800 text-gray-200 tracking-wide">
                            EXPIRED
                          </Badge>
                        ) : (
                          <Badge className="bg-green-800 text-gray-200 tracking-wide">
                            ACTIVE
                          </Badge>
                        )}
                        {data[0]?.Scholarship.renew === true && (
                          <Badge className="bg-blue-800 text-gray-200 tracking-wide">
                            RENEWAL
                          </Badge>
                        )}
                      </motion.span>
                      <p className="text-muted-foreground text-sm">
                        by {data[0]?.Scholarship.Scholarship_Provider?.name}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-sm text-muted-foreground absolute right-2 -bottom-18 z-10 lg:px-6  px-2 ">
                    Posted on {""}
                    {data[0]?.Scholarship.dateCreated &&
                      format(data[0]?.Scholarship.dateCreated, "PPP")}
                  </p>
                  {data[0]?.Scholarship.cover && (
                    <img
                      className="w-full lg:aspect-[16/3] aspect-[16/9]  object-cover   rounded-lg shadow-md"
                      src={data[0]?.Scholarship.cover}
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
                        src={data[0]?.Scholarship.cover}
                        alt=""
                      />
                      <Link
                        className="w-full"
                        href={
                          (data[0]?.Scholarship.cover &&
                            data[0]?.Scholarship.cover) ||
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
              </div>
              <div className="p-8 mt-15 space-y-3">
                <div>
                  <Tabs
                    tabs={navigationTabs}
                    onTabChange={(tabId) => setActiveSection(tabId)}
                    className="py-4"
                  />

                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
                {data[0]?.status === "DECLINED" && (
                  <div className="relative z-20 bg-red-700/10 rounded-md  px-4 py-3 text-red-500">
                    <p className="text-sm">
                      <CircleAlert
                        className="me-3 -mt-0.5 inline-flex opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Your application has been rejected
                    </p>
                  </div>
                )}

                {data[0]?.status === "APPROVED" && (
                  <div className="relative z-20 bg-green-700/10 rounded-md  px-4 py-3 text-green-500">
                    <p className="text-sm">
                      <CircleCheck
                        className="me-3 -mt-0.5 inline-flex opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Your application has been approved
                    </p>
                  </div>
                )}

                {data[0]?.status === "PENDING" && (
                  <div className="relative z-20 bg-yellow-700/10 rounded-md  px-4 py-3 text-yellow-500">
                    <p className="text-sm">
                      <Clock
                        className="me-3 -mt-0.5 inline-flex opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Your application is still pending
                    </p>
                  </div>
                )}

                {data[0]?.status === "BLOCKED" && (
                  <div className="relative z-20 bg-gray-700/10 rounded-md  px-4 py-3 text-gray-500">
                    <p className="text-sm">
                      <Ban
                        className="me-3 -mt-0.5 inline-flex opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Your application has been blocked
                    </p>
                  </div>
                )}
                {activeSection === "documents" && <>1</>}
                {activeSection === "scholarship" && (
                  <ScholarDetails data={data[0]} />
                )}
              </div>
            </div>
            <div className="flex gap-3 p-4">
              <Button
                className="flex-1"
                onClick={() => setEdit(true)}
                disabled={data[0]?.status !== "PENDING"}
              >
                Edit Documents
              </Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import useClientApplications from "@/hooks/user/getApplications";

import TitleReusable from "@/components/ui/title";
import {
  Ban,
  CircleAlert,
  CircleCheck,
  Clock,
  GraduationCap,
  PenLine,
  X,
} from "lucide-react";

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

import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";
import DocsStudent from "./docs";
import EditApplication from "./edi-application";
import { Skeleton } from "@/components/ui/skeleton";
import ScholarshipModal from "@/components/ui/scholarship-modal";

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
  const steps = [
    {
      step: 1,
      title: "Step One",
      description: "Choose Scholarship",
    },
    {
      step: 2,
      title: "Step Two",
      description: "Upload Documents",
    },
    {
      step: 3,
      title: "Step Three",
      description: "Wait for Approval",
    },
  ];
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] bg-card w-[98%] mx-auto outline-0 border-0 lg:p-1  ${
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
          <div className="h-full w-full bg-background">
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
              <div className="p-4 space-y-8">
                <TitleReusable
                  title={data[0]?.Scholarship.title}
                  description={`Application Details for ${data[0].Scholarship.title}`}
                />
                <Stepper defaultValue={2} className="items-start gap-4">
                  {steps.map(({ step, title, description }) => (
                    <StepperItem key={step} step={step} className="flex-1">
                      <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                        <StepperIndicator
                          asChild
                          className="bg-border h-1 w-full"
                        >
                          <span className="sr-only">{step}</span>
                        </StepperIndicator>
                        <StepperTitle>{title}</StepperTitle>
                        <StepperDescription>{description}</StepperDescription>
                      </StepperTrigger>
                    </StepperItem>
                  ))}
                </Stepper>

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
                {activeSection === "documents" && (
                  <DocsStudent data={data[0]} />
                )}
                {activeSection === "scholarship" && data[0] && (
                  <ScholarshipModal data={data[0].Scholarship} />
                )}
              </div>
            </div>
            <div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="flex gap-3 bg-background p-4">
                <Button
                  className="flex-1"
                  onClick={() => setEdit(true)}
                  disabled={data[0]?.status !== "PENDING"}
                >
                  <PenLine /> Edit Documents
                </Button>
              </div>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

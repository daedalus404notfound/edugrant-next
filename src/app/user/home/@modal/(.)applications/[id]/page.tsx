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
        </DrawerHeader>
        {edit ? (
          <EditApplication data={data[0]} setEdit={setEdit} />
        ) : (
          <>
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
              {activeSection === "documents" && <DocsStudent data={data[0]} />}
              {activeSection === "scholarship" && (
                <ScholarDetails data={data[0]} />
              )}
            </div>
            <div className="flex gap-3 p-4">
              <Button className="flex-1" onClick={() => setEdit(true)}>
                Edit Documents
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => HandleCloseDrawer(false)}
              >
                Close
              </Button>
            </div>
          </>
        )}{" "}
      </DrawerContent>
    </Drawer>
  );
}

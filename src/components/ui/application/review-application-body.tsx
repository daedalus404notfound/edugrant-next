"use client";
import { ApplicationFormData } from "@/hooks/zod/application";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/edugrant-logo.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, GraduationCap, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Separator } from "@/components/ui/separator";
import DocumentSection from "@/components/ui/application/documents-section";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StudentStaff from "@/components/ui/application/student";
import FamilyStaff from "@/components/ui/application/family";
import { useState } from "react";
import ScholarshipModal from "../scholarship-modal";
import { GetApplicationFormData } from "@/hooks/zod/getApplicationZod";
import { ScrollArea } from "../scroll-area";
const navigationTabs = [
  { id: "documents", label: "Documents", indicator: null },
  { id: "student", label: "Student Info", indicator: null },
  { id: "family", label: "Family Background", indicator: null },
  { id: "scholarship", label: "Scholarship Details", indicator: null },
];
export default function ReviewBody({
  data,
  loading,
  reviewData,
  updateReviewData,
}: {
  data: GetApplicationFormData | null;
  loading: boolean;
  reviewData: Record<string, { comment: string; status: string }>;
  updateReviewData: (
    docKey: string,
    field: "comment" | "status",
    value: string
  ) => void;
}) {
  const [activeSection, setActiveSection] = useState("documents");
  const reviewDetails = data?.Interview_Decision || data?.Application_Decision;
  // OBJECT PARA PWEDE IMAP
  const submittedDocuments = Object.keys(data?.submittedDocuments || {});
  // KUKUNIN ILAN LAHAT NG PHASE
  const phaseLength = submittedDocuments.length;
  // KUKUNIN LAST PHASE KEY
  const getLastPhase = phaseLength > 0 ? submittedDocuments.at(-1) : undefined;
  // SETTER NG PHASE KEY

  // KUKUNIN APPLICATION DECISION SA NAPILING PHASE
  const phaseDecision = getLastPhase
    ? data?.submittedDocuments?.[getLastPhase]?.Application_Decision
    : null;

  const allPhaseDecision = submittedDocuments.map(
    (phaseKey) => data?.submittedDocuments?.[phaseKey]?.Application_Decision
  );

  // KUKUNIN DATA SA NAPILING PHASE - FIXED: Access the documents array
  const allphaseData = submittedDocuments.map(
    (phaseKey) => data?.submittedDocuments?.[phaseKey]?.documents
  );
  return (
    <ScrollArea className="h-[80vh] bg-background rounded-lg">
      <div className="flex-1 space-y-3">
        <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-md overflow-hidden ">
          {/* Header Section */}
          <div className="relative flex  lg:items-end items-center  py-8 px-4">
            <img
              className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
              src={logo.src}
              alt=""
            />
            <div className=" flex items-end justify-center">
              <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                  <Avatar className="size-25">
                    <AvatarImage
                      src={
                        data?.Student?.profileImg?.publicUrl ||
                        "https://github.com/shadcn.png"
                      }
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback
                      className="rounded-full text-white font-semibold flex items-center justify-center 
               bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
               dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
                    >
                      {data?.Student?.lName.slice(0, 1)}
                      {data?.Student?.fName.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogContent className="lg:max-w-5xl w-full !p-0 overflow-hidden">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <img
                    src={data?.Student?.profileImg?.publicUrl || ""}
                    alt=""
                  />
                </DialogContent>
              </Dialog>
              <div className="absolute   flex items-center justify-center flex-col">
                {data?.Student?.PWD && <Badge variant="secondary">PWD</Badge>}
                {data?.Student?.indigenous && (
                  <Badge variant="secondary">INDIGENOUS</Badge>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col gap-2 flex-1 px-4">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <div className="flex-1 px-4 py-2 z-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium text-foreground">
                    {data?.Student?.lName}, {data?.Student?.fName}{" "}
                    {data?.Student?.mName}
                  </h1>
                  <div className="space-x-1.5">
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student?.institute}
                    </Badge>
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student?.course}-{data?.Student?.year.slice(0, 1)}
                      {data?.Student?.section}
                    </Badge>
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student?.gender}
                    </Badge>
                  </div>
                </div>
                <p className="font-medium font-mono text-base tracking-wide">
                  {data?.Student?.Account?.schoolId}
                </p>{" "}
                <p className="text-muted-foreground text-sm">
                  {data?.Student?.Account?.email}
                </p>
              </div>
            )}
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 px-4 bg-card relative">
            <div className="space-y-1.5  border-l-2 pl-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Scholarship</h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <span className="font-medium text-foreground line-clamp-1">
                  {data?.Scholarship?.title}{" "}
                  <Badge className="bg-blue-800 text-gray-200">
                    PHASE {data?.Scholarship?.phase}
                  </Badge>
                </span>
              )}
            </div>

            <HoverCard>
              <HoverCardTrigger asChild className="cursor-pointer">
                <div className="space-y-1.5 border-l-2 pl-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <h1 className="text-xs text-muted-foreground">
                      Application Date
                    </h1>
                  </div>
                  {loading ? (
                    <Skeleton className="h-5 w-full" />
                  ) : (
                    <p className="font-medium text-foreground">
                      {(data?.dateCreated &&
                        format(data?.dateCreated, "PPP p")) ||
                        "N/A"}
                    </p>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="space-y-1 p-2">
                {allPhaseDecision.map((decision, index) => {
                  const isLastPhase = index === allPhaseDecision.length - 1;
                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center ${
                        isLastPhase
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        Phase {decision?.scholarshipPhase ?? index + 1}
                      </span>
                      <span>
                        {decision?.dateCreated
                          ? format(new Date(decision?.dateCreated), "PPP ")
                          : "N/A"}
                      </span>
                    </div>
                  );
                })}
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild className="cursor-pointer">
                <div className="space-y-1.5  border-l-2 pl-4">
                  <div className="flex items-center gap-2">
                    <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                    <h1 className="text-xs text-muted-foreground">
                      Reviewed By
                    </h1>
                  </div>
                  {loading ? (
                    <Skeleton className="h-5 w-20" />
                  ) : reviewDetails ? (
                    <p className="font-medium text-foreground">
                      {phaseDecision?.ISPSU_Staff?.fName
                        ? `${phaseDecision?.ISPSU_Staff?.fName}
                      ${phaseDecision?.ISPSU_Staff?.mName}
                      ${phaseDecision?.ISPSU_Staff?.lName}`
                        : "N/A"}
                    </p>
                  ) : (
                    "N/A"
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="space-y-1 p-2">
                {allPhaseDecision.map((decision, index) => {
                  const isLastPhase = index === allPhaseDecision.length - 1;
                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center ${
                        isLastPhase
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        Phase {decision?.scholarshipPhase ?? index + 1}
                      </span>
                      <span>
                        {decision?.ISPSU_Staff
                          ? decision.ISPSU_Staff.fName
                          : "N/A"}
                      </span>
                    </div>
                  );
                })}
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild className="cursor-pointer">
                <div className="space-y-1.5  border-l-2 pl-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <h1 className="text-xs text-muted-foreground">
                      Processed Date
                    </h1>
                  </div>
                  {loading ? (
                    <Skeleton className="h-5 w-full" />
                  ) : reviewDetails ? (
                    <p className="font-medium text-foreground">
                      {phaseDecision?.dateCreated
                        ? format(phaseDecision?.dateCreated, "PPP p")
                        : "N/A"}
                    </p>
                  ) : (
                    "N/A"
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="space-y-1 p-2">
                {allPhaseDecision.map((decision, index) => {
                  const isLastPhase = index === allPhaseDecision.length - 1;
                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center ${
                        isLastPhase
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        Phase {decision?.scholarshipPhase ?? index + 1}
                      </span>
                      <span>
                        {decision?.dateCreated
                          ? format(new Date(decision.dateCreated), "PPP ")
                          : "N/A"}
                      </span>
                    </div>
                  );
                })}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="p-4 space-y-8">
          <div className="border-b pb-1.5">
            <Tabs
              tabs={navigationTabs}
              onTabChange={(tabId) => setActiveSection(tabId)}
              className=""
            />
          </div>
          {/* Documents Section */}
          {activeSection === "documents" && (
            <DocumentSection
              data={data}
              loading={loading}
              reviewData={reviewData}
              updateReviewData={updateReviewData}
            />
          )}

          {/* Student Information Section */}
          {activeSection === "student" &&
            (loading ? (
              <>loading.</>
            ) : (
              data && <StudentStaff data={data} loading={loading} />
            ))}

          {/* Family Background Section */}
          {activeSection === "family" &&
            (loading ? (
              <>loa</>
            ) : (
              data && <FamilyStaff data={data} loading={loading} />
            ))}
          {activeSection === "scholarship" &&
            (loading ? (
              <>loading.</>
            ) : (
              data && <ScholarshipModal data={data.Scholarship} />
            ))}
        </div>
      </div>
    </ScrollArea>
  );
}

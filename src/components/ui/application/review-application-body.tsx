"use client";
import { ApplicationFormData } from "@/hooks/zod/application";
import { StatusAlertIndicator } from "../../../app/administrator/head/home/@modal/(.)application/[id]/status-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/edugrant-logo.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, GraduationCap, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Separator } from "@/components/ui/separator";
import DocumentSection from "@/components/ui/application/documents-section";
import StudentStaff from "@/components/ui/application/student";
import FamilyStaff from "@/components/ui/application/family";
import { useState } from "react";
const navigationTabs = [
  { id: "documents", label: "Documents", indicator: null },
  { id: "student", label: "Student Info", indicator: null },
  { id: "family", label: "Family Background", indicator: null },
];
export default function ReviewBody({
  data,
  loading,
  reviewData,
  updateReviewData,
}: {
  data: ApplicationFormData | null;
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
  return (
    <div className="overflow-auto h-full no-scrollbar p-4 bg-background rounded-lg">
      <div className="flex-1">
        <div className="bg-card rounded-md overflow-hidden">
          {data?.status === "APPROVED" && (
            <StatusAlertIndicator
              status="APPROVED"
              title="Application Approved"
              description="The applicant has successfully met all eligibility requirements for this scholarship."
            />
          )}

          {data?.status === "DECLINED" && (
            <StatusAlertIndicator
              status="DECLINED"
              title="Application Declined"
              description="The applicant did not meet the eligibility requirements for this scholarship."
            />
          )}

          {data?.status === "INTERVIEW" && (
            <StatusAlertIndicator
              status="INTERVIEW"
              title="Application For Interview"
              description="The applicant has successfully met all eligibility requirements proceeding to interview."
            />
          )}

          {data?.status === "BLOCKED" && (
            <StatusAlertIndicator
              status="BLOCKED"
              title="Application Blocked"
              description="This is automated because the user has an approved government scholarship."
            />
          )}
          {/* Header Section */}
          <div className="relative flex items-end  py-8 px-4">
            <img
              className=" w-70 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
              src={logo.src}
              alt=""
            />
            <div className=" flex items-end justify-center">
              <Avatar className="size-25">
                <AvatarImage
                  src={data?.Student.profileImg?.publicUrl || ""}
                  className="rounded-full object-cover"
                />
                <AvatarFallback
                  className="rounded-full text-white font-semibold flex items-center justify-center 
               bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
               dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
                >
                  {data?.Student.lName.slice(0, 1)}
                  {data?.Student.fName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute   flex items-center justify-center flex-col">
                {data?.Student.PWD && <Badge variant="secondary">PWD</Badge>}
                {data?.Student.indigenous && (
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
                    {data?.Student.lName}, {data?.Student.fName}{" "}
                    {data?.Student.mName}
                  </h1>
                  <div className="space-x-1.5">
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student.institute}
                    </Badge>
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student.course}-{data?.Student.year.slice(0, 1)}
                      {data?.Student.section}
                    </Badge>
                    <Badge variant="outline" className="mt-2 uppercase">
                      {data?.Student.gender}
                    </Badge>
                  </div>
                </div>
                <p className="font-medium font-mono text-base tracking-wide">
                  {data?.Student.Account.schoolId}
                </p>{" "}
                <p className="text-muted-foreground text-sm">
                  {data?.Student.Account.email}
                </p>
              </div>
            )}
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 px-4 bg-card relative z-10">
            <div className="space-y-1.5  border-l-2 pl-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Scholarship</h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <span className="font-medium text-foreground line-clamp-1">
                  {data?.Scholarship.title}{" "}
                  <Badge className="bg-blue-800 text-gray-200">
                    PHASE {data?.Scholarship.phase}
                  </Badge>
                </span>
              )}
            </div>
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
                  {data?.dateCreated && format(data?.dateCreated, "PPP p")}
                </p>
              )}
            </div>
            <div className="space-y-1.5  border-l-2 pl-4">
              <div className="flex items-center gap-2">
                <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Processed By</h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-20" />
              ) : reviewDetails ? (
                <p className="font-medium text-foreground">
                  {reviewDetails?.ISPSU_Staff.fName}{" "}
                  {reviewDetails?.ISPSU_Staff.lName}
                </p>
              ) : (
                "N/A"
              )}
            </div>

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
                  {reviewDetails && format(reviewDetails.dateCreated, "PPP p")}
                </p>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>
        <Tabs
          tabs={navigationTabs}
          onTabChange={(tabId) => setActiveSection(tabId)}
          className="pb-6 mt-8"
        />

        <div className="py-6">
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
        </div>
      </div>
    </div>
  );
}

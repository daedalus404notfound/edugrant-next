"use client";
import { ApplicationFormData } from "@/hooks/zod/application";
import { StatusAlertIndicator } from "../../../app/administrator/head/home/@modal/(.)application/[id]/status-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
          <div className="flex items-center gap-6 p-4 border-b">
            <Avatar className="size-24">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {loading ? (
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <div className="flex-1">
                <h1 className="text-xl font-medium text-foreground">
                  {data?.Student.lName}, {data?.Student.fName}{" "}
                  {data?.Student.mName}
                </h1>
                <p className="font-mono text-sm text-muted-foreground tracking-wider mt-1">
                  {data?.Student.Account.schoolId}
                </p>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 px-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Scholarship</h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <span className="font-medium text-foreground">
                  {data?.Scholarship.title}{" "}
                  <Badge variant="outline">
                    PHASE {data?.Scholarship.phase}
                  </Badge>
                </span>
              )}
            </div>
            <div className="space-y-1.5">
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
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <UserRoundCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">Processed By</h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <p className="font-medium text-foreground">
                  {reviewDetails?.ISPSU_Staff.fName}{" "}
                  {reviewDetails?.ISPSU_Staff.lName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <h1 className="text-xs text-muted-foreground">
                  Processed Date
                </h1>
              </div>
              {loading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="font-medium text-foreground">
                  {reviewDetails && format(reviewDetails.dateCreated, "PPP p")}
                </p>
              )}
            </div>
          </div>
        </div>
        <Tabs
          tabs={navigationTabs}
          onTabChange={(tabId) => setActiveSection(tabId)}
          className="pb-6 mt-8"
        />

        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
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

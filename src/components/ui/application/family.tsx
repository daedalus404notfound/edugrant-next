import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TitleReusable from "@/components/ui/title";
import { UsersRound, User, UserCircle, UserRound } from "lucide-react";
import {
  getFatherDetails,
  getMotherDetails,
  getGuardianDetails,
  getPersonalInformation,
  getAcademicInformation,
} from "./details";
import { ApplicationFormData } from "@/hooks/zod/application";
import { GetApplicationFormData } from "@/hooks/zod/getApplicationZod";

export default function FamilyStaff({
  data,
  loading,
}: {
  data: GetApplicationFormData | null;
  loading: boolean;
}) {
  const fatherDetails = getFatherDetails(data);
  const motherDetails = getMotherDetails(data);
  const guardianDetails = getGuardianDetails(data);

  return loading ? (
    <div className="space-y-12 p-6 max-w-4xl mx-auto">
      {/* Father Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-border/10">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start gap-6 p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Mother Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-border/10">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start gap-6 p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Guardian Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-border/10">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start gap-6 p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-12 p-4">
      {/* Father Details */}
      <div className="space-y-6 relative">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Father's Information
          </h4>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {fatherDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent  relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <p className="text-xs font-medium text-muted-foreground/70  tracking-wide">
                  {detail.label}
                </p>
              </div>
              <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mother Details */}
      <div className="space-y-6 relative">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Mother's Information
          </h4>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {motherDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent  relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <p className="text-xs font-medium text-muted-foreground/70  tracking-wide">
                  {detail.label}
                </p>
              </div>
              <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardian Details */}
      <div className="space-y-6 relative">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Guardian's Information
          </h4>
        </div>

        <div className="grid gap-4">
          {guardianDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent  relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <p className="text-xs font-medium text-muted-foreground/70  tracking-wide">
                  {detail.label}
                </p>
              </div>
              <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

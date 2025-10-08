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

export default function FamilyStaff({
  data,
  loading,
}: {
  data: ApplicationFormData | null;
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
    <div className="space-y-12 p-6">
      {/* Father Details */}
      <div className="space-y-6 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent rounded-full" />
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 ring-1 ring-blue-500/10">
            <UserRound className="h-4 w-4 text-blue-600/70" />
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Father's Information
          </h4>
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/5" />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {fatherDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <detail.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-blue-600/60 transition-colors" />
                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
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
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/20 via-pink-500/5 to-transparent rounded-full" />
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-600/5 ring-1 ring-pink-500/10">
            <UserCircle className="h-4 w-4 text-pink-600/70" />
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Mother's Information
          </h4>
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/5" />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {motherDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center  gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/0 to-pink-500/0 group-hover:from-pink-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <detail.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-pink-600/60 transition-colors" />
                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
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
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-purple-500/5 to-transparent rounded-full" />
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 ring-1 ring-purple-500/10">
            <UsersRound className="h-4 w-4 text-purple-600/70" />
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Guardian's Information
          </h4>
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/5" />
          </div>
        </div>

        <div className="grid gap-4">
          {guardianDetails.map((detail, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <detail.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-purple-600/60 transition-colors" />
                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
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

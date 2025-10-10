import { ApplicationFormData } from "@/hooks/zod/application";
import {
  getFatherDetails,
  getMotherDetails,
  getGuardianDetails,
  getPersonalInformation,
  getAcademicInformation,
} from "./details";
import { GraduationCap, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentStaff({
  data,
  loading,
}: {
  data: ApplicationFormData | null;
  loading: boolean;
}) {
  const personalInformation = getPersonalInformation(data);
  const academicInformation = getAcademicInformation(data);

  return loading ? (
    <div className="space-y-12 p-6 mx-auto">
      {/* Personal Information Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-border/10">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-48" />
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

      {/* Academic Information Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-border/10">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-48" />
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
      {/* Personal Information Section */}
      <div className="space-y-6 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full" />
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 ring-1 ring-emerald-500/10">
            <UserRound className="h-4 w-4 text-emerald-600/70" />
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Personal Information
          </h4>
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/5" />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {personalInformation.map((info, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <info.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-emerald-600/60 transition-colors" />
                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
                  {info.label}
                </p>
              </div>
              <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="space-y-6 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-transparent rounded-full" />
        <div className="flex items-center gap-3 pb-3 border-b-2 border-foreground/10 relative">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 ring-1 ring-indigo-500/10">
            <GraduationCap className="h-4 w-4 text-indigo-600/70" />
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-wide">
            Academic Information
          </h4>
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <div className="h-1 w-1 rounded-full bg-foreground/5" />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {academicInformation.map((info, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 p-4 rounded-lg hover:bg-foreground/[0.02] transition-all duration-200 border border-transparent hover:border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/[0.02] group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              <div className="flex items-center gap-2.5 min-w-[140px] pt-0.5 relative z-10">
                <info.icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-indigo-600/60 transition-colors" />
                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
                  {info.label}
                </p>
              </div>
              <p className="text-base font-medium text-foreground/90 break-words flex-1 leading-relaxed relative z-10">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

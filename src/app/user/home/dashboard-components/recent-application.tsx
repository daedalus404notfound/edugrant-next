import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar1,
  Clock,
  ExternalLink,
  GraduationCapIcon,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ApplicationFormData } from "@/hooks/zod/application";
import NoDataFound from "@/components/ui/nodata";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
export default function RecentApplicationDashboard({
  application,
  loading,
}: {
  application: ApplicationFormData[];
  loading: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">Recent Application</h1>
        <Link href={"/user/home/applications"}>
          <Button size="sm" variant="link">
            See All <ExternalLink />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1  gap-5">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-card relative rounded-lg p-4 md:p-6 shadow-sm space-y-4 md:space-y-6"
            >
              {/* Header Section Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1 min-w-0">
                    <Skeleton className="h-4 w-full max-w-xs" />
                    <Skeleton className="h-3 w-full max-w-sm" />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>

              {/* Separator Skeleton */}
              <Skeleton className="h-px w-full" />

              {/* Info Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {/* Application Date */}
                <div className="space-y-2 sm:pl-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>

                {/* Scholarship Deadline */}
                <div className="space-y-2 sm:border-l sm:pl-4">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-5 w-32" />
                </div>

                {/* Status */}
                <div className="space-y-2 sm:border-l sm:pl-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))
        ) : application.length === 0 ? (
          <NoDataFound />
        ) : (
          application.slice(0, 2).map((meow, index) => (
            <motion.div
              key={meow.applicationId}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-lg overflow-hidden relative"
            >
              {/* Header Section */}
              {/* <img
                          className=" w-full object-cover "
                          src={meow.Scholarship.cover || "/placeholder.svg"}
                          alt=""
                        /> */}
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start py-6 md:py-8 px-4 md:px-6">
                <div className="flex gap-6 items-start w-full lg:w-auto">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar className="size-10 flex-shrink-0">
                      <AvatarImage
                        className="object-cover"
                        src={meow.Scholarship.logo || "/placeholder.svg"}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm line-clamp-1">
                        {meow.Scholarship.title || "Unknown Provider"}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {meow.Scholarship.Scholarship_Provider?.name ||
                          "Unknown Provider"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {meow.Scholarship.phase > 1 && (
                      <Badge className="bg-indigo-800 text-gray-200 text-xs">
                        RENEWAL
                      </Badge>
                    )}
                    <Badge className="bg-blue-800 text-gray-200 uppercase text-xs">
                      {getPhaseLabel(meow.Scholarship.phase)}
                    </Badge>
                  </div>
                </div>
                <Link
                  href={`/user/home/applications/${meow.applicationId}`}
                  className="w-full sm:w-auto hidden lg:block"
                >
                  <Button className="w-full sm:w-auto" size="sm">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Info Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card relative z-10">
                {/* Application Date */}
                <div className="space-y-1.5 sm:pl-4">
                  <div className="flex items-center gap-2">
                    <Calendar1 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <h1 className="text-xs text-muted-foreground">
                      Application Date
                    </h1>
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    {meow?.dateCreated && format(meow?.dateCreated, "PPP")}
                  </p>
                </div>

                {/* Scholarship Deadline */}
                <div className="space-y-1.5 sm:border-l sm:pl-4">
                  <div className="flex items-center gap-2">
                    <GraduationCapIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <h1 className="text-xs text-muted-foreground">
                      Scholarship Deadline
                    </h1>
                  </div>
                  <span className="font-medium text-sm text-foreground">
                    {meow?.Scholarship.deadline
                      ? format(meow?.Scholarship.deadline, "PPP")
                      : "—"}
                  </span>
                </div>

                {/* Status */}
                <div className="space-y-1.5 sm:border-l sm:pl-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <h1 className="text-xs text-muted-foreground">Status</h1>
                  </div>
                  <p
                    className={`font-medium text-sm ${getStatusColor(
                      meow.status
                    )}`}
                  >
                    {meow.status}
                  </p>
                </div>
              </div>
              <div className="p-3 lg:hidden">
                <Link
                  href={`/user/home/applications/${meow.applicationId}`}
                  className="w-full sm:w-auto "
                >
                  <Button className="w-full sm:w-auto" size="sm">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    BLOCKED: "text-gray-600",
    APPROVED: "text-green-600",
    PENDING: "text-yellow-600",
    INTERVIEW: "text-blue-600",
    DECLINED: "text-red-600",
  };
  return statusColors[status] || "";
};

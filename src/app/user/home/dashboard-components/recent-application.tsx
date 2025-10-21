import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ApplicationFormData } from "@/hooks/zod/application";
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
      <div className="grid grid-cols-1  gap-4">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-card relative rounded-md p-6 shadow-sm space-y-6"
            >
              {/* Logo + Provider Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-9 w-20" />
              </div>

              {/* Details Skeleton */}
              <div className="grid grid-cols-3 gap-1">
                <div className="flex flex-col border-l px-4 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="flex flex-col border-l px-4 space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex flex-col border-l px-4 space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))
        ) : application.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No application found.
          </div>
        ) : (
          application.slice(0, 2).map((meow) => (
            <div
              key={meow.applicationId}
              className="group relative flex flex-col justify-between bg-gradient-to-br to-card from-card/50 rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 gap-6"
            >
              {/* Logo + Provider */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {meow.Scholarship.logo ? (
                    <img
                      src={meow.Scholarship.logo}
                      alt={meow.Scholarship.title}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      No Logo
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {meow.Scholarship.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {meow.Scholarship.Scholarship_Provider?.name ||
                        "Unknown Provider"}
                    </p>
                  </div>
                </div>
                <Link href={`/user/home/applications/${meow.applicationId}`}>
                  <Button className="w-full" size="sm">
                    View <ArrowRight />
                  </Button>
                </Link>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-1 text-sm text-muted-foreground">
                <div className="flex flex-col border-l px-4">
                  <span className="text-xs">Application Date:</span>
                  <span className="font-medium text-foreground text-base truncate">
                    {meow.dateCreated ? format(meow.dateCreated, "PPP") : "—"}
                  </span>
                </div>
                <div className="flex flex-col border-l px-4">
                  <span className="text-xs">Status:</span>
                  <span className="font-medium text-foreground text-base">
                    {meow.status || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col border-l px-4">
                  <span className="text-xs">Processed Date:</span>
                  <span className="font-medium text-foreground text-base truncate">
                    {meow.Interview_Decision
                      ? format(meow.Interview_Decision.dateCreated, "PPP")
                      : meow.Application_Decision
                      ? format(meow.Application_Decision.dateCreated, "PPP")
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

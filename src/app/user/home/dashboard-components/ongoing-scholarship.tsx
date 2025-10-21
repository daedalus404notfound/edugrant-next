import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";

export default function OngoingScholarshipDashboard({
  scholarship,
  loading,
}: {
  scholarship: scholarshipFormData[];
  loading: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-base font-medium">Ongoing Scholarship</h1>

        <Link href={"/user/home/scholarships"}>
          <Button size="sm" variant="link">
            Browse All <ExternalLink />
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-1 gap-4 ">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className=" bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-md p-6 shadow-sm space-y-6"
            >
              {/* Logo + Provider skeleton */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>

              {/* Details skeleton */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))
        ) : scholarship.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No scholarship found.
          </div>
        ) : (
          scholarship.slice(0, 2).map((meow) => (
            <div
              key={meow.scholarshipId}
              className="group relative flex flex-col justify-between  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 gap-6"
            >
              {/* Logo + Provider */}
              <div className="flex items-center gap-3">
                {meow.logo ? (
                  <img
                    src={meow.logo}
                    alt={meow.title}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    No Logo
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {meow.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {meow.Scholarship_Provider?.name || "Unknown Provider"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Deadline:</span>
                  <span className="font-medium text-foreground">
                    {meow.deadline ? format(meow.deadline, "PPP") : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Required GWA:</span>
                  <span className="font-medium text-foreground">
                    {meow.requiredGWA || "N/A"}
                  </span>
                </div>
              </div>

              <Link href={`/user/home/scholarships/${meow.scholarshipId}`}>
                <Button className="w-full">
                  View Details <ArrowRight />
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

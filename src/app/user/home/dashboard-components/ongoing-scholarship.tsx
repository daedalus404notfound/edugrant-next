import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import NoDataFound from "@/components/ui/nodata";
import { Badge } from "@/components/ui/badge";
import { getPhaseLabel } from "@/lib/phaseLevel";

export default function OngoingScholarshipDashboard({
  scholarship,
  loading,
}: {
  scholarship: scholarshipFormData[];
  loading: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">Ongoing Scholarship</h1>

        <Link href={"/user/home/scholarships"}>
          <Button size="sm" variant="link">
            Browse All <ExternalLink />
          </Button>
        </Link>
      </div>
      <div className=" grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-2">
        {loading ? (
          [...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="shadow-sm rounded-lg border bg-card lg:p-1 p-0.5"
            >
              <div className="rounded-lg bg-background overflow-hidden">
                <Skeleton className="aspect-[16/3] w-full rounded-md" />

                <div className="lg:p-4 p-2 lg:space-y-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full hidden lg:block" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <div className=" items-center justify-between hidden lg:flex">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>

                  <Skeleton className="lg:h-10 h-8 w-full rounded-md" />
                </div>
              </div>
            </motion.div>
          ))
        ) : scholarship.length === 0 ? (
          <NoDataFound />
        ) : (
          scholarship.slice(0, 2).map((meow, index) => (
            <div
              className="bg-background dark:border-1  rounded-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 "
              key={meow.scholarshipId}
            >
              <div className="group relative flex flex-col justify-between  bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30  rounded-md p-6 shadow-sm gap-6">
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
                    <span className="text-xs">Deadline</span>
                    <span className="font-medium text-foreground">
                      {meow.deadline ? format(meow.deadline, "PPP") : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Required GWA</span>
                    <span className="font-medium text-foreground">
                      {meow.requiredGWA || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Type</span>
                    <span className="font-medium text-foreground capitalize">
                      {meow.type || "N/A"}
                    </span>
                  </div>
                  {/* <div className="flex items-center justify-between">
                            <span className="text-xs">Current Phase</span>
                            <span className="font-medium text-foreground capitalize">
                              {meow.phase || "N/A"}
                            </span>
                          </div> */}
                </div>

                <Link href={`/user/home/scholarships/${meow.scholarshipId}`}>
                  <Button className="w-full" size="sm">
                    View Details <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

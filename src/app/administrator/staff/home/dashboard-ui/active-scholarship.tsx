import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";

export function ActiveScholarships({
  data,
  loading,
}: {
  data?: scholarshipFormData[];
  loading: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">Ongoing Scholarship</h1>

        <Link href={"/user/home/scholarships"}>
          <Button size="sm" variant="ghost">
            View All <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 ">
        {loading ? (
          [...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-background/40 relative rounded-md space-y-3"
            >
              <Skeleton className="h-50" />
            </motion.div>
          ))
        ) : data?.length === 0 ? (
          <>No scholarship found.</>
        ) : (
          data?.slice(0, 4).map((meow) => (
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

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DashboardData } from "@/hooks/admin/getHeadDashboard";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoDataFound from "@/components/ui/nodata";

export function RecentApplications({
  data,
  loading,
}: {
  data: DashboardData | null;
  loading: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">
          Recently Processed Application
        </h1>

        <Link href={"/user/home/scholarships"}>
          <Button size="sm" variant="ghost">
            View All <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="space-y-4 ">
        {loading ? (
          [...Array(2)].map((_, index) => (
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
        ) : data?.applications.length === 0 ? (
          <NoDataFound />
        ) : (
          data?.applications.slice(0, 3).map((meow) => (
            <div
              key={meow.applicationId}
              className="bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-md"
            >
              <div className="group relative flex flex-col justify-between   bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 rounded-md p-6 shadow-sm gap-6">
                {/* Logo + Provider */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={
                          meow.Student.profileImg?.publicUrl ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">
                        {meow.Student?.lName}, {meow.Student?.fName}{" "}
                        {meow.Student?.mName &&
                          `${meow.Student?.mName.slice(0, 1)}.`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {meow.Scholarship?.title || "Unknown Scholarship"}
                      </p>
                    </div>
                  </div>
                  <Link href={`/user/home/scholarships/${meow.scholarshipId}`}>
                    <Button className="w-full" size="sm">
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-1 text-sm text-muted-foreground">
                  <div className="flex flex-col border-l px-4">
                    <span className="text-xs">Application Date</span>
                    <span className="font-medium text-foreground">
                      {format(meow.dateCreated, "PPP")}
                    </span>
                  </div>
                  <div className="flex flex-col border-l px-4">
                    <span className="text-xs">Student ID</span>
                    <span className="font-medium text-foreground">
                      {meow.Student.Account?.schoolId}
                    </span>
                  </div>
                  <div className="flex flex-col border-l px-4">
                    <span className="text-xs">Status</span>
                    <span className="font-medium text-foreground">
                      {meow.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

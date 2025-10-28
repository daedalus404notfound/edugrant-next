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
      <div className=" grid grid-cols-1 lg:gap-5 gap-2">
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
          scholarship.slice(0, 2).map((meow, index) => {
            return (
              <motion.div
                key={meow.scholarshipId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                // className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
                className="shadow-sm hover:shadow-md transition-all duration-200 rounded-lg border bg-card overflow-hidden group"
              >
                {/* <Link
                      href={`/user/home/applications/${meow.applicationId}`}
                      key={meow.applicationId}
                      prefetch
                      scroll={false}
                    > */}
                <div className="relative rounded-lg bg-background overflow-hidden">
                  <img
                    className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                      status === "EXPIRED" ? "" : ""
                    }`}
                    src={meow.cover}
                    alt=""
                  />
                  <div className="relative z-10">
                    <div className="relative aspect-[16/3] w-full rounded-md overflow-hidden">
                      {/* <div className="flex gap-1.5 absolute top-0 right-2">
                            <Badge
                              variant="outline"
                              className="mt-2 uppercase bg-blue-800 text-gray-200"
                            >
                              {" "}
                              {getPhaseLabel(data[0]?.Scholarship?.phase)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`mt-2 uppercase text-gray-200 ${
                                data[0]?.Scholarship?.deadline &&
                                Date.now() >
                                  new Date(
                                    data[0].Scholarship.deadline
                                  ).getTime()
                                  ? "bg-red-800"
                                  : "bg-green-800"
                              }`}
                            >
                              {data[0]?.Scholarship?.deadline &&
                              Date.now() >
                                new Date(data[0].Scholarship.deadline).getTime()
                                ? "EXPIRED"
                                : "ACTIVE"}
                            </Badge>
                          </div> */}
                      {meow.Application?.length! > 0 && (
                        <div className="absolute inset-0 bg-background/70 z-10"></div>
                      )}
                      {meow.Application?.length! > 0 && (
                        <div className="absolute top-0 -left-2 flex items-center z-20">
                          <div
                            className="flex items-center justify-center text-gray-200 font-medium text-sm  px-7  py-1.5 bg-gradient-to-br to-green-950 from-green-800"
                            style={{
                              clipPath:
                                "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                            }}
                          >
                            SUBMITTED
                          </div>
                        </div>
                      )}

                      <img
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={meow.cover}
                        alt=""
                      />
                    </div>

                    <div className="p-4 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          {meow ? (
                            <img
                              src={meow?.logo}
                              alt={meow?.title}
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                              No Logo
                            </div>
                          )}{" "}
                          <div className="w-full">
                            <h3 className="font-semibold text-sm line-clamp-1">
                              {meow?.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              {meow?.Scholarship_Provider?.name ||
                                "Unknown Provider"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {meow.phase > 1 && (
                            <Badge className="bg-blue-800 text-gray-200">
                              RENEWAL
                            </Badge>
                          )}
                          <Badge className="bg-blue-800 text-gray-200 uppercase">
                            {getPhaseLabel(meow.phase)}
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Deadline Date:</span>
                          <span className="font-medium text-foreground">
                            {meow?.deadline
                              ? format(meow?.deadline, "PPP")
                              : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Scholarship Type:</span>
                          <span className="font-medium text-foreground">
                            {meow?.type || "N/A"}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/user/home/scholarships/${meow.scholarshipId}`}
                        prefetch={true}
                        scroll={false}
                      >
                        <Button className="w-full">
                          View Details <ArrowRight />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

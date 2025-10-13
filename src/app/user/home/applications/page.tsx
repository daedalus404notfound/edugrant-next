"use client";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, TextSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import useClientApplications from "@/hooks/user/getApplications";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { Button } from "@/components/ui/button";

export default function ClientScholarship() {
  const [status, setStatus] = useState("PENDING");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status") || "PENDING");
  }, []);

  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(50);

  const user = useUserStore((state) => state.user);
  const userId = user?.accountId;
  const { data, loading, meta } = useClientApplications({
    userId: userId ? userId.toString() : "",
    page: currentPage,
    pageSize: rowsPerPage,
    status,
  });

  const tabs = [
    {
      id: "PENDING",
      label: "Pending",
      indicator: meta.counts.PENDING ? meta.counts.PENDING : null,
    },
    {
      id: "INTERVIEW",
      label: "For Interview",
      indicator: meta.counts.INTERVIEW ? meta.counts.INTERVIEW : null,
    },
    {
      id: "APPROVED",
      label: "Approved",
      indicator: meta.counts.APPROVED ? meta.counts.APPROVED : null,
    },
    {
      id: "DECLINED",
      label: "Declined",
      indicator: meta.counts.DECLINED ? meta.counts.DECLINED : null,
    },
    {
      id: "BLOCKED",
      label: "Restricted",
      indicator: meta.counts.BLOCKED ? meta.counts.BLOCKED : null,
    },
  ];

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <TitleReusable
            title="My Applications"
            description="Track and manage your submitted scholarship applications."
            Icon={TextSearch}
          />
        </motion.div>

        {/* <div className="flex gap-2 mt-5">
          <div className="flex-1">
            <Input placeholder="Search..." />
          </div>
          <Button variant="secondary">
            <MoreHorizontal />
          </Button>
        </div> */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b"
        >
          <Tabs
            activeTab={status}
            tabs={tabs}
            onTabChange={(tabId) => setStatus(tabId)}
          />
        </motion.div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto">
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
            <AnimatePresence mode="wait">
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="shadow-sm rounded-lg border bg-card p-1"
                  >
                    <div className="rounded-lg bg-background overflow-hidden">
                      <Skeleton className="aspect-[16/8.5] w-full rounded-md" />

                      <div className="p-4 space-y-6">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-28" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>

                        <Skeleton className="h-10 w-full rounded-md" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : data.length === 0 ? (
                <NoDataFound />
              ) : (
                data.map((meow, index) => (
                  <motion.div
                    key={meow.applicationId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
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
                        src={meow.Scholarship.cover}
                        alt=""
                      />
                      <div className="relative z-10">
                        <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
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
                          {meow.status && (
                            <div className="absolute top-0 -left-2 flex items-center">
                              <div
                                className={`flex items-center justify-center text-gray-200 font-medium text-sm px-7 py-1.5 bg-gradient-to-br  ${
                                  meow.status === "BLOCKED"
                                    ? "to-green-950 from-green-800"
                                    : meow.status === "APPROVED"
                                    ? "to-green-950 from-green-800"
                                    : meow.status === "PENDING"
                                    ? "to-yellow-950 from-yellow-800"
                                    : meow.status === "INTERVIEW"
                                    ? "to-blue-950 from-blue-800"
                                    : meow.status === "DECLINED"
                                    ? "to-red-950 from-red-800"
                                    : "to-gray-950 from-gray-800"
                                }`}
                                style={{
                                  clipPath:
                                    "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                }}
                              >
                                {meow.status}
                              </div>
                            </div>
                          )}

                          <img
                            className="h-full w-full object-cover"
                            src={meow.Scholarship.cover}
                            alt=""
                          />
                        </div>

                        <div className="p-4 space-y-6">
                          <div className="flex items-center gap-3">
                            {meow.Scholarship ? (
                              <img
                                src={meow?.Scholarship?.logo}
                                alt={meow?.Scholarship?.title}
                                className="w-10 h-10 rounded-full object-cover border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                No Logo
                              </div>
                            )}{" "}
                            <div className="w-full">
                              <h3 className="font-semibold text-sm line-clamp-1">
                                {meow?.Scholarship?.title}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                {meow?.Scholarship?.Scholarship_Provider
                                  ?.name || "Unknown Provider"}
                              </p>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Application Date:</span>
                              <span className="font-medium text-foreground">
                                {meow?.dateCreated
                                  ? format(meow?.dateCreated, "PPP")
                                  : "—"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Scholarship Type:</span>
                              <span className="font-medium text-foreground">
                                {meow?.Scholarship?.type || "N/A"}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/user/home/applications/${meow.applicationId}`}
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
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div
//    key={meow.scholarshipId}
//    className="group relative flex flex-col justify-between  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-md p-1 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 "
//  >
//    <img
//      className="w-full object-cover aspect-[16/10] rounded-md opacity-50"
//      src={meow.Scholarship.cover}
//      alt=""
//    />
//    {/* Logo + Provider */}
//    <div className="p-4 space-y-6">
//      <div className="flex items-center gap-3">
//        {meow.Scholarship ? (
//          <img
//            src={meow?.Scholarship?.logo}
//            alt={meow?.Scholarship?.title}
//            className="w-10 h-10 rounded-full object-cover border"
//          />
//        ) : (
//          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
//            No Logo
//          </div>
//        )}
//        <div>
//          <h3 className="font-semibold text-sm line-clamp-1">
//            {meow?.Scholarship?.title}
//          </h3>
//          <p className="text-sm text-muted-foreground">
//            {meow?.Scholarship?.Scholarship_Provider?.name || "Unknown Provider"}
//          </p>
//        </div>
//      </div>

//      {/* Details */}
//      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
//        <div className="flex items-center justify-between">
//          <span className="text-xs">Deadline:</span>
//          <span className="font-medium text-foreground">
//            {meow?.Scholarship?.deadline
//              ? format(meow?.Scholarship?.deadline, "PPP")
//              : "—"}
//          </span>
//        </div>
//        <div className="flex items-center justify-between">
//          <span className="text-xs">Required GWA:</span>
//          <span className="font-medium text-foreground">
//            {meow?.Scholarship?.requiredGWA || "N/A"}
//          </span>
//        </div>
//      </div>

//      <Link href={`/user/home/scholarships/${meow?.Scholarship?.scholarshipId}`}>
//        <Button className="w-full">
//          View Details <ArrowRight />
//        </Button>
//      </Link>
//    </div>
//  </div>;

"use client";
import { AnimatePresence, motion } from "motion/react";
import { TextSearch } from "lucide-react";
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

export default function ClientScholarship() {
  const [status, setStatus] = useState("PENDING");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status") || "PENDING");
  }, []);

  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);

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
        <div className="mt-15 lg:w-[80%] min-w-4xl w-full mx-auto">
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
                    className="p-2 bg-background/40 relative rounded-md border space-y-3"
                  >
                    <Skeleton className="aspect-[16/8.5]" />
                    <Skeleton className="h-10" />
                    <div className="flex gap-3 h-11">
                      <Skeleton className="flex-1" />
                      <Skeleton className="flex-1" />
                      <Skeleton className="flex-1" />
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
                    <Link
                      href={`/user/home/applications/${meow.applicationId}`}
                      key={meow.applicationId}
                      prefetch
                      scroll={false}
                    >
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
                            {meow.status && (
                              <div className="absolute top-2 -left-2 flex items-center">
                                {/* Shadow Layer */}
                                <div
                                  className="absolute"
                                  style={{
                                    width: "120px",
                                    height: "40px",
                                    background:
                                      meow.status === "BLOCKED"
                                        ? "rgba(0,0,0,0.5)"
                                        : meow.status === "APPROVED"
                                        ? "rgba(0,128,0,0.5)"
                                        : meow.status === "PENDING"
                                        ? "rgba(218,165,32,0.5)"
                                        : meow.status === "INTERVIEW"
                                        ? "rgba(0,0,255,0.5)"
                                        : meow.status === "DECLINED"
                                        ? "rgba(255,0,0,0.5)"
                                        : "rgba(0,0,0,0.5)",
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                    transform: "translate(4px, 4px)", // shadow offset
                                    zIndex: 0,
                                  }}
                                ></div>

                                {/* Main Layer */}
                                <div
                                  className="flex items-center justify-center text-gray-200 font-medium text-sm px-6 py-2"
                                  style={{
                                    width: "120px",
                                    height: "40px",
                                    background:
                                      meow.status === "BLOCKED"
                                        ? "rgba(0,0,0,0.8)"
                                        : meow.status === "APPROVED"
                                        ? "rgba(0,128,0,0.8)"
                                        : meow.status === "PENDING"
                                        ? "rgba(218,165,32,0.8)"
                                        : meow.status === "INTERVIEW"
                                        ? "rgba(0,0,255,0.8)"
                                        : meow.status === "DECLINED"
                                        ? "rgba(255,0,0,0.8)"
                                        : "rgba(0,0,0,0.8)",
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                    zIndex: 1,
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

                          <div className=" lg:p-4 p-2 space-y-5">
                            <div className="flex items-start justify-start">
                              <div className="flex-1 lg:space-y-1">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-semibold lg:text-lg text-base  text-balance leading-tight line-clamp-1">
                                    {meow.Scholarship.title}
                                  </h3>
                                  <Badge
                                    variant="secondary"
                                    className="uppercase"
                                  >
                                    {meow.Scholarship.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {meow.Scholarship.Scholarship_Provider.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground ">
                              <div className="flex gap-1.5 items-center">
                                {meow.Scholarship?.deadline &&
                                new Date(meow.Scholarship?.deadline).getTime() <
                                  Date.now() ? (
                                  <Badge className="bg-red-800 text-gray-200 tracking-wide">
                                    EXPIRED
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-800 text-gray-200 tracking-wide">
                                    ACTIVE
                                  </Badge>
                                )}
                                {meow.Scholarship.phase > 1 && (
                                  <Badge className="bg-blue-800 text-gray-200 uppercase">
                                    {getPhaseLabel(meow.Scholarship.phase)}
                                  </Badge>
                                )}
                              </div>

                              {/* {user?.Student?.Application?.some(
                                (app) =>
                                  app.scholarshipId ===
                                  meow.Scholarship.scholarshipId
                              ) && (
                                <Badge className=" bg-blue-800 text-white">
                                  APPLIED
                                </Badge>
                              )} */}
                              <span>
                                Deadline:{" "}
                                {format(meow.Scholarship.deadline, "MM/dd/yy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
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

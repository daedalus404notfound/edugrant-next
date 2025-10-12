"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Landmark, PhilippinePeso, TextSearch } from "lucide-react";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import Link from "next/link";

type Filter = {
  id: string;
  value: string[];
};
import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Badge } from "@/components/ui/badge";
import useScholarshipData from "@/hooks/user/getScholarship";
import { Skeleton } from "@/components/ui/skeleton";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import TitleReusable from "@/components/ui/title";
import { format } from "date-fns";
import NoDataFound from "@/components/ui/nodata";
import { useUserStore } from "@/store/useUserStore";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { getPhaseLabel } from "@/lib/phaseLevel";
import CompleteChecker from "../dashboard-components/complete-check";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);

  const [status, setStatus] = useState("ACTIVE");
  const { user, loadingUser } = useUserStore();
  const formatFilters = () => {
    const filterArray: Filter[] = [];

    return filterArray.length > 0 ? JSON.stringify(filterArray) : "";
  };

  const { data, loading, meta } = useScholarshipData({
    page: currentPage,
    pageSize: rowsPerPage,
    sortBy: "scholarshipTitle",
    order: "",
    search: "",
    status: status,
    filters: formatFilters(),
    accountId: user?.accountId.toString(),
  });
  const tabs = [
    { id: "ACTIVE", label: "Ongoing", indicator: meta.counts.countActive },
    { id: "RENEW", label: "For Renewal", indicator: meta.counts.countRenew },
    { id: "EXPIRED", label: "Closed", indicator: meta.counts.countExpired },
  ];
  const { completed } = getFamilyBackgroundProgress(user?.Student);

  const loadingState = loading || loadingUser;

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {!completed && (
        <div className="absolute inset-0 z-20 bg-background/70 rounded-lg " />
      )}
      <div className="mx-auto w-[95%] lg:pt-10  pt-3">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <TitleReusable
            title="Available Scholarships"
            description="View the list of scholarships currently open for application."
            Icon={TextSearch}
          />
        </motion.div>

        <div className="py-8 space-y-8">
          {!completed && <CompleteChecker />}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar "
          >
            <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
          </motion.div>

          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <AnimatePresence mode="wait">
              {loadingState ? (
                [...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
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
                data.map((scholarship, index) => {
                  const findMatch = user?.Student.Application.find(
                    (meow) => meow.scholarshipId === scholarship?.scholarshipId
                  );
                  // const isNotRenew =
                  //   user?.Student.Application.find(
                  //     (meow) =>
                  //       meow.scholarshipId === scholarship?.scholarshipId
                  //   )?.status !== "RENEW";
                  return (
                    <motion.div
                      key={scholarship.scholarshipId}
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
                        href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                        prefetch
                        scroll={false}
                        key={scholarship.scholarshipId}
                      >
                        <div className="relative rounded-lg bg-background overflow-hidden">
                          <img
                            className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                              status === "EXPIRED" ? "" : ""
                            }`}
                            src={scholarship.cover}
                            alt=""
                          />
                          <div className="relative z-10">
                            <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                              {/* isNotRenew{" "} */}
                              {findMatch && (
                                <div className="absolute z-20 inset-0  bg-black/40 dark:bg-black/60  flex justify-center items-center">
                                  <span className="uppercase absolute shadow-md backdrop-blur-sm right-0 top-0 dark:bg-black/40 bg-white/80 text-center pl-5 pb-2.5 pr-5 py-2 rounded-bl-lg flex items-center gap-2 text-sm font-medium tracking-wide">
                                    {" "}
                                    Submitted
                                  </span>
                                </div>
                              )}
                              <img
                                className={`h-full w-full object-cover ${
                                  status === "EXPIRED" ? "" : ""
                                }`}
                                src={scholarship.cover}
                                alt=""
                              />
                            </div>
                            <div className=" lg:p-4 p-2 space-y-5">
                              <div className="flex items-start justify-start">
                                <div className="flex-1 lg:space-y-1">
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold lg:text-lg text-base  text-balance leading-tight line-clamp-1">
                                      {scholarship.title}
                                    </h3>
                                    <Badge
                                      variant="secondary"
                                      className="uppercase"
                                    >
                                      <Landmark /> {scholarship.type}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {scholarship.Scholarship_Provider.name}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground ">
                                <div className="space-x-2">
                                  {status === "ACTIVE" && (
                                    <Badge className="bg-green-800 tracking-wide text-gray-200">
                                      ACTIVE
                                    </Badge>
                                  )}
                                  {scholarship.phase > 1 && (
                                    <Badge className="bg-blue-800 text-gray-200 uppercase">
                                      {getPhaseLabel(scholarship.phase)}
                                    </Badge>
                                  )}

                                  {status === "EXPIRED" && (
                                    <Badge className="bg-red-800 text-gray-200">
                                      EXPIRED
                                    </Badge>
                                  )}
                                </div>

                                {/* {user?.Student?.Application?.some(
                                (app) =>
                                  app.scholarshipId ===
                                  scholarship.scholarshipId
                              ) && (
                                <Badge className=" bg-blue-800 text-white">
                                  APPLIED
                                </Badge>
                              )} */}
                                <span className="capitalize">
                                  {/* {scholarship.phase > 1 &&
                                    `${getPhaseLabel(scholarship.phase)}`}{" "} */}
                                  Deadline:{" "}
                                  {format(scholarship.deadline, "MM/dd/yy")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

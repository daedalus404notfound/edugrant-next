"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Landmark, PhilippinePeso, TextSearch } from "lucide-react";
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
import { Button } from "@/components/ui/button";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(50);

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
    {
      id: "ACTIVE",
      label: "Ongoing",
      indicator: meta.counts.countActive ? meta.counts.countActive : null,
    },
    {
      id: "RENEW",
      label: "For Renewal",
      indicator: meta.counts.countRenew ? meta.counts.countRenew : null,
    },
    {
      id: "EXPIRED",
      label: "Closed",
      indicator: meta.counts.countExpired ? meta.counts.countExpired : null,
    },
  ];
  const { completed } = getFamilyBackgroundProgress(user?.Student);

  const loadingState = loading || loadingUser;

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {!completed && (
        <div className="absolute inset-0 z-20 bg-background/70 rounded-lg " />
      )}
      <div className="mx-auto w-[95%] lg:py-10  py-4">
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
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b"
        >
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </motion.div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto">
          {!completed && <CompleteChecker />}

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
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="shadow-sm rounded-lg border bg-card lg:p-1 p-0.5"
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
                data.map((scholarship, index) => {
                  const findMatch = user?.Student.Application.find(
                    (meow) =>
                      scholarship.scholarshipId === scholarship?.scholarshipId
                  );
                  const isNotRenew =
                    user?.Student.Application.find(
                      (meow) =>
                        scholarship.scholarshipId === scholarship?.scholarshipId
                    )?.status !== "RENEW";
                  return (
                    // <motion.div
                    //   key={scholarship.scholarshipId}
                    //   initial={{ opacity: 0 }}
                    //   animate={{ opacity: 1 }}
                    //   exit={{ opacity: 0 }}
                    //   transition={{
                    //     duration: 0.3,
                    //     delay: index * 0.1,
                    //     ease: "easeOut",
                    //   }}
                    //   className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
                    // >
                    //   <Link
                    //     href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                    //     prefetch
                    //     scroll={false}
                    //     key={scholarship.scholarshipId}
                    //   >
                    //     <div className="relative rounded-lg bg-background overflow-hidden">
                    //       <img
                    //         className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                    //           status === "EXPIRED" ? "" : ""
                    //         }`}
                    //         src={scholarship.cover}
                    //         alt=""
                    //       />
                    //       <div className="relative z-10">
                    //         <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                    //           {/* isNotRenew{" "} */}
                    //           {findMatch && (
                    //             <div className="absolute z-20 inset-0  bg-black/40 dark:bg-black/60  flex justify-center items-center">
                    //               <span className="uppercase absolute shadow-md backdrop-blur-sm right-0 top-0 dark:bg-black/40 bg-white/80 text-center pl-5 pb-2.5 pr-5 py-2 rounded-bl-lg flex items-center gap-2 text-sm font-medium tracking-wide">
                    //                 {" "}
                    //                 Submitted
                    //               </span>
                    //             </div>
                    //           )}
                    //           <img
                    //             className={`h-full w-full object-cover ${
                    //               status === "EXPIRED" ? "" : ""
                    //             }`}
                    //             src={scholarship.cover}
                    //             alt=""
                    //           />
                    //         </div>
                    //         <div className=" lg:p-4 p-2 space-y-5">
                    //           <div className="flex items-start justify-start">
                    //             <div className="flex-1 lg:space-y-1">
                    //               <div className="flex justify-between items-center">
                    //                 <h3 className="font-semibold lg:text-lg text-base  text-balance leading-tight line-clamp-1">
                    //                   {scholarship.title}
                    //                 </h3>
                    //                 <Badge
                    //                   variant="secondary"
                    //                   className="uppercase"
                    //                 >
                    //                   <Landmark /> {scholarship.type}
                    //                 </Badge>
                    //               </div>
                    //               <p className="text-sm text-muted-foreground">
                    //                 {scholarship.Scholarship_Provider.name}
                    //               </p>
                    //             </div>
                    //           </div>

                    //           <div className="flex items-center justify-between text-sm text-muted-foreground ">
                    //             <div className="space-x-2">
                    //               {status === "ACTIVE" && (
                    //                 <Badge className="bg-green-800 tracking-wide text-gray-200">
                    //                   ACTIVE
                    //                 </Badge>
                    //               )}
                    //               {scholarship.phase > 1 && (
                    //                 <Badge className="bg-blue-800 text-gray-200 uppercase">
                    //                   {getPhaseLabel(scholarship.phase)}
                    //                 </Badge>
                    //               )}

                    //               {status === "EXPIRED" && (
                    //                 <Badge className="bg-red-800 text-gray-200">
                    //                   EXPIRED
                    //                 </Badge>
                    //               )}
                    //             </div>

                    //             {/* {user?.Student?.Application?.some(
                    //             (app) =>
                    //               app.scholarshipId ===
                    //               scholarship.scholarshipId
                    //           ) && (
                    //             <Badge className=" bg-blue-800 text-white">
                    //               APPLIED
                    //             </Badge>
                    //           )} */}
                    //             <span className="capitalize">
                    //               {/* {scholarship.phase > 1 &&
                    //                 `${getPhaseLabel(scholarship.phase)}`}{" "} */}
                    //               Deadline:{" "}
                    //               {format(scholarship.deadline, "MM/dd/yy")}
                    //             </span>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </Link>
                    // </motion.div>

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
                      className="shadow-sm hover:shadow-md transition-all duration-200 lg:p-1 p-0.5  rounded-lg border bg-card"
                    >
                      {/* <Link
                      href={`/user/home/applications/${scholarship.applicationId}`}
                      key={scholarship.applicationId}
                      prefetch
                      scroll={false}
                    > */}
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
                            <div className="flex gap-1.5 absolute top-0 right-2">
                              <Badge
                                variant="secondary"
                                className="mt-2 uppercase bg-blue-800 text-gray-200"
                              >
                                {" "}
                                {getPhaseLabel(data[0]?.phase)}
                              </Badge>
                              {/* <Badge
                                variant="secondary"
                                className={`mt-2 uppercase text-gray-200 ${
                                  data[0]?.deadline &&
                                  Date.now() >
                                    new Date(data[0].deadline).getTime()
                                    ? "bg-red-800"
                                    : "bg-green-800"
                                }`}
                              >
                                {data[0]?.deadline &&
                                Date.now() >
                                  new Date(data[0].deadline).getTime()
                                  ? "EXPIRED"
                                  : "ACTIVE"}
                              </Badge> */}
                            </div>

                            {findMatch && (
                              <div className="absolute top-0 -left-2 flex items-center">
                                <div
                                  className="flex items-center justify-center text-gray-200 font-medium text-sm px-7 py-1.5 bg-gradient-to-br to-green-950 from-green-800"
                                  style={{
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                  }}
                                >
                                  SUBMITTED
                                </div>
                              </div>
                            )}
                            {/* {scholarship.status && (
                              <div className="absolute top-0 -left-2 flex items-center">
                                
                                <div
                                  className="absolute"
                                  style={{
                                    width: "120px",
                                    height: "30px",
                                    background:
                                      scholarship.status === "BLOCKED"
                                        ? "rgba(0,0,0,0.5)"
                                        : scholarship.status === "APPROVED"
                                        ? "rgba(5 46 22)"
                                        : scholarship.status === "PENDING"
                                        ? "rgb(66 32 6)"
                                        : scholarship.status === "INTERVIEW"
                                        ? "rgb(23 37 84)"
                                        : scholarship.status === "DECLINED"
                                        ? "rgba(69 10 10)"
                                        : "rgba(0,0,0,0.5)",
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                    transform: "translate(0px, 0px)", // shadow offset
                                    zIndex: 0,
                                  }}
                                ></div>

                                
                                <div
                                  className="flex items-center justify-center text-gray-200 font-medium text-sm px-6 py-2"
                                  style={{
                                    width: "120px",
                                    height: "30px",
                                    background:
                                      scholarship.status === "BLOCKED"
                                        ? "rgba(0,0,0,0.5)"
                                        : scholarship.status === "APPROVED"
                                        ? "rgba(5 46 22)"
                                        : scholarship.status === "PENDING"
                                        ? "rgb(66 32 6)"
                                        : scholarship.status === "INTERVIEW"
                                        ? "rgb(23 37 84)"
                                        : scholarship.status === "DECLINED"
                                        ? "rgba(69 10 10)"
                                        : "rgba(0,0,0,0.5)",
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                    zIndex: 1,
                                  }}
                                >
                                  {scholarship.status}
                                </div>
                              </div>
                            )} */}

                            <img
                              className="h-full w-full object-cover"
                              src={scholarship.cover}
                              alt=""
                            />
                          </div>

                          <div className="p-4 space-y-6">
                            <div className="flex items-center gap-3">
                              {scholarship ? (
                                <img
                                  src={scholarship?.logo}
                                  alt={scholarship?.title}
                                  className="w-10 h-10 rounded-full object-cover border"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                  No Logo
                                </div>
                              )}{" "}
                              <div className="w-full">
                                <h3 className="font-semibold text-sm line-clamp-1">
                                  {scholarship?.title}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                  {scholarship?.Scholarship_Provider?.name ||
                                    "Unknown Provider"}
                                </p>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Deadline</span>
                                <span className="font-medium text-foreground">
                                  {scholarship?.dateCreated
                                    ? format(scholarship?.dateCreated, "PPP")
                                    : "—"}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">
                                  Scholarship Type
                                </span>
                                <span className="font-medium text-foreground">
                                  {scholarship?.type || "N/A"}
                                </span>
                              </div>
                            </div>

                            <Link
                              href={`/user/home/scholarships/${scholarship.scholarshipId}`}
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

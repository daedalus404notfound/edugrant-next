"use client";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TextSearch,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import useClientApplications from "@/hooks/user/getApplications";

import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useApplicationStore } from "@/store/applicationUsetStore";

export default function ClientScholarship() {
  const { status, setStatus } = useApplicationStore();

  const { search, page, order, setPage, setSearch, setOrder, meta } =
    useApplicationStore();

  const { data, isLoading: loadingState } = useClientApplications();

  const handleNext = () => {
    if (meta && meta.page < meta.totalPage) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (meta.page > 1) {
      setPage(page - 1);
    }
  };
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
          transition={{ duration: 0.3, delay: 0.3 }}
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
          transition={{ duration: 0.2, delay: 0.2 }}
          className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b sticky top-0 bg-background z-20"
        >
          <Tabs
            activeTab={status}
            tabs={tabs}
            onTabChange={(tabId) => setStatus(tabId)}
          />
        </motion.div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
          <motion.div
            className="flex justify-between items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <Input
              placeholder="Search Scholarship..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="max-w-sm w-full text-sm"
            />
            <Select value={order} onValueChange={(e) => setOrder(e)}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {search ? (
            <p className="text-sm">
              Showing search result for{" "}
              <strong className="underline">{search}</strong>{" "}
            </p>
          ) : (
            ""
          )}
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
            {loadingState ? (
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
              data.slice(0, 6).map((meow, index) => (
                <motion.div
                  key={meow.applicationId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
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
                                  ? "to-gray-950 from-gray-800"
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
                              {meow?.Scholarship?.Scholarship_Provider?.name ||
                                "Unknown Provider"}
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
          </div>

          <motion.div
            className="flex items-center justify-between gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <p
              className="grow text-sm text-muted-foreground"
              aria-live="polite"
            >
              Page <span className="text-foreground">{meta.page}</span> of{" "}
              <span className="text-foreground">{meta.totalPage}</span>
            </p>

            <Pagination className="w-auto">
              <PaginationContent className="gap-3">
                <PaginationItem>
                  <Button
                    variant="outline"
                    disabled={meta.page === 1 || loadingState}
                    onClick={handlePrev}
                  >
                    <ChevronLeft /> Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    disabled={
                      meta.page === meta.totalPage ||
                      meta.totalPage === 0 ||
                      loadingState
                    }
                    onClick={handleNext}
                  >
                    Next
                    <ChevronRight />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
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
// "use client";
// import { AnimatePresence, motion } from "motion/react";
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   TextSearch,
// } from "lucide-react";

// import { useEffect, useState } from "react";
// import { Tabs } from "@/components/ui/vercel-tabs";
// import useClientApplications from "@/hooks/user/getApplications";

// import { format } from "date-fns";
// import { Input } from "@/components/ui/input";
// import TitleReusable from "@/components/ui/title";
// import { Skeleton } from "@/components/ui/skeleton";
// import NoDataFound from "@/components/ui/nodata";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination";
// import socket from "@/lib/socketLib";

// export default function ClientScholarship() {
//   const [sort, setSort] = useState("asc");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     setStatus(params.get("status") || "PENDING");
//   }, []);

//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(6);

//   const { data, loadingState, meta, setMeta, setData, status, setStatus } =
//     useClientApplications({
//       page,
//       pageSize: rowsPerPage,
//       search,
//       sortBy: sort ? "dateCreated" : "",
//       order: sort,
//     });

//   useEffect(() => {
//     socket.on("approveApplication", (data) => {
//       console.log(data);
//       setData((prev) => {
//         const approved = data.approvedApplication;
//         const blockedIds = data.blockedApplicationIDs;
//         const blockedIdsLength = data.blockedApplicationIDs.length;
//         const isSameTab = approved.status === status;
//         const filtered = prev.filter(
//           (a) =>
//             a.applicationId !== approved.applicationId &&
//             !blockedIds.includes(a.applicationId)
//         );

//         if (isSameTab) {
//           return [approved, ...filtered];
//         }
//         return filtered;
//       });
//     });

//     socket.on("declineApplication", (data) => {
//       setData((prev) => {
//         const decline = data.declineApplication;
//         const isSameTab = decline.status === status;
//         const filtered = prev.filter(
//           (a) => a.applicationId !== decline.applicationId
//         );
//         if (isSameTab) {
//           return [decline, ...filtered];
//         }
//         return filtered;
//       });
//     });

//     socket.on("forInterview", (data) => {
//       setData((prev) => {
//         const interview = data.interviewApplication;
//         const isSameTab = interview.status === status;
//         const filtered = prev.filter(
//           (a) => a.applicationId !== interview.applicationId
//         );
//         if (isSameTab) {
//           return [interview, ...filtered];
//         }
//         return filtered;
//       });
//     });

//     return () => {
//       socket.off("approveApplication");
//       socket.off("declineApplication");
//       socket.off("forInterview");
//     };
//   }, [status, setData]);
//   const handleNext = () => {
//     if (meta && meta.page < meta.totalPage) {
//       setPage((prev) => prev + 1);
//     }
//   };
//   const handlePrev = () => {
//     if (meta.page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };
//   const tabs = [
//     {
//       id: "PENDING",
//       label: "Pending",
//       indicator: meta.counts.PENDING ? meta.counts.PENDING : null,
//     },
//     {
//       id: "INTERVIEW",
//       label: "For Interview",
//       indicator: meta.counts.INTERVIEW ? meta.counts.INTERVIEW : null,
//     },
//     {
//       id: "APPROVED",
//       label: "Approved",
//       indicator: meta.counts.APPROVED ? meta.counts.APPROVED : null,
//     },
//     {
//       id: "DECLINED",
//       label: "Declined",
//       indicator: meta.counts.DECLINED ? meta.counts.DECLINED : null,
//     },
//     {
//       id: "BLOCKED",
//       label: "Restricted",
//       indicator: meta.counts.BLOCKED ? meta.counts.BLOCKED : null,
//     },
//   ];

//   return (
//     <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
//       <div className="mx-auto w-[95%] lg:py-10  py-4">
//         <motion.div
//           className="flex justify-between items-end"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3, delay: 0.3 }}
//         >
//           <TitleReusable
//             title="My Applications"
//             description="Track and manage your submitted scholarship applications."
//             Icon={TextSearch}
//           />
//         </motion.div>

//         {/* <div className="flex gap-2 mt-5">
//           <div className="flex-1">
//             <Input placeholder="Search..." />
//           </div>
//           <Button variant="secondary">
//             <MoreHorizontal />
//           </Button>
//         </div> */}

//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.2, delay: 0.2 }}
//           className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b"
//         >
//           <Tabs
//             activeTab={status}
//             tabs={tabs}
//             onTabChange={(tabId) => setStatus(tabId)}
//           />
//         </motion.div>
//         <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
//           {(data.length !== 0 || loadingState) && (
//             <motion.div
//               className="flex justify-between items-center gap-2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2, delay: 0.4 }}
//             >
//               <Input
//                 placeholder="Search Scholarship..."
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="max-w-sm w-full text-sm"
//               />
//               <Select value={sort} onValueChange={(e) => setSort(e)}>
//                 <SelectTrigger className="text-sm">
//                   <SelectValue placeholder="Sort" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="asc">Newest</SelectItem>
//                   <SelectItem value="desc">Oldest</SelectItem>
//                 </SelectContent>
//               </Select>
//             </motion.div>
//           )}
//           {search ? (
//             <p className="text-sm">
//               Showing search result for{" "}
//               <strong className="underline">{search}</strong>{" "}
//             </p>
//           ) : (
//             ""
//           )}
//           <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
//             {loadingState ? (
//               [...Array(3)].map((_, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{
//                     duration: 0.2,
//                     delay: index * 0.05,
//                     ease: "easeOut",
//                   }}
//                   className="shadow-sm rounded-lg border bg-card p-1"
//                 >
//                   <div className="rounded-lg bg-background overflow-hidden">
//                     <Skeleton className="aspect-[16/8.5] w-full rounded-md" />

//                     <div className="p-4 space-y-6">
//                       <div className="flex items-center gap-3">
//                         <Skeleton className="w-10 h-10 rounded-full" />
//                         <div className="flex-1 space-y-2">
//                           <Skeleton className="h-4 w-3/4" />
//                           <Skeleton className="h-3 w-1/2" />
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <Skeleton className="h-3 w-24" />
//                           <Skeleton className="h-3 w-28" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <Skeleton className="h-3 w-24" />
//                           <Skeleton className="h-3 w-16" />
//                         </div>
//                       </div>

//                       <Skeleton className="h-10 w-full rounded-md" />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : data.length === 0 ? (
//               <NoDataFound />
//             ) : (
//               data.map((meow, index) => (
//                 <motion.div
//                   key={meow.applicationId}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{
//                     duration: 0.2,
//                     delay: index * 0.1,
//                     ease: "easeOut",
//                   }}
//                   className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
//                 >
//                   {/* <Link
//                       href={`/user/home/applications/${meow.applicationId}`}
//                       key={meow.applicationId}
//                       prefetch
//                       scroll={false}
//                     > */}
//                   <div className="relative rounded-lg bg-background overflow-hidden">
//                     <img
//                       className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
//                         status === "EXPIRED" ? "" : ""
//                       }`}
//                       src={meow.Scholarship.cover}
//                       alt=""
//                     />
//                     <div className="relative z-10">
//                       <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
//                         {/* <div className="flex gap-1.5 absolute top-0 right-2">
//                             <Badge
//                               variant="outline"
//                               className="mt-2 uppercase bg-blue-800 text-gray-200"
//                             >
//                               {" "}
//                               {getPhaseLabel(data[0]?.Scholarship?.phase)}
//                             </Badge>
//                             <Badge
//                               variant="outline"
//                               className={`mt-2 uppercase text-gray-200 ${
//                                 data[0]?.Scholarship?.deadline &&
//                                 Date.now() >
//                                   new Date(
//                                     data[0].Scholarship.deadline
//                                   ).getTime()
//                                   ? "bg-red-800"
//                                   : "bg-green-800"
//                               }`}
//                             >
//                               {data[0]?.Scholarship?.deadline &&
//                               Date.now() >
//                                 new Date(data[0].Scholarship.deadline).getTime()
//                                 ? "EXPIRED"
//                                 : "ACTIVE"}
//                             </Badge>
//                           </div> */}
//                         {meow.status && (
//                           <div className="absolute top-0 -left-2 flex items-center">
//                             <div
//                               className={`flex items-center justify-center text-gray-200 font-medium text-sm px-7 py-1.5 bg-gradient-to-br  ${
//                                 meow.status === "BLOCKED"
//                                   ? "to-green-950 from-green-800"
//                                   : meow.status === "APPROVED"
//                                   ? "to-green-950 from-green-800"
//                                   : meow.status === "PENDING"
//                                   ? "to-yellow-950 from-yellow-800"
//                                   : meow.status === "INTERVIEW"
//                                   ? "to-blue-950 from-blue-800"
//                                   : meow.status === "DECLINED"
//                                   ? "to-red-950 from-red-800"
//                                   : "to-gray-950 from-gray-800"
//                               }`}
//                               style={{
//                                 clipPath:
//                                   "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
//                               }}
//                             >
//                               {meow.status}
//                             </div>
//                           </div>
//                         )}

//                         <img
//                           className="h-full w-full object-cover"
//                           src={meow.Scholarship.cover}
//                           alt=""
//                         />
//                       </div>

//                       <div className="p-4 space-y-6">
//                         <div className="flex items-center gap-3">
//                           {meow.Scholarship ? (
//                             <img
//                               src={meow?.Scholarship?.logo}
//                               alt={meow?.Scholarship?.title}
//                               className="w-10 h-10 rounded-full object-cover border"
//                             />
//                           ) : (
//                             <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
//                               No Logo
//                             </div>
//                           )}{" "}
//                           <div className="w-full">
//                             <h3 className="font-semibold text-sm line-clamp-1">
//                               {meow?.Scholarship?.title}
//                             </h3>

//                             <p className="text-sm text-muted-foreground">
//                               {meow?.Scholarship?.Scholarship_Provider?.name ||
//                                 "Unknown Provider"}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Details */}
//                         <div className="flex flex-col gap-1 text-sm text-muted-foreground">
//                           <div className="flex items-center justify-between">
//                             <span className="text-xs">Application Date:</span>
//                             <span className="font-medium text-foreground">
//                               {meow?.dateCreated
//                                 ? format(meow?.dateCreated, "PPP")
//                                 : "—"}
//                             </span>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <span className="text-xs">Scholarship Type:</span>
//                             <span className="font-medium text-foreground">
//                               {meow?.Scholarship?.type || "N/A"}
//                             </span>
//                           </div>
//                         </div>

//                         <Link
//                           href={`/user/home/applications/${meow.applicationId}`}
//                           prefetch={true}
//                           scroll={false}
//                         >
//                           <Button className="w-full">
//                             View Details <ArrowRight />
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   {/* </Link> */}
//                 </motion.div>
//               ))
//             )}
//           </div>
//           {(data.length !== 0 || loadingState) && (
//             <motion.div
//               className="flex items-center justify-between gap-3"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2, delay: 0.4 }}
//             >
//               <p
//                 className="grow text-sm text-muted-foreground"
//                 aria-live="polite"
//               >
//                 Page <span className="text-foreground">{meta.page}</span> of{" "}
//                 <span className="text-foreground">{meta.totalPage}</span>
//               </p>

//               <Pagination className="w-auto">
//                 <PaginationContent className="gap-3">
//                   <PaginationItem>
//                     <Button
//                       variant="outline"
//                       disabled={meta.page === 1 || loadingState}
//                       onClick={handlePrev}
//                     >
//                       <ChevronLeft /> Previous
//                     </Button>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <Button
//                       variant="outline"
//                       disabled={
//                         meta.page === meta.totalPage ||
//                         meta.totalPage === 0 ||
//                         loadingState
//                       }
//                       onClick={handleNext}
//                     >
//                       Next
//                       <ChevronRight />
//                     </Button>
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// //  <div
// //    key={meow.scholarshipId}
// //    className="group relative flex flex-col justify-between  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-md p-1 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 "
// //  >
// //    <img
// //      className="w-full object-cover aspect-[16/10] rounded-md opacity-50"
// //      src={meow.Scholarship.cover}
// //      alt=""
// //    />
// //    {/* Logo + Provider */}
// //    <div className="p-4 space-y-6">
// //      <div className="flex items-center gap-3">
// //        {meow.Scholarship ? (
// //          <img
// //            src={meow?.Scholarship?.logo}
// //            alt={meow?.Scholarship?.title}
// //            className="w-10 h-10 rounded-full object-cover border"
// //          />
// //        ) : (
// //          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
// //            No Logo
// //          </div>
// //        )}
// //        <div>
// //          <h3 className="font-semibold text-sm line-clamp-1">
// //            {meow?.Scholarship?.title}
// //          </h3>
// //          <p className="text-sm text-muted-foreground">
// //            {meow?.Scholarship?.Scholarship_Provider?.name || "Unknown Provider"}
// //          </p>
// //        </div>
// //      </div>

// //      {/* Details */}
// //      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
// //        <div className="flex items-center justify-between">
// //          <span className="text-xs">Deadline:</span>
// //          <span className="font-medium text-foreground">
// //            {meow?.Scholarship?.deadline
// //              ? format(meow?.Scholarship?.deadline, "PPP")
// //              : "—"}
// //          </span>
// //        </div>
// //        <div className="flex items-center justify-between">
// //          <span className="text-xs">Required GWA:</span>
// //          <span className="font-medium text-foreground">
// //            {meow?.Scholarship?.requiredGWA || "N/A"}
// //          </span>
// //        </div>
// //      </div>

// //      <Link href={`/user/home/scholarships/${meow?.Scholarship?.scholarshipId}`}>
// //        <Button className="w-full">
// //          View Details <ArrowRight />
// //        </Button>
// //      </Link>
// //    </div>
// //  </div>;

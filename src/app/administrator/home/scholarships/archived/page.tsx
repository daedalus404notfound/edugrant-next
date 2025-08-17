"use client";
// import { Ring } from "ldrs/react";
// import "ldrs/react/Ring.css";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination";
// import { Badge } from "@/components/ui/badge";

// import useScholarshipData from "@/hooks/admin/getScholarship";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Archive,
//   ChevronFirstIcon,
//   ChevronLastIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { motion } from "motion/react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// const headers = [
//   { label: "Scholarship " },
//   { label: "Start Date" },
//   { label: "Deadline" },
//   { label: "Status" },
//   { label: "Approved" },
//   { label: "Applicants" },
// ];
// const tabs = [
//   { id: "APPROVE", label: "Expired", indicator: "" },
//   { id: "DECLINE", label: "Deleted", indicator: "" },
// ];

// import { Tabs } from "@/components/ui/vercel-tabs";

export default function Manage() {
  // const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>123</>
    // <div className="min-h-screen px-4 relative z-10">

    //   <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
    //     <motion.span
    //       className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
    //       text-2xl font-semibold flex items-center gap-1.5
    //       "
    //       initial={{ backgroundPosition: "200% 0" }}
    //       animate={{ backgroundPosition: "-200% 0" }}
    //       transition={{
    //         repeat: Infinity,
    //         repeatType: "loop",
    //         duration: 7,
    //         ease: "linear",
    //       }}
    //     >
    //       <Archive strokeWidth={3} />
    //       Archived
    //     </motion.span>
    //     <p className="text-sm text-gray-300 mt-1">
    //       Browse the list of active scholarships. Use the available actions to
    //       modify or remove entries.
    //     </p>

    //     <div className="flex justify-between items-center mt-8">
    //       <Tabs tabs={tabs} />
    //     </div>
    //     <div className="container mx-auto space-y-3 mt-5">
    //       <Table>
    //         {/* <TableCaption>A list of active scholarships.</TableCaption> */}
    //         <TableHeader>
    //           <TableRow>
    //             {headers.map((header) => (
    //               <TableHead
    //                 className={
    //                   header.label === "Approved" ||
    //                   header.label === "Applicants"
    //                     ? "text-center"
    //                     : ""
    //                 }
    //                 key={header.label}
    //               >
    //                 {header.label}
    //               </TableHead>
    //             ))}
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {loading ? (
    //             <TableRow>
    //               <TableCell
    //                 colSpan={headers.length + 2}
    //                 className="text-center"
    //               >
    //                 <Ring size={30} speed={2} bgOpacity={0} color="yellow" />
    //               </TableCell>
    //             </TableRow>
    //           ) : data.length > 0 ? (
    //             data.map((row) => (
    //               <TableRow
    //                 key={row.scholarshipId}
    //                 onClick={() =>
    //                   router.push(
    //                     `/administrator/home/manage/${row.scholarshipId}`
    //                   )
    //                 }
    //               >
    //                 <TableCell className="flex gap-2.5 items-center">
    //                   <img
    //                     className="size-9 object-cover rounded-full"
    //                     src={row.scholarshipLogo}
    //                     alt=""
    //                   />
    //                   <div className="space-y-1">
    //                     <p className="font-semibold">{row.scholarshipTitle}</p>
    //                     <p className="text-xs"> {row.scholarshipProvider}</p>
    //                   </div>
    //                 </TableCell>
    //                 <TableCell className="">
    //                   {row.scholarshipDealine &&
    //                     format(
    //                       row.scholarshipDealine,
    //                       "MMM d, yyyy 'at' h:mm a"
    //                     )}
    //                 </TableCell>
    //                 <TableCell className="">
    //                   {row.scholarshipDealine &&
    //                     format(
    //                       row.scholarshipDealine,
    //                       "MMM d, yyyy 'at' h:mm a"
    //                     )}
    //                 </TableCell>
    //                 <TableCell className="">
    //                   <Badge className="bg-red-900 text-gray-300">
    //                     Expired
    //                   </Badge>
    //                 </TableCell>
    //                 <TableCell className="text-center">
    //                   {row.totalApproved}
    //                 </TableCell>
    //                 <TableCell className="text-center">
    //                   {row.totalApplicants}
    //                 </TableCell>
    //               </TableRow>
    //             ))
    //           ) : (
    //             <TableRow>
    //               <TableCell
    //                 colSpan={headers.length + 2}
    //                 className="text-center"
    //               >
    //                 No result found.
    //               </TableCell>
    //             </TableRow>
    //           )}
    //         </TableBody>
    //       </Table>
    //       {data.length !== 0 && (
    //         <div className="flex items-center justify-between gap-8">
    //           {/* Results per page */}
    //           <div className="flex items-center gap-3">
    //             <Label className="max-sm:sr-only">Rows per page</Label>
    //             <Select
    //               onValueChange={(value) => {
    //                 setRowsPerPage(Number(value));
    //                 setCurrentPage(1);
    //               }}
    //               value={rowsPerPage.toString()}
    //             >
    //               <SelectTrigger size="sm" className="w-fit whitespace-nowrap">
    //                 <SelectValue placeholder="Select number of results" />
    //               </SelectTrigger>
    //               <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
    //                 {[1, 5, 10, 25, 50].map((pageSize) => (
    //                   <SelectItem key={pageSize} value={pageSize.toString()}>
    //                     {pageSize}
    //                   </SelectItem>
    //                 ))}
    //               </SelectContent>
    //             </Select>
    //           </div>
    //           {/* Page number information */}
    //           <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
    //             <p
    //               className="text-muted-foreground text-sm whitespace-nowrap"
    //               aria-live="polite"
    //             >
    //               <span className="text-foreground">{currentPage}</span> of{" "}
    //               <span className="text-foreground">{totalPages}</span>
    //             </p>
    //           </div>

    //           {/* Pagination buttons */}

    //           <div>
    //             <Pagination>
    //               <PaginationContent>
    //                 {/* First */}
    //                 <PaginationItem>
    //                   <Button
    //                     size="icon"
    //                     variant="outline"
    //                     onClick={() => setCurrentPage(1)}
    //                     disabled={currentPage === 1}
    //                     aria-label="Go to first page"
    //                   >
    //                     <ChevronFirstIcon size={16} />
    //                   </Button>
    //                 </PaginationItem>

    //                 {/* Previous */}
    //                 <PaginationItem>
    //                   <Button
    //                     size="icon"
    //                     variant="outline"
    //                     onClick={() =>
    //                       setCurrentPage((prev) => Math.max(prev - 1, 1))
    //                     }
    //                     disabled={currentPage === 1}
    //                     aria-label="Go to previous page"
    //                   >
    //                     <ChevronLeftIcon size={16} />
    //                   </Button>
    //                 </PaginationItem>

    //                 {/* Next */}
    //                 <PaginationItem>
    //                   <Button
    //                     size="icon"
    //                     variant="outline"
    //                     onClick={() =>
    //                       setCurrentPage((prev) =>
    //                         Math.min(prev + 1, totalPages)
    //                       )
    //                     }
    //                     disabled={currentPage === totalPages}
    //                     aria-label="Go to next page"
    //                   >
    //                     <ChevronRightIcon size={16} />
    //                   </Button>
    //                 </PaginationItem>

    //                 {/* Last */}
    //                 <PaginationItem>
    //                   <Button
    //                     size="icon"
    //                     variant="outline"
    //                     onClick={() => setCurrentPage(totalPages)}
    //                     disabled={currentPage === totalPages}
    //                     aria-label="Go to last page"
    //                   >
    //                     <ChevronLastIcon size={16} />
    //                   </Button>
    //                 </PaginationItem>
    //               </PaginationContent>
    //             </Pagination>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}

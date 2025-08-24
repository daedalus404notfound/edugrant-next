"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Share2,

  TextSearch,

} from "lucide-react";
import Link from "next/link";
const tabs = [
  { id: "ACTIVE", label: "Active", indicator: "" },
  { id: "EXPIRED", label: "Expired", indicator: "" },
];
import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Badge } from "@/components/ui/badge";
import useScholarshipData from "@/hooks/user/getScholarship";
import { Skeleton } from "@/components/ui/skeleton";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");

  const { data, loading } = useScholarshipData({
    page: currentPage,
    pageSize: rowsPerPage,
    sortBy: sort,
    order: "",
  });
  console.log(data, loading);

  return (
    <div className="z-10 min-h-screen bg-background px-4 ">
      <div className="mx-auto w-[95%] pt-10">
        <div className="flex justify-between items-end">
          <div>
            <motion.span
              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                      text-2xl font-semibold flex items-center gap-1.5
                      "
              initial={{ backgroundPosition: "200% 0" }}
              animate={{ backgroundPosition: "-200% 0" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 7,
                ease: "linear",
              }}
            >
              <TextSearch /> Available Scholarships
            </motion.span>
            <p className="text-sm mt-1">
              Discover scholarship opportunities. Browse, filter, and apply for
              financial aid that supports your education.
            </p>
          </div>
        </div>
        <div className="py-8 space-y-8">
          <div className="flex justify-between items-center">
            <Tabs tabs={tabs} />
            <Select onValueChange={(value) => setSort(value as "asc" | "desc")}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Title A-Z</SelectItem>
                <SelectItem value="desc">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4">
            {loading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="p-2 bg-background/40 relative rounded-md border space-y-3"
                  >
                    <Skeleton className="aspect-[16/8.5]" />
                    <Skeleton className="h-10" />
                    <div className="flex gap-3 h-11">
                      <Skeleton className="flex-1" />
                      <Skeleton className="flex-1" />
                      <Skeleton className="flex-1" />
                    </div>
                  </div>
                ))
              : data.map((scholarship) => (
                  <div
                    key={scholarship.scholarshipId}
                    className="relative flex flex-col  rounded-lg overflow-hidden p-2 gap-3 bg-card dark:bg-black  shadow-md"
                  >
                    <img
                      className="absolute h-full w-full left-0 top-0 object-cover   opacity-15  mask-gradient blur-xs "
                      src={scholarship.scholarshipCover}
                      alt=""
                    />
                    <div className="relative aspect-[16/8.5] w-full rounded-t-md overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r  from-black/40 via-black/20 to-black/50 " />
                      <img
                        className="h-full w-full object-cover    "
                        src={scholarship.scholarshipCover}
                        alt=""
                      />
                      {/* <img
                      src={scholarship.scholarshipLogo}
                      className="rounded-full size-12 object-cover"
                      alt=""
                    /> */}
                    </div>

                    <div className="flex-1 space-y-1 z-10 px-2">
                      <div className="flex items-center gap-1.5 justify-between">
                        <h1 className="font-semibold text-lg line-clamp-1 ">
                          {scholarship.scholarshipTitle}
                        </h1>
                        <Badge className="bg-green-800 text-gray-200">
                          Active
                        </Badge>
                      </div>
                      <h3 className="text-sm">
                        {scholarship.scholarshipProvider}
                      </h3>
                    </div>

                    <div className="flex gap-2 bg-background rounded-md  p-1.5  border-background z-10">
                      <Link
                        href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                        prefetch
                        className="flex-1"
                        scroll={false}
                      >
                        <Button size="lg" variant="ghost" className="w-full">
                          View Details 
                        </Button>
                      </Link>

                      <Button size="lg" variant="ghost" className="flex-1">
                        Apply Now
                      </Button>
                      <Button size="lg" variant="ghost" className="flex-1">
                        <Share2 />
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "../dynamic-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Share2, TextSearch } from "lucide-react";
import Link from "next/link";

import useScholarshipUserData from "@/hooks/user/getScholarship";
import { useState } from "react";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const path = usePathname();
  const segmentedPath = path.split("/");
  const { data, loading } = useScholarshipUserData({
    currentPage,
    rowsPerPage,
    sort,
  });
  console.log(data, loading);

  return (
    <div className="z-10 min-h-screen background px-4 ">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />

      <div className="mx-auto w-[95%] pt-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-semibold flex gap-2 items-center">
              <TextSearch /> Available Scholarships
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Discover scholarship opportunities. Browse, filter, and apply for
              financial aid that supports your education..
            </p>
          </div>
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

        <div className=" py-10 grid lg:grid-cols-3 grid-cols-1 gap-8">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="p-2 bg-background/40 relative rounded-md border"
                ></div>
              ))
            : data.map((scholarship) => (
                <Link
                  href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                  key={scholarship.scholarshipId}
                  prefetch
                  scroll={false}
                  className="relative flex flex-col shadow-md shadow-black/20   rounded-lg overflow-hidden bg-card dark:bg-background/40 border-background border"
                >
                  <div className="aspect-[16/8.5] w-full overflow-hidden px-2 pt-2">
                    <img
                      className="h-full w-full object-cover  rounded-md shadow-md shadow-black/20 border-background border"
                      src={scholarship.scholarshipCover}
                      alt=""
                    />
                    {/* <img
                      src={scholarship.scholarshipLogo}
                      className="rounded-full size-12 object-cover"
                      alt=""
                    /> */}
                  </div>

                  <div className="p-4">
                    <h1 className="font-semibold text-lg text-green-800">
                      {scholarship.scholarshipTitle}
                    </h1>
                    <h3 className="text-sm">
                      {scholarship.scholarshipProvider}
                    </h3>
                  </div>

                  <div className="flex gap-3 bg-background/80  p-1.5 border-t border-background z-10">
                    <Button size="lg" variant="ghost" className="flex-1">
                      Details
                    </Button>
                    <Button size="lg" variant="ghost" className="flex-1">
                      Apply
                    </Button>
                    <Button size="lg" variant="ghost" className="flex-1">
                      <Share2 />
                    </Button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

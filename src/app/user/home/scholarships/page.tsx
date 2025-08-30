"use client";

import { motion } from "motion/react";

import {
  Building,
  Building2,
  Ellipsis,
  Ghost,
  PhilippinePeso,
  TextSearch,
} from "lucide-react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import { TourTrigger } from "@/components/tour/tour-trigger";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const frameworks = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
];
import Link from "next/link";
const tabs = [
  { id: "ACTIVE", label: "Active", indicator: "" },
  { id: "EXPIRED", label: "Expired", indicator: "" },
];
const scholarshipTypes = [
  { label: "Government", value: "government", icon: Building2 },
  { label: "Private", value: "private", icon: Building },
];
type Filter = {
  id: string;
  value: string[];
};
import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Badge } from "@/components/ui/badge";
import useScholarshipData from "@/hooks/user/getScholarship";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import { DataTableFacetedFilterClient } from "./faceted";
import TitleReusable from "@/components/ui/title";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [status, setStatus] = useState("ACTIVE");
  const { filter } = useGetFilter({ scholarshipStatus: status });
  const provider =
    filter?.getScholarshipsFilters?.scholarshipProvider?.map((meow) => ({
      label: meow,
      value: meow,
      icon: PhilippinePeso,
    })) ?? [];

  const formatFilters = () => {
    const filterArray: Filter[] = [];

    if (selectedProviders.length > 0) {
      filterArray.push({
        id: "scholarshipProvider",
        value: selectedProviders,
      });
    }
    if (selectedTypes.length > 0) {
      filterArray.push({
        id: "scholarshipType",
        value: selectedTypes,
      });
    }

    return filterArray.length > 0 ? JSON.stringify(filterArray) : "";
  };

  const { data, loading } = useScholarshipData({
    page: currentPage,
    pageSize: rowsPerPage,
    sortBy: "scholarshipTitle",
    order: value,
    search: search,
    status: status,
    filters: formatFilters(),
  });
  console.log(data, loading);
  const scholarshipTourSteps: TourStepType[] = [
    {
      id: "search",
      title: "Search Scholarships",
      description:
        "Use this search bar to find scholarships by name, keyword, or criteria.",
    },
    {
      id: "filters",
      title: "Filter Options",
      description:
        "Apply filters to narrow down scholarships based on your preferences.",
    },
    {
      id: "sort",
      title: "Sort Options",
      description:
        "Apply sort to narrow down scholarships based on your preferences.",
    },
    {
      id: "tabs",
      title: "Active vs Expired",
      description:
        "Switch between active scholarships you can apply for and expired ones.",
    },
    {
      id: "cards",
      title: "Scholarship Cards",
      description:
        "Browse through available scholarships. Click on any card to view details.",
    },
  ];
  return (
    <TourProvider steps={scholarshipTourSteps}>
      <div className="z-10  bg-background lg:px-4   ">
        <div className="mx-auto w-[95%] lg:pt-10  pt-3">
          <div className="flex justify-between items-end">
            <TitleReusable
              title="Available Scholarships"
              description=" Discover scholarship opportunities. Browse, filter, and apply."
              Icon={TextSearch}
            />
          </div>
          <div className="py-8 space-y-8">
            <div className="flex flex-col lg:flex-row justify-between  w-full gap-3">
              <div className="flex items-center  gap-3 flex-col lg:flex-row">
                <div className=" flex gap-2 w-full">
                  <TourStep stepId="search" className="w-full">
                    <Input
                      className="w-full lg:w-md bg-background"
                      type="search"
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search Scholarship Title..."
                    />
                  </TourStep>
                  <Button
                    className="lg:hidden"
                    onClick={() => setHide(!hide)}
                    variant="secondary"
                  >
                    <Ellipsis />
                  </Button>
                </div>
                <TourStep
                  stepId="filters"
                  className={`w-full ${hide ? "flex" : "hidden"} lg:flex`}
                >
                  <div className="flex gap-2 w-full">
                    <DataTableFacetedFilterClient
                      title="Provider"
                      options={provider}
                      selectedValues={selectedProviders}
                      onChange={setSelectedProviders}
                    />
                    <DataTableFacetedFilterClient
                      title="Type"
                      options={scholarshipTypes}
                      selectedValues={selectedTypes}
                      onChange={setSelectedTypes}
                    />
                  </div>
                </TourStep>
              </div>
              <div
                className={` ${hide ? "flex" : "hidden"} lg:flex`}
                // className="flex items-center  gap-2 "
              >
                <TourStep stepId="sort" className=" flex-1 flex gap-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="flex-1">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full"
                        size="sm"
                      >
                        <ChevronsUpDown />
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Sort"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <TourTrigger className="flex-1" />
                </TourStep>
              </div>
            </div>
            <div className="flex">
              <TourStep stepId="tabs">
                <Tabs
                  tabs={tabs}
                  onTabChange={(tabsId) => setStatus(tabsId)}
                  className="bg-background rounded-md"
                />
              </TourStep>
            </div>

            <TourStep stepId="cards">
              <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4">
                {loading ? (
                  [...Array(3)].map((_, index) => (
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
                ) : data.length === 0 ? (
                  <div className="col-span-3 flex justify-center items-center mt-20">
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center space-y-3">
                      {/* Icon container with border and backdrop blur */}
                      <div className="size-18 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Ghost className="w-8 h-8 text-white/70" />
                      </div>

                      <div className="space-y-1 text-center">
                        {/* Title */}
                        <h3 className="text-lg font-bold">
                          No sholarship found.
                        </h3>

                        {/* Description */}
                        <p className=" text-center max-w-sm leading-relaxed text-sm text-muted-foreground">
                          The void stares back. Your search query returned zero
                          results.
                        </p>
                      </div>
                      {/* Action button */}
                    </div>
                  </div>
                ) : (
                  data.map((scholarship) => (
                    <div
                      key={scholarship.scholarshipId}
                      className="relative flex flex-col border  rounded-lg overflow-hidden lg:p-2 p-1 gap-3  bg-background  shadow-md"
                    >
                      <img
                        className="absolute h-full w-full left-0 top-0 object-cover   opacity-15  mask-gradient blur-xs "
                        src={scholarship.scholarshipCover}
                        alt=""
                      />
                      <div className="relative aspect-[16/8.5] w-full rounded-t-md overflow-hidden">
                        {/* <div className="absolute inset-0 bg-gradient-to-r  from-black/40 via-black/20 to-black/50 " /> */}
                        <img
                          className="h-full w-full object-cover    "
                          src={scholarship.scholarshipCover}
                          alt=""
                        />
                      </div>

                      <div className="flex-1 lg:space-y-1 z-10 lg:px-2 px-1">
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
                          <Button size="sm" variant="ghost" className="w-full">
                            View Details
                          </Button>
                        </Link>

                        <Button size="sm" variant="ghost" className="flex-1">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TourStep>
          </div>
        </div>
      </div>
    </TourProvider>
  );
}

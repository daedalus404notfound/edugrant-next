"use client";

import { motion } from "motion/react";

import {
  ArrowRightIcon,
  Building,
  Building2,
  CheckCheck,
  CheckCircle,
  Ellipsis,
  Ghost,
  Lock,
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
  { id: "ACTIVE", label: "Ongoing", indicator: null },
  { id: "RENEW", label: "For Renewal", indicator: null },
  { id: "EXPIRED", label: "Closed", indicator: null },
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
import { format } from "date-fns";
import NoDataFound from "@/components/ui/nodata";
import { useUserStore } from "@/store/useUserStore";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
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
    filter?.getScholarshipsFilters?.provider?.map((meow: string) => ({
      label: meow,
      value: meow,
      icon: PhilippinePeso,
    })) ?? [];
  const { user } = useUserStore();
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
    accountId: user?.accountId.toString(),
  });

  const { percentage, completed } = getFamilyBackgroundProgress(user?.Student);
  const familyLength = Object.keys(user?.Student.familyBackground || {}).length;
  console.log("dsds", familyLength);
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
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {!completed && <div className="absolute inset-0 z-20 bg-black/80 "></div>}
      <div className="mx-auto w-[95%] lg:pt-10  pt-3">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Available Scholarships"
            description="View the list of scholarships currently open for application."
            Icon={TextSearch}
          />
        </div>
        <div className="py-8 space-y-8">
          {!completed && (
            <div className=" z-20 dark bg-muted rounded-md text-foreground px-4 py-3 sticky top-20">
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div className="flex grow gap-3">
                  <Lock
                    className="mt-0.5 shrink-0 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
                    <p className="text-sm">
                      Please complete your profile details to unlock the
                      scholarship and apply.
                    </p>
                    <Link
                      href="/user/home/profile"
                      prefetch={true}
                      scroll={false}
                      className="group text-sm font-medium whitespace-nowrap underline"
                    >
                      View Profile
                      <ArrowRightIcon
                        className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                        size={16}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <div className="flex flex-col lg:flex-row justify-between  w-full gap-3">
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
            </div> */}

          <div className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar ">
            <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
          </div>

          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
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
              <NoDataFound />
            ) : (
              data.map((scholarship) => {
                const findMatch = user?.Student.Application.find(
                  (meow) => meow.scholarshipId === scholarship?.scholarshipId
                );
                const isNotRenew =
                  user?.Student.Application.find(
                    (meow) => meow.scholarshipId === scholarship?.scholarshipId
                  )?.status !== "RENEW";
                return (
                  <Link
                    href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                    prefetch
                    scroll={false}
                    key={scholarship.scholarshipId}
                    className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
                  >
                    <div className="relative rounded-lg bg-background ">
                      <img
                        className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                          status === "EXPIRED" ? "" : ""
                        }`}
                        src={scholarship.cover}
                        alt=""
                      />
                      <div className="relative z-10">
                        <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                          {findMatch && isNotRenew && (
                            <div className="absolute z-20 inset-0 bg-black/60 flex justify-center items-center">
                              <span className="absolute top-3 right-0 bg-black/40 text-center pl-4 pr-6 py-2 rounded-l-lg flex items-center gap-2 text-sm font-medium">
                                {" "}
                                Applied
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
                                <h3 className="font-semibold lg:text-lg text-base  text-balance leading-tight">
                                  {scholarship.title}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="uppercase"
                                >
                                  {scholarship.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.Scholarship_Provider.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground ">
                            <div className="space-x-2">
                              {(status === "ACTIVE" || status === "RENEW") && (
                                <Badge className="bg-green-800 text-gray-200">
                                  ACTIVE
                                </Badge>
                              )}
                              {scholarship.renew === true && (
                                <Badge className="bg-blue-800 text-gray-200">
                                  RENEWAL
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
                            <span>
                              {scholarship.renew === true && "Renewal"}{" "}
                              Deadline:{" "}
                              {format(scholarship.deadline, "MM/dd/yy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

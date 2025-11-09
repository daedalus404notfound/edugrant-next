"use client";

import { useEffect, useId, useState } from "react";

import useGetCSVDisplay from "@/hooks/admin/getCSVdisplay";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import TitleReusable from "@/components/ui/title";
import { Activity, Loader, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFetchApplicationCSV from "@/hooks/admin/getApplicationCSV";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
export default function GenerateReport() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const query = useGetCSVDisplay(selectedFilters);
  const [filename, setFilename] = useState("");
  const selectedExport = [
    { id: "scholarship", value: selectedFilters["scholarship"] },
    { id: "applicationStatus", value: selectedFilters["applicationStatus"] },
    { id: "studentInstitute", value: selectedFilters["studentInstitute"] },
    { id: "studentCourse", value: selectedFilters["studentCourse"] },
    { id: "studentYear", value: selectedFilters["studentYear"] },
    { id: "studentSection", value: selectedFilters["studentSection"] },
  ].filter((item) => item.value && item.value.length > 0);

  console.log("selectedExport", selectedExport);
  const exportMutation = useFetchApplicationCSV();

  const handleExport = () => {
    exportMutation.mutate({
      dataSelections: JSON.stringify(selectedFilters["studentInfo"]),
      filters: JSON.stringify(selectedExport),
      filename: filename,
    });
  };

  const data = query.data;
  const scholarship = data?.filters.scholarshipTitles;
  const status = data?.filters.applicationStatuses;
  const institute = data?.filters.institutes;
  const course = data?.filters.courses;
  const year = data?.filters.years;
  const section = data?.filters.sections;

  const isScholarship = selectedFilters["scholarship"]?.length > 0;
  const isStatus = selectedFilters["applicationStatus"]?.length > 0;
  const isInstitute = selectedFilters["studentInstitute"]?.length > 0;
  const isCourse = selectedFilters["studentCourse"]?.length > 0;
  const isYear = selectedFilters["studentYear"]?.length > 0;
  const isSection = selectedFilters["studentSection"]?.length > 0;

  const student = query.data?.dataSelections;
  const isStudent = selectedFilters["studentInfo"]?.length > 0;
  // Handles when a checkbox is selected or deselected
  const handleSelect = (category: string, label: string) => {
    setSelectedFilters((prev) => {
      // Get the current selected values for this category (or an empty array)
      const current = prev[category] || [];

      // Toggle the label (add or remove it)
      const updated = current.includes(label)
        ? current.filter((v) => v !== label) // remove if already selected
        : [...current, label]; // add if not selected

      // Start with previous filters, applying the new change
      let newFilters = { ...prev, [category]: updated };

      // 🧩 Define dependency order (top → bottom)
      const hierarchy = [
        "scholarship",
        "applicationStatus",
        "studentInstitute",
        "studentCourse",
        "studentYear",
        "studentSection",
      ];

      // Find the index of the current category in that order
      const currentIndex = hierarchy.indexOf(category);

      // 🧹 If this category becomes empty → reset all filters *below* it
      if (updated.length === 0 && currentIndex !== -1) {
        const resetBelow = hierarchy.slice(currentIndex + 1);
        for (const key of resetBelow) {
          newFilters[key] = [];
        }
      }

      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  useEffect(() => {
    if (exportMutation.isSuccess) {
      setSelectedFilters({});
      setFilename("");
    }
  }, [exportMutation.isSuccess]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (isStatus) {
      // setSelectedFilters({});
    }
  }, [isScholarship]);
  return (
    <div className=" z-10 bg-background lg:px-4 min-h-[calc(100vh-85px)]  ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Generate Report"
          description="Generate and download customized scholarship reports by selecting filters and student information fields below."
          Icon={Activity}
        />
        <div className="mt-10 max-w-5xl ">
          <Timeline>
            {query.isLoading ? (
              <LoadingTimeline />
            ) : (
              <TimelineItem step={isScholarship ? 1 : 2}>
                <TimelineHeader>
                  <TimelineSeparator />

                  <TimelineTitle>Choose Available Scholarships</TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent className="flex justify-between items-center">
                  Select one or more scholarship programs you want to include in
                  the report.
                </TimelineContent>
                <div className="grid grid-cols-3 gap-3 mt-5 ">
                  {scholarship?.map((meow) => (
                    <ReusableCheckbox
                      key={meow.label}
                      title={meow.label}
                      count={meow.count}
                      checked={
                        selectedFilters["scholarship"]?.includes(meow.label) ??
                        false
                      }
                      onChange={() => handleSelect("scholarship", meow.label)}
                    />
                  ))}
                </div>
              </TimelineItem>
            )}

            {isScholarship && query.isFetching && status?.length === 0 ? (
              <LoadingTimeline />
            ) : (
              (status?.length ?? 0) > 0 && (
                <TimelineItem step={isStatus ? 1 : 2}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>Select Application Status</TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    cription: "Filter applicants by their current application
                    status, such as Pending, Approved, or Rejected.
                  </TimelineContent>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {status?.map((meow) => (
                      <ReusableCheckbox
                        key={meow.label}
                        title={meow.label}
                        count={meow.count}
                        checked={
                          selectedFilters["applicationStatus"]?.includes(
                            meow.label
                          ) ?? false
                        }
                        onChange={() =>
                          handleSelect("applicationStatus", meow.label)
                        }
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}

            {isStatus && query.isFetching && institute?.length === 0 ? (
              <LoadingTimeline />
            ) : (
              (institute?.length ?? 0) > 0 && (
                <TimelineItem step={isInstitute ? 1 : 2}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>Select Institute</TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    Choose the institute or campus from which the applicants are
                    enrolled.
                  </TimelineContent>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {institute?.map((meow) => (
                      <ReusableCheckbox
                        key={meow.label}
                        title={meow.label}
                        count={meow.count}
                        checked={
                          selectedFilters["studentInstitute"]?.includes(
                            meow.label
                          ) ?? false
                        }
                        onChange={() =>
                          handleSelect("studentInstitute", meow.label)
                        }
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}

            {isInstitute && query.isFetching && course?.length === 0 ? (
              <LoadingTimeline />
            ) : (
              (course?.length ?? 0) > 0 && (
                <TimelineItem step={isCourse ? 1 : 2}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>Select Course</TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    Select specific courses or degree programs to narrow down
                    the report results.", headers: data?.filters.courses
                  </TimelineContent>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {course?.map((meow) => (
                      <ReusableCheckbox
                        key={meow.label}
                        title={meow.label}
                        count={meow.count}
                        checked={
                          selectedFilters["studentCourse"]?.includes(
                            meow.label
                          ) ?? false
                        }
                        onChange={() =>
                          handleSelect("studentCourse", meow.label)
                        }
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}

            {isCourse && query.isFetching && year?.length === 0 ? (
              <LoadingTimeline />
            ) : (
              (year?.length ?? 0) > 0 && (
                <TimelineItem step={isYear ? 1 : 2}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>Select Year</TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    Filter applicants by their academic year or level, such as
                    1st Year, 2nd Year, etc.
                  </TimelineContent>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {year?.map((meow) => (
                      <ReusableCheckbox
                        key={meow.label}
                        title={meow.label}
                        count={meow.count}
                        checked={
                          selectedFilters["studentYear"]?.includes(
                            meow.label
                          ) ?? false
                        }
                        onChange={() => handleSelect("studentYear", meow.label)}
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}

            {isYear && query.isFetching && section?.length === 0 ? (
              <LoadingTimeline />
            ) : (
              (section?.length ?? 0) > 0 && (
                <TimelineItem step={isSection ? 1 : 2}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>
                      Select Section{" "}
                      <span className="text-red-600">(End of selection)</span>
                    </TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    Choose the specific section or class group you want to
                    include in the report.", headers: data?.filters.sections
                  </TimelineContent>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {section?.map((meow) => (
                      <ReusableCheckbox
                        key={meow.label}
                        title={meow.label}
                        count={meow.count}
                        checked={
                          selectedFilters["studentSection"]?.includes(
                            meow.label
                          ) ?? false
                        }
                        onChange={() =>
                          handleSelect("studentSection", meow.label)
                        }
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}

            {query.isLoading ? (
              <LoadingTimeline size={18} />
            ) : (
              (student?.length ?? 0) > 0 && (
                <TimelineItem step={isStudent ? 1 : 2}>
                  <div className="flex justify-between items-center">
                    <div>
                      <TimelineHeader>
                        <TimelineSeparator />

                        <TimelineTitle>
                          Choose Student Information
                        </TimelineTitle>
                        <TimelineIndicator />
                      </TimelineHeader>
                      <TimelineContent className="flex justify-between items-center">
                        Select which student details (e.g., name, email, course,
                        address) should appear in the generated report.
                      </TimelineContent>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const allSelected = student?.every((field) =>
                          selectedFilters["studentInfo"]?.includes(field)
                        );
                        setSelectedFilters((prev) => ({
                          ...prev,
                          studentInfo: allSelected ? [] : student || [],
                        }));
                      }}
                    >
                      {student?.every((field) =>
                        selectedFilters["studentInfo"]?.includes(field)
                      )
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {student?.map((meow) => (
                      <ReusableCheckbox
                        key={meow}
                        title={meow}
                        count={meow}
                        description={false}
                        checked={
                          selectedFilters["studentInfo"]?.includes(meow) ??
                          false
                        }
                        onChange={() => handleSelect("studentInfo", meow)}
                      />
                    ))}
                  </div>
                </TimelineItem>
              )
            )}
          </Timeline>

          <AnimatePresence>
            {isStudent && (
              <div className="sticky bottom-16 lg:bottom-0">
                <motion.div
                  className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <Input
                      placeholder="Enter filename or skip"
                      className="w-sm backdrop-blur-2xl"
                      onChange={(e) => setFilename(e.target.value)}
                    />
                    <Button
                      type="submit"
                      className="cursor-pointer backdrop-blur-2xl"
                      onClick={handleExport}
                      disabled={exportMutation.isPending}
                    >
                      <Activity />
                      {exportMutation.isPending ? "Generating..." : "Generate"}
                      {exportMutation.isPending && (
                        <Loader className="animate-spin" />
                      )}
                    </Button>{" "}
                    <Button
                      className="backdrop-blur-2xl"
                      onClick={handleClearFilters}
                    >
                      Reset{" "}
                      <RefreshCcw
                        className={`transition-transform ${
                          query.isFetching ? "spin-reverse" : ""
                        }`}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ReusableCheckbox({
  title,
  count,
  checked,
  onChange,
  description = true,
}: {
  title: string;
  count: number;
  checked: boolean;
  onChange: () => void;
  description?: boolean;
}) {
  const id = useId();

  return (
    <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="order-1 after:absolute after:inset-0"
        aria-describedby={`${id}-description`}
      />
      <div className="flex grow items-center gap-3">
        <svg
          className="shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#121212" />
          <g clipPath="url(#sb-a)">
            <path
              fill="url(#sb-b)"
              d="M17.63 25.52c-.506.637-1.533.287-1.545-.526l-.178-11.903h8.003c1.45 0 2.259 1.674 1.357 2.81l-7.637 9.618Z"
            />
            <path
              fill="url(#sb-c)"
              fillOpacity=".2"
              d="M17.63 25.52c-.506.637-1.533.287-1.545-.526l-.178-11.903h8.003c1.45 0 2.259 1.674 1.357 2.81l-7.637 9.618Z"
            />
            <path
              fill="#3ECF8E"
              d="M14.375 6.367c.506-.638 1.532-.289 1.544.525l.078 11.903H8.094c-1.45 0-2.258-1.674-1.357-2.81l7.638-9.618Z"
            />
          </g>
          <defs>
            <linearGradient
              id="sb-b"
              x1="15.907"
              x2="23.02"
              y1="15.73"
              y2="18.713"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#249361" />
              <stop offset="1" stopColor="#3ECF8E" />
            </linearGradient>
            <linearGradient
              id="sb-c"
              x1="12.753"
              x2="15.997"
              y1="11.412"
              y2="17.519"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <clipPath id="sb-a">
              <path fill="#fff" d="M6.354 6h19.292v20H6.354z" />
            </clipPath>
          </defs>
        </svg>
        <div className="grid gap-2">
          <Label htmlFor={id} className="capitalize break-words">
            {title}
            <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
              (Include)
            </span>
          </Label>
          {description && (
            <p
              id={`${id}-description`}
              className="text-xs text-muted-foreground"
            >
              Export length: {count} student{count < 1 && <span>'s</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
function LoadingTimeline({ size = 3 }: { size?: number }) {
  return (
    <TimelineItem step={2}>
      <TimelineHeader>
        <TimelineSeparator />

        <TimelineTitle>
          <Skeleton className="h-5 w-50" />
        </TimelineTitle>
        <TimelineIndicator />
      </TimelineHeader>
      <TimelineContent className="flex justify-between items-center mt-2">
        <Skeleton className="h-3 w-100" />
      </TimelineContent>
      <div className="grid grid-cols-3 gap-3 mt-5 ">
        {Array.from({ length: size }).map((_, card) => (
          <Skeleton key={card} className="h-17 rounded-md" />
        ))}
      </div>
    </TimelineItem>
  );
}

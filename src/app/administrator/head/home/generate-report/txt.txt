"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BookOpen,
  Building2,
  Calendar,
  Check,
  GraduationCap,
  Layers,
  Loader,
  LucideIcon,
  UserRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import TitleReusable from "@/components/ui/title";
import useFetchApplicationCSVShit from "@/hooks/admin/getShit";
import useFetchApplicationCSV from "@/hooks/admin/getApplicationCSV";
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TourStep } from "@/components/tour-2/tour-step";
import { useTourStore } from "@/store/useTourStore";
import { TourTrigger } from "@/components/tour-2/tour-trigger";

export default function GenerateReport() {
  const [selectedDataSelections, setSelectedDataSelections] = useState<
    string[]
  >([]);
  const { openGenerate, setOpenGenerate } = useTourStore();
  // console.log(openGenerate);
  const [selectedFilters, setSelectedFilters] = useState<
    { id: string; value: string[] }[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);
  // console.log("11", selectedDataSelections);
  // console.log(data?.dataSelections);
  const query = useFetchApplicationCSVShit(selectedFilters);
  const data = query.data ?? null;
  const loading = query.isLoading;
  // Only show skeleton on initial load, not on refetches
  const showSkeleton = query.isLoading && !query.data;

  // Optional: Show a subtle loading indicator during refetch
  const isRefetching = query.isFetching && query.data;
  useEffect(() => {
    if (!data?.dataSelections) return;
    const allSelected =
      selectedDataSelections.length === data.dataSelections.length &&
      data.dataSelections.length > 0;
    setSelectAll(allSelected);
  }, [selectedDataSelections, data?.dataSelections]);

  const items = [
    {
      id: 1,
      step: "Step One",
      title: "Choose Available Scholarships",
      description:
        "Select one or more scholarship programs you want to include in the report.",
      headers: data?.filters.scholarshipTitles,
      icon: GraduationCap,
      headerLabel: "scholarship",
    },
    {
      id: 2,
      step: "Step Two",
      title: "Select Application Status",
      description:
        "Filter applicants by their current application status, such as Pending, Approved, or Rejected.",
      headers: data?.filters.applicationStatuses,
      icon: Layers,
      headerLabel: "applicationStatus",
    },
    {
      id: 3,
      step: "Step Three",
      title: "Select Institute",
      description:
        "Choose the institute or campus from which the applicants are enrolled.",
      headers: data?.filters.institutes,
      icon: Building2,
      headerLabel: "studentInstitute",
    },
    {
      id: 4,
      step: "Step Four",
      title: "Select Course",
      description:
        "Select specific courses or degree programs to narrow down the report results.",
      headers: data?.filters.courses,
      icon: BookOpen,
      headerLabel: "studentCourse",
    },
    {
      id: 5,
      step: "Step Five",
      title: "Select Year",
      description:
        "Filter applicants by their academic year or level, such as 1st Year, 2nd Year, etc.",
      headers: data?.filters.years,
      icon: Calendar,
      headerLabel: "studentYear",
    },
    {
      id: 6,
      step: "Step Six",
      title: "Select Section",
      description:
        "Choose the specific section or class group you want to include in the report.",
      headers: data?.filters.sections,
      icon: Layers,
      headerLabel: "studentSection",
    },
    {
      id: 7,
      step: "Step Seven",
      title: "Choose Student Information",
      description:
        "Select which student details (e.g., name, email, course, address) should appear in the generated report.",
      headers: data?.dataSelections.map((label: string) => ({
        label,
        count: 0,
      })),
      icon: UserRound,
      headerLabel: "",
    },
  ];

  const {
    loading: loadingCSV,
    onSubmit,
    setFilename,
  } = useFetchApplicationCSV({
    dataSelections: JSON.stringify(selectedDataSelections),
    filters: JSON.stringify(selectedFilters),
  });

  console.log("selectedDataSelections", selectedDataSelections);
  console.log("selectedFilters", selectedFilters);
  const handleCheckboxToggle = (value: string) => {
    setSelectedDataSelections((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleFilterToggle = (headerId: string, value: string) => {
    setSelectedFilters((prev) => {
      const existingFilter = prev.find((filter) => filter.id === headerId);

      if (existingFilter) {
        const valueExists = existingFilter.value.includes(value);

        if (valueExists) {
          const newValues = existingFilter.value.filter((v) => v !== value);

          if (newValues.length === 0) {
            return prev.filter((filter) => filter.id !== headerId);
          }

          return prev.map((filter) =>
            filter.id === headerId ? { ...filter, value: newValues } : filter
          );
        } else {
          return prev.map((filter) =>
            filter.id === headerId
              ? { ...filter, value: [...filter.value, value] }
              : filter
          );
        }
      } else {
        return [...prev, { id: headerId, value: [value] }];
      }
    });
  };

  const skolar = selectedFilters.find((meow) => meow.id === "scholarship");
  const decline = selectedFilters.find(
    (meow) => meow.id === "applicationStatus"
  );
  useEffect(() => {
    const filterHierarchy = [
      "scholarship",
      "applicationStatus",
      "studentInstitute",
      "studentCourse",
      "studentYear",
      "studentSection",
    ];

    // Check which filters currently exist
    const existingFilterIds = selectedFilters.map((f) => f.id);

    // Find the highest level filter that's missing
    let resetFromIndex = -1;
    for (let i = 0; i < filterHierarchy.length; i++) {
      if (!existingFilterIds.includes(filterHierarchy[i])) {
        resetFromIndex = i;
        break;
      }
    }

    // If a higher-level filter is missing, remove all filters below it
    if (resetFromIndex >= 0) {
      const filtersToKeep = filterHierarchy.slice(0, resetFromIndex);
      const shouldUpdate = selectedFilters.some(
        (filter) => !filtersToKeep.includes(filter.id)
      );

      if (shouldUpdate) {
        setSelectedFilters((prev) =>
          prev.filter((filter) => filtersToKeep.includes(filter.id))
        );
      }
    }
  }, [
    selectedFilters.find((f) => f.id === "scholarship"),
    selectedFilters.find((f) => f.id === "applicationStatus"),
    selectedFilters.find((f) => f.id === "studentInstitute"),
    selectedFilters.find((f) => f.id === "studentCourse"),
    selectedFilters.find((f) => f.id === "studentYear"),
    selectedFilters.find((f) => f.id === "studentSection"),
  ]);
  const [step, setStep] = useState(0);
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <Dialog open={openGenerate} onOpenChange={setOpenGenerate}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable title="Post scholarship guide" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenGenerate(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenGenerate(false);
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="generateReport"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Generate Report"
          description="Generate and download customized scholarship reports by selecting filters and student information fields below."
          Icon={Activity}
        />

        <div className="mt-15  w-full mx-auto space-y-6">
          <Timeline value={step}>
            {items.map((item, index) => (
              <TimelineItem key={item.id} step={item.id}>
                <TourStep stepId={`generate-${item.id.toString()}`}>
                  <TimelineHeader>
                    <TimelineSeparator />

                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineIndicator />
                  </TimelineHeader>
                  <TimelineContent className="flex justify-between items-center">
                    {item.description}
                    {item.id === 7 && (
                      <span className="flex gap-2 items-center">
                        <Checkbox
                          disabled={loadingCSV}
                          id="select-all"
                          checked={selectAll}
                          onCheckedChange={(checked) => {
                            setSelectAll(!!checked);
                            if (checked) {
                              // Select all data selections (Step Seven)
                              setSelectedDataSelections(
                                data?.dataSelections || []
                              );
                            } else {
                              // Deselect all
                              setSelectedDataSelections([]);
                            }
                          }}
                        />
                        <Label htmlFor="select-all">Select All</Label>
                      </span>
                    )}
                  </TimelineContent>
                  {showSkeleton ? (
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {[1, 2, 3, 4, 5].map((card) => (
                        <Skeleton key={card} className="h-22 rounded-md" />
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Subtle loading overlay during refetch - NOW OUTSIDE skeleton condition */}

                      <div className="grid grid-cols-4 gap-3 mt-5">
                        {item.headers?.map((meow, index) => {
                          const Icon = item.icon;
                          const isStepSeven = item.id === 7;
                          const count = meow.count;
                          const label = meow.label;
                          const isChecked = isStepSeven
                            ? selectedDataSelections.includes(label)
                            : selectedFilters
                                .find(
                                  (filter) => filter.id === item.headerLabel
                                )
                                ?.value.includes(label) || false;
                          return (
                            <div key={index} onClick={() => setStep(index + 1)}>
                              <div className="relative bg-card flex w-full items-start gap-2 rounded-md p-6 shadow-xs outline-none dark:has-data-[state=checked]:bg-green-950">
                                <Checkbox
                                  id={`checkbox-${item.id}-${index}`}
                                  disabled={loadingCSV}
                                  checked={isChecked}
                                  onCheckedChange={() => {
                                    if (item.id === 7) {
                                      handleCheckboxToggle(label);
                                    } else {
                                      handleFilterToggle(
                                        item.headerLabel,
                                        label
                                      );
                                    }
                                  }}
                                  className="order-1 after:absolute after:inset-0 !border-0"
                                />
                                <div className="flex grow items-center gap-5">
                                  {isRefetching ? (
                                    <Loader className="animate-spin size-5" />
                                  ) : (
                                    <Icon className="size-5" />
                                  )}

                                  <div className="grid gap-2">
                                    <Label
                                      htmlFor={`checkbox-${item.id}-${index}`}
                                      className="capitalize line-clamp-1"
                                    >
                                      {label}{" "}
                                      {count > 0 && <span>({count})</span>}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </TourStep>
              </TimelineItem>
            ))}
          </Timeline>

          <AnimatePresence>
            {(selectedDataSelections.length > 0 ||
              selectedFilters.length > 0) && (
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
                  >
                    <Button
                      size="lg"
                      type="submit"
                      className="cursor-pointer"
                      onClick={onSubmit}
                      disabled={loadingCSV}
                    >
                      <Activity />
                      {loadingCSV ? "Generating..." : "Generate Report"}
                      {loadingCSV && <Loader className="animate-spin" />}
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

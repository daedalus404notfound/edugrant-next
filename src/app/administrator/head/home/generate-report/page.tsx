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

export default function GenerateReport() {
  const { data, loading } = useFetchApplicationCSVShit();
  const [selectedDataSelections, setSelectedDataSelections] = useState<
    string[]
  >([]);

  const [selectedFilters, setSelectedFilters] = useState<
    { id: string; value: string[] }[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);
  console.log(selectedDataSelections);
  console.log(data?.dataSelections);
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
      headerLabel: "title",
    },
    {
      id: 2,
      step: "Step Two",
      title: "Select Application Status",
      description:
        "Filter applicants by their current application status, such as Pending, Approved, or Rejected.",
      headers: data?.filters.applicationStatus,
      icon: Layers,
      headerLabel: "status",
    },
    {
      id: 3,
      step: "Step Three",
      title: "Select Institute",
      description:
        "Choose the institute or campus from which the applicants are enrolled.",
      headers: data?.filters.institute,
      icon: Building2,
      headerLabel: "institute",
    },
    {
      id: 4,
      step: "Step Four",
      title: "Select Course",
      description:
        "Select specific courses or degree programs to narrow down the report results.",
      headers: data?.filters.course,
      icon: BookOpen,
      headerLabel: "course",
    },
    {
      id: 5,
      step: "Step Five",
      title: "Select Year",
      description:
        "Filter applicants by their academic year or level, such as 1st Year, 2nd Year, etc.",
      headers: data?.filters.year,
      icon: Calendar,
      headerLabel: "year",
    },
    {
      id: 6,
      step: "Step Six",
      title: "Select Section",
      description:
        "Choose the specific section or class group you want to include in the report.",
      headers: data?.filters.section,
      icon: Layers,
      headerLabel: "section",
    },
    {
      id: 7,
      step: "Step Seven",
      title: "Choose Student Information",
      description:
        "Select which student details (e.g., name, email, course, address) should appear in the generated report.",
      headers: data?.dataSelections,
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

  console.log(selectedDataSelections);
  console.log(selectedFilters);
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
  const [step, setStep] = useState(0);
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
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
                <div>
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
                </div>

                <div className="grid grid-cols-5 gap-3 mt-5">
                  {item.headers?.map((meow) => {
                    const Icon = item.icon;
                    const isStepSeven = item.id === 7;

                    const isChecked = isStepSeven
                      ? selectedDataSelections.includes(meow)
                      : selectedFilters
                          .find((filter) => filter.id === item.headerLabel)
                          ?.value.includes(meow) || false;
                    return (
                      <div key={meow} onClick={() => setStep(index + 1)}>
                        <div className="relative bg-card  flex w-full items-start gap-2 rounded-md  p-6 shadow-xs outline-none dark:has-data-[state=checked]:bg-green-950 ">
                          <Checkbox
                            id="meow"
                            disabled={loadingCSV}
                            checked={isChecked}
                            onCheckedChange={() => {
                              if (item.id === 7) {
                                handleCheckboxToggle(meow);
                              } else {
                                handleFilterToggle(item.headerLabel, meow);
                              }
                            }}
                            className="order-1 after:absolute after:inset-0  !border-0"
                          />
                          <div className="flex grow items-center gap-3">
                            <Icon className="h-5 min-w-5" />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="meow"
                                className="line-clamp-1 capitalize"
                              >
                                {meow}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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

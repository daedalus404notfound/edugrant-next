"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Download,
  File,
  GraduationCap,
  Loader,
  UserRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import TitleReusable from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import useFetchApplicationCSVShit from "@/hooks/admin/getShit";
import useFetchApplicationCSV from "@/hooks/admin/getApplicationCSV";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Separator } from "@/components/ui/separator";

export default function GenerateReport() {
  const steps = [
    {
      step: 1,
      title: "Step One",
      description: "Desc for step one",
    },
    {
      step: 2,
      title: "Step Two",
      description: "Desc for step two",
    },
    {
      step: 3,
      title: "Step Three",
      description: "Desc for step three",
    },
  ];
  const { data, loading } = useFetchApplicationCSVShit();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  console.log(data?.dataSelections);
  const [tab, setTab] = useState("ACTIVE");

  const tabs = [
    {
      id: "ACTIVE",
      label: "Active Scholarship",
      indicator: null,
    },
    {
      id: "RENEW",
      label: "Scholarship Renewals",
      indicator: null,
    },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Generate Report"
          description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
          Icon={Activity}
        />
        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
        </div>
        <div className="mt-15  max-w-5xl w-full mx-auto space-y-6">
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Choose Scholarship</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.filters.scholarshipTitles.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Select Course</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.filters.course.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>{" "}
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Select Year Level</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.filters.year.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>{" "}
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Select Section</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.filters.section.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>{" "}
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Application Status</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.filters.applicationStatus.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>{" "}
          <div className="bg-card p-4">
            <h1 className="font-medium  mb-3">Choose Student Details</h1>
            <div className="grid grid-cols-3 gap-3">
              {data?.dataSelections.map((meow) => (
                <ReusableCheckbox key={meow} label={meow} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReusableCheckbox({ label }: { label: string }) {
  return (
    <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
      <Checkbox className="order-1 after:absolute after:inset-0" />
      <div className="flex grow items-center gap-3">
        <GraduationCap className="h-5 min-w-5" />
        <div className="grid gap-2">
          <Label className="line-clamp-1 capitalize">{label}</Label>
        </div>
      </div>
    </div>
  );
}

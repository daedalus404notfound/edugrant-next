"use client";
import { ApplicationFormData } from "@/hooks/zod/application";
import ApplicationViewer from "./viewer";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronsUpDown,
  CircleCheckIcon,
  Clock,
  TriangleAlert,
  TriangleAlertIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { GetApplicationFormData } from "@/hooks/zod/getApplicationZod";
import TitleReusable from "@/components/ui/title";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassFolder from "@/components/ui/folder";
import DocumentDetails from "./document-details";

type DocsStudentProps = {
  data: GetApplicationFormData | null;
  loading: boolean;
};

export default function DocsStudent({ data, loading }: DocsStudentProps) {
  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  // OBJECT PARA PWEDE IMAP
  const submittedDocuments = Object.keys(data?.submittedDocuments || {});
  // KUKUNIN ILAN LAHAT NG PHASE
  const phaseLength = submittedDocuments.length;
  // KUKUNIN LAST PHASE KEY
  const getLastPhase = phaseLength > 0 ? submittedDocuments.at(-1) : undefined;
  // SETTER NG PHASE KEY
  const [phaseSelector, setPhaseSelector] = useState<string | undefined>(
    getLastPhase
  );

  // KUKUNIN DATA SA NAPILING PHASE - FIXED: Access the documents array
  const phaseData = phaseSelector
    ? data?.submittedDocuments?.[phaseSelector]?.documents || []
    : [];

  // KUKUNIN APPLICATION DECISION SA NAPILING PHASE
  const phaseDecision = phaseSelector
    ? data?.submittedDocuments?.[phaseSelector]?.Application_Decision
    : null;

  const [open, setOpen] = useState(false);

  // PARA MAGREFLECT PHASE SA COMBOBOX
  useEffect(() => {
    setPhaseSelector(getLastPhase);
  }, [getLastPhase]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between relative">
        <h1>Submitted Documents</h1>
        <Select value={phaseSelector} onValueChange={setPhaseSelector}>
          <SelectTrigger className="lg:w-[200px] w-full hidden">
            <SelectValue placeholder="Select phase..." />
          </SelectTrigger>
          <SelectContent>
            {submittedDocuments.map((submitted) => (
              <SelectItem
                key={submitted}
                value={submitted}
                className="capitalize"
              >
                {submitted}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-8">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-card w-full rounded-md lg:p-4 p-2 flex flex-col space-y-4"
              >
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-9" />
                </div>

                <Skeleton className="h-30 w-full" />

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="min-h-10 col-span-2" />
                </div>
              </div>
            ))
          : phaseData &&
            phaseData.map((meow) => {
              const decisionMessage = phaseDecision?.message?.[meow.document];
              const currentStatus =
                meow.rejectMessage?.status || decisionMessage?.status || "";
              const currentComment =
                meow.rejectMessage?.comment || decisionMessage?.comment || "";
              const requiredFormats =
                data?.Scholarship?.documents?.[
                  phaseSelector || "phase-1"
                ]?.find((doc) => doc.label === meow.document)?.formats || [];
              return (
                <DocumentDetails
                  key={meow.document}
                  title={meow.document}
                  format={meow.fileFormat}
                  requirementType={meow.requirementType}
                  status={currentStatus}
                  supabasePath={meow.supabasePath}
                  comment={currentComment}
                  formats={requiredFormats}
                  applicationId={data?.applicationId}
                  scholashipId={data?.Scholarship.scholarshipId}
                  disabled={
                    data?.Scholarship.deadline
                      ? Date.now() <=
                        new Date(data.Scholarship.deadline).getTime()
                      : false
                  }
                />
              );
            })}
      </div>
    </div>
  );
}

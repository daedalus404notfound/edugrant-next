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
      <div className="flex justify-between items-center relative">
        <TitleReusable
          title={
            phaseSelector
              ? `${phaseSelector} Required Documents`
              : "Phase Documents"
          }
          description=""
          titleSize="text-base"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="absolute right-0" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="lg:w-[200px] justify-between"
            >
              {phaseSelector || "Select phase..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="lg:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Phase..." className="h-9" />
              <CommandList>
                <CommandEmpty>No phase found.</CommandEmpty>
                <CommandGroup>
                  {submittedDocuments.map((submitted) => (
                    <CommandItem
                      key={submitted}
                      value={submitted}
                      className="capitalize"
                      onSelect={() => {
                        setPhaseSelector(submitted);
                        setOpen(false);
                      }}
                    >
                      {submitted}
                      <Check
                        className={cn(
                          "ml-auto",
                          phaseSelector === submitted
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
      </div>
      <div className=" grid lg:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-card w-full rounded-md p-4 flex flex-col space-y-4"
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
              // const decisionMessage =
              //   data?.Interview_Decision[0]?.message?.[meow.document] ||
              //   data?.Application_Decision[0]?.message?.[meow.document] ||
              //   null;

              const decisionMessage = phaseDecision?.message?.[meow.document];
              const currentStatus =
                meow.rejectMessage?.status || decisionMessage?.status || "";
              const currentComment =
                meow.rejectMessage?.comment || decisionMessage?.comment || "";
              console.log("meow", decisionMessage);
              return (
                <div
                  key={meow.document}
                  className="bg-gradient-to-br to-card from-card/80 p-4 rounded-md"
                >
                  <div>
                    {decisionMessage?.status === "REJECTED" ? (
                      <div className="rounded-md px-4 py-3 bg-red-500/10">
                        <p className="text-sm line-clamp-1 ">
                          <TriangleAlert
                            className="me-3 -mt-0.5 inline-flex text-red-500"
                            size={16}
                          />
                          Document has been rejected
                        </p>
                      </div>
                    ) : decisionMessage?.status === "APPROVED" ? (
                      <div className="rounded-md px-4 py-3 bg-green-500/10">
                        <p className="text-sm line-clamp-1 ">
                          <CircleCheckIcon
                            className="me-3 -mt-0.5 inline-flex text-emerald-500"
                            size={16}
                          />
                          Document has been approved
                        </p>
                      </div>
                    ) : !meow.supabasePath ? (
                      <div className="rounded-md px-4 py-3 bg-red-500/10">
                        <p className="text-sm line-clamp-1 ">
                          <TriangleAlertIcon
                            className="me-3 -mt-0.5 inline-flex text-red-500"
                            size={16}
                          />
                          Failed to submit
                        </p>
                      </div>
                    ) : data?.status === "PENDING" && meow.supabasePath ? (
                      <div className="rounded-md px-4 py-3 bg-amber-500/10">
                        <p className="text-sm line-clamp-1 ">
                          <Clock
                            className="me-3 -mt-0.5 inline-flex text-amber-500"
                            size={16}
                          />
                          Your document is awaiting verification.
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="pb-6 pt-8 flex">
                    <ApplicationViewer
                      fileFormat={mimeToLabelMap[meow.fileFormat]}
                      resourceType={meow.resourceType}
                      document={meow.document}
                      supabasePath={meow.supabasePath}
                      requirementType={meow.requirementType}
                      status={
                        decisionMessage?.status
                          ? decisionMessage?.status
                          : "PENDING"
                      }
                      applicationId={data?.applicationId || 0}
                    />
                    {/* <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm">Download</p>
                </div> */}
                  </div>{" "}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium lg:text-base text-sm">
                        {meow.document}
                      </p>
                      <div className="flex items-center gap-6">
                        <p className="border-l pl-3 text-sm text-muted-foreground">
                          {meow.fileFormat}
                        </p>{" "}
                        <p className="border-l pl-3 text-sm text-muted-foreground">
                          {meow.requirementType}
                        </p>
                      </div>
                    </div>

                    <Textarea
                      placeholder="Remarks"
                      value={decisionMessage?.comment}
                      readOnly
                      disabled={!decisionMessage?.comment}
                      className="border-0 bg-background"
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

//  <div key={meow.document} className="">
//    <div className="flex-1 flex flex-col lg:justify-end justify-between gap-5 relative">
//      <div className="flex gap-3">
//        <ApplicationViewer
//          fileFormat={mimeToLabelMap[meow.fileFormat]}
//          resourceType={meow.resourceType}
//          fileUrl={meow.fileUrl}
//          document={meow.document}
//          supabasePath={meow.supabasePath}
//          requirementType={meow.requirementType}
//          status={decisionMessage?.status ? decisionMessage?.status : "PENDING"}
//        />
//        <div className="flex-1">
//          <div className="flex gap-3 items-center  capitalize">
//            <p className="font-medium lg:text-base text-sm">{meow.document}</p>

//            <div className="flex gap-1.5 items-center">
//              {decisionMessage && (
//                <Badge className="hidden lg:block tracking-wide uppercase bg-green-800/20 text-green-600">
//                  {decisionMessage.status}
//                </Badge>
//              )}
//            </div>
//          </div>
//          <p className="uppercase lg:text-sm text-xs text-muted-foreground lg:mt-1">
//            {meow.fileFormat ? meow.fileFormat : "N/A"}
//          </p>
//        </div>
//      </div>

//    </div>
//  </div>;

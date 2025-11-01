import ApplicationViewer from "@/components/ui/application/reviewer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationFormData } from "@/hooks/zod/application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  CheckCircle2,
  ChevronsUpDown,
  CloudUpload,
  Download,
  Files,
  TriangleAlert,
  Upload,
  UserCheck2,
  UserRoundX,
  UserX2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { GetApplicationFormData } from "@/hooks/zod/getApplicationZod";
import TitleReusable from "../title";
import useDownloadDocument from "@/hooks/admin/postDownloadDocument";
const mimeToLabelMap: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "image/jpeg": "JPG",
  "image/png": "PNG",
};
export default function DocumentSection({
  data,
  loading,
  reviewData,
  updateReviewData,
}: {
  data: GetApplicationFormData | null;
  loading: boolean;
  reviewData: Record<string, { comment: string; status: string }>;
  updateReviewData: (
    docKey: string,
    field: "comment" | "status",
    value: string
  ) => void;
}) {
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
  const applicationId = data?.applicationId;
  const { onSubmit, isLoading } = useDownloadDocument(applicationId);
  return (
    <div className="space-y-10">
      <div className="space-y-3">
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
                className=" justify-between capitalize"
              >
                {phaseSelector || "Select phase..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
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
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-3">
          {loading ? (
            <div className="col-span-3 grid grid-cols-3 gap-6 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
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
              ))}
            </div>
          ) : phaseData.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-muted-foreground">
              No documents found for this phase
            </div>
          ) : (
            phaseData
              .filter((meow) => meow.requirementType === "required")
              .map((doc, index) => {
                const decisionMessage = phaseDecision?.message?.[doc.document];
                const currentStatus =
                  reviewData[doc.document]?.status ||
                  doc.rejectMessage?.status ||
                  decisionMessage?.status ||
                  "";
                const currentComment =
                  reviewData[doc.document]?.comment ||
                  doc.rejectMessage?.comment ||
                  decisionMessage?.comment ||
                  "";

                return (
                  <div key={index} className="bg-card p-4 rounded-lg space-y-6">
                    {doc.fileFormat && doc.supabasePath ? (
                      <div className="flex gap-3 items-center">
                        <div className="rounded-md flex-1 bg-green-600/10 text-green-600 p-2">
                          <div className="flex gap-3">
                            <Check
                              className="mt-0.5 shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                            <div className="flex grow justify-between gap-3">
                              <p className="text-sm">Document available</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => onSubmit(doc.supabasePath)}
                          disabled={isLoading}
                        >
                          <Download />
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-md bg-red-600/10 text-red-600 px-4 py-2.5">
                        <div className="flex gap-3">
                          <TriangleAlert
                            className="mt-0.5 shrink-0 opacity-60"
                            size={16}
                            aria-hidden="true"
                          />
                          <div className="flex grow justify-between gap-3">
                            <p className="text-sm">Document unavailable</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 pb-1">
                      <div className="flex flex-col justify-center items-center gap-5">
                        <ApplicationViewer
                          fileFormat={mimeToLabelMap[doc.fileFormat]}
                          resourceType={doc.resourceType}
                          document={doc.document}
                          supabasePath={doc.supabasePath}
                          docStatus={currentStatus}
                          requirementType={doc.requirementType}
                          docComment={currentComment}
                          onUpdate={(field, value) =>
                            updateReviewData(doc.document, field, value)
                          }
                          applicationId={data?.applicationId || 0}
                        />
                        <h4 className="font-semibold flex gap-2 items-start">
                          {doc.document}{" "}
                          <span className="text-xs text-muted-foreground">
                            {mimeToLabelMap[doc.fileFormat]}
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Button
                        variant={
                          currentStatus === "APPROVED" ? "default" : "outline"
                        }
                        className={`font-medium transition-all flex-1 !border-0 ${
                          currentStatus === "APPROVED"
                            ? ""
                            : "hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                        }`}
                        onClick={() =>
                          updateReviewData(
                            doc.document,
                            "status",
                            currentStatus === "APPROVED" ? "" : "APPROVED"
                          )
                        }
                        disabled={
                          !!doc.rejectMessage?.status ||
                          !doc.fileFormat ||
                          !!decisionMessage ||
                          data?.status === "BLOCKED"
                        }
                      >
                        {currentStatus === "APPROVED" ? (
                          <>
                            <Check />
                            Accepted
                          </>
                        ) : (
                          <>
                            <UserCheck2 />
                            Accept
                          </>
                        )}
                      </Button>
                      <Button
                        variant={
                          currentStatus === "REJECTED"
                            ? "destructive"
                            : "outline"
                        }
                        className={`font-medium transition-all flex-1 !border-0 ${
                          currentStatus !== "REJECTED"
                            ? "hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                            : ""
                        }`}
                        onClick={() =>
                          updateReviewData(
                            doc.document,
                            "status",
                            currentStatus === "REJECTED" ? "" : "REJECTED"
                          )
                        }
                        disabled={
                          !!doc.rejectMessage?.status ||
                          !doc.fileFormat ||
                          !!decisionMessage ||
                          data?.status === "BLOCKED"
                        }
                      >
                        {currentStatus === "REJECTED" ? (
                          <>
                            <UserRoundX />
                            Rejected
                          </>
                        ) : (
                          <>
                            <UserX2 />
                            Reject
                          </>
                        )}
                      </Button>
                      <Textarea
                        placeholder="Comment ..."
                        value={currentComment || decisionMessage?.comment}
                        readOnly={
                          !!doc.rejectMessage?.status ||
                          !doc.fileFormat ||
                          !!decisionMessage ||
                          data?.status === "BLOCKED"
                        }
                        onChange={(e) =>
                          updateReviewData(
                            doc.document,
                            "comment",
                            e.target.value
                          )
                        }
                        className="min-h-11 col-span-2 bg-background border-0"
                      />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {phaseData.filter((meow) => meow.requirementType === "optional")
        .length !== 0 && (
        <div className="space-y-3">
          <TitleReusable
            title={
              phaseSelector
                ? `${phaseSelector} Optional Documents`
                : "Phase Documents"
            }
            textColor="text-blue-700/70"
            description=""
            titleSize="text-base"
          />
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-3">
            {loading ? (
              <div className="col-span-3 grid grid-cols-3 gap-6 w-full">
                {Array.from({ length: 3 }).map((_, i) => (
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
                ))}
              </div>
            ) : phaseData.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                No documents found for this phase
              </div>
            ) : (
              phaseData
                .filter((meow) => meow.requirementType === "optional")
                .map((doc, index) => {
                  const decisionMessage =
                    phaseDecision?.message?.[doc.document];
                  const currentStatus =
                    reviewData[doc.document]?.status ||
                    doc.rejectMessage?.status ||
                    decisionMessage?.status ||
                    "";
                  const currentComment =
                    reviewData[doc.document]?.comment ||
                    doc.rejectMessage?.comment ||
                    decisionMessage?.comment ||
                    "";

                  return (
                    <div
                      key={index}
                      className="bg-card p-4 rounded-lg space-y-6"
                    >
                      {doc.fileFormat && doc.supabasePath ? (
                        <div className="flex gap-3 items-center">
                          <div className="rounded-md flex-1 bg-green-600/10 text-green-600 p-2">
                            <div className="flex gap-3">
                              <Check
                                className="mt-0.5 shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                              <div className="flex grow justify-between gap-3">
                                <p className="text-sm">Document available</p>
                              </div>
                            </div>
                          </div>
                          <Button variant="secondary" asChild>
                            <a href={doc.supabasePath} download>
                              <Download />
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-md bg-red-600/10 text-red-600 px-4 py-2.5">
                          <div className="flex gap-3">
                            <TriangleAlert
                              className="mt-0.5 shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                            <div className="flex grow justify-between gap-3">
                              <p className="text-sm">Document unavailable</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 pb-1">
                        <div className="flex flex-col justify-center items-center gap-5">
                          <ApplicationViewer
                            fileFormat={mimeToLabelMap[doc.fileFormat]}
                            resourceType={doc.resourceType}
                            document={doc.document}
                            supabasePath={doc.supabasePath}
                            docStatus={currentStatus}
                            requirementType={doc.requirementType}
                            docComment={currentComment}
                            onUpdate={(field, value) =>
                              updateReviewData(doc.document, field, value)
                            }
                            applicationId={data?.applicationId || 0}
                          />
                          <h4 className="font-semibold flex gap-2 items-start">
                            {doc.document}{" "}
                            <span className="text-xs text-muted-foreground">
                              {mimeToLabelMap[doc.fileFormat]}
                            </span>
                          </h4>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Button
                          variant={
                            currentStatus === "APPROVED" ? "default" : "outline"
                          }
                          className={`font-medium transition-all flex-1 !border-0 ${
                            currentStatus === "APPROVED"
                              ? ""
                              : "hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                          }`}
                          onClick={() =>
                            updateReviewData(doc.document, "status", "APPROVED")
                          }
                          disabled={
                            !!doc.rejectMessage?.status ||
                            !doc.fileFormat ||
                            !!decisionMessage ||
                            data?.status === "BLOCKED"
                          }
                        >
                          {currentStatus === "APPROVED" ? (
                            <>
                              <Check />
                              Accepted
                            </>
                          ) : (
                            <>
                              <UserCheck2 />
                              Accept
                            </>
                          )}
                        </Button>
                        <Button
                          variant={
                            currentStatus === "REJECTED"
                              ? "destructive"
                              : "outline"
                          }
                          className={`font-medium transition-all flex-1 !border-0 ${
                            currentStatus !== "REJECTED"
                              ? "hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                              : ""
                          }`}
                          onClick={() =>
                            updateReviewData(doc.document, "status", "REJECTED")
                          }
                          disabled={
                            !!doc.rejectMessage?.status ||
                            !doc.fileFormat ||
                            !!decisionMessage ||
                            data?.status === "BLOCKED"
                          }
                        >
                          {currentStatus === "REJECTED" ? (
                            <>
                              <UserRoundX />
                              Rejected
                            </>
                          ) : (
                            <>
                              <UserX2 />
                              Reject
                            </>
                          )}
                        </Button>
                        <Textarea
                          placeholder="Comment ..."
                          value={currentComment || decisionMessage?.comment}
                          readOnly={
                            !!doc.rejectMessage?.status ||
                            !doc.fileFormat ||
                            !!decisionMessage ||
                            data?.status === "BLOCKED"
                          }
                          onChange={(e) =>
                            updateReviewData(
                              doc.document,
                              "comment",
                              e.target.value
                            )
                          }
                          className="min-h-11 col-span-2 bg-background border-0"
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}
      {/* Show Application Decision if exists */}
    </div>
  );
}

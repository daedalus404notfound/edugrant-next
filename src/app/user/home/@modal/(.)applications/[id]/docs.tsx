"use client";
import { ApplicationFormData } from "@/hooks/zod/application";
import ApplicationViewer from "./viewer";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckIcon,
  Clock,
  TriangleAlert,
  TriangleAlertIcon,
} from "lucide-react";

type DocsStudentProps = {
  data: ApplicationFormData;
};

export default function DocsStudent({ data }: DocsStudentProps) {
  const documentPhases = Object.keys(data?.submittedDocuments ?? {}).filter(
    (key) => key.startsWith("phase")
  );
  const lastPhaseKey = documentPhases[documentPhases.length - 1];
  const lastPhase = data?.submittedDocuments?.[lastPhaseKey] ?? [];

  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  return (
    <div className=" grid lg:grid-cols-1  divide-y">
      {lastPhase &&
        lastPhase.map((meow) => {
          // ✅ Pick Interview_Decision first, fallback to Application_Decision
          const decisionMessage =
            data?.Interview_Decision?.message?.[meow.document] ||
            data?.Application_Decision?.message?.[meow.document] ||
            null;
          console.log("meow", decisionMessage);
          return (
            <div key={meow.document} className="py-10 ">
              <div className="flex-1 flex flex-col lg:justify-end justify-between gap-5 relative">
                <div className="flex gap-3">
                  <ApplicationViewer
                    fileFormat={mimeToLabelMap[meow.fileFormat]}
                    resourceType={meow.resourceType}
                    fileUrl={meow.fileUrl}
                    document={meow.document}
                    supabasePath={meow.supabasePath}
                    requirementType={meow.requirementType}
                    status={decisionMessage?.status}
                  />
                  <div className="flex-1">
                    <div className="flex gap-3 items-center justify-between capitalize">
                      <p className="font-medium lg:text-base text-sm">
                        {meow.document}
                      </p>

                      <div className="flex gap-1.5 items-center">
                        {meow.fileUrl && (
                          <Badge className="hidden lg:block tracking-wide uppercase bg-blue-800/20 text-blue-600">
                            SUBMITTED
                          </Badge>
                        )}
                        {decisionMessage && (
                          <Badge className="hidden lg:block tracking-wide uppercase bg-green-800/20 text-green-600">
                            {decisionMessage.status}
                          </Badge>
                        )}
                        {!meow.fileUrl && (
                          <Badge className="hidden lg:block tracking-wide uppercase bg-red-800/20 text-red-600">
                            MISSING
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="uppercase lg:text-sm text-xs text-muted-foreground lg:mt-1">
                      {meow.fileFormat ? meow.fileFormat : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  {decisionMessage?.status === "REJECTED" && (
                    <div className="rounded-md px-4 py-3 bg-card">
                      <p className="text-sm line-clamp-1 flex items-center">
                        <TriangleAlert
                          className="me-3 -mt-0.5 text-red-500"
                          size={16}
                        />
                        {decisionMessage?.comment ||
                          "Document has been rejected"}
                      </p>
                    </div>
                  )}

                  {data?.status === "PENDING" && meow.fileUrl && (
                    <div className="rounded-md px-4 py-3 bg-amber-500/10">
                      <p className="text-sm line-clamp-1 text-amber-500">
                        <Clock
                          className="me-3 -mt-0.5 inline-flex text-amber-500"
                          size={16}
                        />
                        Your document is awaiting verification.
                      </p>
                    </div>
                  )}

                  {!meow.fileUrl && (
                    <div className="rounded-md px-4 py-3 bg-card">
                      <p className="text-sm line-clamp-1">
                        <TriangleAlertIcon
                          className="me-3 -mt-0.5 inline-flex text-red-500"
                          size={16}
                        />
                        Missing Documents
                      </p>
                    </div>
                  )}

                  {decisionMessage?.status === "APPROVED" && (
                    <div className="rounded-md border px-4 py-3 bg-card">
                      <p className="text-sm">
                        <CircleCheckIcon
                          className="me-3 -mt-0.5 inline-flex text-emerald-500"
                          size={16}
                        />
                        Document has been approved
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

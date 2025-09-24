import { ApplicationFormData } from "@/hooks/zod/application";
import ApplicationViewer from "./viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { CircleCheckIcon, Clock, TriangleAlert } from "lucide-react";
type DocsStudentProps = {
  data: ApplicationFormData;
};

export default function DocsStudent({ data }: DocsStudentProps) {
  const isMobile = useIsMobile();

  const documentPhases = Object.keys(data?.submittedDocuments ?? {}).filter(
    (key) => key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.submittedDocuments?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;
  console.log("last", lastPhase);
  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };
  return (
    <div className="flex-1 space-y-1">
      <div className="flex justify-between items-center py-4"></div>
      <div className="grid  lg:grid-cols-2 gap-8 grid-cols-1">
        {lastPhase &&
          lastPhase.map((meow) => {
            const rejectMessage =
              data?.Application_Decision?.message?.[meow.document] || null;

            return (
              <div key={meow.document} className="lg:py-10 py-8 space-y-2">
                <div className="flex lg:gap-5 gap-3">
                  <ApplicationViewer
                    fileFormat={mimeToLabelMap[meow.fileFormat]}
                    resourceType={meow.resourceType}
                    fileUrl={meow.fileUrl}
                    document={meow.document}
                    supabasePath={meow.supabasePath}
                    requirementType={meow.requirementType}
                  />
                  <div className="flex-1 flex flex-col lg:justify-end justify-between gap-5 relative">
                    <div>
                      <div className="flex gap-3 capitalize">
                        <p className="font-medium lg:text-base text-sm">
                          {meow.document}
                        </p>
                        <Badge variant="outline" className="hidden lg:block">
                          {meow.requirementType}
                        </Badge>
                      </div>

                      <p className="uppercase lg:text-sm text-xs text-muted-foreground lg:mt-1">
                        {meow.fileFormat}
                      </p>
                    </div>

                    {/* ✅ Show reject message from Application_Decision */}
                    {rejectMessage?.status === "REJECTED" && !isMobile && (
                      <div className="rounded-md px-4 py-3 bg-card">
                        <p className="text-sm line-clamp-1">
                          <TriangleAlert
                            className="me-3 -mt-0.5 inline-flex text-red-500"
                            size={16}
                            aria-hidden="true"
                          />
                          {rejectMessage?.comment ||
                            "Document has been rejected"}
                        </p>
                      </div>
                    )}

                    {data?.status === "PENDING" && !isMobile && (
                      <div className="rounded-md px-4 py-3 bg-card">
                        <p className="text-sm line-clamp-1">
                          <Clock
                            className="me-3 -mt-0.5 inline-flex text-yellow-500"
                            size={16}
                            aria-hidden="true"
                          />
                          Your document is awaiting verification.
                        </p>
                      </div>
                    )}

                    {rejectMessage?.status === "APPROVED" && !isMobile && (
                      <div className="rounded-md border px-4 py-3 bg-card">
                        <p className="text-sm">
                          <CircleCheckIcon
                            className="me-3 -mt-0.5 inline-flex text-emerald-500"
                            size={16}
                            aria-hidden="true"
                          />
                          Document has been approved
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {rejectMessage?.status === "REJECTED" && isMobile && (
                  <div className="rounded-md px-4 py-3 bg-card">
                    <p className="text-sm line-clamp-1">
                      <TriangleAlert
                        className="me-3 -mt-0.5 inline-flex text-red-500"
                        size={16}
                        aria-hidden="true"
                      />
                      {rejectMessage?.comment || "Document has been rejected"}
                    </p>
                  </div>
                )}
                {data?.status === "PENDING" && isMobile && (
                  <div className="rounded-md px-4 py-3 bg-card">
                    <p className="text-sm line-clamp-1">
                      <Clock
                        className="me-3 -mt-0.5 inline-flex text-yellow-500"
                        size={16}
                        aria-hidden="true"
                      />
                      Your document is awaiting verification.
                    </p>
                  </div>
                )}
                {rejectMessage?.status === "APPROVED" && isMobile && (
                  <div className="rounded-md px-4 py-3 bg-card">
                    <p className="text-sm">
                      <CircleCheckIcon
                        className="me-3 -mt-0.5 inline-flex text-emerald-500"
                        size={16}
                        aria-hidden="true"
                      />
                      Document has been approved
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

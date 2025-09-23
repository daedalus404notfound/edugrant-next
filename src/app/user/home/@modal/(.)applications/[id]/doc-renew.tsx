import { ApplicationFormData } from "@/hooks/zod/application";
import ApplicationViewer from "./viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { CircleCheckIcon, Clock, TriangleAlert } from "lucide-react";
type DocsStudentProps = {
  data: ApplicationFormData;
};

export default function DocsStudentRenew({ data }: DocsStudentProps) {
  const isMobile = useIsMobile();
  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };
  return (
    <div className="flex-1 space-y-1">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-5 ">
          <p>
            <span className="text-sm text-muted-foreground">Required</span>{" "}
            &nbsp;
            <span className="text-lg font-medium font-mono">
              {data?.Scholarship.documents.renewDocuments &&
                Object.entries(
                  data?.Scholarship.documents.renewDocuments
                ).filter(([_, doc]) => doc?.requirementType === "required")
                  .length}
            </span>
          </p>
          <span className="text-primary/50">|</span>
          <p>
            <span className="text-sm text-muted-foreground">Optional</span>{" "}
            &nbsp;
            <span className="text-lg font-medium font-mono">
              {data?.Scholarship.documents.renewDocuments &&
                Object.entries(
                  data?.Scholarship.documents.renewDocuments
                ).filter(([key, doc]) => doc?.requirementType === "optional")
                  .length}
            </span>
          </p>
        </div>
      </div>
      <div className="grid  lg:grid-cols-1 grid-cols-1 divide-y">
        {data?.submittedDocuments.documents &&
          Object.entries(data.submittedDocuments.documents).map(
            ([key, doc]) => {
              const rejectMessage =
                data?.Application_Decision?.message?.[key] || null;

              return (
                <div key={key} className="lg:py-10 py-8 space-y-2">
                  <div className="flex lg:gap-5 gap-3">
                    <ApplicationViewer
                      fileFormat={mimeToLabelMap[doc.fileFormat]}
                      resourceType={doc.resourceType}
                      fileUrl={doc.fileUrl}
                      document={doc.document}
                      supabasePath={doc.supabasePath}
                      requirementType={doc.requirementType}
                    />
                    <div className="flex-1 flex flex-col lg:justify-end justify-between gap-5 relative">
                      <div>
                        <div className="flex gap-3 capitalize">
                          <p className="font-medium lg:text-base text-sm">
                            {key}
                          </p>
                          <Badge variant="outline" className="hidden lg:block">
                            {doc.requirementType}
                          </Badge>
                        </div>

                        <p className="uppercase lg:text-sm text-xs text-muted-foreground lg:mt-1">
                          {doc.fileFormat}
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
            }
          )}
      </div>
    </div>
  );
}

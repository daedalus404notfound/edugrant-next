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
import { Textarea } from "@/components/ui/textarea";

type DocsStudentProps = {
  data: ApplicationFormData | null;
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
    <div className=" grid lg:grid-cols-2 gap-6">
      {lastPhase &&
        lastPhase.map((meow) => {
          const decisionMessage =
            data?.Interview_Decision?.message?.[meow.document] ||
            data?.Application_Decision?.message?.[meow.document] ||
            null;
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
                ) : !meow.fileUrl ? (
                  <div className="rounded-md px-4 py-3 bg-red-500/10">
                    <p className="text-sm line-clamp-1 ">
                      <TriangleAlertIcon
                        className="me-3 -mt-0.5 inline-flex text-red-500"
                        size={16}
                      />
                      Failed to submit
                    </p>
                  </div>
                ) : data?.status === "PENDING" && meow.fileUrl ? (
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
                  fileUrl={meow.fileUrl}
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

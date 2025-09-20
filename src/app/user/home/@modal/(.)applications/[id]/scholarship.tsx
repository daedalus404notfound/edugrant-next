import { Badge } from "@/components/ui/badge";
import { ApplicationFormData } from "@/hooks/zod/application";
import { format } from "date-fns";
import { Building, Calendar, Inbox, PhilippinePeso } from "lucide-react";

type DocsStudentProps = {
  data: ApplicationFormData;
};
export default function ScholarDetails({ data }: DocsStudentProps) {
  return (
    <div className="flex-1 p-4 space-y-8">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">About</p>
        <p>{data?.Scholarship.description}</p>
      </div>

      <div className="space-y-5">
        <div className="flex gap-3 items-center">
          <h1 className="font-medium">Scholarship Details</h1>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          {data?.Scholarship.amount && (
            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <PhilippinePeso />
              <div>
                <p className="text-muted-foreground text-sm">
                  Scholarship Amount
                </p>
                <h1 className="text-lg font-medium font-mono">
                  {data?.Scholarship.amount}.00
                </h1>
              </div>
            </div>
          )}
          {data?.Scholarship.limit && (
            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <Inbox />
              <div>
                <p className="text-muted-foreground text-sm">
                  Scholarship Limit
                </p>
                <h1 className="text-lg font-medium font-mono">
                  {data?.Scholarship.limit}
                </h1>
              </div>
            </div>
          )}
          {data?.Scholarship.requiredGWA && (
            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <Inbox />
              <div>
                <p className="text-muted-foreground text-sm">Required GWA</p>
                <h1 className="text-lg font-medium font-mono">
                  {data?.Scholarship.requiredGWA}
                </h1>
              </div>
            </div>
          )}
          {data?.Scholarship.requiredGWA && (
            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <Inbox />
              <div>
                <p className="text-muted-foreground text-sm">Required GWA</p>
                <h1 className="text-lg font-medium font-mono">
                  {data?.Scholarship.requiredGWA}
                </h1>
              </div>
            </div>
          )}
          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
            <Building />
            <div>
              <p className="text-muted-foreground text-sm">Scholarship Type</p>
              <h1 className="text-lg font-medium capitalize">
                {data?.Scholarship.type}
              </h1>
            </div>
          </div>

          <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
            <Calendar />
            <div>
              <p className="text-muted-foreground text-sm">
                Scholarship Deadline
              </p>
              <h1 className="text-lg font-medium">
                {data?.Scholarship.deadline
                  ? format(new Date(data?.Scholarship.deadline), "PPP")
                  : "No deadline"}
              </h1>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {" "}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-medium text-muted-foreground  tracking-wide">
                Required Documents
              </h3>
              <p className="font-medium text-lg">
                {Object.keys(data?.Scholarship.documents || {}).length}
              </p>
            </div>

            <div className=" divide-y">
              {Object.values(data?.Scholarship.documents.documents || {}).map(
                (doc, index) => (
                  <div
                    className="flex justify-between items-center py-5"
                    key={doc.label}
                  >
                    <div>
                      <span> {index + 1}. </span>
                      {doc.label}
                    </div>
                    <Badge
                      className={`${
                        doc.requirementType === "required"
                          ? "bg-red-700/20 text-red-700"
                          : doc.requirementType === "optional"
                          ? "bg-blue-700/20 text-blue-700"
                          : ""
                      } capitalize `}
                    >
                      {doc.requirementType}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

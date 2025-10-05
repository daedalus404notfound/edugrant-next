import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ApplicationFormData } from "@/hooks/zod/application";
import { DashboardData } from "@/hooks/admin/getHeadDashboard";
import { format } from "date-fns";

const applications = [
  {
    id: 1,
    student: "John Doe",
    course: "Computer Science",
    submitted: "Oct 28, 2024",
    status: "Approved",
  },
  {
    id: 2,
    student: "Maria Garcia",
    course: "Engineering",
    submitted: "Oct 25, 2024",
    status: "Approved",
  },
  {
    id: 3,
    student: "Alex Tan",
    course: "Business Administration",
    submitted: "Oct 20, 2024",
    status: "Approved",
  },
];

export function RecentApplications({
  data,
  loading,
}: {
  data: DashboardData | null;
  loading: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">
              Recently Approved Applications
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Students who recently got approved
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Student
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Course
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Application Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.applications.slice(0, 3).map((app) => (
                <tr
                  key={app.applicationId}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {app.Student?.fName} {app.Student?.lName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {app.Student?.course}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {app?.dateCreated && format(app?.dateCreated, "PPP p")}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-800 text-gray-200 uppercase">
                      {app?.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

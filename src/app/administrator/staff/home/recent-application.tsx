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

export function RecentApplications() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Recent Applications
          </h2>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <CardContent className="bg-card rounded-md py-4">
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
                  Approved On
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {app.student}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {app.course}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {app.submitted}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-800 text-gray-200 uppercase">
                      {app.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </div>
  );
}

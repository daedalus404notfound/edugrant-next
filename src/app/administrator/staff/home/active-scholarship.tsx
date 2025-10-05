import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, ArrowRight } from "lucide-react";

const scholarships = [
  {
    id: 1,
    name: "Merit Excellence Scholarship",
    amount: "$5,000",
    deadline: "Dec 15, 2024",
    sponsor: "Kuya Win Gatchalian",
  },
  {
    id: 2,
    name: "STEM Innovation Grant",
    amount: "$10,000",
    deadline: "Jan 30, 2025",
    sponsor: "Lorna Silverio",
  },
];

export function ActiveScholarships() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Active Scholarships
          </h2>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {scholarships.map((scholarship) => (
          <Card
            key={scholarship.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                {scholarship.name}
              </CardTitle>
              <CardDescription>{scholarship.sponsor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                {scholarship.amount}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {scholarship.deadline}
              </div>
              <Button size="sm" className="mt-2 w-full">
                View
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

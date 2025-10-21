import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";

export function ApplicationStats() {
  const stats = [
    {
      label: "Total Applied",
      value: "24",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Accepted",
      value: "8",
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "In Review",
      value: "12",
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Success Rate",
      value: "33%",
      icon: TrendingUp,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <Card className="p-6 ">
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Stats</h3>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div
              className={`${stat.bgColor} ${stat.color} h-10 w-10 rounded-lg flex items-center justify-center`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

"use client";

import { Download, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardData } from "@/hooks/admin/getHeadDashboard";
import { Button } from "@/components/ui/button";

export const description =
  "Scholarship applications vs approvals by scholarship name";

export function ChartBarMultiple({ data }: { data: DashboardData | undefined }) {
  const chartData =
    data?.scholarship?.map((s) => ({
      scholarship: s.title,
      applications: (s.approved || 0) + (s.pending || 0) + (s.declined || 0),
      approved: s.approved || 0,
    })) || [];

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "var(--chart-1)",
    },
    approved: {
      label: "Approved",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;
  return (
    <div className="bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Card className=" bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 flex flex-col border-0  ">
        <CardHeader className="text-center">
          <CardTitle>Scholarship - Applications vs Approved</CardTitle>
          <CardDescription>By Scholarship Name</CardDescription>
         
        </CardHeader>

        <CardContent className="flex-1">
          <ChartContainer config={chartConfig} className="">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="scholarship"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="applications"
                  fill="var(--color-applications)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="approved"
                  fill="var(--color-approved)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm text-center">
          <div className="flex items-center justify-center gap-2 font-medium leading-none">
            Highest approvals: EduGrant Scholarship{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Data represents total applications vs approvals per scholarship
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

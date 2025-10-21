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

export function ChartBarMultiple({ data }: { data: DashboardData | null }) {
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
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Download />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-2xl p-6">
                <DialogHeader className="sr-only">
                  <DialogTitle>Download Data</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-base font-semibold tracking-tight text-foreground">
                      Scholarship Applications Overview
                    </h1>
                    <Button className="flex items-center gap-2 text-sm hover:bg-muted transition-colors">
                      <Download />
                      Download
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {data?.scholarship.map((item) => (
                      <div
                        key={item.scholarshipId}
                        className="flex items-center justify-between rounded-xl bg-muted/40 px-5 py-4 hover:bg-muted transition-all duration-200"
                      >
                        {/* Left Section */}
                        <div className="flex flex-col">
                          <h2 className="text-base font-medium truncate">
                            {item.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {item.Scholarship_Provider?.name ??
                              "Unknown Provider"}
                          </p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Total
                            </p>
                            <p className="text-lg font-semibold">
                              {(item.approved || 0) +
                                (item.pending || 0) +
                                (item.declined || 0)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Approved
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                              {item.approved ?? 0}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Pending
                            </p>
                            <p className="text-lg font-semibold text-yellow-600">
                              {item.pending ?? 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardAction>
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

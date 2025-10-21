"use client";

import { Download, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardData } from "@/hooks/admin/getHeadDashboard";
import { Button } from "@/components/ui/button";

export const description = "A mixed bar chart";

// Data linked to chartConfig keys

const chartConfig = {
  visitors: {
    label: "Applicants",
  },
  IEAT: {
    label: "IEAT",
    color: "var(--chart-1)",
  },
  ICS: {
    label: "ICS",
    color: "var(--chart-2)",
  },
  COE: {
    label: "COE",
    color: "var(--chart-3)",
  },
  CAS: {
    label: "CAS",
    color: "var(--chart-4)",
  },
  CBA: {
    label: "CBA",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartBarMixed({ data }: { data: DashboardData | null }) {
  const chartData =
    data?.applicationCountPerInsti?.map((item) => ({
      institute: item.institute,
      visitors: item.applicationCount,
      fill: "var(--chart-1)",
    })) || [];

  return (
    <div className="bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Card className=" bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 flex flex-col border-0  ">
        <CardHeader className="text-center">
          <CardTitle>Application by Institute</CardTitle>
          <CardDescription>Number of Application per Institute</CardDescription>
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
                      Scholarship Applications Institute
                    </h1>
                    <Button className="flex items-center gap-2 text-sm hover:bg-muted transition-colors">
                      <Download />
                      Download
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {data?.applicationCountPerInsti.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl bg-muted/40 px-5 py-4 hover:bg-muted transition-all duration-200"
                      >
                        {/* Left Section */}
                        <div className="flex flex-col">
                          <h2 className="text-base font-medium truncate">
                            {item.institute}
                          </h2>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Total
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                              {item.applicationCount ?? 0}
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
          <ChartContainer config={chartConfig} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ right: 10 }}
              >
                <YAxis
                  dataKey="institute"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <XAxis dataKey="visitors" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
                  layout="vertical"
                  radius={[5, 5, 5, 5]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm text-center">
          <div className="flex items-center justify-center gap-2 font-medium leading-none">
            Most Institute Applicants <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total institute applicants
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

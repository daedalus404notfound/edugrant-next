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
  IAS: {
    label: "IAS",
    color: "var(--chart-6)",
  },
  CVM: {
    label: "Doctor of Veterinary Medicine",
    color: "var(--chart-7)",
  },
  BSA: {
    label: "BS in Agriculture",
    color: "var(--chart-8)",
  },
  BSAE: {
    label: "BS in Agricultural and Biosystems Engineering",
    color: "var(--chart-9)",
  },
  BSGE: {
    label: "BS in Geodetic Engineering",
    color: "var(--chart-10)",
  },
  BSIT: {
    label: "BS in Information Technology",
    color: "var(--chart-11)",
  },
  BSFT: {
    label: "BS in Food Technology",
    color: "var(--chart-12)",
  },
  BEED: {
    label: "Bachelor of Elementary Education",
    color: "var(--chart-13)",
  },
  BSED: {
    label: "Bachelor of Secondary Education",
    color: "var(--chart-14)",
  },
  BSHM: {
    label: "BS in Hospitality Management",
    color: "var(--chart-15)",
  },
  BSBA: {
    label: "BS in Business Administration",
    color: "var(--chart-16)",
  },
  BADC: {
    label: "BS in Development Communication",
    color: "var(--chart-17)",
  },
  MSAg: {
    label: "Master of Science in Agriculture",
    color: "var(--chart-18)",
  },
  MAEd: {
    label: "Master of Arts in Education",
    color: "var(--chart-19)",
  },
  PhDAg: {
    label: "Doctor of Philosophy in Agricultural Sciences",
    color: "var(--chart-20)",
  },
  PhDEd: {
    label: "Doctor of Philosophy in Educational Management",
    color: "var(--chart-21)",
  },
  TECC: {
    label: "Teacher Education Certificate Course",
    color: "var(--chart-22)",
  },
  CASAg: {
    label: "Certificate of Agricultural Sciences",
    color: "var(--chart-23)",
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

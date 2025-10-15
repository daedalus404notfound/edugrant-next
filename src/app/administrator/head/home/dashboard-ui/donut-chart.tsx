"use client";

import { Download, TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

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

export const description =
  "Scholarship data - PWD vs Indigenous vs General Applicants";

const chartConfig = {
  applicants: {
    label: "Applicants",
  },
  pwd: {
    label: "Persons with Disability",
    color: "var(--chart-1)",
  },
  indigenous: {
    label: "Indigenous People",
    color: "var(--chart-2)",
  },
  general: {
    label: "General Applicants",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DonutPieDonut({ data }: { data: DashboardData | null }) {
  const chartData = [
    {
      group: "Persons with Disability",
      applicants: data?.PWDApplicationCount,
      fill: "var(--chart-1)",
    },
    {
      group: "Indigenous People",
      applicants: data?.indiginousApplicationCount,
      fill: "var(--chart-2)",
    },
    {
      group: "General Applicants",
      applicants: data?.GeneralCount,
      fill: "var(--chart-3)",
    },
  ];
  return (
    <div className="bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Card className=" bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 flex flex-col border-0  ">
        <CardHeader className="items-center pb-0 text-center">
          <CardTitle>Scholarship Applicants</CardTitle>
          <CardDescription>By Group (PWD, Indigenous, General)</CardDescription>
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
                  <h1 className="font-medium">
                    Download Scholarship Applicants Data
                  </h1>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="">
                      <h1 className="text-muted-foreground text-sm">
                        General Applicants
                      </h1>
                      <p className="text-2xl font-medium">
                        {data?.GeneralCount}
                      </p>
                    </div>
                    <div className="">
                      <h1 className="text-muted-foreground text-sm">
                        PWD Applicants
                      </h1>
                      <p className="text-2xl font-medium">
                        {data?.PWDApplicationCount}
                      </p>
                    </div>
                    <div className="">
                      <h1 className="text-muted-foreground text-sm">
                        Indigenous Applicants
                      </h1>
                      <p className="text-2xl font-medium">
                        {data?.indiginousApplicationCount}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Download <Download />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="applicants"
                  nameKey="group"
                  innerRadius="40%"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm text-center">
          <div className="flex items-center justify-center gap-2 leading-none font-medium">
            Most applicants are General Applicants{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Distribution of scholarship applications by applicant group
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

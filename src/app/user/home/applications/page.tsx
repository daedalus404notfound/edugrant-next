"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,

  Calendar,

  TextSearch,
  Wallet,
} from "lucide-react";
const tabs = [
  { id: "PENDING", label: "All", indicator: "" },
  { id: "", label: "Pending", indicator: "" },
  { id: "APPROVED", label: "Approved", indicator: "" },
  { id: "DECLINED", label: "Rejected", indicator: "" },
  { id: "BLOCKED", label: "Blocked", indicator: "" },
];
import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import useClientApplications from "@/hooks/user/getApplications";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [status, setStatus] = useState("");
  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const { data } = useClientApplications({
    userId,
    page: currentPage,
    pageSize: rowsPerPage,
    status,
  });

  return (
    <div className="z-10 min-h-screen bg-background px-4 ">
      <div className="mx-auto w-[95%] pt-10">
        <div className="flex justify-between items-end">
          <div>
            <motion.span
              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                      text-xl font-semibold flex items-center gap-1.5
                      "
              initial={{ backgroundPosition: "200% 0" }}
              animate={{ backgroundPosition: "-200% 0" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 7,
                ease: "linear",
              }}
            >
              <TextSearch /> My Applications
            </motion.span>
            <p className="text-sm mt-1">Track your recent application</p>
          </div>
        </div>
        <div className="py-8 space-y-8">
          <div>
            <Input placeholder="Search" />
          </div>
          <div className="flex justify-between items-center">
            <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
          </div>
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4">
            {data.map((meow) => (
              <div
                key={meow.applicationId}
                className="shadow-sm hover:shadow-md transition-all duration-200 p-1.5 bg-card rounded-lg"
              >
                <div className="bg-background px-4 py-6 rounded-lg space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-balance leading-tight">
                        {meow.scholarship.scholarshipTitle}
                      </h3>
                      <div className="flex items-center text-sm mb-2 text-muted-foreground">
                        {meow.scholarship.scholarshipProvider}
                      </div>
                    </div>
                    <Badge variant="outline">{meow.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="dark:bg-green-900/20 bg-green-50 rounded-md p-3">
                      <div className="flex items-center text-green-700  text-sm mb-1">
                        <Wallet className="h-4 w-4 mr-1" />
                        Award Amount
                      </div>
                      <div className="font-medium dark:text-green-600 text-green-800">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(Number(meow.scholarship.scholarshipAmount))}
                      </div>
                    </div>
                    <div className="dark:bg-blue-900/20 bg-blue-50 rounded-md p-3">
                      <div className="flex items-center text-blue-700 text-sm mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline
                      </div>
                      <div className="font-medium dark:text-blue-600 text-blue-800">
                        {format(meow.scholarship.scholarshipDeadline, "PPP")}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Badge variant="outline" className="">
                      GOVERNMENT
                    </Badge>
                    <span>Submitted {format(meow.applicationDate, "PPP")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="link" className="flex-1">
                    View Details <ArrowRight />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

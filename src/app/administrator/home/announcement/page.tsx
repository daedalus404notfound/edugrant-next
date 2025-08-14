"use client";

import { Megaphone, Plus } from "lucide-react";
import { motion } from "motion/react";
import DynamicHeaderAdmin from "../dynamic-header";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAnnouncement from "../create-announcement/page";
import { BorderBeam } from "@/components/ui/beam";
const tabs = [
  { id: "PENDING", label: "Active", indicator: "" },
  { id: "APPROVE", label: "Expired", indicator: "" },
];
export default function ScholarshipAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Welcome to the Era of Opportunity!",
      description:
        "Dear Future Scholars, The day has finally come! Today, we have officially launched our Merit-Based Excellence Scholarship program. This prestigious award...",
      date: "Today",
      time: "14:30",
      type: "Merit-Based",
      amount: "$25,000",
      status: "new",
    },
    {
      id: 2,
      title: "The Era of STEM Innovation is Coming!",
      description:
        "Dear Future Scholars, The day has finally come! Today, we have officially launched our STEM Innovation Grant program. This exciting opportunity...",
      date: "Dec 10",
      time: "2024",
      type: "STEM Grant",
      amount: "$15,000",
      status: "active",
    },
    {
      id: 3,
      title: "Diversity Leadership Scholarship",
      description:
        "Dear Future Scholars, The day has finally come! Today, we have officially launched our Diversity & Inclusion Leadership Award. This transformative program...",
      date: "Dec 02",
      time: "2024",
      type: "Leadership",
      amount: "$18,000",
      status: "active",
    },
    {
      id: 4,
      title: "How do I Apply for Financial Aid?",
      description:
        "Dear Future Scholars, The day has finally come! Today, we have officially launched our comprehensive Financial Aid application portal. Access resources...",
      date: "Dec 01",
      time: "2024",
      type: "Financial Aid",
      amount: "$12,000",
      status: "active",
    },
    {
      id: 5,
      title: "What are Scholarship Requirements?",
      description:
        "Dear Future Scholars, The day has finally come! Today, we have officially launched our updated scholarship requirements guide. Understanding eligibility...",
      date: "Nov 29",
      time: "2024",
      type: "Requirements",
      amount: "$10,000",
      status: "active",
    },
  ];

  return (
    <div className=" min-h-screen px-4">
      <DynamicHeaderAdmin first="Updates" second="Manage Announcements" />

      <div className="mx-auto max-w-4xl w-full py-10">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-2xl font-semibold flex items-center gap-1.5
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
          <Megaphone size={22} />
          Manage Announcements
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>

        <div className="mt-8 flex justify-between">
          <Tabs tabs={tabs} />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="relative" variant="outline">
                <BorderBeam
                  size={60}
                  duration={4}
                  delay={0}
                  colorFrom="#f97316"
                  colorTo="#ec4899"
                  reverse={false}
                  initialOffset={0}
                  borderThickness={2}
                  opacity={1}
                  glowIntensity={4}
                  beamBorderRadius={60}
                  pauseOnHover={false}
                  speedMultiplier={1.5}
                  className="z-10"
                />
                <Plus /> Add announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="w-3xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <CreateAnnouncement />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-7">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="flex items-start space-x-6 py-8 border-b-2 border-muted"
            >
              {/* Date Column */}
              <div className="flex flex-col items-center min-w-[80px] pt-1">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {announcement.date}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {announcement.time}
                </div>
              </div>

              {/* Content Column */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {announcement.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-3 mt-4">
                  <Badge> {announcement.type}</Badge>
                  <Badge> {announcement.amount}</Badge>
                  <Badge>New</Badge>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

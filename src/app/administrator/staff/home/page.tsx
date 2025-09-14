import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import {
  ArrowRight,
  CalendarIcon,
  CheckCheck,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
];
const scholarshipApplications = [
  {
    id: "1",
    fullName: "Juan Dela Cruz",
    age: 18,
    course: "BS Information Technology",
    yearLevel: "1st Year",

    scholarshipType: "Government",
    status: "Pending",
  },
  {
    id: "2",
    fullName: "Maria Santos",
    age: 20,
    course: "BS Civil Engineering",
    yearLevel: "2nd Year",

    scholarshipType: "Private",
    status: "Approved",
  },
  {
    id: "3",
    fullName: "Pedro Ramirez",
    age: 19,
    course: "BS Computer Science",
    yearLevel: "1st Year",

    scholarshipType: "Private",
    status: "Pending",
  },
  {
    id: "4",
    fullName: "Ana Cruz",
    age: 21,
    course: "BS Nursing",
    yearLevel: "3rd Year",

    scholarshipType: "Private",
    status: "Approved",
  },
  {
    id: "5",
    fullName: "Mark Villanueva",
    age: 22,
    course: "BS Accountancy",
    yearLevel: "4th Year",

    scholarshipType: "Government",
    status: "Rejected",
  },
];
const scholarships = [
  {
    id: "1",
    name: "Government Academic Excellence Scholarship",
    provider: "Department of Education",
    type: "Government",
    status: "Active",
  },
  {
    id: "2",
    name: "Private Engineering Scholarship",
    provider: "ABC Foundation",
    type: "Private",
    status: "Active",
  },
  {
    id: "3",
    name: "STEM Achievers Grant",
    provider: "XYZ Corporation",
    type: "Private",
    status: "Active",
  },
  {
    id: "4",
    name: "Healthcare Scholars Program",
    provider: "National Health Fund",
    type: "Government",
    status: "Active",
  },
  {
    id: "5",
    name: "Leadership Excellence Scholarship",
    provider: "Global Leaders Org",
    type: "Private",
    status: "Active",
  },
];

export default function StaffDashboard() {
  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Applicants",
      data: 1,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: 100,
    },
    {
      label: "Approved Applicants",
      data: 2,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: 50,
    },
    {
      label: "Active Scholarships",
      data: 3,
      icon: <GraduationCap />,
      color: "yellow",
      todayIncrement: 25,
    },
    {
      label: "Pending Applications",
      data: 4,
      icon: <GraduationCap />,
      color: "white",
      todayIncrement: 10,
    },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div className="grid  grid-cols-4 lg:gap-3 gap-3">
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} {...card} />
          ))}
        </div>
        <div className="space-y-2">
          <h1 className="font-medium text-lg">Announcements</h1>

          <Timeline className="space-y-5">
            {announcements.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="!m-0  bg-card dark:bg-background/80  p-6! rounded-md border !mb-3"
              >
                <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                  <TimelineTitle className="font-medium text-lg">
                    {item.title ?? "Win scholarship is now open."}
                  </TimelineTitle>
                  <TimelineDate className="lg:text-sm text-xs t flex items-center gap-1.5">
                    <CalendarIcon size={13} /> {item.date}
                  </TimelineDate>
                </div>

                <TimelineContent className=" mt-1 ">
                  {item.description}
                </TimelineContent>

                <div className="mt-5 flex gap-3 items-center">
                  <p className="text-xs">Tags:</p>{" "}
                  <Badge variant="secondary">Win Gatchalian</Badge>
                </div>
              </TimelineItem>
            ))}
          </Timeline>
          <p className="text-center text-sm underline flex gap-1.5 items-center justify-center font-medium">
            View All <ArrowRight size={15} />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <h1 className="font-medium text-lg">Recent Application</h1>

          <Table>
            <TableHeader className="">
              <TableRow className="bg-card">
                <TableHead className="h-9 p-3">Name</TableHead>
                <TableHead className="h-9 p-3">Provider</TableHead>
                <TableHead className="h-9 p-3">Type</TableHead>
                <TableHead className="h-9 p-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="py-6 px-3 font-medium">
                    {scholarship.name}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    {scholarship.provider}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    {scholarship.type}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    <Badge className="bg-green-50 dark:bg-green-600/20 text-green-700">
                      {scholarship.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-center text-sm underline flex gap-1.5 items-center justify-center font-medium">
            View All <ArrowRight size={15} />
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-medium text-lg">Active Scholarships</h1>

          <Table>
            <TableHeader className="">
              <TableRow className="bg-card">
                <TableHead className="h-9 p-3">Name</TableHead>
                <TableHead className="h-9 p-3">Provider</TableHead>
                <TableHead className="h-9 p-3">Type</TableHead>
                <TableHead className="h-9 p-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="py-6 px-3 font-medium">
                    {scholarship.name}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    {scholarship.provider}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    {scholarship.type}
                  </TableCell>
                  <TableCell className="py-6 px-3">
                    <Badge className="bg-green-50 dark:bg-green-600/20 text-green-700">
                      {scholarship.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-center text-sm underline flex gap-1.5 items-center justify-center font-medium">
            View All <ArrowRight size={15} />
          </p>
        </div>
      </div>
    </div>
  );
}

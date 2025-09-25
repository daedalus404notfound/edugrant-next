"use client";
import {
  Building,
  Calendar,
  ExternalLink,
  Inbox,
  PhilippinePeso,
} from "lucide-react";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
import { formatPHP } from "@/lib/formatPHP";

export default function ScholarshipModal({
  data,
}: {
  data: displayScholarshipFormData;
}) {
  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;
  return (
    <div className="relative h-full w-full overflow-auto no-scrollbar  bg-background rounded-t-md flex flex-col">
      <div className="absolute top-0 left-0 lg:h-86 h-60 w-full opacity-30   mask-gradient flex">
        <img
          className="w-full h-full object-cover blur-md "
          src={data?.cover}
          alt=""
        />
      </div>

      <div className="relative flex justify-center items-center ">
        <div className="absolute inset-0border-b-2 border-black bg-card" />
        <div className="absolute left-0 lg:-bottom-18 -bottom-25 z-10 lg:px-6  px-2 flex flex-col lg:flex-row w-full  lg:items-end lg:gap-3 gap-2">
          <Avatar className="lg:size-30 size-20 border-background border-2 shadow-md">
            <AvatarImage className="object-cover" src={data?.logo} />
            <AvatarFallback>
              {data?.Scholarship_Provider?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <motion.span
              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                     flex items-center gap-1.5 lg:text-2xl text-xl font-semibold tracking-tight
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
              <span className="line-clamp-1"> {data?.title}</span>
              <span className="hidden lg:flex gap-1.5">
                {data?.deadline &&
                new Date(data.deadline).getTime() < Date.now() ? (
                  <Badge className="bg-red-800 text-gray-200 tracking-wide">
                    EXPIRED
                  </Badge>
                ) : (
                  <Badge className="bg-green-800 text-gray-200 tracking-wide">
                    ACTIVE
                  </Badge>
                )}
                {data?.phase && data?.phase > 1 && (
                  <Badge className="bg-blue-800 text-gray-200 uppercase">
                    {getPhaseLabel(data?.phase)}
                  </Badge>
                )}
              </span>
            </motion.span>
            <p className="text-muted-foreground text-sm">
              by {data?.Scholarship_Provider?.name}
            </p>
          </div>
        </div>
        <p className="italic lg:text-sm text-xs text-muted-foreground absolute right-2 lg:-bottom-18 -bottom-7 z-10 lg:px-6  px-2 ">
          Posted on {""}
          {data?.dateCreated && format(data?.dateCreated, "PPP")}
        </p>
        {data?.cover && (
          <img
            className="w-full lg:aspect-[16/4] aspect-[16/9]  object-cover   rounded-lg shadow-md"
            src={data?.cover}
            alt=""
          />
        )}

        {data?.cover && (
          <Link target="_blank" href={data?.cover} className="absolute z-5  ">
            <Button variant="secondary" size="sm">
              View <ExternalLink />
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-1 pt-30 lg:px-6 px-2 space-y-8">
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">About {data?.title}</p>
          <p className="whitespace-pre-line">{data?.description}</p>
        </div>

        <div className="space-y-5">
          <div className="flex gap-3 items-center">
            <h1 className="font-medium">Scholarship Details</h1>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {data?.amount && (
              <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                <PhilippinePeso />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Scholarship Amount
                  </p>
                  <h1 className="text-lg font-medium font-mono">
                    {formatPHP(Number(data?.amount))}
                  </h1>
                </div>
              </div>
            )}
            {data?.limit && (
              <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                <Inbox />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Scholarship Limit
                  </p>
                  <h1 className="text-lg font-medium font-mono">
                    {data?.limit}
                  </h1>
                </div>
              </div>
            )}

            {data?.requiredGWA && (
              <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                <Inbox />
                <div>
                  <p className="text-muted-foreground text-sm">Required GWA</p>
                  <h1 className="text-lg font-medium font-mono">
                    {data?.requiredGWA}
                  </h1>
                </div>
              </div>
            )}
            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <Building />
              <div>
                <p className="text-muted-foreground text-sm">
                  Scholarship Type
                </p>
                <h1 className="text-lg font-medium capitalize">{data?.type}</h1>
              </div>
            </div>

            <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
              <Calendar />
              <div>
                <p className="text-muted-foreground text-sm">
                  Scholarship Deadline
                </p>
                <h1 className="text-lg font-medium">
                  {data?.deadline
                    ? format(new Date(data?.deadline), "PPP")
                    : "No deadline"}
                </h1>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-medium text-muted-foreground  tracking-wide">
                  Phase {documentPhasesLength} Required Documents
                </h3>
                <p className="font-medium text-lg">{lastPhaseLength}</p>
              </div>
              <div className=" divide-y">
                {Object.values(lastPhase).map((doc, index) => (
                  <div
                    className="flex justify-between items-center py-5"
                    key={doc.label}
                  >
                    <div>
                      <span> {index + 1}. </span>
                      {doc.label}
                    </div>
                    <Badge
                      className={`${
                        doc.requirementType === "required"
                          ? "bg-red-700/20 text-red-700"
                          : doc.requirementType === "optional"
                          ? "bg-blue-700/20 text-blue-700"
                          : ""
                      } capitalize `}
                    >
                      {doc.requirementType}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:p-4 p-2 bg-card rounded-md mb-5">
            <h1 className="text-center text-sm font-medium">
              Hurry before it ends
            </h1>
            <div className="transform scale-85 lg:scale-100">
              {data?.deadline && (
                <AnimatedNumberCountdown endDate={new Date(data?.deadline)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

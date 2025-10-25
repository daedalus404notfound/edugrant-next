"use client";
import {
  Activity,
  Banknote,
  Building,
  Calendar,
  ExternalLink,
  GraduationCap,
  HandCoins,
  Inbox,
  Landmark,
  MessagesSquare,
  PhilippinePeso,
  UsersRound,
} from "lucide-react";
import logo from "@/assets/edugrant-logo.png";
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
import { Skeleton } from "./skeleton";
import { Separator } from "./separator";

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
    <div className="relative h-full w-full flex flex-col">
      {data.dateEnded && (
        <div className=" p-3  sticky bg-muted top-0 z-30 flex items-center justify-center">
          <p className="text-sm">
            {data?.title} has ended on{" "}
            {data?.dateEnded && format(data?.dateEnded, "PPP p")}.
          </p>
        </div>
      )}
      <div className="relative flex justify-center items-center ">
        {/* <p className="italic lg:text-sm text-xs text-muted-foreground absolute right-2 lg:-bottom-18 -bottom-7 z-10 lg:px-6  px-2 ">
          Posted on {""}
          {data?.dateCreated && format(data?.dateCreated, "PPP")}
        </p> */}
        {data?.cover && (
          <img
            className="w-full lg:aspect-[16/4] dark:opacity-50 opacity-80 aspect-[16/7]  object-cover   rounded-t-lg"
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
      <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg  ">
        {/* Header Section */}
        <div className="relative flex  lg:items-end items-center  lg:py-8 py-4 lg:px-4 px-2">
          <img
            className="lg:w-70 w-43 absolute lg:right-0 -right-18 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-20 "
            src={logo.src}
            alt=""
          />
          <div className=" flex items-end justify-center">
            <Avatar className="lg:size-25 size-20">
              <AvatarImage
                src={data?.logo}
                className="rounded-full object-cover"
              />
              <AvatarFallback
                className="rounded-full text-white font-semibold flex items-center justify-center 
                          bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
                          dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
              >
                1212
              </AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="uppercase absolute z-10">
              {" "}
              {data?.type}
            </Badge>
          </div>

          <div className="flex-1 px-4 py-2 z-10">
            <div className="flex items-center gap-3">
              <h1 className="text-base lg:text-xl font-medium text-foreground capitalize line-clamp-1">
                {data?.title}
              </h1>
              <div className="space-x-1.5 lg:block hidden">
                <Badge
                  variant="outline"
                  className="mt-2 uppercase bg-blue-800 text-gray-200"
                >
                  {" "}
                  {getPhaseLabel(data?.phase)}
                </Badge>
                <Badge
                  variant="outline"
                  className={`mt-2 uppercase text-gray-200 ${
                    data?.deadline &&
                    Date.now() > new Date(data.deadline).getTime()
                      ? "bg-red-800"
                      : "bg-green-800"
                  }`}
                >
                  {data?.deadline &&
                  Date.now() > new Date(data.deadline).getTime()
                    ? "EXPIRED"
                    : "ACTIVE"}
                </Badge>
              </div>
            </div>
            {/* <p className="font-medium font-mono text-base tracking-wide">
                        {data?.Scholarship_Provider.name}
                      </p>{" "} */}
            <p className="text-muted-foreground lg:text-sm text-xs">
              {data?.Scholarship_Provider?.name}
            </p>
          </div>
        </div>
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-6 lg:py-6 py-4 lg:px-4 px-2 bg-card relative z-10 ">
          <div className="space-y-1.5 lg:border-l-2 lg:pl-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <h1 className="text-xs text-muted-foreground">Posted on</h1>
            </div>

            <p className="font-medium lg:text-base text-sm text-foreground">
              {data?.dateCreated && format(data?.dateCreated, "PPP p")}
            </p>
          </div>{" "}
          <div className="space-y-1.5 lg:border-l-2 lg:pl-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
              <h1 className="text-xs text-muted-foreground">
                Scholarship Deadline
              </h1>
            </div>

            <span className="font-medium lg:text-base text-sm  text-foreground">
              {data?.deadline ? format(data?.deadline, "PPP p") : "—"}
            </span>
          </div>
          <div className="space-y-1.5 lg:border-l-2 lg:pl-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <h1 className="text-xs text-muted-foreground">
                Interview Requirement
              </h1>
            </div>

            <p className="font-medium lg:text-base text-sm  text-foreground">
              {data.interview ? "Interview Required" : "No Interview Needed"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-10 lg:px-6 px-2 space-y-8">
        <div className="space-y-1">
          <p className="text-xs uppercase text-muted-foreground">About</p>
          <p className="whitespace-pre-line">{data?.description}</p>
        </div>

        <div className="space-y-8">
          <p className="text-xs uppercase text-muted-foreground">
            Full Scholarship Details
          </p>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {data?.interview && (
              <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                  <MessagesSquare className="text-xl text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm">
                    Interview Required
                  </p>
                  <h1 className="text-lg font-medium tracking-wider">
                    {data.interview
                      ? "Interview Required"
                      : "No Interview Needed"}
                  </h1>
                </div>
              </div>
            )}

            {data?.amount && (
              <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                  <HandCoins className="text-xl text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm">
                    Scholarship Amount
                  </p>
                  <h1 className="text-lg font-medium tracking-wider">
                    {formatPHP(Number(data?.amount))}
                  </h1>
                </div>
              </div>
            )}

            {data?.limit && (
              <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                  <UsersRound className="text-xl text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm">
                    Scholarship Limit
                  </p>
                  <h1 className="text-lg font-medium tracking-wider">
                    {data?.limit}
                  </h1>
                </div>
              </div>
            )}

            {data?.requiredGWA && (
              <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                  <Inbox className="text-xl text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm">Required GWA</p>
                  <h1 className="text-lg font-medium tracking-wider">
                    {data?.requiredGWA}
                  </h1>
                </div>
              </div>
            )}

            <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                <Landmark className="text-xl text-blue-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-muted-foreground text-sm">
                  Scholarship Type
                </p>
                <h1 className="text-lg font-medium capitalize">{data?.type}</h1>
              </div>
            </div>

            <div className="bg-card p-4 rounded-md lg:col-span-1 col-span-2 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-muted p-3 rounded-full flex items-center justify-center">
                <Calendar className="text-xl text-blue-700" />
              </div>
              <div className="flex flex-col">
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
                <h3 className="text-xs uppercase font-medium text-muted-foreground  tracking-wide">
                  Phase {documentPhasesLength} Required Documents
                </h3>
                <p className="font-medium text-lg">{lastPhaseLength}</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
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
                      } capitalize tracking-wide `}
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

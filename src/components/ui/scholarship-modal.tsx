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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
import { formatPHP } from "@/lib/formatPHP";
import { Separator } from "./separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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

  const items = [
    {
      show: data?.interview,
      icon: <MessagesSquare className="text-xl text-green-700" />,
      label: "Interview Required",
      value: data?.interview ? "Interview Required" : "No Interview Needed",
    },
    {
      show: data?.amount,
      icon: <HandCoins className="text-xl text-green-700" />,
      label: "Scholarship Amount",
      value: formatPHP(Number(data?.amount)),
    },
    {
      show: data?.limit,
      icon: <UsersRound className="text-xl text-green-700" />,
      label: "Scholarship Limit",
      value: data?.limit,
    },
    {
      show: data?.requiredGWA,
      icon: <Inbox className="text-xl text-green-700" />,
      label: "Required GWA",
      value: data?.requiredGWA,
    },
    {
      show: true,
      icon: <Landmark className="text-xl text-green-700" />,
      label: "Scholarship Type",
      value: data?.type,
    },
    {
      show: true,
      icon: <Calendar className="text-xl text-green-700" />,
      label: "Scholarship Deadline",
      value: data?.deadline
        ? format(new Date(data?.deadline), "PPP")
        : "No deadline",
    },
  ];
  return (
    <ScrollArea className="max-h-[calc(100dvh-200px)]  bg-background rounded-t-lg">
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
          <Dialog>
            <DialogTrigger asChild>
              <img
                className="w-full lg:aspect-[16/4]   aspect-[16/7]  object-cover   rounded-t-lg"
                src={data?.cover}
                alt=""
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="sr-only">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <img src={data.cover} alt="" />
            </DialogContent>
          </Dialog>
        )}

        <div className="absolute z-10 bottom-0 lg:left-6 left-2 flex flex-col lg:translate-y-35 translate-y-32">
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="lg:size-30 size-28">
                <AvatarImage
                  src={data?.logo}
                  className="rounded-full object-cover border-3 border-background"
                />
                <AvatarFallback
                  className="rounded-full text-white font-semibold flex items-center justify-center 
                          bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
                          dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
                >
                  1212
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="sr-only">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <img src={data?.logo} alt="" />
            </DialogContent>
          </Dialog>

          <div className="flex-1 mt-2">
            <h1 className="text-lg lg:text-2xl font-medium text-foreground capitalize line-clamp-1">
              {data?.title}
            </h1>

            <p className="text-muted-foreground lg:text-base text-sm mt-1.5">
              {data?.Scholarship_Provider?.name}
            </p>

            <div className="space-x-1.5 ">
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
        </div>
      </div>
      <div className="relative bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg  lg:pt-45 pt-38">
        {/* Header Section */}

        <img
          className="lg:w-70 w-43 absolute lg:right-0 -right-18 -translate-y-[40%] top-[40%] z-0 mask-gradient opacity-20 hidden lg:block"
          src={logo.src}
          alt=""
        />

        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 bg-card relative p-4 lg:p-6 ">
          <div className="space-y-1.5 border-l pl-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <h1 className="text-xs text-muted-foreground">Posted on</h1>
            </div>

            <p className="font-medium lg:text-base text-sm text-foreground">
              {data?.dateCreated
                ? format(data?.dateCreated, "yyyy/MM/dd")
                : "—"}
            </p>
          </div>{" "}
          <div className="space-y-1.5 border-l pl-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
              <h1 className="text-xs text-muted-foreground">Deadline</h1>
            </div>

            <span className="font-medium lg:text-base text-sm  text-foreground">
              {data?.deadline ? format(data?.deadline, "yyyy/MM/dd") : "—"}
            </span>
          </div>
          <div className="space-y-1.5 border-l pl-4 hidden lg:block">
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
      <div className="flex-1 pt-10 lg:px-6 px-2 ">
        <div className="space-y-3 ">
          <p className="text-sm text-muted-foreground">About</p>
          <p className="whitespace-pre-line lg:text-base text-sm">
            {data?.description}
          </p>
        </div>

        <div className="space-y-3 mt-12">
          <p className="text-sm text-muted-foreground">
            Full Scholarship Details
          </p>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-5 gap-2">
            {items
              .filter((item) => item.show)
              .map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-card/80 to-card/50 dark:from-card/40 dark:to-card/30 border border-border/40 rounded-lg p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 "
                >
                  {/* Icon */}
                  <div className="bg-background dark:bg-green-900/30 p-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col">
                    <p className="text-xs  tracking-wide text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <h1 className="text-base lg:text-lg font-semibold tracking-wide capitalize text-foreground leading-tight">
                      {item.value}
                    </h1>
                  </div>

                  {/* Subtle accent glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-3 mt-12">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Phase {documentPhasesLength} Required Documents
            </p>
            <p className="font-medium text-base">{lastPhaseLength}</p>
          </div>

          <div className="space-y-2">
            {Object.values(lastPhase).map((doc, index) => (
              <div
                className="flex justify-between items-center p-4 bg-card rounded-sm gap-3"
                key={doc.label}
              >
                <div className="text-sm lg:text-base line-clamp-1">
                  <span> {index + 1}. </span>
                  {doc.label}
                </div>
                <Badge
                  className={`text-white uppercase ${
                    doc.requirementType === "required"
                      ? "bg-red-700"
                      : doc.requirementType === "optional"
                      ? "bg-blue-700"
                      : ""
                  } `}
                >
                  {doc.requirementType}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:p-4 p-2 bg-card rounded-md mb-5 mt-12">
          <h1 className="text-center lg:text-base text-sm font-medium">
            Hurry before it ends
          </h1>
          <div className="transform scale-85 lg:scale-100">
            {data?.deadline && (
              <AnimatedNumberCountdown endDate={new Date(data?.deadline)} />
            )}
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" className="z-30"></ScrollBar>
    </ScrollArea>
  );
}

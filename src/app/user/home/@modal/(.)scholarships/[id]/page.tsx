"use client";
import {
  Activity,
  ArrowLeftFromLine,
  ArrowUpFromLine,
  Building,
  Calendar,
  Download,
  FileInput,
  Flame,
  GraduationCap,
  LogIn,
  Maximize,
  PhilippinePeso,
  Play,
  Share2,
  StickyNote,
  UserRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { motion } from "motion/react";
export function formatPHP(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount || 0);
}

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import useScholarshipUserById from "@/hooks/user/getScholarshipData";

import UploadDocs from "./docs-upload";
import { useSearchParams } from "next/navigation";

import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScholarshipCards from "@/app/administrator/home/@modal/(.)scholarships/cards";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
export default function InterceptManageScholarshipClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const [isApply, setIsApply] = useState(apply || false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useScholarshipUserById(id);

  const deadline = data?.scholarshipDeadline;

  const scholarshipCover = data?.scholarshipCover;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] w-[98%] mx-auto outline-0 border-0 lg:p-1 bg-background ${
          loading ? " lg:h-[75dvh] h-[68dvh]" : " lg:h-[95dvh] h-[90dvh]"
        }`}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
   
        <div className=" overflow-auto h-full no-scrollbar">
          {isApply ? (
            loading ? (
              <div className="relative flex flex-col h-full w-full ">
                <div className="flex-1 flex justify-center items-center">
                  <Ring size={40} speed={2} bgOpacity={0} color="green" />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex w-full items-center gap-3 ">
                    <Skeleton className="h-2 flex-1" />
                    <Skeleton className="h-2 w-6" />
                  </div>
                  <div className="flex w-full items-center gap-3 ">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </div>
              </div>
            ) : (
              data && <UploadDocs data={data} setIsApply={setIsApply} />
            )
          ) : loading ? (
            <div className="h-full w-full">
              <Skeleton className="flex-1 lg:aspect-[16/5] aspect-[16/9] w-full" />
              <div className="lg:space-y-15 space-y-10 lg:px-6 px-2 mt-5">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                  <div className="space-y-3">
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Skeleton className="flex-1 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full overflow-auto  bg-background rounded-t-md">
              <div className="absolute top-0 left-0 lg:h-80 h-60 w-full opacity-30   mask-gradient flex">
                {/* <img
                  className="w-full h-full object-cover blur-md "
                  src={scholarshipCover}
                  alt=""
                /> */}
              </div>
              <div className="  overflow-hidden">
                <div className="relative flex justify-center items-center ">
                  <div className="absolute inset-0border-b-2 border-black bg-card" />
                  <div className="absolute left-2 -bottom-15 z-10 lg:px-8  px-2 flex  items-center ">
                    <Avatar className="lg:size-25 size-20 border-background border-2 shadow-md">
                      <AvatarImage
                        className="object-cover"
                        src={data?.scholarshipLogo}
                      />
                      <AvatarFallback>
                        {data?.scholarshipProvider.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {scholarshipCover && (
                    <img
                      className="w-full lg:aspect-[16/4] aspect-[16/9]  object-cover   rounded-lg shadow-md"
                      src={scholarshipCover}
                      alt=""
                    />
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="absolute z-5  !bg-black/60 !text-gray-200"
                        size="sm"
                      >
                        View <Maximize />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="lg:w-3/4 w-full p-4">
                      <img
                        className="h-full w-full"
                        src={data?.scholarshipCover}
                        alt=""
                      />
                      <Link
                        className="w-full"
                        href={
                          (data?.scholarshipCover && data?.scholarshipCover) ||
                          ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" className="w-full">
                          <Download />
                          Download
                        </Button>
                      </Link>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="lg:space-y-15 space-y-10 lg:px-6 px-2 mt-17">
                  <div className="lg:space-y-1">
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
                      {data?.scholarshipTitle}
                      {data?.scholarshipDeadline &&
                      new Date(data.scholarshipDeadline).getTime() <
                        Date.now() ? (
                        <Badge className="bg-red-800 text-gray-200 tracking-wide">
                          EXPIRED
                        </Badge>
                      ) : (
                        <Badge className="bg-green-800 text-gray-200 tracking-wide">
                          ACTIVE
                        </Badge>
                      )}
                    </motion.span>
                    <p className="text-muted-foreground text-sm">
                      by {data?.scholarshipProvider}
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div className="space-y-3">
                      <div className="flex gap-2 items-center justify-center">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsApply(true)}
                          disabled={
                            data?.scholarshipDeadline
                              ? new Date(data.scholarshipDeadline).getTime() <
                                Date.now()
                              : false
                          }
                        >
                          <Flame />
                          Apply Now
                        </Button>

                        <Button
                          variant="outline"
                          disabled={
                            data?.scholarshipDeadline
                              ? new Date(data.scholarshipDeadline).getTime() <
                                Date.now()
                              : false
                          }
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({
                                  title:
                                    data?.scholarshipTitle ||
                                    "Scholarship Opportunity",
                                  text: `Check out this scholarship opportunity and apply now!`,
                                  url: window.location.href,
                                })
                                .then(() => console.log("Shared successfully"))
                                .catch((error) =>
                                  console.error("Sharing failed", error)
                                );
                            } else {
                              toast("Sharing not supported", {
                                description:
                                  "You can copy the link manually or try Chrome on Android or Safari on iOS.",
                              });
                            }
                          }}
                        >
                          <Share2 />
                        </Button>
                      </div>
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <PhilippinePeso />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Amount
                          </p>
                          <h1 className="text-lg font-medium font-mono">
                            {data?.scholarshipAmount}.00
                          </h1>
                        </div>
                      </div>
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Building />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Type
                          </p>
                          <h1 className="text-lg font-medium capitalize">
                            {data?.scholarshipType}
                          </h1>
                        </div>
                      </div>

                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <Calendar />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Deadline
                          </p>
                          <h1 className="text-lg font-medium">
                            {data?.scholarshipDeadline
                              ? format(
                                  new Date(data?.scholarshipDeadline),
                                  "PPP"
                                )
                              : "No deadline"}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex-1 p-4 space-y-2  rounded-md bg-card">
                        <div className="flex gap-3 items-center">
                          <StickyNote />
                          <p className="text-muted-foreground text-sm">
                            Scholarship Details
                          </p>
                        </div>

                        <h1 className="text-sm leading-relaxed">
                          {data?.scholarshipDescription}
                        </h1>
                      </div>
                      <div className="bg-card  p-4 space-y-1 rounded-md lg:col-span-1 col-span-2 flex gap-3 items-center">
                        <UserRound />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Scholarship Slot
                          </p>
                          <h1 className="text-lg font-medium">
                            {data?.scholarshipLimit} students
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {" "}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Required Documents
                        </h3>
                        <p className="font-medium text-lg">
                          {Object.keys(data?.scholarshipDocuments.documents || {}).length}
                        </p>
                      </div>

                      <div className=" divide-y">
                        {Object.values(data?.scholarshipDocuments.documents || {}).map(
                          (doc, index) => (
                            <div
                              className="flex justify-between items-center py-5"
                              key={doc.label}
                            >
                              <span> {index + 1}. </span>
                              {doc.label}
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
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card rounded-md">
                    <h1 className="text-center text-sm font-medium">
                      Hurry before it ends
                    </h1>
                    <div className="transform scale-85 lg:scale-100">
                      {deadline && (
                        <AnimatedNumberCountdown endDate={new Date(deadline)} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

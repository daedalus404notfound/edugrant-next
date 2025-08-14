"use client";
import {
  Calendar,
  Download,
  FileInput,
  GraduationCap,
  StickyNote,
  X,
} from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { motion } from "motion/react";

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
import { Badge } from "@/components/ui/badge";
import UploadDocs from "./docs-upload";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/ui/beam";
export default function InterceptManageScholarshipClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const [isApply, setIsApply] = useState(apply || false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useScholarshipUserById(id);
  const title = data?.scholarshipTitle || "N/A";
  const deadline = data?.scholarshipDealine;
  const provider = data?.scholarshipProvider || "unknown";
  const amount = data?.scholarshipAmount || "N/A";
  const description = data?.scholarshipDescription || "N/A";
  const scholarshipCover = data?.scholarshipCover;
  const scholarshipLogo = data?.scholarshipLogo;
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
      <DrawerContent className="max-w-[1000px] w-full mx-auto h-[98vh] outline-0 border-0 ">
        <DrawerHeader className={isApply ? "" : "sr-only"}>
          <DrawerTitle className="text-xl flex gap-1.5 items-center">
            <GraduationCap />
            Apply Scholarship
          </DrawerTitle>
          <DrawerDescription>
            {" "}
            Complete your application by uploading the required documents below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-900 rounded">
              <X size={16} />
            </button>
            <h1 className="text-sm font-medium">Scholarship Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="relative" variant="outline" size="sm">
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
              Download Form <Download/>
            </Button>
          </div>
        </div>
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
          ) : (
            <div className="relative h-full w-full">
              <div className="px-4">
                <Separator />
              </div>
              <div className="absolute top-0 left-0 h-99 w-full brightness-10  bg-black mask-gradient flex">
                <img
                  className="w-full h-full object-cover blur-md "
                  src={scholarshipCover}
                  alt=""
                />
              </div>

              <div className="relative gap-5 p-4 z-10">
                <div className=" space-y-8">
                  <div className=" border-b border-neutral-800 overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 border-b-2 border-black" />
                      {scholarshipCover && (
                        <img
                          className="w-full h-48 object-cover   rounded-t-md"
                          src={scholarshipCover}
                          alt=""
                        />
                      )}
                    </div>

                    <div className="relative z-10 py-8 px-4">
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <div className="size-28 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden">
                            {scholarshipLogo && (
                              <img
                                className="w-full h-full object-cover"
                                src={scholarshipLogo}
                                alt=""
                              />
                            )}
                          </div>
                        </div>

                        <div className="w-full flex justify-between">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <motion.span
                                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                       flex items-center gap-1.5 text-3xl font-semibold tracking-tight
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
                              </motion.span>
                              <p className="text-muted-foreground text-sm">
                                by {data?.scholarshipProvider}
                              </p>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                ₱{data?.scholarshipAmount}.00
                              </div>
                              |
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {data?.scholarshipDealine &&
                                  format(data?.scholarshipDealine, "PPP")}
                              </div>
                              <Badge className="bg-green-800 text-gray-200">
                                Active
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View image details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-15 px-4">
                    {/* Hero Section */}

                    {/* Description */}
                    <div className="space-y-3">
                      <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        About scholarship
                      </h2>
                      <p className="text-gray-300 leading-relaxed max-w-2xl">
                        {data?.scholarshipDescription}
                      </p>
                    </div>

                    {/* Requirements */}

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Academic Requirement
                        </h3>
                        <div className="text-lg font-semibold">
                          {data?.scholarshipAmount} GWA minimum
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Required Documents
                          </h3>
                          <p className="font-medium text-lg">
                            {data?.scholarshipDocuments.length}
                          </p>
                        </div>
                        <Separator className="bg-neutral-200 dark:bg-neutral-800" />

                        <div className="space-y-1.5">
                          {data?.scholarshipDocuments.map((doc) => (
                            <div
                              key={doc.label}
                              className="flex items-center gap-3 rounded-md  py-4  "
                            >
                              <StickyNote
                                size={16}
                                className="text-neutral-400 dark:text-neutral-500 shrink-0"
                              />
                              <span className="truncate text-sm text-neutral-700 dark:text-neutral-300">
                                {doc.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-card rounded-md">
                      <h1 className="text-center text-sm font-medium">
                        Hurry before it ends
                      </h1>
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

        {!isApply && (
          <div className="p-4">
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-green-950 border border-green-950 hover:bg-green-800 text-gray-200 hover:border-green-800"
                onClick={() => setIsApply(true)}
                disabled={loading}
              >
                <FileInput />
                Apply Scholarship
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => HandleCloseDrawer(false)}
                disabled={loading}
              >
                <X />
                Back
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

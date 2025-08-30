"use client";
import {
  ArrowLeftFromLine,
  ArrowUpFromLine,
  Download,
  FileInput,
  GraduationCap,
  Maximize,
  Share2,
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

import UploadDocs from "./docs-upload";
import { useSearchParams } from "next/navigation";

import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScholarshipCards from "@/app/administrator/home/@modal/(.)scholarships/cards";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
      <DrawerContent className="max-w-[1000px] w-[98%] mx-auto h-[95dvh] outline-0 border-0 lg:p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between lg:pb-2">
          <div className="flex items-center gap-3">
            <Button className="relative" variant="ghost" size="sm">
              <GraduationCap />
              {!isApply
                ? `${data?.scholarshipTitle || "Scholarship"} Details`
                : `Application for ${data?.scholarshipTitle}`}
            </Button>
          </div>
          <div className="flex items-center gap-2"></div>
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
          ) : loading ? (
            <div className="bg-background h-full w-full p-4 rounded-t-md space-y-4 overflow-hidden">
              <Skeleton className="h-45 w-full" />
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-full size-25" />
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-8 w-54" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full overflow-auto no-scrollbar bg-background rounded-t-md">
              <div className="absolute top-0 left-0 lg:h-80 h-60 w-full opacity-30   mask-gradient flex">
                <img
                  className="w-full h-full object-cover blur-md "
                  src={scholarshipCover}
                  alt=""
                />
              </div>
              <div className="  overflow-hidden">
                <div className="relative flex justify-center items-center ">
                  <div className="absolute inset-0border-b-2 border-black" />
                  {scholarshipCover && (
                    <img
                      className="w-full lg:h-45 h-30 object-cover   rounded-t-md"
                      src={scholarshipCover}
                      alt=""
                    />
                  )}
                  <Button
                    variant="outline"
                    className="absolute z-5 lg:bottom-3 lg:right-3  !bg-black/60 !text-gray-200"
                    size="sm"
                  >
                    View <Maximize />
                  </Button>
                </div>

                <div className="relative z-10 lg:p-4 p-2 ">
                  <Avatar className="lg:size-25 size-23">
                    <AvatarImage
                      className="object-cover"
                      src={data?.scholarshipLogo}
                    />
                    <AvatarFallback>
                      {data?.scholarshipProvider.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="lg:space-y-1 mt-2">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                 flex items-center gap-1.5 lg:text-2xl text-lg font-bold tracking-tight
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
                </div>

                <div className="lg:space-y-15 space-y-10 lg:px-4 px-2 mt-5">
                  <div className="flex flex-col gap-5 max-w-2xl w-full">
                    <div className="w-full flex gap-2">
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() => setIsApply(true)}
                        disabled={loading}
                      >
                        Apply Now
                      </Button>
                      <Button variant="secondary">
                        <Share2 />
                      </Button>
                    </div>
                    <div className="lg:space-y-3 space-y-1">
                      {" "}
                      <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        About scholarship
                      </h2>
                      <p className=" leading-relaxed w-full lg:text-base text-sm">
                        {data?.scholarshipDescription}
                      </p>
                    </div>
                  </div>
                  {/* Stats Grid */}
                  {data && <ScholarshipCards data={data} />}

                  {/* Requirements */}

                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div></div>
                    <div className="space-y-6">
                      {" "}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Required Documents
                          </h3>
                          <p className="font-medium text-lg">
                            {
                              Object.keys(data?.scholarshipDocuments || {})
                                .length
                            }
                          </p>
                        </div>

                        <div className=" grid grid-cols-1 gap-5">
                          {Object.values(data?.scholarshipDocuments || {}).map(
                            (doc, index) => (
                              <Label key={doc.label}>
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
                              </Label>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card rounded-md">
                    <h1 className="text-center text-sm font-medium">
                      Hurry before it ends
                    </h1>
                    <div className="transform scale-75 lg:scale-100">
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

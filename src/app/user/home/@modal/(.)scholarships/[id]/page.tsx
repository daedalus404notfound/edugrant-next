"use client";
import {
  ArrowLeftFromLine,
  ArrowUpFromLine,
  Download,
  FileInput,
  GraduationCap,
  Maximize,
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
      <DrawerContent className="max-w-[1000px] w-full mx-auto h-[95vh] outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between pb-2">
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
            <div className="bg-background h-full w-full p-4 rounded-t-xl space-y-4 overflow-hidden">
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
            <div className="relative h-full w-full overflow-auto no-scrollbar bg-background rounded-t-xl">
              <div className="absolute top-0 left-0 h-80 w-full opacity-30   mask-gradient flex">
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
                      className="w-full h-45 object-cover   rounded-t-md"
                      src={scholarshipCover}
                      alt=""
                    />
                  )}
                  <Button
                    className="absolute z-5 bottom-3 right-3"
                    variant="secondary"
                  >
                    View <Maximize />
                  </Button>
                </div>

                <div className="relative z-10  p-4">
                  <Avatar className="size-25">
                    <AvatarImage
                      className="object-cover"
                      src={data?.scholarshipLogo}
                    />
                    <AvatarFallback>
                      {data?.scholarshipProvider.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 mt-2">
                    <motion.span
                      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                                 flex items-center gap-1.5 text-2xl font-bold tracking-tight
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
                <div className="space-y-15 px-4 mt-5">
                  {/* Stats Grid */}
                  {data && <ScholarshipCards data={data} />}

                  {/* Requirements */}

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        About scholarship
                      </h2>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {data?.scholarshipDescription}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {" "}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-3">
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

                        <div className="space-y-1.5 grid grid-cols-1">
                          {Object.values(data?.scholarshipDocuments || {}).map(
                            (doc) => (
                              <Button
                                className="justify-start"
                                variant="ghost"
                                key={doc.label}
                              >
                                <FileInput />
                                {doc.label}
                              </Button>
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
                    {deadline && (
                      <AnimatedNumberCountdown endDate={new Date(deadline)} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isApply &&
          (loading ? (
            <div className="p-4 sticky bottom-0 bg-card border-t">
              <div className="flex gap-3">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
              </div>
            </div>
          ) : (
            <div className="p-4 sticky bottom-0 bg-card border-t">
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-blue-950 border border-blue-950 hover:bg-blue-800 text-gray-200 hover:border-blue-800"
                  onClick={() => setIsApply(true)}
                  disabled={loading}
                >
                  <ArrowUpFromLine />
                  Apply Scholarship
                </Button>
                <a
                  download
                  href={data?.scholarshipForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    className="w-full bg-green-950 border border-green-950 hover:bg-green-800 text-gray-200 hover:border-green-800"
                    disabled={loading}
                  >
                    <Download className="mr-2" />
                    Download Form
                  </Button>
                </a>

                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => HandleCloseDrawer(false)}
                  disabled={loading}
                >
                  <ArrowLeftFromLine />
                  Back
                </Button>
              </div>
            </div>
          ))}
      </DrawerContent>
    </Drawer>
  );
}

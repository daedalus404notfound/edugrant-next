"use client";
import {
  CalendarX2,
  ExternalLink,
  File,
  FileInput,
  FolderOpen,
  GraduationCap,
  Wallet,
  X,
} from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

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
import { BGPattern } from "@/components/ui/grid";
import AnimatedNumberCountdown from "@/components/ui/countdown";
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
      <DrawerContent className="lg:w-[900px] w-[98%] mx-auto h-[95vh] outline-0 border-0 ">
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
            <div className="relative h-full w-full p-2 overflow-auto no-scrollbar pt-15">
              <div className="absolute top-0 left-0 h-60 w-full brightness-10  bg-black mask-gradient flex">
                <img
                  className="w-full h-full object-cover  "
                  src={scholarshipCover}
                  alt=""
                />
              </div>

              <div className="relative gap-5 p-4 z-10">
                <div className=" space-y-8">
                  <div className="flex flex-col items-center  w-full p-4 ">
                    <img
                      className="size-35 object-cover rounded-full  shadow-2xl shadow-background"
                      src={scholarshipLogo}
                      alt=""
                    />
                    <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
                    <h3 className="mt-1">{provider}</h3>
                    <Button className=" mt-2 underline" variant="link">
                      View Image Details
                      <ExternalLink />
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">
                      About this scholarship
                    </p>
                    <p className="line-clamp-4">{description}</p>
                  </div>
                  {deadline && (
                    <AnimatedNumberCountdown endDate={new Date(deadline)} />
                  )}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="relative border lg:p-4 p-2.5 rounded-md bg-background/50 flex justify-between items-end">
                      <div className="space-y-3">
                        <h1 className="text-xs text-muted-foreground">
                          Amount
                        </h1>
                        <Wallet />
                      </div>
                      <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                        ₱{amount}
                      </p>
                    </div>
                    <div className="border lg:p-4 p-2.5 rounded-md bg-background/50 flex justify-between items-end">
                      <div className="space-y-3">
                        <h1 className="text-xs text-muted-foreground">
                          Deadline
                        </h1>
                        <CalendarX2 />
                      </div>
                      <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                        {deadline && format(deadline, "PPP")}
                      </p>
                    </div>{" "}
                    <div className="border lg:p-4 p-2.5 rounded-md bg-background/50  flex justify-between items-end">
                      <div className="space-y-3">
                        <h1 className="text-xs text-muted-foreground">
                          Required Documents
                        </h1>
                        <File />
                      </div>
                      <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                        {data?.scholarshipDocuments.length}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-sm text-muted-foreground">
                      Required Documents
                    </h1>
                    <div className="grid grid-cols-3 gap-5">
                      {data?.scholarshipDocuments.map((meow) => (
                        <div
                          key={meow.label}
                          className="relative flex flex-col justify-center items-center"
                        >
                          <div className="relative size-30 flex justify-center items-center">
                            <BGPattern variant="grid" mask="fade-edges" />

                            <FolderOpen strokeWidth={1.5} size={50} />
                          </div>

                          <h1 className="text-sm line-clamp-1">{meow.label}</h1>
                          <div className="space-x-1.5">
                            <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                              PDF
                            </Badge>
                            <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                              DOCX
                            </Badge>
                            <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                              JPG
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isApply && (
          <div className="p-2">
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

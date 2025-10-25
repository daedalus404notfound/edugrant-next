"use client";
import { Ban, Upload } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useScholarshipUserById from "@/hooks/user/getScholarshipData";
import UploadDocs from "./docs-upload";

import { Separator } from "@/components/ui/separator";

import { useUserStore } from "@/store/useUserStore";
import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";
import ModalHeader from "@/components/ui/modal-header";
import ScholarshipModal from "@/components/ui/scholarship-modal";
import socket from "@/lib/socketLib";
import NoDataFound from "@/components/ui/nodata";
import { useScholarshipIdStore } from "@/store/scholarshipByIdStore";
import { useScholarshipUserStore } from "@/store/scholarshipUserStore";
export default function InterceptManageScholarshipClient() {
  const [applying, setApplying] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);

  const id = params.id as string;
  const { data, loading, isGovernmentAlready } = useScholarshipUserById(
    Number(id)
  );
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };
  const { user } = useUserStore();
  // const findMatch = user?.Student.Application.find(
  //   (meow) => meow.scholarshipId === data?.scholarshipId
  // );

  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const isGov = isGovernmentAlready && data?.type === "government";
  const isExpired =
    data?.deadline && new Date(data.deadline).getTime() < Date.now();
  const isSubmitted = data?.Application?.length! > 0;

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[56%] w-[98%] lg:min-w-5xl mx-auto outline-0 border-0 lg:p-1 bg-card ${
          loading ? " lg:h-[75dvh] h-[68dvh]" : " lg:h-[95dvh] h-[90dvh]"
        }`}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ModalHeader HandleCloseDrawer={HandleCloseDrawer} />
        <div className="relative h-full w-full overflow-auto no-scrollbar  bg-background rounded-t-md">
          {applying === true ? (
            data && (
              <UploadDocs
                data={data}
                setApplying={setApplying}
                HandleCloseDrawer={HandleCloseDrawer}
              />
            )
          ) : loading ? (
            <ScholarshipModalLoading />
          ) : data === null ? (
            <NoDataFound />
          ) : (
            <div>
              {data && <ScholarshipModal data={data} />}
              <div className=" sticky bottom-0">
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="lg:px-6 lg:py-6 px-2 py-4 flex gap-3  bg-background">
                  <Button
                    className="flex-1"
                    onClick={() => setApplying(true)}
                    disabled={isExpired || isSubmitted || isGov}
                    variant={
                      isGov
                        ? "destructive"
                        : isSubmitted
                        ? "destructive"
                        : isExpired
                        ? "destructive"
                        : "default"
                    }
                  >
                    {isGov ? (
                      <>
                        <Ban />
                        <p> You have an APPROVED government already.</p>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Ban />
                        <p>Already Applied</p>
                      </>
                    ) : isExpired ? (
                      <>
                        <Ban />
                        <p>Scholarship Expired</p>
                      </>
                    ) : (
                      <>
                        <Upload />
                        <p> Apply Scholarship</p>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";
import { Edit, Edit2, RefreshCcw, Trash2 } from "lucide-react";

import { useModeStore } from "@/store/scholarshipModalStore";

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
import EditScholarship from "./edit-form";

import useScholarshipUserByIdAdmin from "@/hooks/admin/getScholarshipData";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import RedeployScholarship from "./renewal";

import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";
import ScholarshipModal from "@/components/ui/scholarship-modal";
import ModalHeader from "@/components/ui/modal-header";
import { useAdminStore } from "@/store/adminUserStore";
import { useUpdateScholarshipStore } from "@/store/editScholarStore";
import { useTourContext } from "@/components/tour-2/tour-provider";
import { TourStep } from "@/components/tour-2/tour-step";

export default function InterceptManageScholarship() {
  const { isActive, activeTourName, currentStep } = useTourContext();
  const { admin } = useAdminStore();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = Number(params.id);

  const { data, loading } = useScholarshipUserByIdAdmin(id);
  const { updatedScholarship, clearUpdatedScholarship } =
    useUpdateScholarshipStore();
  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );
  console.log(isActive, activeTourName, currentStep);
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;
  const [mode, setMode] = useState("details");
  const [openDelete, setOpenDelete] = useState(false);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      clearUpdatedScholarship();
      setTimeout(() => {
        router.back();
        setMode("details");
      }, 250);
    }
  };
  const { deleteScholarship, deleteLoading, isSuccess } = useDeleteScholarship({
    id,
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenDelete(false);
      HandleCloseDrawer(false);
    }
  }, [isSuccess]);

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        onInteractOutside={(e) => {
          isActive ? e.preventDefault() : "";
        }}
        onEscapeKeyDown={(e) => {
          isActive ? e.preventDefault() : "";
        }}
        className="max-w-[1100px] w-full mx-auto outline-0 border-0 p-1"
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ModalHeader
          text="Scholarship Details"
          HandleCloseDrawer={HandleCloseDrawer}
        />

        {loading ? (
          <ScholarshipModalLoading />
        ) : mode === "details" ? (
          data && (
            <div className="relative ">
              {isActive && (
                <div className="absolute z-20 inset-0 bg-background/70 backdrop-blur-xs rounded-t-lg"></div>
              )}
              <ScholarshipModal data={data} />
              <div className=" flex p-4  relative z-50  bg-gradient-to-b backdrop-blur-sm to-card from-card/50 gap-3">
                {isActive && (
                  <div className="absolute z-20 inset-0 bg-background/70 backdrop-blur-xs"></div>
                )}
                <TourStep
                  setter={setMode}
                  setterValue="edit"
                  className={`flex-1 ${isActive ? "pointer-events-none" : ""}`}
                  stepId="2"
                  setterPrev={HandleCloseDrawer}
                  setterValuePrev={false}
                >
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setMode("edit")}
                  >
                    <Edit2 /> Edit
                  </Button>
                </TourStep>
                {new Date(data.deadline) < new Date() && (
                  <TourStep
                    setter={setMode}
                    setterValue="renewal"
                    className={`flex-1 ${
                      isActive ? "pointer-events-none" : ""
                    }`}
                    stepId="renew-2"
                    setterPrev={HandleCloseDrawer}
                    setterValuePrev={false}
                  >
                    <Button
                      size="lg"
                      className={`w-full ${
                        isActive ? "pointer-events-none" : ""
                      }`}
                      variant="secondary"
                      onClick={() => setMode("renewal")}
                    >
                      <RefreshCcw /> Renewal
                    </Button>
                  </TourStep>
                )}
                <DeleteDialog
                  open={openDelete}
                  onOpenChange={setOpenDelete}
                  onConfirm={() => deleteScholarship()}
                  loading={deleteLoading}
                  red={true}
                  title="Delete scholarship?"
                  description="This will be saved to database."
                  confirmTextLoading="Deleting..."
                  confirmText="Delete"
                  cancelText="Cancel"
                  trigger={
                    <Button
                      type="button"
                      variant="destructive"
                      className="cursor-pointer flex-1"
                      disabled={deleteLoading}
                      onClick={() => setOpenDelete(true)}
                    >
                      <Trash2 />
                      Delete
                    </Button>
                  }
                />
              </div>
            </div>
          )
        ) : mode === "edit" ? (
          data && (
            <EditScholarship
              data={data}
              setMode={setMode}
              HandleCloseDrawer={HandleCloseDrawer}
            />
          )
        ) : mode === "renewal" ? (
          data && (
            <RedeployScholarship
              data={data}
              setMode={setMode}
              HandleCloseDrawer={HandleCloseDrawer}
            />
          )
        ) : (
          ""
        )}
      </DrawerContent>
    </Drawer>
  );
}

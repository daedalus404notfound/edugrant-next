"use client";
import { Edit, Trash2 } from "lucide-react";

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

export default function InterceptManageScholarship() {
  const [openAlert, setOpenAlert] = useState(false);

  const { admin } = useAdminStore();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;

  const { data, loading, setData } = useScholarshipUserByIdAdmin(id);
  const { updatedScholarship, clearUpdatedScholarship } =
    useUpdateScholarshipStore();
  useEffect(() => {
    if (
      updatedScholarship &&
      updatedScholarship.scholarshipId === data?.scholarshipId
    ) {
      setData(updatedScholarship);
    }
  }, [updatedScholarship, data, setData]);
  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );

  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const { mode, setMode } = useModeStore();
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
  const { onSubmit, isSuccess, deleteLoading } = useDeleteScholarship({
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
    accountId: admin?.accountId,
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenAlert(false);
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
      <DrawerContent className="max-w-[1000px] w-full mx-auto max-h-[90vh] outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ModalHeader HandleCloseDrawer={HandleCloseDrawer} />
        <div className="relative h-full w-full overflow-auto no-scrollbar  bg-background rounded-t-md flex flex-col">
          {mode === "edit" ? (
            loading ? (
              <ScholarshipModalLoading />
            ) : (
              data && (
                <EditScholarship
                  data={data}
                  HandleCloseDrawer={HandleCloseDrawer}
                />
              )
            )
          ) : mode === "details" ? (
            loading ? (
              <ScholarshipModalLoading />
            ) : (
              data && (
                <div>
                  <ScholarshipModal data={data} />
                  <div className="p-4 sticky bottom-0 bg-card border-t">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setMode("edit")}
                        className="flex-1"
                        disabled={
                          data?.deadline &&
                          new Date(data.deadline).getTime() < Date.now()
                        }
                      >
                        <Edit /> Edit
                      </Button>

                      <DeleteDialog
                        open={openAlert}
                        onOpenChange={setOpenAlert}
                        onConfirm={onSubmit}
                        loading={deleteLoading}
                        title="Delete application?"
                        description="This will permanently delete scholarship and cannot be undone."
                        confirmText="Delete"
                        cancelText="Keep"
                        trigger={
                          <Button
                            className="flex-1"
                            variant="destructive"
                            onClick={() => setOpenAlert(true)}
                          >
                            <Trash2 /> Delete
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            )
          ) : mode === "renewal" ? (
            loading ? (
              <ScholarshipModalLoading />
            ) : (
              data && (
                <RedeployScholarship
                  data={data}
                  HandleCloseDrawer={HandleCloseDrawer}
                />
              )
            )
          ) : (
            ""
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

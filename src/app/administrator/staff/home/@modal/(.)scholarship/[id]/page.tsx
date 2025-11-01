"use client";
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
import useScholarshipUserByIdAdmin from "@/hooks/admin/getScholarshipData";
import ScholarshipModal from "@/components/ui/scholarship-modal";
import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";
import ModalHeader from "@/components/ui/modal-header";

export default function InterceptManageScholarship() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = Number(params.id);
  const { data, loading } = useScholarshipUserByIdAdmin(id);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1000px] w-full mx-auto outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <ModalHeader
          text="Scholarship Details"
          HandleCloseDrawer={HandleCloseDrawer}
        />
        <div className="relative h-full w-full overflow-auto no-scrollbar  bg-background rounded-t-md">
          {loading ? (
            <ScholarshipModalLoading />
          ) : (
            data && <ScholarshipModal data={data} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

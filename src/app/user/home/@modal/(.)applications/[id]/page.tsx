"use client";
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
export default function InterceptManageApplicationClient() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;

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
      <DrawerContent className="lg:w-[56%] w-[98%] mx-auto lg:h-[95dvh] h-[90dvh] outline-0 border-0 lg:p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 bg-background rounded-t-lg"></div>
        <div className="lg:p-4 p-2 bg-background/40 flex gap-3 ">
          <Button variant="secondary" className="flex-1">
            Edit Application
          </Button>
          <Button variant="secondary" className="flex-1">
            Back
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

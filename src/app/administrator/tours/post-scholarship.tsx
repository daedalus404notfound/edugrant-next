import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TitleReusable from "@/components/ui/title";
import { useState } from "react";

export default function PostTour() {
  const [openGuide, setOpenGuide] = useState(false);
  return (
    <Dialog open={openGuide} onOpenChange={setOpenGuide}>
      <DialogContent
        className="!bg-card w-lg p-6"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>
            <TitleReusable title="Welcome to HEAD EDUGRANT" description="" />
          </DialogTitle>
          <DialogDescription className="mt-3">
            Begin managing scholarship programs. You can take a quick tour to
            learn the process, or skip it and start right away.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-3">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => setOpenGuide(false)}
          >
            Skip for Now
          </Button>
          <div onClick={() => setOpenGuide(false)} className="flex-1 ">
            <TourTrigger
              tourName="postScholarship"
              className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

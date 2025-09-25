import { GraduationCap, X } from "lucide-react";
import { Button } from "./button";

export default function ModalHeader({
  HandleCloseDrawer,
  scholarship = true,
}: {
  HandleCloseDrawer: (drawer: boolean) => void;
  scholarship?: boolean;
}) {
  return (
    <div className="flex items-center justify-between lg:pb-2 ">
      <div className="flex items-center gap-3">
        <Button className="relative justify-start" variant="ghost" size="sm">
          <GraduationCap />
          {scholarship === true ? "Scholarship" : "Application"} Details
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="ghost"
          variant="ghost"
          size="sm"
          onClick={() => HandleCloseDrawer(false)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}

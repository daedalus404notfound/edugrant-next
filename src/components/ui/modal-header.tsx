import { GraduationCap, Info, Table, X } from "lucide-react";
import { Button } from "./button";
import { useTourContext } from "../tour-2/tour-provider";

export default function ModalHeader({
  HandleCloseDrawer,
  text,
}: {
  HandleCloseDrawer: (drawer: boolean) => void;
  text: string;
}) {
  const { isActive } = useTourContext();
  return (
    <div className="flex items-center justify-between lg:pb-2 ">
      <div className="flex items-center gap-3">
        <Button className="relative justify-start" variant="ghost" size="sm">
          <Table />
          {text}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {!isActive && (
          <Button
            className="ghost"
            variant="ghost"
            size="sm"
            onClick={() => HandleCloseDrawer(false)}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}

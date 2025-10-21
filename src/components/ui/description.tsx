import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnnouncementDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);

  // adjust limit depending on how short/long you want before showing the button
  const isLong = description.length > 210;

  return (
    <div>
      <p className={` leading-relaxed mt-2 ${expanded ? "" : "line-clamp-2"}`}>
        {description}
      </p>

      {isLong && (
        <Button
          variant="link"
          size="sm"
          className="px-0 h-auto text-emerald-600 mt-3"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      )}
    </div>
  );
}

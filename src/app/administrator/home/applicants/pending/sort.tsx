import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const sortList = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];
import { Button } from "@/components/ui/button";
import {
  AlignHorizontalDistributeCenter,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useState } from "react";

type SortTypes = {
  query: string;
  sort: string;
  setSort: (sort: "" | "asc" | "desc" | "newest" | "oldest") => void;
};
export default function SortApplicants({ query, sort, setSort }: SortTypes) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          disabled={query !== ""}
        >
          <AlignHorizontalDistributeCenter />
          {sort
            ? sortList.find((framework) => framework.value === sort)?.label
            : "Sort by"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {sortList.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setSort(
                      currentValue === sort
                        ? ""
                        : (currentValue as
                            | ""
                            | "asc"
                            | "desc"
                            | "newest"
                            | "oldest")
                    );
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      sort === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

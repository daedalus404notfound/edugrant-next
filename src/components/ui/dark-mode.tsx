"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 space-y-1" align="end">
        <button
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-muted rounded text-sm"
        >
          <span className="bg-white h-3 w-5 rounded-full"></span> Light + Green
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-muted rounded text-sm"
        >
          <span className="bg-green-600 h-3 w-5 rounded-full"></span> Dark +
          Green
        </button>
        <button
          onClick={() => setTheme("blue")}
          className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-muted rounded text-sm"
        >
          <span className="bg-blue-600 h-3 w-5 rounded-full"></span> Dark + Blue
        </button>
        <button
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-muted rounded text-sm"
        >
          <span className="bg-black h-3 w-5 rounded-full"></span> System
        </button>
      </PopoverContent>
    </Popover>
  );
}

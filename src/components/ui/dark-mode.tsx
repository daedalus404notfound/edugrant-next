"use client";

import * as React from "react";
import { Check, Minus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import system from "@/assets/ui-system.png";
import dark from "@/assets/ui-dark.png";
import light from "@/assets/ui-light.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="rounded-full relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className=" p-2 grid items-center grid-cols-3 justify-center gap-4 lg:w-md"
        align="end"
      >
        <div className="flex flex-col" onClick={() => setTheme("light")}>
          <span
            className={`rounded-sm overflow-hidden border border-transparent ${
              theme === "light" ? "shadow border border-ring" : ""
            }`}
          >
            <img src={light.src} alt="" />
          </span>
          <div className="flex gap-2">
            {theme === "light" ? <Check size={15} /> : <Minus size={15} />}
            <p
              className={`text-muted-foreground text-xs ${
                theme === "light" ? "text-primary" : ""
              }`}
            >
              Light
            </p>
          </div>
        </div>
        <div className="flex flex-col" onClick={() => setTheme("dark")}>
          <span
            className={`rounded-sm overflow-hidden border border-transparent ${
              theme === "dark" ? "shadow border border-ring" : ""
            }`}
          >
            <img src={dark.src} alt="" />
          </span>

          <div className="flex gap-2">
            {theme === "dark" ? <Check size={15} /> : <Minus size={15} />}
            <p
              className={`text-muted-foreground text-xs ${
                theme === "dark" ? "text-primary" : ""
              }`}
            >
              Dark
            </p>
          </div>
        </div>

        <div className="flex flex-col" onClick={() => setTheme("system")}>
          <span
            className={`rounded-sm overflow-hidden border border-transparent ${
              theme === "system" ? "shadow border border-ring" : ""
            }`}
          >
            <img src={system.src} alt="" />
          </span>

          <div className="flex gap-2">
            {theme === "system" ? <Check size={15} /> : <Minus size={15} />}
            <p
              className={`text-muted-foreground text-xs ${
                theme === "system" ? "text-primary" : ""
              }`}
            >
              System
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

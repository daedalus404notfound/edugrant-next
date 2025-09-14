"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { useTheme } from "next-themes";

import system from "@/assets/ui-system.png";
import dark from "@/assets/ui-dark.png";
import light from "@/assets/ui-light.png";

export function ModeToggle2() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
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
      </div>
    </div>
  );
}

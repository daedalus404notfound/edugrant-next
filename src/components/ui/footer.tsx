import { AnimatePresence, motion } from "motion/react";
import { Button } from "./button";
import { Facebook, FacebookIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-10 py-5 flex justify-center items-center flex-col gap-2">
      <p>2025 BASC Edugrant </p>
      <p className="text-muted-foreground text-sm">All rights reserved.</p>
    </footer>
  );
}

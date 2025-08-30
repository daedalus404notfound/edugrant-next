"use client";

import { motion } from "framer-motion";
import ghost from "@/assets/pngfind.com-cute-ghost-png-2853935.png";

export default function NoDataFound() {
  return (
    <div className="lg:col-span-3 h-[50dvh] flex flex-col justify-center items-center gap-1.5">
      <motion.img
        src={ghost.src}
        alt="Floating Ghost"
        className="size-12"
        animate={{ y: [0, -10, 0] }} // moves up and down
        transition={{
          duration: 2, // time for one cycle
          repeat: Infinity, // loops forever
          ease: "easeInOut",
        }}
      />
      <h1 className="font-semibold text-lg">Boo! Nothing Here...</h1>
      <p className="text-sm text-muted-foreground">
        Seems this page is haunted by emptiness.
      </p>
    </div>
  );
}

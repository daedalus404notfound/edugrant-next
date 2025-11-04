"use client";

import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function NoDataFound() {
  return (
    <div className="lg:col-span-3 lg:h-[50dvh] h-[40dvh] flex flex-col justify-center items-center gap-3 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-center rounded-full bg-muted lg:p-4 p-2 shadow-sm"
      >
        <Inbox className="lg:w-10 w-6 lg:h-10 h-6 text-muted-foreground" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="lg:text-lg text-base font-semibold"
      >
        No Data Available
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-sm text-muted-foreground max-w-sm px-2"
      >
        We couldn’t find any records to display. Please refresh the page or
        check back later
      </motion.p>
    </div>
  );
}

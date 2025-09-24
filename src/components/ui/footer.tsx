import { AnimatePresence, motion } from "motion/react";
import { Button } from "./button";
import { Facebook, FacebookIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-10 py-5 flex justify-center items-center flex-col gap-2">
      <div className="mask-gradient">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-500/70
  lg:text-8xl text-4xl  havelock tracking-[-10px]
  "
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          BASC Edugrant
        </motion.span>
      </div>
      <p>2025 BASC Edugrant </p>
      <p className="text-muted-foreground text-sm">All rights reserved.</p>
    </footer>
  );
}

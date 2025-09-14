import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export default function TitleReusable({
  title,
  description,
  Icon,
  titleSize = "text-xl", // default size for title
  descriptionSize = "text-sm", // default size for description
}: {
  title: string;
  description: string;
  Icon?: LucideIcon;
  titleSize?: string; // Tailwind text size (e.g., "text-2xl")
  descriptionSize?: string;
}) {
  return (
    <div>
      <motion.span
        className={`bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] 
          bg-[length:200%_100%] bg-clip-text text-primary/70
          font-semibold flex items-center gap-1.5 ${titleSize}`}
        initial={{ backgroundPosition: "200% 0" }}
        animate={{ backgroundPosition: "-200% 0" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 7,
          ease: "linear",
        }}
      >
        {Icon && <Icon strokeWidth={2} />}
        {title}
      </motion.span>

      <p className={`${descriptionSize} text-gray-500 mt-1`}>{description}</p>
    </div>
  );
}

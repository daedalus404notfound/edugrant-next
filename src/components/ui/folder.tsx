// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";

// type GlassFolderProps = {
//   icon?: React.ReactNode;
//   className?: string;
// };

// const GlassFolder: React.FC<GlassFolderProps> = ({ icon, className }) => {
//   return (
//     <section
//       className={cn(
//         "relative group flex flex-col items-center justify-center [zoom:0.55] lg:[zoom:0.8]",
//         className
//       )}
//     >
//       <div className="relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-50">
//         {/* Top tab */}
//         <div
//           className="bg-amber-600/30 backdrop-blur-md w-full h-full origin-top rounded-2xl rounded-tl-none
//           group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative
//           after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-600/30 after:backdrop-blur-md after:rounded-t-2xl
//           before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px]  before:bg-amber-600/30 before:backdrop-blur-md before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
//         ></div>

//         {/* Folder layers */}
//         <div className="absolute inset-1 bg-amber-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"></div>
//         <div className="absolute inset-1 bg-amber-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"></div>
//         <div className="absolute inset-1 bg-amber-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"></div>

//         {/* Front folder layer with icon */}
//         <div
//           className="absolute bottom-0 bg-amber-500/20 backdrop-blur-md w-full h-[156px] rounded-2xl rounded-tr-none
//           after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-500/20 after:backdrop-blur-md after:rounded-t-2xl
//           before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:bg-amber-500/20 before:backdrop-blur-md before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);]
//           transition-all ease duration-300 origin-bottom flex items-center justify-center
//           group-hover:shadow-[inset_0_20px_40px_rgba(100,149,237,0),inset_0_-20px_40px_rgba(65,105,225,0)]
//           group-hover:[transform:rotateX(-46deg)_translateY(1px)]"
//         >
//           <div className="text-foreground text-4xl">{icon}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GlassFolder;
"use client";

import React from "react";
import { cn } from "@/lib/utils";

type GlassFolderProps = {
  icon?: React.ReactNode;
  className?: string;
  color?: string; // accepts a Tailwind color like "amber", "blue", "rose", etc.
};

const GlassFolder: React.FC<GlassFolderProps> = ({
  icon,
  className,
  color = "amber",
}) => {
  return (
    <section
      className={cn(
        "relative group flex flex-col items-center justify-center [zoom:0.60] lg:[zoom:0.70]",
        className
      )}
    >
      <div className="relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-10">
        {/* Top tab */}
        <div
          className={cn(
            `bg-${color}-600/30 backdrop-blur-md w-full h-full origin-top rounded-2xl rounded-tl-none 
            group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative 
            after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-${color}-600/30 after:backdrop-blur-md after:rounded-t-2xl 
            before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px]  before:bg-${color}-600/30 before:backdrop-blur-md before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]`
          )}
        ></div>

        {/* Folder layers */}
        <div
          className={cn(
            `absolute inset-1 bg-${color}-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]`
          )}
        ></div>
        <div
          className={cn(
            `absolute inset-1 bg-${color}-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]`
          )}
        ></div>
        <div
          className={cn(
            `absolute inset-1 bg-${color}-500/10 backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]`
          )}
        ></div>

        {/* Front folder layer with icon */}
        <div
          className={cn(
            `absolute bottom-0 bg-${color}-500/20 backdrop-blur-md w-full h-[156px] rounded-2xl rounded-tr-none 
            after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-${color}-500/20 after:backdrop-blur-md after:rounded-t-2xl 
            before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:bg-${color}-500/20 before:backdrop-blur-md before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] 
            transition-all ease duration-300 origin-bottom flex items-center justify-center 
            group-hover:shadow-[inset_0_20px_40px_rgba(100,149,237,0),inset_0_-20px_40px_rgba(65,105,225,0)] 
            group-hover:[transform:rotateX(-46deg)_translateY(1px)]`
          )}
        >
          <div className="text-foreground text-4xl">{icon}</div>
        </div>
      </div>
    </section>
  );
};

export default GlassFolder;

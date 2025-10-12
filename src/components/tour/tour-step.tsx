"use client";

import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTourContext } from "./tour-provider";

interface TourStepProps {
  stepId: string;
  children: ReactNode;
  className?: string;
}

export function TourStep({ stepId, children, className }: TourStepProps) {
  const {
    currentStep,
    isActive,
    currentStepData,
    isFirstStep,
    isLastStep,
    totalSteps,
    nextStep,
    previousStep,
    skipTour,
  } = useTourContext();

  const isCurrentStep = isActive && currentStepData?.id === stepId;

  return (
    <Popover open={isCurrentStep}>
      <PopoverTrigger asChild>
        <div className={`${isCurrentStep ? "relative z-50" : ""} ${className}`}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 mt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{currentStepData?.title}</h4>
            <span className="text-xs text-muted-foreground">
              {currentStep} of {totalSteps}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {currentStepData?.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={skipTour}>
              Skip Tour
            </Button>

            <div className="flex gap-2">
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={previousStep}>
                  Previous
                </Button>
              )}
              <Button size="sm" onClick={nextStep}>
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
// "use client";

// import type { ReactNode } from "react";
// import { useEffect, useRef } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { useTourContext } from "./tour-provider";

// interface TourStepProps {
//   stepId: string;
//   children: ReactNode;
//   className?: string;
// }

// export function TourStep({ stepId, children, className }: TourStepProps) {
//   const {
//     currentStep,
//     isActive,
//     currentStepData,
//     isFirstStep,
//     isLastStep,
//     totalSteps,
//     nextStep,
//     previousStep,
//     skipTour,
//   } = useTourContext();

//   const stepRef = useRef<HTMLDivElement>(null);
//   const isCurrentStep = isActive && currentStepData?.id === stepId;

//   // Auto-scroll to active step with smooth animation and center alignment
//   useEffect(() => {
//     if (isCurrentStep && stepRef.current) {
//       // Small delay to ensure DOM updates are complete
//       const scrollTimeout = setTimeout(() => {
//         stepRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//           inline: "nearest",
//         });
//       }, 100);

//       return () => clearTimeout(scrollTimeout);
//     }
//   }, [isCurrentStep]);

//   return (
//     <Popover open={isCurrentStep}>
//       <PopoverTrigger asChild>
//         <div
//           ref={stepRef}
//           className={`${isCurrentStep ? "relative z-50" : ""} ${
//             className || ""
//           }`}
//         >
//           {children}
//         </div>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-4">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-semibold text-sm">{currentStepData?.title}</h4>
//             <span className="text-xs text-muted-foreground">
//               {currentStep} of {totalSteps}
//             </span>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             {currentStepData?.description}
//           </p>

//           <div className="flex items-center justify-between pt-2">
//             <Button variant="ghost" size="sm" onClick={skipTour}>
//               Skip Tour
//             </Button>

//             <div className="flex gap-2">
//               {!isFirstStep && (
//                 <Button variant="outline" size="sm" onClick={previousStep}>
//                   Previous
//                 </Button>
//               )}
//               <Button size="sm" onClick={nextStep}>
//                 {isLastStep ? "Finish" : "Next"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
// "use client";

// import { useEffect, useRef, type ReactNode } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { useTourContext } from "./tour-provider";

// interface TourStepProps {
//   stepId: string;
//   children: ReactNode;
//   className?: string;
// }

// export function TourStep({ stepId, children, className }: TourStepProps) {
//   const {
//     currentStep,
//     isActive,
//     currentStepData,
//     isFirstStep,
//     isLastStep,
//     totalSteps,
//     nextStep,
//     previousStep,
//     skipTour,
//   } = useTourContext();

//   const stepRef = useRef<HTMLDivElement>(null);
//   const isCurrentStep = isActive && currentStepData?.id === stepId;

//   // Auto-scroll active step into center of viewport
//   useEffect(() => {
//     if (isCurrentStep && stepRef.current) {
//       stepRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [isCurrentStep]);

//   return (
//     <Popover open={isCurrentStep}>
//       <PopoverTrigger asChild>
//         <div
//           ref={stepRef}
//           className={`${isCurrentStep ? "relative z-50" : ""} ${
//             className || ""
//           }`}
//         >
//           {children}
//         </div>
//       </PopoverTrigger>

//       <PopoverContent className="w-80 p-4">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-semibold text-sm">{currentStepData?.title}</h4>
//             <span className="text-xs text-muted-foreground">
//               {currentStep} of {totalSteps}
//             </span>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             {currentStepData?.description}
//           </p>

//           <div className="flex items-center justify-between pt-2">
//             <Button variant="ghost" size="sm" onClick={skipTour}>
//               Skip Tour
//             </Button>
//             <div className="flex gap-2">
//               {!isFirstStep && (
//                 <Button variant="outline" size="sm" onClick={previousStep}>
//                   Previous
//                 </Button>
//               )}
//               <Button size="sm" onClick={nextStep}>
//                 {isLastStep ? "Finish" : "Next"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

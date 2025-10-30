// "use client";

// import type { ReactNode } from "react";
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

//   const isCurrentStep = isActive && currentStepData?.id === stepId;

//   return (
//     <Popover open={isCurrentStep}>
//       <PopoverTrigger asChild>
//         <div className={`${isCurrentStep ? "relative z-50" : ""} ${className}`}>
//           {children}
//         </div>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-4 mt-4">
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
"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTourContext } from "./tour-provider";
import Link from "next/link";

interface TourStepProps<T = any> {
  stepId: string;
  children: ReactNode;
  className?: string;
  link?: string;
  setter?: Dispatch<SetStateAction<T>>;
  setterPrev?: Dispatch<SetStateAction<T>>;
  setterValue?: string | boolean | null;
  setterValuePrev?: string | boolean | null;
}

export function TourStep({
  stepId,
  children,
  className,
  link,
  setter,
  setterPrev,
  setterValue,
  setterValuePrev,
}: TourStepProps) {
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

  const elementRef = useRef<HTMLDivElement>(null);

  const isCurrentStep = isActive && currentStepData?.id === stepId;

  useEffect(() => {
    if (isCurrentStep && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [isCurrentStep]);

  return (
    <Popover open={isCurrentStep}>
      <PopoverTrigger asChild>
        <div
          ref={elementRef}
          className={`${isCurrentStep ? "relative z-50" : ""} ${className}`}
        >
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
              {setterPrev
                ? !isFirstStep && (
                    <Button
                      onClick={() => {
                        setterPrev(setterValuePrev || "");
                        previousStep();
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                  )
                : !isFirstStep && (
                    <Button variant="outline" size="sm" onClick={previousStep}>
                      Previous
                    </Button>
                  )}
              {link ? (
                <Link href={link}>
                  <Button size="sm" onClick={nextStep}>
                    {isLastStep ? "Finish" : "Next"}
                  </Button>
                </Link>
              ) : setter ? (
                <Button
                  size="sm"
                  onClick={() => {
                    nextStep();
                    setter(setterValue || "");
                  }}
                >
                  {isLastStep ? "Finish" : "Next"}
                </Button>
              ) : (
                <Button size="sm" onClick={nextStep}>
                  {isLastStep ? "Finish" : "Next"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// "use client";

// import { motion, MotionProps } from "framer-motion";
// import { Control, FieldValues, Path } from "react-hook-form";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LucideIcon } from "lucide-react";

// interface FormInputFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   type?: string;
//   placeholder?: string;
//   maxLength?: number;
//   icon?: LucideIcon;
//   disabled?: boolean;
//   className?: string;
//   /** Enable or disable Framer Motion animation */
//   motionEnabled?: boolean;
//   motionProps?: MotionProps;
// }

// export function FormInputField<T extends FieldValues>({
//   control,
//   name,
//   label,
//   type = "text",
//   placeholder = "",
//   maxLength,
//   icon: Icon,
//   disabled,
//   className,
//   motionEnabled = true,
//   motionProps,
// }: FormInputFieldProps<T>) {
//   const animation: MotionProps = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.25 },
//     ...motionProps,
//   };

//   const FieldContent = (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel className="flex items-center justify-between">
//             {label} <FormMessage />
//           </FormLabel>
//           <FormControl>
//             <div className="relative flex items-center">
//               {Icon && (
//                 <span className="absolute px-2 border-r">
//                   <Icon className="size-4 opacity-50" />
//                 </span>
//               )}
//               <Input
//                 {...field}
//                 type={type}
//                 placeholder={placeholder}
//                 maxLength={maxLength}
//                 className="pl-10"
//                 disabled={disabled}
//               />
//             </div>
//           </FormControl>
//         </FormItem>
//       )}
//     />
//   );

//   return motionEnabled ? (
//     <motion.div className={className} {...animation}>
//       {FieldContent}
//     </motion.div>
//   ) : (
//     FieldContent
//   );
// }
"use client";

import { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  /** Enable or disable Framer Motion animation */
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormInputField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
  maxLength,
  icon: Icon,
  disabled,
  className,
  motionEnabled = true,
  motionProps,
}: FormInputFieldProps<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const animation: MotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 },
    ...motionProps,
  };

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between">
            {label} <FormMessage />
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              {Icon && (
                <span className="absolute left-2 flex items-center border-r pr-2">
                  <Icon className="size-4 opacity-50" />
                </span>
              )}
              <Input
                {...field}
                type={type === "password" && !isVisible ? "password" : "text"}
                placeholder={placeholder}
                maxLength={maxLength}
                className={` text-sm ${Icon ? "pl-10" : "pl-3"} ${
                  type === "password" ? "pr-10" : ""
                }`}
                disabled={disabled}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-2 flex h-full items-center justify-center text-muted-foreground/80 hover:text-foreground focus:outline-none"
                >
                  {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );

  return motionEnabled ? (
    <motion.div className={className} {...animation}>
      {FieldContent}
    </motion.div>
  ) : (
    FieldContent
  );
}

"use client";

import { motion, MotionProps } from "framer-motion";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormSelectField<T extends FieldValues>({
  control,
  name,
  label = "Select Option",
  options,
  placeholder = "Select...",
  disabled,
  icon: Icon,
  className,
  motionEnabled = true,
  motionProps,
}: FormSelectFieldProps<T>) {
  const animation: MotionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.3 },
    ...motionProps,
  };

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel className="flex items-center justify-between">
            {label} <FormMessage />
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              {Icon && (
                <span className="absolute px-2 border-r">
                  <Icon className="size-4 opacity-50" />
                </span>
              )}
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled}
              >
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );

  return motionEnabled ? (
    <motion.div {...animation}>{FieldContent}</motion.div>
  ) : (
    FieldContent
  );
}

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
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FormCheckboxInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  checkboxLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  motionEnabled?: boolean;
  motionProps?: MotionProps;
  className?: string;
}

/**
 * Reusable form field with checkbox controlling an input field.
 * - Integrates with react-hook-form
 * - Supports motion animation
 * - Fully typed
 */
export function FormCheckboxInputField<T extends FieldValues>({
  control,
  name,
  label,
  checkboxLabel,
  placeholder,
  disabled = false,
  icon: Icon,
  motionEnabled = true,
  motionProps,
  className,
}: FormCheckboxInputFieldProps<T>) {
  const [checked, setChecked] = useState(false);

  const animation: MotionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.4 },
    ...motionProps,
  };

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel
            htmlFor={name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <input
                id={name}
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              {checkboxLabel}
            </div>
            <FormMessage />
          </FormLabel>

          <FormControl>
            <div className="relative flex items-center">
              {Icon && (
                <span className="absolute px-2 border-r">
                  <Icon className="size-4 opacity-50" />
                </span>
              )}

              <Input
                className="pl-10 text-sm"
                placeholder={placeholder}
                {...field}
                disabled={!checked || disabled}
              />
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

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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormCheckboxFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  sublabel?: string; // (Sublabel)
  description?: string;

  disabled?: boolean;
  icon?: React.ReactNode; // now supports ANY icon or SVG
  motionEnabled?: boolean;
  motionProps?: MotionProps;
  className?: string;
}

export function FormCheckboxField<T extends FieldValues>({
  control,
  name,
  label = "Label",
  sublabel = "Optional",
  description = "A short description goes here.",
  disabled = false,
  icon,
  motionEnabled = true,
  motionProps,
  className,
}: FormCheckboxFieldProps<T>) {
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
        <FormItem
          className={cn(
            "relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50",
            className
          )}
        >
          {/* Checkbox */}
          <FormControl>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="order-1 after:absolute after:inset-0"
              aria-describedby={`${name}-description`}
            />
          </FormControl>

          {/* Icon + labels */}
          <div className="flex grow items-center gap-3">
            {/* Icon container */}
            {icon && <div className="shrink-0">{icon}</div>}

            {/* Text content */}
            <div className="grid gap-2">
              <Label htmlFor={name} className="cursor-pointer">
                {label}{" "}
                {sublabel && (
                  <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
                    ({sublabel})
                  </span>
                )}
              </Label>

              {description && (
                <p
                  id={`${name}-description`}
                  className="text-xs text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          <FormMessage />
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

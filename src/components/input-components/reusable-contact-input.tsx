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
import { Input } from "@/components/ui/input";

interface FormPhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormPhoneField<T extends FieldValues>({
  control,
  name,
  label = "Contact Number",
  disabled,
  maxLength = 10,
  className,
  motionEnabled = true,
  motionProps,
}: FormPhoneFieldProps<T>) {
  const animation: MotionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.2 },
    ...motionProps,
  };

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="flex items-center justify-between">
            {label} <FormMessage />
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              <span className="absolute px-2 border-r text-sm opacity-50">
                +63
              </span>
              <Input
                type="text"
                placeholder="9xxxxxxxxx"
                maxLength={maxLength}
                value={field.value?.replace("+63", "") || ""}
                onChange={(e) => {
                  const val = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, maxLength);
                  field.onChange(`+63${val}`);
                }}
                disabled={disabled}
                className="pl-12"
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

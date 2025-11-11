"use client";

import { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { Control, FieldValues, Path, UseFormWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface FormConfirmPasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  /** The password field name to compare against */
  passwordField: Path<T>;
  watch: UseFormWatch<T>;
  disabled?: boolean;
  className?: string;
  /** Enable or disable Framer Motion animation */
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormConfirmPasswordField<T extends FieldValues>({
  control,
  name,
  label = "Confirm Password",
  passwordField,
  watch,
  disabled = false,
  className,
  motionEnabled = true,
  motionProps,
}: FormConfirmPasswordFieldProps<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const animation: MotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 },
    ...motionProps,
  };

  const password = watch(passwordField);
  const confirmPassword = watch(name);
  const mismatch = confirmPassword && password && confirmPassword !== password;

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="lg:col-span-2">
          <FormLabel className="flex items-center justify-between">
            {label} <FormMessage />
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                placeholder=""
                {...field}
                disabled={disabled}
                className="pe-9"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus:outline-none"
              >
                {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </FormControl>

          {mismatch && (
            <p className="text-xs text-red-500 mt-2">Passwords do not match.</p>
          )}
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

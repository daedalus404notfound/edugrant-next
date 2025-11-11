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
import { EyeIcon, EyeOffIcon, CheckIcon, XIcon } from "lucide-react";

interface FormPasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
  /** Enable or disable Framer Motion animation */
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormPasswordField<T extends FieldValues>({
  control,
  name,
  label = "Password",
  disabled = false,
  className,
  motionEnabled = true,
  motionProps,
}: FormPasswordFieldProps<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const animation: MotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 },
    ...motionProps,
  };

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score === 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const FieldContent = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const strength = checkStrength(field.value || "");
        const strengthScore = strength.filter((req) => req.met).length;

        return (
          <FormItem className="lg:col-span-2">
            <FormLabel className="flex items-center justify-between">
              {label} <FormMessage />
            </FormLabel>

            {/* Input + Visibility toggle */}
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

            {/* Strength Bar */}
            <div
              className="bg-border mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
            >
              <div
                className={`h-full ${getStrengthColor(
                  strengthScore
                )} transition-all duration-500`}
                style={{
                  width: `${(strengthScore / 4) * 100}%`,
                }}
              />
            </div>

            {/* Strength Text */}
            <p className="text-sm font-medium mb-2">
              {getStrengthText(strengthScore)}. Must contain:
            </p>

            {/* Requirements */}
            <ul className="space-y-1.5">
              {strength.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {req.met ? (
                    <CheckIcon size={16} className="text-emerald-500" />
                  ) : (
                    <XIcon size={16} className="text-muted-foreground/80" />
                  )}
                  <span
                    className={`text-xs ${
                      req.met ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  >
                    {req.text}
                  </span>
                </li>
              ))}
            </ul>
          </FormItem>
        );
      }}
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

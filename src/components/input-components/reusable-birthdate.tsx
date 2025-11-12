"use client";

import { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { Control, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar1, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormDateFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  motionEnabled?: boolean;
  motionProps?: MotionProps;
}

export function FormDateField<T extends FieldValues>({
  control,
  name,
  label = "Date of Birth",
  placeholder = "YYYY-MM-DD",
  disabled = false,
  className,
  motionEnabled = true,
  motionProps,
}: FormDateFieldProps<T>) {
  const [openCalendar, setOpenCalendar] = useState(false);

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
            <div className="relative flex items-center gap-2">
              <span className="absolute px-2 border-r">
                <Calendar1 className="size-4 opacity-50" />
              </span>

              <Input
                value={field.value ?? ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // remove non-digits

                  // auto-insert hyphens (YYYY-MM-DD)
                  if (value.length > 4 && value.length <= 6) {
                    value = `${value.slice(0, 4)}-${value.slice(4)}`;
                  } else if (value.length > 6) {
                    value = `${value.slice(0, 4)}-${value.slice(
                      4,
                      6
                    )}-${value.slice(6, 8)}`;
                  }

                  field.onChange(value);
                }}
                maxLength={10}
                className="pl-10 text-sm"
                placeholder={placeholder}
                disabled={disabled}
              />

              <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    disabled={disabled}
                    type="button"
                  >
                    <Calendar1 />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 pointer-events-auto"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      setOpenCalendar(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
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

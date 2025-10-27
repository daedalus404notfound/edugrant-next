import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";

const changePassSchema = z.object({
  email: z.email().min(1, "Required"),
  schoolId: z.string().min(1, "Required"),
});

const changePassOtpSchema = z
  .object({
    otp: z
      .string()
      .min(6, "6-digit OTP required")
      .max(6, "OTP must be 6 characters long"),
    password: z.string().min(1, "Required").max(20, "Too short"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type changePassFormData = z.infer<typeof changePassSchema>;
export type changePassOtpFormData = z.infer<typeof changePassOtpSchema>;

export function useChangePasswordLanding() {
  const changePasswordForm = useForm<changePassFormData>({
    resolver: zodResolver(changePassSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      schoolId: "",
    },
  });
  const LoginData = changePasswordForm.watch();
  const changePasswordOtpForm = useForm<changePassOtpFormData>({
    resolver: zodResolver(changePassOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  return { changePasswordForm, changePasswordOtpForm, LoginData };
}

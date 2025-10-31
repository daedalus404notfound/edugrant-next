import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import useRememberAdminStore from "@/store/rememberMe-admin";
import { useEffect } from "react";
const loginSchema = z.object({
  email: z.email().min(1, "Email is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(20, "Password must be at least 20 characters long."),
});

const optSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type otpFormData = z.infer<typeof optSchema>;

export function useLoginAdmin() {
  const { adminEmail, remember } = useRememberAdminStore();
  const LoginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Update form when store hydrates and has saved studentId
  useEffect(() => {
    if (remember && adminEmail) {
      LoginForm.setValue("email", adminEmail);
    }
  }, [adminEmail, remember, LoginForm]);
  const LoginData = LoginForm.watch();
  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(optSchema),

    defaultValues: {
      otp: "",
    },
  });

  return { LoginForm, otpForm, LoginData, loginSchema, optSchema };
}

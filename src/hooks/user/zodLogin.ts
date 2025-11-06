import useRememberStore from "@/store/rememberMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import z from "zod";

const loginSchema = z.object({
  studentId: z.string().min(1, "Required"),
  password: z.string().min(1, "Required").max(20, "Too long"),
});

const loginOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "6-digit OTP required")
    .max(6, "OTP must be 6 characters long"),
});

export type loginFormData = z.infer<typeof loginSchema>;
export type loginOtpFormData = z.infer<typeof loginOtpSchema>;

export function useLoginUser() {
  const { studentId, remember } = useRememberStore();

  const LoginForm = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

  // Update form when store hydrates and has saved studentId
  useEffect(() => {
    if (remember && studentId) {
      LoginForm.setValue("studentId", studentId);
    }
  }, [studentId, remember, LoginForm]);

  const LoginData = LoginForm.watch();

  const loginOtpForm = useForm<loginOtpFormData>({
    resolver: zodResolver(loginOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  return { LoginForm, LoginData, loginOtpForm, loginSchema, loginOtpSchema };
}

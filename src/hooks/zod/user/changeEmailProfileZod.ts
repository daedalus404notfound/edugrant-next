import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import z from "zod";

const changeEmailSchema = z.object({
  newEmail: z.email(),
  accountId: z.number().optional(),
});

const changeEmailOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "6-digit OTP required")
    .max(6, "OTP must be 6 characters long"),
  email: z.email().optional(),
});

export type changeEmailFormData = z.infer<typeof changeEmailSchema>;
export type changeEmailOtpFormData = z.infer<typeof changeEmailOtpSchema>;

export function useChangeEmailProfileUser() {
  const { user } = useUserStore();
  const changeEmailForm = useForm<changeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    mode: "onChange",
    defaultValues: {
      accountId: user?.accountId,
      newEmail: "",
    },
  });
  const LoginData = changeEmailForm.watch();
  const changeEmailOtpForm = useForm<changeEmailOtpFormData>({
    resolver: zodResolver(changeEmailOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
      email: user?.email,
    },
  });
  useEffect(() => {
    if (user) {
      if (user.accountId) {
        changeEmailForm.reset((prev) => ({
          ...prev,
          accountId: user.accountId,
        }));
      }

      if (user.email) {
        changeEmailOtpForm.reset((prev) => ({
          ...prev,
          email: user.email,
        }));
      }
    }
  }, [user, changeEmailForm, changeEmailOtpForm]);

  return { changeEmailForm, changeEmailOtpForm, LoginData };
}

import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import z from "zod";

const changePassSchema = z
  .object({
    oldPassword: z.string().min(1, "Required").max(20, "Too short"),
    accountId: z.number().optional(),
    newPassword: z.string().min(1, "Required").max(20, "Too short"),
    confirmNewPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const changePassOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "6-digit OTP required")
    .max(6, "OTP must be 6 characters long"),
  email: z.email().optional(),
});

export type changePassFormData = z.infer<typeof changePassSchema>;
export type changePassOtpFormData = z.infer<typeof changePassOtpSchema>;

export function useChangePasswordProfileUser() {
  const { user } = useUserStore();
  console.log("user", user?.accountId);
  const changePasswordForm = useForm<changePassFormData>({
    resolver: zodResolver(changePassSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      accountId: user?.accountId,
      confirmNewPassword: "",
    },
  });
  const LoginData = changePasswordForm.watch();
  const changePasswordOtpForm = useForm<changePassOtpFormData>({
    resolver: zodResolver(changePassOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
      email: user?.email,
    },
  });
  useEffect(() => {
    if (user) {
      if (user.accountId) {
        changePasswordForm.reset((prev) => ({
          ...prev,
          accountId: user.accountId,
        }));
      }

      if (user.email) {
        changePasswordOtpForm.reset((prev) => ({
          ...prev,
          email: user.email,
        }));
      }
    }
  }, [user, changePasswordForm, changePasswordOtpForm]);

  return { changePasswordForm, changePasswordOtpForm, LoginData };
}

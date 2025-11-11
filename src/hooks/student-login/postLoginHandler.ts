"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { loginFormData, loginOtpFormData } from "../user/zodLogin";
import { handleApiError } from "@/lib/handleApiError";
import useRememberStore from "@/store/rememberMe";
import { useRouter } from "next/navigation";

export interface VerificationCodeTypes {
  expiresAt: string;
  message: string;
  resendAvailableIn: number;
  success: boolean;
  ttl: number;
}
export const sendCodeApi = async (data: loginFormData) => {
  const res = await axios.post<VerificationCodeTypes>(
    `${process.env.NEXT_PUBLIC_USER_URL}/sendAuthCodeLogin`,
    { studentId: data.studentId, userPassword: data.password },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const verifyCodeApi = async ({
  loginData,
  otpData,
}: {
  loginData: loginFormData;
  otpData: loginOtpFormData;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/loginAccounts`,
    {
      studentId: loginData.studentId,
      userPassword: loginData.password,
      code: otpData.otp,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export function loginUserHandler() {
  const { remember, setStudentId, clearStudentId } = useRememberStore();

  const sendCode = useMutation({
    mutationFn: sendCodeApi,
    onMutate: (data) => {
      if (remember) {
        setStudentId(data.studentId);
      } else {
        clearStudentId();
      }
    },
    onSuccess: (data) => {
      StyledToast({
        status: "success",
        title: data.message || "Verification Code Sent!",
        description:
          "Please check your email for the 6-character code to continue.",
      });
    },

    onError: (error) => handleApiError(error),
  });

  const resendCode = useMutation({
    mutationFn: sendCodeApi,
    onMutate: () => {
      StyledToast({
        status: "checking",
        title: "Sending New Code...",
        description: "Requesting a fresh verification code.",
      });
    },
    onSuccess: (data) => {
      StyledToast({
        status: "success",
        title: data.message || "Verification Code Sent!",
        description:
          "Please check your email for the 6-digit code to continue.",
      });
    },
    onError: (error) => handleApiError(error),
  });

  const verifyCode = useMutation({
    mutationFn: verifyCodeApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Logged In successfully",
        description: "Redirecting to your dashboard...",
      });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  return { sendCode, verifyCode, resendCode };
}

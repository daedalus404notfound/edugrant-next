import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import StyledToast from "@/components/ui/toast-styled";
import useRememberStore from "@/store/rememberMe";
import {
  useChangePasswordLanding,
  changePassFormData,
  changePassOtpFormData,
} from "../zod/head/changePasswordLandingZod";
// Type definitions for API responses
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type AuthCodeTypes = {
  expiresAt: string;
  message: string;
  resendAvailableIn: number;
  success: true;
  ttl: number;
};

type ApiError = AxiosError<ApiErrorResponse>;

const sendAuthCodeApi = async (data: changePassFormData) => {
  const response = await axios.post<AuthCodeTypes>(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/sendAuthCodeForgetPass`,
    {
      email: data.email,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

interface verifyChangePasswordData {
  loginData: changePassFormData;
  otpData: changePassOtpFormData;
}

const verifyLoginApi = async ({
  loginData,
  otpData,
}: verifyChangePasswordData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/forgetPass`,
    {
      email: loginData.email,
      newPassword: otpData.password,
      code: otpData.otp,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Individual Mutation Hooks with Toast Integration
export const useSendAuthCode = () => {
  return useMutation({
    mutationFn: sendAuthCodeApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Verification Code Sent!",
        description:
          "Please check your email for the 6-character code to continue.",
      });
    },
    onError: (error: ApiError) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (!error.response) {
          StyledToast({
            status: "error",
            title: "Network Error",
            description:
              "No internet connection or the server is unreachable. Please check your connection and try again.",
          });
        } else if (status === 400) {
          StyledToast({
            status: "error",
            title: "Bad Request",
            description: message ?? "Invalid request. Please check your input.",
          });
        } else if (status === 401) {
          StyledToast({
            status: "error",
            title: "Unauthorized",
            description:
              message ?? "You are not authorized. Please log in again.",
          });
        } else if (status === 403) {
          StyledToast({
            status: "error",
            title: "Forbidden",
            description:
              message ?? "You do not have permission to perform this action.",
          });
        } else if (status === 404) {
          StyledToast({
            status: "warning",
            title: "No data found",
            description: message ?? "There are no records found.",
          });
        } else if (status === 500) {
          StyledToast({
            status: "error",
            title: "Server Error",
            description:
              message ?? "Internal server error. Please try again later.",
          });
        } else {
          StyledToast({
            status: "error",
            title: message ?? "Export CSV error occurred.",
            description: "Cannot process your request.",
          });
        }
      } else {
        StyledToast({
          status: "error",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    },
  });
};

export const useVerifyLogin = () => {
  return useMutation({
    mutationFn: verifyLoginApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Change password successfully",
        description: "Redirecting to your login...",
      });
      // console.log("login:", data);
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your login request.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

// Main Login Handler Hook
export const useLandingChangePassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [open, setOpen] = useState(true);
  const { changePasswordForm, LoginData, changePasswordOtpForm } =
    useChangePasswordLanding();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const sendAuthCode = useSendAuthCode();
  const verifyLogin = useVerifyLogin();

  // Handle first login (username + password)
  const handleSendCode = async (data: changePassFormData) => {
    try {
      const result = await sendAuthCode.mutateAsync(data);
      if (result.success === true) {
        setStep("otp");
        setResendTimer(result.resendAvailableIn);
        // Store OTP expiry (convert to ms timestamp)
        setExpiresAt(new Date(result.expiresAt).getTime());
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    if (resendTimer <= 0) return; // stop when timer hits 0

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [resendTimer]);
  // Handle OTP verification
  const handleOtpVerification = async (otpData: changePassOtpFormData) => {
    try {
      const result = await verifyLogin.mutateAsync({
        loginData: LoginData,
        otpData,
      });
      if (result.success) {
        setOpen(false);
        router.replace("/adminstrator");
      }
    } catch (error) {
      // Error toast is already handled in useVerifyLogin onError
      console.error("OTP verification error:", error);
    }
  };

  // Enhanced reset functions with user feedback
  const resetAuthState = () => {
    sendAuthCode.reset();
  };

  const resetVerifyState = () => {
    verifyLogin.reset();
  };

  const resetAllStates = () => {
    resetAuthState();
    resetVerifyState();
    setStep("email");
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "You can now try logging in again.",
      duration: 5000,
    });
  };

  // Function to request new code (you can add this to your UI)
  const requestNewCode = async () => {
    if (LoginData) {
      StyledToast({
        status: "checking",
        title: "Sending New Code...",
        description: "Requesting a fresh verification code.",
        duration: 5000,
      });

      try {
        const result = await sendAuthCode.mutateAsync(LoginData);

        if (result.success) {
          // ✅ Restart countdown using the new server value
          setResendTimer(result.resendAvailableIn);

          // (optional) also reset OTP expiry
          setExpiresAt(new Date(result.expiresAt).getTime());
        }
      } catch (error) {
        console.error("Resend code error:", error);
      }
    }
  };

  return {
    // Step management

    open,
    setOpen,
    step,
    setStep,

    // Form utilities
    changePasswordForm,
    LoginData,
    changePasswordOtpForm,

    // Action handlers
    handleSendCode,
    handleOtpVerification,

    // Auth code states (from TanStack Query)
    authLoading: sendAuthCode.isPending,
    authError: sendAuthCode.error,
    authSuccess: sendAuthCode.isSuccess,

    // Verify login states (from TanStack Query)
    verifyLoading: verifyLogin.isPending,
    verifyError: verifyLogin.error,
    verifySuccess: verifyLogin.isSuccess,

    // Reset functions
    resetAuthState,
    resetVerifyState,
    resetAllStates,

    // Additional utilities
    requestNewCode, // Function to resend verification code

    // Raw mutation objects (if you need more control)
    sendAuthCodeMutation: sendAuthCode,
    verifyLoginMutation: verifyLogin,

    resendTimer,
    expiresAt,
  };
};

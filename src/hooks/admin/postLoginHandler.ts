import axios, { AxiosError } from "axios";
import { LoginFormData, otpFormData, useLoginAdmin } from "./zodLogin";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useRouter } from "next/navigation";
import { useState } from "react";
// Type definitions for API responses
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;
const sendAuthCodeApi = async (meow: LoginFormData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminLogin`,
    {
      adminEmail: meow.email,
      adminPassword: meow.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
interface VerifyLoginData {
  loginData: LoginFormData;
  otpData: otpFormData;
}
const verifyLoginApi = async ({ loginData, otpData }: VerifyLoginData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminCodeAuthentication`,
    {
      adminEmail: loginData.email,
      adminPassword: loginData.password,
      code: otpData.otp,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useSendAuthCode = () => {
  return useMutation({
    mutationFn: sendAuthCodeApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Verification Code Sent!",
        description:
          "Please check your email for the 6-digit code to continue.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Auth code error:", error);

      if (error.response?.status === 401) {
        StyledToast({
          status: "error",
          title: "Invalid Credentials",
          duration: 10000,
          description: "Please double-check your Student ID and password.",
        });
      } else if (error.response?.status === 429) {
        StyledToast({
          status: "error",
          title: "Too Many Attempts",
          duration: 10000,
          description: "Please wait a moment before requesting another code.",
        });
      } else if (error.response?.status === 404) {
        StyledToast({
          status: "error",
          title: "Account Not Found",
          duration: 10000,
          description: "No account exists with that Student ID.",
        });
      } else if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        StyledToast({
          status: "error",
          title: "Connection Problem",
          duration: 10000,
          description: "Please check your internet connection and try again.",
        });
      } else {
        StyledToast({
          status: "error",
          title: "Unable to Send Code",
          duration: 10000,
          description: "Something went wrong. Please try again in a moment.",
        });
      }
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
export const useVerifyLogin = () => {
  return useMutation({
    mutationFn: verifyLoginApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Welcome Back!",
        description: "Login successful. Redirecting to your dashboard...",
      });
      // console.log("login:", data);
    },
    onError: (error: ApiError) => {
      console.error("Login verification error:", error);

      if (error.response?.status === 401) {
        StyledToast({
          status: "error",
          title: "Invalid Verification Code",
          duration: 10000,
          description: "Please check the 6-digit code sent to your email.",
        });
      } else if (error.response?.status === 410) {
        StyledToast({
          status: "error",
          title: "Code Expired",
          duration: 10000,
          description:
            "Your verification code has expired. Please request a new one.",
        });
      } else if (error.response?.status === 429) {
        StyledToast({
          status: "error",
          title: "Too Many Attempts",
          duration: 10000,
          description:
            "Too many failed attempts. Please wait before trying again.",
        });
      } else if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        StyledToast({
          status: "error",
          title: "Connection Issue",
          duration: 10000,
          description:
            "Network error. Please check your connection and try again.",
        });
      } else {
        StyledToast({
          status: "error",
          title: "Verification Failed",
          duration: 10000,
          description: "Unable to verify your code. Please try again.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useLoginHandler = () => {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const { LoginForm, LoginData, otpForm } = useLoginAdmin();
  // TanStack Query mutations
  const sendAuthCode = useSendAuthCode();
  const verifyLogin = useVerifyLogin();

  // Handle first login (username + password)
  const handleLogin = async (data: LoginFormData) => {
    // Show loading toast while processing
    StyledToast({
      status: "checking",
      title: "Sending Code...",
      description: "Please wait while we send your verification code.",
    });

    try {
      const result = await sendAuthCode.mutateAsync(data);

      if (result) {
        setStep("otp");
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (otpData: otpFormData) => {
    // Show loading toast while verifying
    StyledToast({
      status: "checking",
      title: "Verifying Code...",
      description: "Please wait while we verify your login.",
    });

    try {
      const result = await verifyLogin.mutateAsync({
        loginData: LoginData,
        otpData,
      });
      console.log(result);
      if (result) {
        router.replace("/administrators/home");
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
    setStep("login");
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
        await sendAuthCode.mutateAsync(LoginData);
      } catch (error) {
        console.error("Resend code error:", error);
      }
    }
  };

  return {
    // Step management
    step,
    setStep,

    // Form utilities
    LoginForm,
    LoginData,
    otpForm,

    // Action handlers
    handleLogin,
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
  };
};

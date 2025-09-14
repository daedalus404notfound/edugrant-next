import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  loginFormData,
  loginOtpFormData,
  useLoginUser,
} from "@/hooks/user/zodLogin";
import StyledToast from "@/components/ui/toast-styled";
import useRememberStore from "@/store/rememberMe";

// Type definitions for API responses
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;

// API Functions
const sendAuthCodeApi = async (data: loginFormData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/sendAuthCodeLogin`,
    {
      studentId: data.studentId,
      userPassword: data.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

interface VerifyLoginData {
  loginData: loginFormData;
  otpData: loginOtpFormData;
}

const verifyLoginApi = async ({ loginData, otpData }: VerifyLoginData) => {
  const response = await axios.post(
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
          "Please check your email for the 6-digit code to continue.",
      });
    },
    onError: (error: ApiError) => {
      console.error("Add scholarship error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your request.",
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
      console.error("Profile update error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your profile update request.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

// Main Login Handler Hook
export const useLoginHandler = () => {
  const router = useRouter();

  const [step, setStep] = useState<"login" | "otp">("login");
  const [open, setOpen] = useState(true);
  const { LoginForm, LoginData, loginOtpForm } = useLoginUser();
  const { remember, setStudentId, clearStudentId } = useRememberStore();
  // TanStack Query mutations
  const sendAuthCode = useSendAuthCode();
  const verifyLogin = useVerifyLogin();

  // Handle first login (username + password)
  const handleLogin = async (data: loginFormData) => {
    try {
      const result = await sendAuthCode.mutateAsync(data);
      if (remember) {
        setStudentId(data.studentId);
      } else {
        // If remember me is not checked, clear any saved studentId
        clearStudentId();
      }
      if (result) {
        setStep("otp");
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (otpData: loginOtpFormData) => {
    try {
      const result = await verifyLogin.mutateAsync({
        loginData: LoginData,
        otpData,
      });
      if (result) {
        setOpen(false);
        router.replace("/user/home");
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

    open,
    setOpen,
    step,
    setStep,

    // Form utilities
    LoginForm,
    LoginData,
    loginOtpForm,

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

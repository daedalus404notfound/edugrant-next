import axios, { AxiosError } from "axios";
import { LoginFormData, otpFormData, useLoginAdmin } from "./zodLogin";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useRememberAdminStore from "@/store/rememberMe-admin";
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
const sendAuthCodeApi = async (meow: LoginFormData) => {
  const response = await axios.post<AuthCodeTypes>(
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
      console.error("Login error:", error);

      if (!error.response) {
        // Network error / no internet
        StyledToast({
          status: "error",
          title: "No Internet Connection",
          description: "Please check your network and try again.",
          duration: 10000,
        });
      } else if (error.response.data?.message) {
        // Server returned an error
        StyledToast({
          status: "error",
          title: error.response.data.message,
          description: "Cannot process your request.",
          duration: 10000,
        });
      } else {
        // Other unknown error
        StyledToast({
          status: "error",
          title: "Something went wrong",
          description: error.message,
          duration: 10000,
        });
      }
    },
  });
};

export const useLoginHandler = () => {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const { LoginForm, LoginData, otpForm } = useLoginAdmin();
  const { remember, setadminEmail, clearadminEmail } = useRememberAdminStore();
  // TanStack Query mutations
  const sendAuthCode = useSendAuthCode();
  const verifyLogin = useVerifyLogin();

  // Handle first login (username + password)
  const handleLogin = async (data: LoginFormData) => {
    // Show loading toast while processing
    if (remember) {
      setadminEmail(data.email);
    } else {
      // If remember me is not checked, clear any saved studentId
      clearadminEmail();
    }
    try {
      const result = await sendAuthCode.mutateAsync(data);

      if (result) {
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
  const handleOtpVerification = async (otpData: otpFormData) => {
    try {
      const result = await verifyLogin.mutateAsync({
        loginData: LoginData,
        otpData,
      });

      console.log("Login Result:", result);

      if (result?.role) {
        switch (result.role) {
          case "ISPSU_Head":
            router.replace("/administrator/head/home");
            break;
          case "ISPSU_Staff":
            router.replace("/administrator/staff/home");
            break;
          default:
            // fallback in case role is unexpected
            router.replace("/administrator");
            break;
        }
      }
    } catch (error) {
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
        const result = await sendAuthCode.mutateAsync(LoginData);

        if (result.success) {
          // ✅ Restart countdown using the new server value
          setResendTimer(result.resendAvailableIn);

          // (optional) also reset OTP expiry
          setExpiresAt(new Date(result.expiresAt).getTime());
        }
        // await sendAuthCode.mutateAsync(LoginData);
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
    resendTimer,
    expiresAt,
  };
};

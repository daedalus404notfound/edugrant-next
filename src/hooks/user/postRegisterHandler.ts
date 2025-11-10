import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  otpFormData,
  useRegisterUser,
  personalFormData,
  accountFormData,
} from "./zodRegister";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

type ApiError = AxiosError<ApiErrorResponse>;

interface sendAuthData {
  personalData: personalFormData;
  accountData: accountFormData;
}

type AuthCodeTypes = {
  expiresAt: string;
  message: string;
  resendAvailableIn: number;
  success: true;
  ttl: number;
};
const sendAuthApi = async ({ personalData, accountData }: sendAuthData) => {
  const payload = {
    studentFirstName: personalData.firstName,
    ...(personalData.middleName && {
      studentMiddleName: personalData.middleName,
    }),
    studentLastName: personalData.lastName,
    indigenous: personalData.indigenous,
    pwd: personalData.pwd,
    studentContact: personalData.contactNumber,
    studentGender: personalData.gender,
    studentDateofBirth: personalData.dateOfBirth,
    studentAddress: personalData.address,
    studentId: accountData.studentId,
    studentEmail: accountData.email,
    studentPassword: accountData.password,
    institute: accountData.institute,
    course: accountData.course,
    year: accountData.yearLevel,
    section: accountData.section,
  };

  const response = await axios.post<AuthCodeTypes>(
    `${process.env.NEXT_PUBLIC_USER_URL}/sendAuthCodeRegister`,
    payload,
    { withCredentials: true }
  );

  return response.data;
};

interface VerifyRegisterData {
  data: otpFormData;
  personalData: personalFormData;
  accountData: accountFormData;
}
const verifyRegisterApi = async ({
  data,
  personalData,
  accountData,
}: VerifyRegisterData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/registerAccount`,
    {
      verificationCode: data.otp,
      studentFirstName: personalData.firstName,
      studentMiddleName: personalData.middleName,
      indigenous: personalData.indigenous,
      pwd: personalData.pwd,
      institute: accountData.institute,
      studentLastName: personalData.lastName,
      studentContact: personalData.contactNumber,
      studentGender: personalData.gender,
      studentDateofBirth: personalData.dateOfBirth,
      studentAddress: personalData.address,
      studentId: accountData.studentId,
      studentEmail: accountData.email,
      studentPassword: accountData.password,
      course: accountData.course,
      year: accountData.yearLevel,
      section: accountData.section,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useSendAuthCode = () => {
  return useMutation({
    mutationFn: sendAuthApi,
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

export const useVerifyRegister = () => {
  return useMutation({
    mutationFn: verifyRegisterApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Registration Completed!",
        description: "Redirecting to login...",
      });
    },
    onError: (error: ApiError) => {
      console.error("Registration error:", error);
      if (error.response?.data.message) {
        StyledToast({
          status: "error",
          title: error.response.data.message,
          duration: 10000,
          description: "Cannot process your registration request.",
        });
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useRegisterHandler = () => {
  const router = useRouter();
  const [stepper, setStepper] = useState(1);
  const { personalForm, accountForm, otpForm, personalData, accountData } =
    useRegisterUser();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const sendAuthCode = useSendAuthCode();
  const verifyRegister = useVerifyRegister();

  const HandleRegister = async ({
    personalData,
    accountData,
  }: sendAuthData) => {
    try {
      const result = await sendAuthCode.mutateAsync({
        personalData,
        accountData,
      });
      if (result) {
        setStepper(3);
        setResendTimer(result.resendAvailableIn);
        setExpiresAt(new Date(result.expiresAt).getTime());
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Registration error:", error);
    }
  };

  useEffect(() => {
    if (resendTimer <= 0) return; // stop when timer hits 0

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [resendTimer]);
  const HandleOtpVerification = async (otpData: otpFormData) => {
    try {
      const result = await verifyRegister.mutateAsync({
        personalData,
        accountData,
        data: otpData,
      });
      console.log("OTP verification result:", result);
      if (result.success === true) {
        router.replace("/user/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Enhanced reset functions with user feedback
  const resetAuthState = () => {
    sendAuthCode.reset();
  };

  const resetVerifyState = () => {
    verifyRegister.reset();
  };

  const resetAllStates = () => {
    resetAuthState();
    resetVerifyState();
    setStepper(1);
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "You can now try logging in again.",
      duration: 5000,
    });
  };

  // Function to request new code (you can add this to your UI)

  const requestNewCode = async () => {
    if (personalData && accountData) {
      StyledToast({
        status: "checking",
        title: "Sending New Code...",
        description: "Requesting a fresh verification code.",
        duration: 5000,
      });

      try {
        const result = await sendAuthCode.mutateAsync({
          personalData,
          accountData,
        });

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
    // Stepper state management
    stepper,
    setStepper,

    // Main handler functions
    HandleRegister,
    HandleOtpVerification,

    // Form instances and data from useRegisterUser
    personalForm,
    accountForm,
    otpForm,
    personalData,
    accountData,

    // Mutation states for loading/error handling
    sendAuthCode: {
      isLoading: sendAuthCode.isPending,
      isError: sendAuthCode.isError,
      error: sendAuthCode.error,
      isSuccess: sendAuthCode.isSuccess,
    },
    verifyRegister: {
      isLoading: verifyRegister.isPending,
      isError: verifyRegister.isError,
      error: verifyRegister.error,
      isSuccess: verifyRegister.isSuccess,
    },

    // Utility functions
    resetAuthState,
    resetVerifyState,
    resetAllStates,
    requestNewCode,

    resendTimer,
    expiresAt,
  };
};

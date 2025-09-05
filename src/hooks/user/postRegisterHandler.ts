import axios, { AxiosError } from "axios";
import { useState } from "react";
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

const sendAuthApi = async ({ personalData, accountData }: sendAuthData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/sendAuthCodeRegister`,
    {
      studentFirstName: personalData.firstName,
      studentMiddleName: personalData.middleName,
      studentLastName: personalData.lastName,
      indigenous: personalData.indigenous,
      pwa: personalData.pwa,
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
    },
    {
      withCredentials: true,
    }
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
      indigenous: personalData.indigenous ? "true" : "false",
      pwa: personalData.pwa ? "true" : "false",
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
          "Please check your email for the 6-digit code to continue.",
      });
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

    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useVerifyRegister = () => {
  return useMutation({
    mutationFn: verifyRegisterApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Registration Complete!",
        description: "Redirecting to login...",
      });
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

export const useRegisterHandler = () => {
  const router = useRouter();
  const [stepper, setStepper] = useState(1);
  const { personalForm, accountForm, otpForm, personalData, accountData } =
    useRegisterUser();

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
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };
  const HandleOtpVerification = async (otpData: otpFormData) => {
    try {
      const result = await verifyRegister.mutateAsync({
        personalData,
        accountData,
        data: otpData,
      });
      if (result?.user) {
        router.push("/user/home");
      }
    } catch (error) {
      console.error("Login error:", error);
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
        await sendAuthCode.mutateAsync({ personalData, accountData });
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
  };
};

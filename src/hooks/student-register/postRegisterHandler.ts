"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { handleApiError } from "@/lib/handleApiError";
import useRememberStore from "@/store/rememberMe";
import {
  accountFormData,
  otpFormData,
  personalFormData,
} from "./userRegisterZod";

export interface VerificationCodeTypes {
  expiresAt: string;
  message: string;
  resendAvailableIn: number;
  success: boolean;
  ttl: number;
}
export const sendCodeApi = async ({
  personalData,
  accountData,
}: {
  personalData: personalFormData;
  accountData: accountFormData;
}) => {
  const res = await axios.post<VerificationCodeTypes>(
    `${process.env.NEXT_PUBLIC_USER_URL}/sendAuthCodeRegister`,
    {
      studentFirstName: personalData.firstName,
      studentMiddleName: personalData.middleName,
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
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const verifyCodeApi = async ({
  otp,
  personalData,
  accountData,
}: {
  otp: otpFormData;
  personalData: personalFormData;
  accountData: accountFormData;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_USER_URL}/registerAccount`,
    {
      verificationCode: otp.otp,
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

  return res.data;
};

export function RegisterUserHandler() {
  const { remember, setStudentId, clearStudentId } = useRememberStore();
  const sendCode = useMutation({
    mutationFn: sendCodeApi,
    onMutate: (data) => {
      if (remember) {
        setStudentId(data.accountData.studentId);
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
          "Please check your email for the 6-character code to continue.",
      });
    },
    onError: (error) => handleApiError(error),
  });

  const verifyCode = useMutation({
    mutationFn: verifyCodeApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Registration Completed",
        description: "Redirecting to your dashboard...",
      });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  return { sendCode, verifyCode, resendCode };
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeClosed,
  IdCard,
  Loader,
  LockOpen,
  MailCheck,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "motion/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLoginHandler } from "@/hooks/user/postLoginHandler";
import { ModeToggle } from "@/components/ui/dark-mode";

import { Checkbox } from "@/components/ui/checkbox";

import useRememberStore from "@/store/rememberMe";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LoginClientModal() {
  const router = useRouter();

  const {
    open,
    setOpen,
    step,
    LoginForm,
    loginOtpForm,
    handleLogin,
    handleOtpVerification,
    authLoading,
    verifyLoading,
    requestNewCode,

    resendTimer,
    expiresAt,
  } = useLoginHandler();
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const isMobile = useIsMobile();

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative z-10 flex justify-center items-center w-full  h-full lg:p-4 pt-4 rounded-2xl bg-background/80 backdrop-blur-md">
          {step === "login" && <></>}
          {step === "otp" && <></>}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

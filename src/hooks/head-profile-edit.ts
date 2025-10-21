import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";
import z from "zod";
import { format } from "date-fns";

export const ISPSU_Head = z.object({
  dateCreated: z.string(),
  fName: z.string(),
  address: z.string(),
  headId: z.number(),
  lName: z.string(),
  mName: z.string(),
  gender: z.string(),
  profileImg: z
    .object({
      publicUrl: z.any().optional(),
      path: z.string().optional(),
    })
    .optional(),
});
export const ISPSU_Staff = z.object({
  dateCreated: z.string(),
  fName: z.string(),
  address: z.string(),
  headId: z.number(),
  lName: z.string(),
  mName: z.string(),
  gender: z.string(),
  profileImg: z
    .object({
      publicUrl: z.any().optional(),
      path: z.string().optional(),
    })
    .optional(),
});

export const HeadSchema = z.object({
  ISPSU_Head: ISPSU_Head,
  ISPSU_Staff: ISPSU_Staff,
  accountId: z.number(),
  dateCreated: z.string(),
  email: z.string(),
  role: z.string(),
});

export type AdminProfileFormData = z.infer<typeof HeadSchema>;

export function useAdminProfileForm(data?: AdminProfileFormData | null) {
  const defaultValues: AdminProfileFormData = {
    ISPSU_Head: {
      fName: data?.ISPSU_Head?.fName || "",
      headId: data?.ISPSU_Head?.headId || 0,
      mName: data?.ISPSU_Head?.mName || "",
      lName: data?.ISPSU_Head?.lName || "",
      gender: data?.ISPSU_Head?.gender || "",
      dateCreated: data?.ISPSU_Head
        ? format(data?.ISPSU_Head?.dateCreated, "yyyy-MM-dd")
        : "",
      address: data?.ISPSU_Head?.address || "",
      profileImg: {
        publicUrl: data?.ISPSU_Head?.profileImg?.publicUrl,
        path: data?.ISPSU_Head?.profileImg?.path,
      },
    },
    ISPSU_Staff: {
      fName: data?.ISPSU_Staff?.fName || "",
      headId: data?.ISPSU_Staff?.headId || 0,
      mName: data?.ISPSU_Staff?.mName || "",
      lName: data?.ISPSU_Staff?.lName || "",
      gender: data?.ISPSU_Staff?.gender || "",
      dateCreated: data?.ISPSU_Staff
        ? format(data?.ISPSU_Staff?.dateCreated, "yyyy-MM-dd")
        : "",
      address: data?.ISPSU_Staff?.address || "",
      profileImg: {
        publicUrl: data?.ISPSU_Head?.profileImg?.publicUrl,
        path: data?.ISPSU_Head?.profileImg?.path,
      },
    },
    accountId: data?.accountId || 0,
    dateCreated: data?.dateCreated
      ? format(data?.dateCreated, "yyyy-MM-dd")
      : "",
    email: data?.email || "",
    role: data?.role || "Head",
  };

  const form = useForm<AdminProfileFormData>({
    resolver: zodResolver(HeadSchema),
    defaultValues,
  });

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);
  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged = !deepEqual(defaultValues, values); // ✅ compare against saved defaultValues
      setIsChanged(hasChanged);
    });
    return () => subscription.unsubscribe();
  }, [form, defaultValues]);
  return {
    form,
    isChanged,
  };
}

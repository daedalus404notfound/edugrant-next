import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import isEqual from "lodash.isequal";
import z from "zod";
import { format } from "date-fns";

export const ISPSU_Head = z.object({
  dateCreated: z.string(),
  fName: z.string(),
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
  validated: z.string().optional(),
});

export const HeadSchema = z.object({
  ISPSU_Head: ISPSU_Head,
  ISPSU_Staff: ISPSU_Staff,
  accountId: z.number(),
  dateCreated: z.string(),
  email: z.string(),
  role: z.string(),
  webTours: z.object({
    dashboardTour: z.boolean(),
  }),
});

export type AdminProfileFormData = z.infer<typeof HeadSchema>;

export function useAdminProfileForm(data?: AdminProfileFormData | null) {
  const defaultValues = useMemo<AdminProfileFormData>(
    () => ({
      ISPSU_Head: {
        dateCreated:
          data?.ISPSU_Head?.dateCreated || format(new Date(), "yyyy-MM-dd"),
        fName: data?.ISPSU_Head?.fName || "",
        headId: data?.ISPSU_Head?.headId || 0,
        lName: data?.ISPSU_Head?.lName || "",
        mName: data?.ISPSU_Head?.mName || "",
        gender: data?.ISPSU_Head?.gender || "",
        profileImg: {
          publicUrl: data?.ISPSU_Head?.profileImg?.publicUrl || "",
          path: data?.ISPSU_Head?.profileImg?.path || "",
        },
      },
      ISPSU_Staff: {
        dateCreated:
          data?.ISPSU_Staff?.dateCreated || format(new Date(), "yyyy-MM-dd"),
        fName: data?.ISPSU_Staff?.fName || "",
        headId: data?.ISPSU_Staff?.headId || 0,
        lName: data?.ISPSU_Staff?.lName || "",
        mName: data?.ISPSU_Staff?.mName || "",
        gender: data?.ISPSU_Staff?.gender || "",
        profileImg: {
          publicUrl: data?.ISPSU_Staff?.profileImg?.publicUrl || "",
          path: data?.ISPSU_Staff?.profileImg?.path || "",
        },
        validated: data?.ISPSU_Staff?.validated || "",
      },
      accountId: data?.accountId || 0,
      dateCreated: data?.dateCreated || format(new Date(), "yyyy-MM-dd"),
      email: data?.email || "",
      role: data?.role || "",
      webTours: {
        dashboardTour: data?.webTours?.dashboardTour || false,
      },
    }),
    [data]
  );

  const form = useForm<AdminProfileFormData>({
    resolver: zodResolver(HeadSchema),
    defaultValues,
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    form.reset(defaultValues);
    setIsChanged(false);
  }, [defaultValues, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged = !isEqual(defaultValues, values);
      setIsChanged(hasChanged);
    });
    return () => subscription.unsubscribe();
  }, [form, defaultValues]);

  return {
    form,
    isChanged,
  };
}

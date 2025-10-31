import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import isEqual from "lodash.isequal"; // ✅ replaced fast-deep-equal

export const AccountSchema = z.object({
  email: z.string().email().min(1, "Required"),
});

export const StaffLogSchema = z.object({
  logsId: z.number(),
  staffId: z.number(),
  scholarshipId: z.number(),
  applicationId: z.number(),
  action: z.string(),
  dateCreated: z.string(),
  description: z.string(),
});

export const getStaffSchema = z.object({
  Account: AccountSchema,
  Staff_Logs: z.array(StaffLogSchema),
  fName: z.string().min(1, "Required"),
  lName: z.string().min(1, "Required"),
  dateCreated: z.string(),
  mName: z.string(),
  gender: z.string(),
  staffId: z.number(),
  validated: z.string().optional(),
  profileImg: z
    .object({
      publicUrl: z.any().optional(),
      path: z.string().optional(),
    })
    .optional(),
});

export type getStaffFormData = z.infer<typeof getStaffSchema>;

export function useUpdateStaffByHead(data?: getStaffFormData | null) {
  const defaultValues = useMemo<getStaffFormData>(
    () => ({
      Account: { email: data?.Account.email || "" },
      Staff_Logs: data?.Staff_Logs || [],
      dateCreated: data?.dateCreated || "",
      fName: data?.fName || "",
      lName: data?.lName || "",
      mName: data?.mName || "",
      gender: data?.gender || "",
      staffId: data?.staffId || 0,
      profileImg: {
        publicUrl: data?.profileImg?.publicUrl,
        path: data?.profileImg?.path,
      },
    }),
    [data]
  );

  const form = useForm<getStaffFormData>({
    resolver: zodResolver(getStaffSchema),
    defaultValues,
  });

  const [isChanged, setIsChanged] = useState(false);
  console.log(isChanged);
  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);

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

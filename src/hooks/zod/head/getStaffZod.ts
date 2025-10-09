import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import deepEqual from "fast-deep-equal";
export const AccountSchema = z.object({
  email: z.string().email(),
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
  fName: z.string(),
  lName: z.string(),
  dateCreated: z.string(),
  mName: z.string(),
  staffId: z.number(),
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
      staffId: data?.staffId || 0,
    }),
    [data]
  );

  const form = useForm<getStaffFormData>({
    resolver: zodResolver(getStaffSchema),
    defaultValues, // pass here
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

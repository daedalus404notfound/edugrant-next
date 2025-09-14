import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";
import { UserFormData, UserSchema } from "../zod/user";
import { UserDefault } from "../zod/user";

export function useProfileForm(initialData?: UserFormData) {
  const [originalData, setOriginalData] = useState<UserFormData | null>(null);

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: UserDefault,
  });

  const { watch, reset } = form;

  const siblings = useFieldArray({
    control: form.control,
    name: "Student.familyBackground.siblings",
  });

  useEffect(() => {
    if (initialData) {
      const dataWithDefaults: UserFormData = {
        ...UserDefault,
        ...initialData,
        Student: {
          ...UserDefault.Student,
          ...initialData.Student,
          familyBackground: {
            ...UserDefault.Student.familyBackground,
            ...initialData.Student.familyBackground,
            siblings: initialData.Student.familyBackground?.siblings || [],
          },
        },
      };

      reset(dataWithDefaults);
      setOriginalData(dataWithDefaults);
    }
  }, [initialData, reset]);

  const watchedData = watch();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (originalData) {
      const currentData = { ...watchedData };
      if (!currentData.Student.familyBackground.siblings) {
        currentData.Student.familyBackground.siblings = [];
      }
      setHasChanges(!deepEqual(originalData, currentData));
    } else {
      setHasChanges(false);
    }
  }, [watchedData, originalData]);

  return {
    form,
    formData: watchedData,
    hasChanges,
    siblings,

    resetChanges: () => {
      if (originalData) {
        reset(originalData);
        setHasChanges(false);
      }
    },
  };
}

import { create } from "zustand";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";

type scholarshipStore = {
  updatedScholarship: scholarshipFormData | null;
  setUpdatedScholarship: (scholarship: scholarshipFormData | null) => void;
  clearUpdatedScholarship: () => void;
};

export const useUpdateScholarshipStore = create<scholarshipStore>((set) => ({
  updatedScholarship: null,

  setUpdatedScholarship: (scholarship) =>
    set({ updatedScholarship: scholarship }),

  clearUpdatedScholarship: () => set({ updatedScholarship: null }),
}));

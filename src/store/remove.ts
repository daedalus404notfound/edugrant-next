import { create } from "zustand";

type ScholarshipState = {
  scholarshipIds: (string | number)[];
  addScholarshipId: (id: string | number) => void;
  clearScholarshipIds: () => void;
};

export const useUpdateUiStore = create<ScholarshipState>((set) => ({
  scholarshipIds: [],
  addScholarshipId: (id) =>
    set((state) => ({
      scholarshipIds: [...state.scholarshipIds, id],
    })),
  clearScholarshipIds: () => set({ scholarshipIds: [] }),
}));

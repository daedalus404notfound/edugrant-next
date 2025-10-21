import { create } from "zustand";

interface IdStore {
  id: number | null; // current ID
  setId: (newId: number) => void; // function to update ID
}

export const useScholarshipIdStore = create<IdStore>((set) => ({
  id: null,
  setId: (newId) => set({ id: newId }),
}));

// useRememberStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RememberState {
  remember: boolean;
  studentId: string;
  setRemember: (value: boolean) => void;
  setStudentId: (value: string) => void;
  clearStudentId: () => void;
}

const useRememberStore = create<RememberState>()(
  persist(
    (set) => ({
      remember: false,
      studentId: "",
      setRemember: (value) => set({ remember: value }),
      setStudentId: (value) => set({ studentId: value }),
      clearStudentId: () => set({ studentId: "" }),
    }),
    {
      name: "remember-storage", // localStorage key
    }
  )
);

export default useRememberStore;

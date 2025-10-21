// useRememberStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RememberState {
  remember: boolean;
  adminEmail: string;
  setRemember: (value: boolean) => void;
  setadminEmail: (value: string) => void;
  clearadminEmail: () => void;
}

const useRememberAdminStore = create<RememberState>()(
  persist(
    (set) => ({
      remember: false,
      adminEmail: "",
      setRemember: (value) => set({ remember: value }),
      setadminEmail: (value) => set({ adminEmail: value }),
      clearadminEmail: () => set({ adminEmail: "" }),
    }),
    {
      name: "remember-admin-storage", // localStorage key
    }
  )
);

export default useRememberAdminStore;

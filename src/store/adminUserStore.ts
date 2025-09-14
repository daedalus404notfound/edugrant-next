import { create } from "zustand";
import { ProfileFormData } from "@/hooks/head/zodHeadProfile";

type UserStore = {
  admin: ProfileFormData | null;
  loading: boolean;
  error: string | null;
  setAdmin: (user: ProfileFormData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useAdminStore = create<UserStore>((set) => ({
  admin: null,
  loading: false,
  error: null,
  setAdmin: (admin) => set({ admin }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

import { create } from "zustand";
import { AdminProfileTypes } from "@/hooks/types";

type UserStore = {
  admin: AdminProfileTypes | null;
  loading: boolean;
  error: string | null;
  setAdmin: (user: AdminProfileTypes) => void;
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

// import { create } from "zustand";
// import { ProfileFormData } from "@/hooks/head/zodHeadProfile";

// type UserStore = {
//   admin: ProfileFormData | null;
//   loading: boolean;
//   error: string | null;
//   setAdmin: (user: ProfileFormData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// };

// export const useAdminStore = create<UserStore>((set) => ({
//   admin: null,
//   loading: false,
//   error: null,
//   setAdmin: (admin) => set({ admin }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
// }));
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileFormData } from "@/hooks/head/zodHeadProfile";

type AdminStore = {
  admin: ProfileFormData | null;
  loading: boolean;
  error: string | null;
  setAdmin: (admin: ProfileFormData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      loading: false,
      error: null,
      setAdmin: (admin) => set({ admin }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({ admin: null }),
    }),
    {
      name: "admin-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ persist in localStorage
      partialize: (state) => ({
        admin: { ...state.admin, password: undefined }, // scrub sensitive data if needed
        loading: state.loading,
        error: state.error,
      }),
    }
  )
);

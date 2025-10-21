// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { AdminProfileFormData } from "@/hooks/head-profile-edit";

// type AdminStore = {
//   admin: AdminProfileFormData | null;
//   loading: boolean;
//   error: string | null;
//   setAdmin: (admin: AdminProfileFormData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   logout: () => void;
// };

// export const useAdminStore = create<AdminStore>()(
//   persist(
//     (set) => ({
//       admin: null,
//       loading: false,
//       error: null,
//       setAdmin: (admin) => set({ admin }),
//       setLoading: (loading) => set({ loading }),
//       setError: (error) => set({ error }),
//       logout: () => set({ admin: null }),
//     }),
//     {
//       name: "admin-storage", // key in localStorage
//       storage: createJSONStorage(() => localStorage), // ✅ persist in localStorage
//       partialize: (state) => ({
//         admin: { ...state.admin, password: undefined }, // scrub sensitive data if needed
//         loading: state.loading,
//         error: state.error,
//       }),
//     }
//   )
// );
import { create } from "zustand";
import { AdminProfileFormData } from "@/hooks/head-profile-edit";

type AdminStore = {
  admin: AdminProfileFormData | null;
  loading: boolean;
  error: string | null;
  setAdmin: (admin: AdminProfileFormData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  loading: false,
  error: null,
  setAdmin: (admin) => set({ admin }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ admin: null }),
}));

// import { create } from "zustand";
// import { ProfileFormData } from "@/hooks/user/zodUserProfile";
// type UserStore = {
//   user: ProfileFormData | null;
//   loading: boolean;
//   error: string | null;
//   setUser: (user: ProfileFormData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// };

// export const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   loading: false,
//   error: null,
//   setUser: (user) => set({ user }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
// }));
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileFormData } from "@/hooks/user/zodUserProfile";

type UserStore = {
  user: ProfileFormData | null;
  loading: boolean;
  error: string | null;
  setUser: (user: ProfileFormData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ wrap localStorage
      partialize: (state) => ({
        user: { ...state.user, userPassword: undefined }, // remove sensitive field
        loading: state.loading,
        error: state.error,
      }),
    }
  )
);

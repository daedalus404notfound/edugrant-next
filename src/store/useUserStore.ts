// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { UserFormData } from "@/hooks/zod/user";

// type UserStore = {
//   user: UserFormData | null;
//   loading: boolean;
//   error: string | null;
//   setUser: (user: UserFormData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   logout: () => void;
// };

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       user: null,
//       loading: false,
//       error: null,
//       setUser: (user) => set({ user }),
//       setLoading: (loading) => set({ loading }),
//       setError: (error) => set({ error }),
//       logout: () => set({ user: null }),
//     }),
//     {
//       name: "user-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserFormData } from "@/hooks/zod/user";

type UserStore = {
  user: UserFormData | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserFormData) => void;
  addScholarshipId: (scholarshipId: number) => void;
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
      addScholarshipId: (scholarshipId) =>
        set((state) => {
          if (!state.user) return state; // no user yet

          return {
            user: {
              ...state.user,
              Student: {
                ...state.user.Student,
                Application: [
                  ...state.user.Student.Application,
                  { scholarshipId }, // 👈 only add scholarshipId
                ],
              },
            },
          };
        }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

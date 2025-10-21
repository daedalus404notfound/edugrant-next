import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserFormData } from "@/hooks/user/zodUserProfile";

type UserStore = {
  user: UserFormData | null;
  loadingUser: boolean;
  error: string | null;
  setUser: (user: UserFormData) => void;
  setStudent: (studentData: UserFormData["Student"]) => void;
  addApplication: (scholarshipId: number, status: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loadingUser: false,
      error: null,
      setUser: (user) => set({ user }),
      // ✅ only updates the Student key inside user
      setStudent: (studentData) =>
        set((state) =>
          state.user
            ? { user: { ...state.user, Student: { ...studentData } } }
            : state
        ),

      // addApplication: (scholarshipId, status) =>
      //   set((state) => {
      //     if (!state.user) return state; // no user yet

      //     return {
      //       user: {
      //         ...state.user,
      //         Student: {
      //           ...state.user.Student,
      //           Application: [
      //             ...state.user.Student.Application,
      //             { scholarshipId, status },
      //           ],
      //         },
      //       },
      //     };
      //   }),

      addApplication: (scholarshipId, status) =>
        set((state) => {
          if (!state.user) return state; // no user yet

          const existingApplications = state.user.Student.Application;
          const appIndex = existingApplications.findIndex(
            (app) => app.scholarshipId === scholarshipId
          );

          let updatedApplications;
          if (appIndex !== -1) {
            // overwrite existing
            updatedApplications = [...existingApplications];
            updatedApplications[appIndex] = { scholarshipId, status };
          } else {
            // add new
            updatedApplications = [
              ...existingApplications,
              { scholarshipId, status },
            ];
          }

          return {
            user: {
              ...state.user,
              Student: {
                ...state.user.Student,
                Application: updatedApplications,
              },
            },
          };
        }),

      setLoading: (loadingUser) => set({ loadingUser }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

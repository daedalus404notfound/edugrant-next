// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface TimerState {
//   email: string | null;
//   timeLeft: number;
//   setEmail: (email: string) => void;
//   setTimeLeft: (time: number) => void;
//   decrementTime: () => void;
//   resetTimer: (time: number) => void;
//   clear: () => void;
// }

// export const useTimerStore = create<TimerState>()(
//   persist(
//     (set) => ({
//       email: null,
//       timeLeft: 0,

//       setEmail: (email) => set({ email }),
//       setTimeLeft: (time) => set({ timeLeft: time }),

//       decrementTime: () =>
//         set((state) => ({
//           timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
//         })),

//       resetTimer: (time) => set({ timeLeft: time }),

//       clear: () => set({ email: null, timeLeft: 0 }),
//     }),
//     {
//       name: "timer-storage", // key in localStorage
//     }
//   )
// );

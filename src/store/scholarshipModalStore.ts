import { create } from "zustand";

type Mode = "details" | "edit" | "renewal" | null;

type ModeStore = {
  mode: Mode;
  setMode: (value: Mode) => void;
  resetMode: () => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "details",
  setMode: (value) => set({ mode: value }),
  resetMode: () => set({ mode: null }),
}));

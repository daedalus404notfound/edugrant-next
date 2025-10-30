// src/store/useModalStore.ts
import { create } from "zustand";

interface ModalState {
  openScholarship: boolean;
  openAnnouncement: boolean;
  openEditScholarship: boolean;
  openRenewScholarship: boolean;
  openGenerate: boolean;
  openStaff: boolean;
  setOpenStaff: (value: boolean) => void;
  setOpenGenerate: (value: boolean) => void;
  setOpenScholarship: (value: boolean) => void;
  setOpenAnnouncement: (value: boolean) => void;
  setOpenEditScholarship: (value: boolean) => void;
  setOpenRenewScholarship: (value: boolean) => void;
}

export const useTourStore = create<ModalState>((set) => ({
  openScholarship: false,
  openAnnouncement: false,
  openEditScholarship: false,
  openRenewScholarship: false,
  openGenerate: false,
  openStaff: false,
  setOpenStaff: (value) => set({ openStaff: value }),
  setOpenGenerate: (value) => set({ openGenerate: value }),
  setOpenScholarship: (value) => set({ openScholarship: value }),
  setOpenAnnouncement: (value) => set({ openAnnouncement: value }),
  setOpenEditScholarship: (value) => set({ openEditScholarship: value }),
  setOpenRenewScholarship: (value) => set({ openRenewScholarship: value }),
}));

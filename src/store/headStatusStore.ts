import { create } from "zustand";

export interface headScholarshipStatustypes {
  status: string;

  setStatus: (status: string) => void;
}

export const useHeadScholarshipStatus = create<headScholarshipStatustypes>(
  (set) => ({
    status: "ACTIVE",
    setStatus: (status) => set({ status }),
  })
);

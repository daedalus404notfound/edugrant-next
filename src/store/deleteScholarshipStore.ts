// import { create } from "zustand";

// type ScholarshipState = {
//   scholarshipIds: (string | number)[];
//   setScholarshipIds: (ids: (string | number)[]) => void;
// };

// export const useScholarshipStore = create<ScholarshipState>((set) => ({
//   scholarshipIds: [],
//   setScholarshipIds: (ids) => set({ scholarshipIds: ids }),
// }));
// import { create } from "zustand";

// type ScholarshipState = {
//   scholarshipIds: (string | number)[];
//   setScholarshipIds: (ids: (string | number)[]) => void;
//   addScholarshipIds: (ids: (string | number)[]) => void;
//   clearScholarshipIds: () => void;
// };

// export const useScholarshipStore = create<ScholarshipState>((set) => ({
//   scholarshipIds: [],
//   setScholarshipIds: (ids) => set({ scholarshipIds: ids }), // replace
//   addScholarshipIds: (ids) =>
//     set((state) => ({
//       scholarshipIds: [...state.scholarshipIds, ...ids],
//     })), // append
//   clearScholarshipIds: () => set({ scholarshipIds: [] }), // reset
// }));
import { create } from "zustand";

type ScholarshipState = {
  scholarshipIds: (string | number)[];
  addScholarshipId: (id: string | number) => void;
  clearScholarshipIds: () => void;
};

export const useScholarshipStore = create<ScholarshipState>((set) => ({
  scholarshipIds: [],
  addScholarshipId: (id) =>
    set((state) => ({
      scholarshipIds: [...state.scholarshipIds, id],
    })),
  clearScholarshipIds: () => set({ scholarshipIds: [] }),
}));

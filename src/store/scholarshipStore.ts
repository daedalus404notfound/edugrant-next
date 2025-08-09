// // store/scholarshipStore.ts
// import { create } from "zustand";

// interface ScholarshipStore {
//   refreshTrigger: number;
//   triggerRefresh: () => void;
//   deletedScholarshipIds: Set<string>;
//   markScholarshipDeleted: (id: string) => void;
//   clearDeletedScholarships: () => void;
// }

// export const useScholarshipStore = create<ScholarshipStore>((set) => ({
//   refreshTrigger: 0,
//   triggerRefresh: () =>
//     set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
//   deletedScholarshipIds: new Set(),
//   markScholarshipDeleted: (id: string) =>
//     set((state) => ({
//       deletedScholarshipIds: new Set(state.deletedScholarshipIds).add(id),
//     })),
//   clearDeletedScholarships: () => set({ deletedScholarshipIds: new Set() }),
// }));

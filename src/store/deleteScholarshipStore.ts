// import { create } from "zustand";

import { create } from "zustand";

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
// import { create } from "zustand";

// type ScholarshipState = {
//   scholarshipIds: (string | number)[];
//   addScholarshipId: (id: string | number) => void;
//   clearScholarshipIds: () => void;
// };

// export const useScholarshipStore = create<ScholarshipState>((set) => ({
//   scholarshipIds: [],
//   addScholarshipId: (id) =>
//     set((state) => ({
//       scholarshipIds: [...state.scholarshipIds, id],
//     })),
//   clearScholarshipIds: () => set({ scholarshipIds: [] }),
// }));
type ApplicationUIState = {
  deletedScholarshipIds: (string | number)[];
  approvedIds: (string | number)[];
  pendingIds: (string | number)[];
  rejectedIds: (string | number)[];

  addDeletedScholarshipId: (id: string | number) => void;
  addApprovedId: (id: string | number) => void;
  addPendingId: (id: string | number) => void;
  addRejectedId: (id: string | number) => void;

  clearDeleted: () => void;
  clearApproved: () => void;
  clearPending: () => void;
  clearRejected: () => void;
};

export const useApplicationUIStore = create<ApplicationUIState>((set) => ({
  deletedScholarshipIds: [],
  approvedIds: [],
  pendingIds: [],
  rejectedIds: [],

  addDeletedScholarshipId: (id) =>
    set((state) => ({ deletedScholarshipIds: [...state.deletedScholarshipIds, id] })),
  addApprovedId: (id) =>
    set((state) => ({ approvedIds: [...state.approvedIds, id] })),
  addPendingId: (id) =>
    set((state) => ({ pendingIds: [...state.pendingIds, id] })),
  addRejectedId: (id) =>
    set((state) => ({ rejectedIds: [...state.rejectedIds, id] })),

  clearDeleted: () => set({ deletedScholarshipIds: [] }),
  clearApproved: () => set({ approvedIds: [] }),
  clearPending: () => set({ pendingIds: [] }),
  clearRejected: () => set({ rejectedIds: [] }),
}));

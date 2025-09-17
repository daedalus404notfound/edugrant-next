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
  deletedScholarshipIds: number[];
  archiveScholarshipIds: number[];
  approvedIds: number[];
  pendingIds: number[];
  rejectedIds: number[];
  ForInterviewIds: number[];

  addDeletedScholarshipId: (id: number) => void;
  addArchiveScholarshipId: (id: number) => void;
  addApprovedId: (id: number) => void;
  addPendingId: (id: number) => void;
  addRejectedId: (id: number) => void;
  addForInterview: (id: number) => void;

  clearDeleted: () => void;
  clearApproved: () => void;
  clearPending: () => void;
  clearRejected: () => void;
  clearForInterview: () => void;
};

export const useApplicationUIStore = create<ApplicationUIState>((set) => ({
  deletedScholarshipIds: [],
  archiveScholarshipIds: [],
  approvedIds: [],
  pendingIds: [],
  rejectedIds: [],
  ForInterviewIds: [],

  addDeletedScholarshipId: (id) =>
    set((state) => ({
      deletedScholarshipIds: [...state.deletedScholarshipIds, id],
    })),
  addArchiveScholarshipId: (id) =>
    set((state) => ({
      archiveScholarshipIds: [...state.archiveScholarshipIds, id],
    })),
  addApprovedId: (id) =>
    set((state) => ({ approvedIds: [...state.approvedIds, id] })),
  addPendingId: (id) =>
    set((state) => ({ pendingIds: [...state.pendingIds, id] })),
  addRejectedId: (id) =>
    set((state) => ({ rejectedIds: [...state.rejectedIds, id] })),
  addForInterview: (id) =>
    set((state) => ({ rejectedIds: [...state.rejectedIds, id] })),

  clearDeleted: () => set({ deletedScholarshipIds: [] }),
  clearArchive: () => set({ archiveScholarshipIds: [] }),
  clearApproved: () => set({ approvedIds: [] }),
  clearPending: () => set({ pendingIds: [] }),
  clearRejected: () => set({ rejectedIds: [] }),
  clearForInterview: () => set({ rejectedIds: [] }),
}));

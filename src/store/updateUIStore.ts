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
  deletedAnnouncementIds: number[];
  archiveScholarshipIds: number[];
  renewalScholarshipIds: number[];
  approvedIds: number[];
  pendingIds: number[];
  rejectedIds: number[];
  forInterviewIds: number[]; // updated

  addDeletedScholarshipId: (id: number) => void;
  addDeletedAnnouncementId: (id: number) => void;
  addArchiveScholarshipId: (id: number) => void;
  addRenewalScholarshipId: (id: number) => void; // updated
  addApprovedId: (id: number) => void;
  addPendingId: (id: number) => void;
  addRejectedId: (id: number) => void;
  addForInterviewId: (id: number) => void; // updated

  clearDeleted: () => void;
  clearArchive: () => void;
  clearRenewal: () => void;
  clearApproved: () => void;
  clearPending: () => void;
  clearRejected: () => void;
  clearForInterview: () => void;
};

export const useApplicationUIStore = create<ApplicationUIState>((set) => ({
  deletedScholarshipIds: [],
  deletedAnnouncementIds: [],
  archiveScholarshipIds: [],
  renewalScholarshipIds: [],
  approvedIds: [],
  pendingIds: [],
  rejectedIds: [],
  forInterviewIds: [],

  addDeletedScholarshipId: (id) =>
    set((state) => ({
      deletedScholarshipIds: [...state.deletedScholarshipIds, id],
    })),
  addDeletedAnnouncementId: (id) =>
    set((state) => ({
      deletedAnnouncementIds: [...state.deletedAnnouncementIds, id],
    })),
  addArchiveScholarshipId: (id) =>
    set((state) => ({
      archiveScholarshipIds: [...state.archiveScholarshipIds, id],
    })),
  addRenewalScholarshipId: (id) =>
    set((state) => ({
      renewalScholarshipIds: [...state.renewalScholarshipIds, id],
    })),
  addApprovedId: (id) =>
    set((state) => ({ approvedIds: [...state.approvedIds, id] })),
  addPendingId: (id) =>
    set((state) => ({ pendingIds: [...state.pendingIds, id] })),
  addRejectedId: (id) =>
    set((state) => ({ rejectedIds: [...state.rejectedIds, id] })),
  addForInterviewId: (id) =>
    set((state) => ({ forInterviewIds: [...state.forInterviewIds, id] })),

  clearDeleted: () => set({ deletedScholarshipIds: [] }),
  clearDeletedAnnouncement: () => set({ deletedAnnouncementIds: [] }),
  clearArchive: () => set({ archiveScholarshipIds: [] }),
  clearRenewal: () => set({ renewalScholarshipIds: [] }),
  clearApproved: () => set({ approvedIds: [] }),
  clearPending: () => set({ pendingIds: [] }),
  clearRejected: () => set({ rejectedIds: [] }),
  clearForInterview: () => set({ forInterviewIds: [] }),
}));

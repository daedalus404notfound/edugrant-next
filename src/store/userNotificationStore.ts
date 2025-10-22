import { create } from "zustand";

type NotificationStore = {
  unreadNotifications: number;
  setUnreadNotifications: (count: number) => void;
  incrementNotifications: (count: number) => void;
  clearUnreadNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadNotifications: 0,

  setUnreadNotifications: (count) => set({ unreadNotifications: count }),

  incrementNotifications: (count) =>
    set((state) => ({
      unreadNotifications: state.unreadNotifications + count,
    })),

  clearUnreadNotifications: () => set({ unreadNotifications: 0 }),
}));

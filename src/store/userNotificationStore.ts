import { create } from "zustand";

type NotificationStore = {
  unreadNotifications?: number; // no initial value
  setUnreadNotifications: (count: number) => void;
  clearUnreadNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadNotifications: 0, // starts with no value
  setUnreadNotifications: (count) => set({ unreadNotifications: count }),
  clearUnreadNotifications: () => set({ unreadNotifications: undefined }),
}));

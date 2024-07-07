import { create } from "zustand";

interface GlobalStateStore {
  unSeenNotifications: number;
  pushNotificationToken: string | null;
  setPushNotifcationToken: (x: string) => void;
  setunSeenNotifications: (x: number) => void;
}

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  unSeenNotifications: 0,
  pushNotificationToken: null,
  setPushNotifcationToken: (x) => set({ pushNotificationToken: x }),
  setunSeenNotifications: (x) => set({ unSeenNotifications: x }),
}));

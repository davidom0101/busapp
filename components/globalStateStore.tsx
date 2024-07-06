import { create } from "zustand";

interface GlobalStateStore {
  unSeenNotifications: number;
  setunSeenNotifications: (x: number) => void;
}

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  unSeenNotifications: 0,
  setunSeenNotifications: (x) => set({ unSeenNotifications: x }),
}));

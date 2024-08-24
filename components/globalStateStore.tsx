import { create } from "zustand";

interface GlobalStateStore { 
  pushNotificationToken: string | null;
  setPushNotifcationToken: (x: string) => void; 
}

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({ 
  pushNotificationToken: null,
  setPushNotifcationToken: (x) => set({ pushNotificationToken: x }), 
}));

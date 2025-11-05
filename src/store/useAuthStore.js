import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      configKey: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null, configKey: null }),
      setConfigKey: (key) => set({ configKey: key }),
    }),
    { name: 'stackguard-auth' }
  )
);



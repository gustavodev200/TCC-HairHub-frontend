import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseUserState {
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
}

export const useUser = create(
  persist<UseUserState>(
    (set) => ({
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name: "@hairhub:user",
    }
  )
);

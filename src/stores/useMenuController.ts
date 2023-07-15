import { create } from "zustand";

interface UseMenuControllerState {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useMenuController = create<UseMenuControllerState>((set) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true }),
  handleClose: () => set({ isOpen: false }),
}));

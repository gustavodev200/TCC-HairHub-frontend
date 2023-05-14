import { create } from "zustand";

interface ProgressIndicatorItem {
  id: string;
  message: string;
}

interface UseProgressIndicatorState {
  items: ProgressIndicatorItem[];
  addProgressIndicatorItem: (item: ProgressIndicatorItem) => void;
  removeProgressIndicatorItem: (id: string) => void;
}

export const useProgressIndicator = create<UseProgressIndicatorState>(
  (set, get) => ({
    items: [],
    addProgressIndicatorItem: (item: ProgressIndicatorItem) => {
      set({ items: [...get().items, item] });
    },
    removeProgressIndicatorItem: (id: string) => {
      set({ items: get().items.filter((item) => item.id !== id) });
    },
  })
);

import create from "zustand";

type UpdateStore = {
  schedulesTableKey: number;
  updateSchedulesTable: () => void;
};

export const useUpdateStore = create<UpdateStore>((set) => ({
  schedulesTableKey: 0,
  updateSchedulesTable: () =>
    set((state) => ({ schedulesTableKey: state.schedulesTableKey + 1 })),
}));

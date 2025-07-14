import { create } from "zustand";

type ClearStore = {
  inputVal: string;
  setInputValue: (value: string) => void;
  clearInput: () => void;
};

export const useClear = create<ClearStore>((set) => ({
  inputVal: "",
  setInputValue: (value) => {
    set({ inputVal: value });
  },
  clearInput: () => {
    set({ inputVal: "" });
  },
}));

import { create } from "zustand";

export const useQues = create((set) => ({
  questions: [],
  setQuestions: (ques) => {
    set({ questions: ques });
  },
}));

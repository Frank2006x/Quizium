import { create } from "zustand";

type quesType = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string[];
};

export const useQues = create((set) => ({
  questions: [],
  setQuestions: (ques: quesType[]) => {
    set({ questions: ques });
  },
}));

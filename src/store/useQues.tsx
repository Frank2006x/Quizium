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
  isGenerating: false,
  score: 0,
  setScore: (s: number) => {
    set({ score: s });
  },
  getQuestions: async (topic: string, difficulty: string) => {
    set({ isGenerating: true });
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, difficulty }),
    });
    const result = await res.json();
    console.log(result);

    set({ questions: result.data, isGenerating: false });
  },
}));

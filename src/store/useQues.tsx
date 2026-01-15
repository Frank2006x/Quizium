import { create } from "zustand";
import axios from "axios";
import options from "@/components/options";


export type Question = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: {
    option: "A" | "B" | "C" | "D";
    text: string;
  };
};

export type QuizData = Question[];


type returnType = {
  error?: string;
  status: number;
};
export interface QuesState {
  questions: QuizData;
  isGenerating: boolean;
  score: number;
  ans: Record<string, "A" | "B" | "C" | "D">;
  time: number;

  setQuestions: (q: QuizData) => void;
  setAnswer: (a: Record<string, "A" | "B" | "C" | "D">) => void;
  setScore: (s: number) => void;
  setTime: (t: number) => void;
  clearQues: () => void;
  getQuestions: (topic: string, difficulty: string) => Promise<returnType>;
}

export const useQues = create((set) => ({
  questions: [],
  isGenerating: false,
  score: 0,
  ans: {},
  setQuestions: (q: QuizData) => {
    set({ questions: q });
  },
  setAnswer: (a: Record<string, "A" | "B" | "C" | "D">) => {
    set({ ans: a });
  },
  setScore: (s: number) => {
    set({ score: s });
  },
  time: 0,
  setTime: (t: number) => {
    set({ time: t });
  },
  clearQues: () => {
    set({ questions: [] });
  },
  getQuestions: async (topic: string, difficulty: string) => {
    set({ isGenerating: true });

    const res = await axios.post("/api/generate", {
      topic,
      difficulty,
    });
    if (res.status != 200 || res.data.success == false) {
      set({ isGenerating: false });
      return { error: "Failed to fetch questions", status: 404 };
    }

    try {
      set({ questions: res.data.data, isGenerating: false });
      return { status: 200 };
    } catch {
      set({ isGenerating: false });
      return { error: "Failed to fetch questions", status: 500 };
    }
  },
}));

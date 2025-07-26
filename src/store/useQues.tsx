import { create } from "zustand";
import axios from "axios";

export type OptionKey = "A" | "B" | "C" | "D";

export type QuestionType = {
  question: string;
  options: Record<OptionKey, string>;
  answer: [OptionKey, string]; // [correctOption, explanation]
};
export type QuizData = QuestionType[];
type AnsType = {
  [key: string]: OptionKey;
};

type returnType = {
  error?: string;
  status: number;
};
export interface QuesState {
  questions: QuizData;
  isGenerating: boolean;
  score: number;
  ans: AnsType;
  time: number;

  setQuestions: (q: QuizData) => void;
  setAnswer: (a: AnsType) => void;
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
  setAnswer: (a: AnsType) => {
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
    console.log("topic", topic, difficulty);
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

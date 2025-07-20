import { create } from "zustand";
import axios from "axios";

type OptionKey = "A" | "B" | "C" | "D";

type QuestionType = {
  question: string;
  options: Record<OptionKey, string>;
  answer: [OptionKey, string]; // [correctOption, explanation]
};
type AnsType = {
  [number: number]: OptionKey;
};

export type QuizData = QuestionType[];

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
    const { data: res } = await axios.post("/api/generate", {
      topic,
      difficulty,
    });
    console.log(res);

    try {
      set({ questions: res.data, isGenerating: false });
    } catch {
      throw new Error("json parse error");
    }
  },
}));

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/BonceLoader";

import { QuesState, useQues } from "@/store/useQues";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClear } from "@/store/useClear";

enum OptionsType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

const Page = () => {
  const { questions, setScore, setTime, setAnswer, setQuestions } =
    useQues() as QuesState;
  const { clearInput } = useClear();
  const [quesNo, setQuesNo] = useState(0);
  const [ans, setAns] = useState<Record<number, OptionsType>>({});
  const router = useRouter();
  const [timer, setTimer] = useState(-2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/home");
    }
  }, [questions.length, router]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTime(timer);
  }, [timer]);

  const handleSelection = (letter: OptionsType, quesNo: number) => {
    setAns((prev) => ({ ...prev, [quesNo]: letter }));
    console.log(ans);
  };

  const computeResult = () => {
    setIsLoading(true);
    setAnswer(ans);
    let s = 0;
    questions.forEach((q, i) => {
      if (ans[i] === q.answer[0]) s++;
    });
    setScore(s);
    router.push("/quiz/result");
  };

  return (
    <>
      {isLoading && (
        <div className="absolute min-w-screen backdrop-blur-3xl min-h-screen flex justify-center items-center z-10">
          <Loader />
        </div>
      )}
     
      <div className="min-h-screen w-full px-4 py-6 dark:bg-black bg-white text-black dark:text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BrainCircuit size={40} />
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={() => {
                router.back();
                setQuestions([]);
                clearInput();
              }}
            >
              Quizium
            </h1>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-orange-200 px-6 py-3 rounded-xl border border-orange-400 shadow-lg font-mono text-xl">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
          </div>

          <Button
            onClick={computeResult}
            className="rounded-full px-6 py-3 bg-emerald-600 text-white font-semibold shadow-md hover:bg-black hover:text-emerald-400 border-2 border-transparent hover:border-emerald-600 transition-all"
          >
            Submit
          </Button>
        </div>

        {/* Quiz Body */}
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((quesNo + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Question {quesNo + 1} of {questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-center">
                {questions[quesNo]?.question}
              </p>
              <div className="flex flex-col gap-4">
                {Object.values(OptionsType).map((letter) => (
                  <div
                    key={letter}
                    onClick={() => handleSelection(letter, quesNo)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200
                    ${
                      ans[quesNo] === letter
                        ? "bg-emerald-300 dark:bg-emerald-600 border-emerald-700"
                        : "hover:bg-emerald-200 dark:hover:bg-emerald-700"
                    }`}
                  >
                    <span className="font-bold">{letter}.</span>
                    <span>{questions[quesNo]?.options[letter]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          {!isLoading && (
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={() => setQuesNo((prev) => prev - 1)}
                disabled={quesNo === 0}
                className="rounded-full px-6 py-2 disabled:opacity-50  w-25"
              >
                Previous
              </Button>
              <Button
                onClick={() => setQuesNo((prev) => prev + 1)}
                disabled={quesNo === questions.length - 1}
                className="rounded-full px-6 py-2 disabled:opacity-50 z-10 w-25"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

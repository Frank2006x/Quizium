"use client";
import options from "@/components/options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQues } from "@/store/useQues";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

enum OptionsType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

const Page = () => {
  let { questions, setScore } = useQues();
  const [quesNo, setQuesNo] = useState(0);
  const [ans, setAns] = useState<Record<number, OptionsType>>({});
  const router = useRouter();
  useEffect(() => {}, []);

  if (questions.length == 0) {
    questions = [
      {
        question:
          "What is the area of a triangle with a base of 10 cm and a height of 7 cm?",
        options: {
          A: "70 cm²",
          B: "35 cm²",
          C: "17 cm²",
          D: "24 cm²",
        },
        answer: [
          "B",
          "The area of a triangle is calculated as (1/2) * base * height.  (1/2) * 10 cm * 7 cm = 35 cm²",
        ],
      },
      {
        question: "Solve for x: 3x + 5 = 14",
        options: {
          A: "x = 3",
          B: "x = 6.33",
          C: "x = 19",
          D: "x = 9",
        },
        answer: [
          "A",
          "Subtract 5 from both sides: 3x = 9. Then divide both sides by 3: x = 3",
        ],
      },
      {
        question: "What is the value of 5! (5 factorial)?",
        options: {
          A: "15",
          B: "25",
          C: "120",
          D: "625",
        },
        answer: ["C", "5! = 5 * 4 * 3 * 2 * 1 = 120"],
      },
      {
        question:
          "If a circle has a diameter of 14 cm, what is its circumference (using π ≈ 3.14)?",
        options: {
          A: "21.98 cm",
          B: "43.96 cm",
          C: "153.86 cm",
          D: "7 cm",
        },
        answer: ["B", "Circumference = π * diameter.  3.14 * 14 cm = 43.96 cm"],
      },
      {
        question: "What is the next number in the sequence: 2, 6, 12, 20, ?",
        options: {
          A: "24",
          B: "28",
          C: "30",
          D: "36",
        },
        answer: [
          "C",
          "The sequence increases by consecutive even numbers: +4, +6, +8. The next increase should be +10, so 20 + 10 = 30",
        ],
      },
    ];
  }

  const handleSelection = (letter: OptionsType, quesNo: number) => {
    setAns((prev) => ({ ...prev, [quesNo]: letter }));
  };

  const computeResult = () => {
    let s = 0;
    questions.forEach((q, index) => {
      if (ans[index] === q.answer[0]) {
        s += 1;
      }
    });
    setScore(s);
    router.push("/quiz/result");
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex m-6 items-center  gap-4">
          <BrainCircuit size={40} className="" />
          <h1
            className="text-3xl font-bold font-josefin-sans "
            onClick={() => router.back()}
          >
            Quizium
          </h1>
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="bg-slate-800 text-orange-200 px-6 py-3 rounded-2xl border-2 border-orange-400 text-xl font-mono shadow-lg">
            01:45
          </div>
        </div>
        <button
          onClick={computeResult}
          className="
            m-6
            w-32
            rounded-full
            px-4
            py-3
            bg-emerald-600
            text-white
            font-semibold
            shadow-md
            hover:bg-black
            hover:text-emerald-400
            hover:scale-105
            hover:shadow-emerald-500/50
            border-2
            hover:border-emerald-600
            transition-all
            duration-300
          "
        >
          Submit
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {questions.length !== 0 && (
          <>
            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{
                  width: `${((quesNo + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Card */}
            <Card className="shadow-2xl rounded-2xl p-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-xl text-left mb-3 font-semibold text-slate-800 dark:text-slate-100">
                  Question {quesNo + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 text-center leading-relaxed">
                  {questions[quesNo]?.question}
                </p>
                <div className="flex flex-col gap-4 w-full mt-4">
                  {Object.values(OptionsType).map((letter) => (
                    <div
                      key={letter}
                      onClick={() => handleSelection(letter, quesNo)}
                      className={`flex items-center gap-3 ${
                        ans[quesNo] === letter
                          ? "bg-emerald-300 dark:bg-emerald-600 border-emerald-700"
                          : ""
                      } border rounded-xl px-4 py-3 hover:bg-emerald-200 dark:hover:bg-emerald-700 cursor-pointer transition-all`}
                    >
                      <span className="font-bold text-slate-600 dark:text-slate-300">
                        {letter}.
                      </span>
                      <span className="text-slate-800 dark:text-slate-100">
                        {questions[quesNo].options[letter]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 px-2">
              <Button
                onClick={() => setQuesNo((prev) => prev - 1)}
                disabled={quesNo === 0}
                className="rounded-full px-6 py-2"
              >
                Previous
              </Button>
              <Button
                onClick={() => setQuesNo((prev) => prev + 1)}
                disabled={quesNo === questions.length - 1}
                className="rounded-full px-6 py-2"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Page;

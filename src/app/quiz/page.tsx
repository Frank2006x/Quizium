"use client";
import options from "@/components/options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQues } from "@/store/useQues";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

const Page = () => {
  const { questions } = useQues();
  const [quesNo, setQuesNo] = useState(0);
  const q = questions[quesNo];
  console.log(q);
  console.log(quesNo);
  return (
    <div className="m-auto ">
      {questions.length != 0 && (
        <>
          <Card className="w-full lg:w-3xl md:w-lg  mx-auto shadow-2xl rounded-2xl p-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Question {quesNo + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base text-slate-800 dark:text-slate-300 text-center">
                {questions[quesNo]?.question}
              </p>
              <div className="flex flex-col gap-3 w-full">
                {["A", "B", "C", "D"].map((letter) => (
                  <div
                    key={letter}
                    className="flex items-center gap-2 border rounded-xl px-4 py-3 hover:bg-emerald-300 cursor-pointer transition"
                  >
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {letter}.
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">
                      {questions[quesNo].options[letter]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Button onClick={() => setQuesNo((prev) => prev + 1)}>Next</Button>
          <Button onClick={() => setQuesNo((prev) => prev - 1)}>
            Previous
          </Button>
        </>
      )}
    </div>
  );
};

export default Page;

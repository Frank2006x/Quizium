"use client";
import { QuesState, useQues } from "@/store/useQues";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BarChart3, CheckCircle, Timer } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import Loader from "@/components/ui/BonceLoader";
import { useClear } from "@/store/useClear";

const ResultPage = () => {
  const { score, questions, time, clearQues } = useQues() as QuesState;
  const { clearInput } = useClear();

  const total = questions.length;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accuracy =
    total > 0 ? parseFloat(((score / total) * 100).toFixed(2)) : 0;

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center backdrop-blur-2xl z-100 absolute">
          <Loader />
        </div>
      )}
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-10">
          <WarpBackground className="w-full h-full opacity-50">
            {""}
          </WarpBackground>
        </div>

        <div className="relative w-full max-w-xl space-y-8 z-20 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Quiz Summary
            </h1>
            <p className="text-gray-400 text-base">
              Here’s how you performed in the quiz
            </p>
          </div>

          <Card className="bg-[#111] border border-gray-800 rounded-2xl shadow-xl relative">
            <ShineBorder
              shineColor={["#7F00FF", "#E100FF", "#00C9FF"]}
              borderWidth={0.5}
            />
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <div className="flex items-center gap-2 text-gray-300">
                  <Timer className="text-blue-400 w-5 h-5" />
                  <span>Time Taken</span>
                </div>
                <div className="flex  justify-center items-center">
                  <NumberTicker
                    value={Math.floor(time / 60)}
                    startValue={0}
                    className="text-lg font-semibold text-white"
                  />
                  <p>min</p>
                  <span className="mx-1"></span>
                  <NumberTicker
                    value={time % 60}
                    startValue={0}
                    className="text-lg font-semibold text-white"
                  />
                  <p>sec</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="text-green-400 w-5 h-5" />
                  <span>Accuracy</span>
                </div>
                <div className="flex  justify-center items-center">
                  <NumberTicker
                    value={accuracy}
                    startValue={0}
                    className="text-lg font-semibold text-white"
                  />
                  <p>%</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <div className="flex items-center gap-2 text-gray-300">
                  <BarChart3 className="text-yellow-400 w-5 h-5" />
                  <span>Score</span>
                </div>
                <div className="flex  justify-center items-center">
                  <NumberTicker
                    value={score}
                    startValue={0}
                    className="text-lg font-semibold text-white"
                  />
                  <p className="bold">/{questions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 pt-2">
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-zinc-800"
              onClick={() => {
                setIsLoading(true);
                redirect("/quiz");
              }}
            >
              Retake Quiz
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setIsLoading(true);
                redirect("/quiz/answer");
              }}
            >
              View Answers
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button
              className="bg-black border-amber-50 hover:bg-violet-600 text-white "
              onClick={() => {
                setIsLoading(true);
                clearQues();
                clearInput();
                redirect("/home");
              }}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;

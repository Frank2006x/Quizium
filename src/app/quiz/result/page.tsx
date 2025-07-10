"use client";
import { useQues } from "@/store/useQues";
import { redirect } from "next/navigation";
import React from "react";
import { BarChart3, CheckCircle, Timer } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";

const ResultPage = () => {
  const { score, questions } = useQues();
  const total = questions.length;
  const accuracy =
    total > 0 ? parseFloat(((score / total) * 100).toFixed(2)) : 0;

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Warp Background Layer */}
      <div className="absolute inset-0 z-10">
        <WarpBackground
          beamDelayMax={1}
          beamDelayMin={0}
          className="w-full h-full opacity-40"
        >
          {""}
        </WarpBackground>
      </div>

      {/* Main Content */}
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
            <ResultItem
              icon={<Timer className="text-blue-400 w-5 h-5" />}
              label="Time Taken"
              value="1 min 40 sec"
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span>Accuracy</span>
              </div>
              <NumberTicker
                value={accuracy}
                startValue={0}
                className="text-lg font-semibold text-white"
              />
            </div>

            <ResultItem
              icon={<BarChart3 className="text-yellow-400 w-5 h-5" />}
              label="Score"
              value={`${score}/100`}
            />
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 pt-2">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-zinc-800"
            onClick={() => redirect("/quiz")}
          >
            Retake Quiz
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Answers
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResultItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between items-center text-sm sm:text-base">
    <div className="flex items-center gap-2 text-gray-300">
      {icon}
      <span>{label}</span>
    </div>
    <div className="font-semibold text-white">{value}</div>
  </div>
);

export default ResultPage;

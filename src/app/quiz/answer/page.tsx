"use client";

import { useEffect, useState } from "react";
import { useQues } from "@/store/useQues";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Timer,
  CheckCircle,
  SkipForward,
  XCircle,
  ArrowLeft,
  BrainCircuit,
} from "lucide-react";
import { useRouter } from "next/navigation";

type OptionKey = "A" | "B" | "C" | "D";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

const COLORS = ["#4CAF50", "#F44336", "#607D8B"];

export default function QuizReview() {
  const { questions, ans, time } = useQues();
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const totalQuestions = questions.length;

  // Convert ans object to array for easier processing
  const answersArray = Array.from(
    { length: totalQuestions },
    (_, i) => ans[i.toString()]
  );

  const correctCount = answersArray.reduce(
    (count, answer, index) =>
      answer === questions[index].answer[0] ? count + 1 : count,
    0
  );

  const incorrect = answersArray.reduce(
    (count, answer, index) =>
      answer && answer !== questions[index].answer[0] ? count + 1 : count,
    0
  );

  const skipped = answersArray.reduce(
    (count, answer) => (!answer ? count + 1 : count),
    0
  );

  const accuracy = totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const pieData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrect },
    { name: "Skipped", value: skipped },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div></div>
      <div className="flex justify-between text-center space-y-2">
        <div
          className="bg-gray-900 border-gray-700  rounded-full h-12 w-12 flex justify-center items-center"
          onClick={() => router.push("/quiz/result")}
        >
          <ArrowLeft />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Quiz Review
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Detailed breakdown of your performance
          </p>
        </div>
        <BrainCircuit size={35} />
      </div>

      {/* Stats and Pie Chart */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Stats Card */}
        <Card className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 ">
          <CardContent className="space-y-6  p-6 rounded-xl">
            {/* Score */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <BarChart3 className="text-yellow-400 w-5 h-5" />
                <span>Score</span>
              </div>
              <div className="flex justify-center items-center">
                <NumberTicker
                  value={correctCount}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
                <p className="ml-1">/{totalQuestions}</p>
              </div>
            </div>

            {/* Time Taken */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <Timer className="text-blue-400 w-5 h-5" />
                <span>Time Taken</span>
              </div>
              <div className="flex justify-center items-center">
                <NumberTicker
                  value={Math.floor(time / 60)}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
                <p className="ml-1">min</p>
                <span className="mx-1" />
                <NumberTicker
                  value={time % 60}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
                <p className="ml-1">sec</p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span>Accuracy</span>
              </div>
              <div className="flex justify-center items-center">
                <NumberTicker
                  value={accuracy}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
                <p className="ml-1">%</p>
              </div>
            </div>

            {/* Correct */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5" style={{ color: COLORS[0] }} />
                <span>Correct</span>
              </div>
              <div className="text-white font-semibold text-lg">
                <NumberTicker
                  value={correctCount}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
              </div>
            </div>

            {/* Incorrect */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-5 h-5" style={{ color: COLORS[1] }} />
                <span>Incorrect</span>
              </div>
              <div className="text-white font-semibold text-lg">
                <NumberTicker
                  value={incorrect}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
              </div>
            </div>

            {/* Skipped */}
            <div className="flex justify-between items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-300">
                <SkipForward className="w-5 h-5" style={{ color: COLORS[2] }} />
                <span>Skipped</span>
              </div>
              <div className="text-white font-semibold text-lg">
                <NumberTicker
                  value={skipped}
                  startValue={0}
                  className="text-lg font-semibold text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <div className="h-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Answer Distribution
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  percent !== 0 ? `${name} ${(percent! * 100).toFixed(0)}%` : ""
                }
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topics Legend */}
      {/* {topics.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white mb-3">
            Topics Covered:
          </h3>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: TOPIC_COLORS[index % TOPIC_COLORS.length],
                  }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Questions Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Question Breakdown
        </h2>

        {questions.map((item, index) => {
          const correct = item.answer[0];
          const userSelected = ans[index.toString()];
          const isCorrect = userSelected === correct;
          const isSkipped = !userSelected;

          return (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border ${
                isCorrect
                  ? "border-green-100 dark:border-green-900"
                  : isSkipped
                  ? "border-gray-200 dark:border-gray-600"
                  : "border-red-100 dark:border-red-900"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 flex flex-col items-start mr-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mt-1 mb-2 ${
                      isCorrect
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : isSkipped
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    {item.question}
                  </h3>

                  <div className="space-y-3">
                    {(
                      Object.entries(item.options) as [OptionKey, string][]
                    ).map(([key, value]) => {
                      const isCorrectOption = key === correct;
                      const isSelected = key === userSelected;
                      const isWrongSelection = isSelected && !isCorrectOption;

                      let className =
                        "px-4 py-3 rounded-md border transition-colors duration-200 flex items-start ";

                      if (isCorrectOption) {
                        className +=
                          "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800";
                      } else if (isWrongSelection) {
                        className +=
                          "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800";
                      } else if (isSelected) {
                        className +=
                          "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800";
                      } else {
                        className +=
                          "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600";
                      }

                      return (
                        <div key={key} className={className}>
                          <span className="font-medium mr-2">{key}.</span>
                          <span>{value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation toggle */}
                  <button
                    className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    onClick={() =>
                      setExpanded(expanded === index ? null : index)
                    }
                  >
                    {expanded === index ? (
                      "Hide Explanation"
                    ) : (
                      <>
                        <span>Show Explanation</span>
                        <span className="ml-1">↓</span>
                      </>
                    )}
                  </button>

                  {/* Explanation */}
                  {expanded === index && (
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Explanation:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.answer[1]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

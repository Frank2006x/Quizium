"use client";

import { useState } from "react";
import { useQues } from "@/store/useQues";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type OptionKey = "A" | "B" | "C" | "D";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

const COLORS = ["#4CAF50", "#F44336", "#607D8B"]; // Green, Red, Gray (for skipped)
const TOPIC_COLORS = ["#3F51B5", "#009688", "#FF5722", "#9C27B0", "#795548"]; // Different colors for topics

export default function QuizReview() {
  const { questions, ans, score, time } = useQues();
  const [expanded, setExpanded] = useState<number | null>(null);

  const totalQuestions = questions.length;
  
  // Convert ans object to array for easier processing
  const answersArray = Array.from({ length: totalQuestions }, (_, i) => ans[i.toString()]);
  
  const correctCount = answersArray.reduce((count, answer, index) => 
    answer === questions[index].answer[0] ? count + 1 : count, 0);
  
  const incorrect = answersArray.reduce((count, answer, index) => 
    answer && answer !== questions[index].answer[0] ? count + 1 : count, 0);
  
  const skipped = answersArray.reduce((count, answer) => 
    !answer ? count + 1 : count, 0);
  
  const accuracy = totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const pieData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrect },
    { name: "Skipped", value: skipped },
  ];

  // Extract unique topics from questions
  const topics = Array.from(new Set(questions.map(q => q.topic)));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Quiz Review
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Detailed breakdown of your performance
        </p>
      </div>

      {/* Stats and Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Score", value: `${correctCount}/${totalQuestions}` },
            { label: "Time Taken", value: formatTime(time) },
            { label: "Accuracy", value: `${accuracy}%` },
            { label: "Correct", value: correctCount, color: COLORS[0] },
            { label: "Incorrect", value: incorrect, color: COLORS[1] },
            { label: "Skipped", value: skipped, color: COLORS[2] },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center"
            >
              <p 
                className="text-2xl font-semibold"
                style={stat.color ? { color: stat.color } : {}}
              >
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="h-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} questions`, ""]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
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
      {topics.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white mb-3">Topics Covered:</h3>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: TOPIC_COLORS[index % TOPIC_COLORS.length] }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
          const topicColor = TOPIC_COLORS[topics.indexOf(item.topic) % TOPIC_COLORS.length];

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
                  {item.topic && (
                    <span 
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: topicColor }}
                    >
                      {item.topic}
                    </span>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    {item.question}
                  </h3>

                  <div className="space-y-3">
                    {(Object.entries(item.options) as [OptionKey, string][]).map(
                      ([key, value]) => {
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
                      }
                    )}
                  </div>

                  {/* Explanation toggle */}
                  <button
                    className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    onClick={() => setExpanded(expanded === index ? null : index)}
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
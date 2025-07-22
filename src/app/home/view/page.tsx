"use client";

import axios from "axios";
import Loader from "@/components/ui/BonceLoader";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/greenButton";
import { useQues } from "@/store/useQues";
type Question = {
  _id: string;
  topic: string;
  difficulty: string;
  createdAt: string;
  questions: {
    _id: string;
    question: string;
    options: Record<string, string>;
    answer: [string, string];
  }[];
};
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const questionRef = useRef<Question>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState<
    Record<string, boolean>
  >({});
  const { setQuestions } = useQues();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    async function fetch() {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/getQuestion?id=${id}`);
        console.log(res.data);
        questionRef.current = res.data.ques;
      } catch (err) {
        console.log("Failed to load question:", err);
      }
    }
    fetch();
  }, [id]);
  const retakeQuiz = () => {
    setQuestions(questionRef.current?.questions);
    redirect("/quiz");
  };

  if (isLoading)
    return (
      <div className="w-full h-100 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (!questionRef.current) {
    redirect("/home");
  }

  const toggleExplanation = (id: string) => {
    setShowExplanation(
      (prev): Record<string, boolean> => ({
        ...prev,
        [id]: !prev[id],
      })
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold mb-4 capitalize text-indigo-600 dark:text-indigo-400">
            {questionRef.current.topic}
          </h1>
          <div onClick={() => retakeQuiz()} className="scale-75 md:scale-100">
            <Button />
          </div>
        </div>
        <div className="mb-8 text-gray-600 dark:text-gray-300 flex justify-between items-start">
          <div>
            <h1>Difficulty: {questionRef.current.difficulty}</h1>
            <br />
            <h1>Created at: {questionRef.current.createdAt.slice(0, 10)}</h1>
          </div>
        </div>

        {questionRef.current.questions.map((q, index) => (
          <div
            key={index}
            className="mb-8 border p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="text-sm md:text-lg font-semibold mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-2">
              {Object.entries(q.options).map(([optionKey, optionText]) => {
                const isCorrect = optionKey === q.answer[0];
                return (
                  <div
                    key={optionKey}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 text-xs md:text-lg ${
                      isCorrect
                        ? "bg-green-100 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-50 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {optionKey}. {optionText}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => toggleExplanation(q._id)}
              className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showExplanation[q._id] ? "Hide" : "Show"} Explanation
            </button>

            {showExplanation[q._id] && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded">
                <strong>Explanation:</strong> {q.answer[1]}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;

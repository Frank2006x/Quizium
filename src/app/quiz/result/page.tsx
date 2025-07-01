"use client";
import { useQues } from "@/store/useQues";
import Link from "next/link";
import React from "react";
import { PartyPopper } from "lucide-react";

const ResultPage = () => {
  const { score, questions } = useQues();
  const total = questions.length;
  const accuracy = total > 0 ? ((score / total) * 100).toFixed(2) : "0";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-emerald-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 transition-all duration-500">
      {/* Accent ring */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-emerald-300/20 dark:bg-emerald-700/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 transition-all">
        <div className="flex justify-center mb-4">
          <PartyPopper className="text-emerald-600 dark:text-emerald-400 w-12 h-12 animate-bounce" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-4 text-slate-800 dark:text-slate-100 font-josefin-sans tracking-tight">
          Quiz Results 🎉
        </h1>
        <p className="text-xl text-center text-slate-700 dark:text-slate-300 mb-2">
          You scored{" "}
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {score}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {total}
          </span>
        </p>
        <p className="text-xl text-center text-slate-700 dark:text-slate-300 mb-6">
          Accuracy: <span className="font-bold">{accuracy}%</span>
        </p>
        <div className="flex justify-center mt-6">
          <Link
            href="/home"
            className="inline-block px-8 py-4 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/50 shadow-lg transition-transform hover:scale-105 font-semibold text-lg"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

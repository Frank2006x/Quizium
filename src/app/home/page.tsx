"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useQues } from "@/store/useQues";
import { ModeToggle } from "@/components/ThemeToggler";

const Home = () => {
  const { questions, setQuestions } = useQues();
  const [topic, setTopic] = useState("");
  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });
    const result = await res.json();
    console.log(result);

    setQuestions(result.data);
    console.log(questions);
  };

  return (
    <>
      <div className="fixed right-2 top-2">
        <ModeToggle />
      </div>

      <div className="flex w-full max-w-sm items-center gap-2 mx-auto">
        <Input
          type="topic"
          placeholder="Enter your Topic"
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          onClick={() => handleGenerate()}
          className="scale-75 hover:scale-80  group rounded-full relative bg-slate-900 h-12 w-64 border-2 border-teal-600 text-white text-base font-bold  overflow-hidden transform transition-all duration-500  hover:border-emerald-400 hover:text-emerald-300 p-3 text-left before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-teal-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110"
        >
          Generate
        </button>
      </div>
      <div className="mt-8 space-y-6">
        {questions &&
          questions.map((q, index) => {
            return (
              <div key={index} className=" rounded-lg shadow p-6">
                <div className="font-semibold text-lg mb-4">{q.question}</div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="border rounded px-4 py-2 hover:bg-emerald-300 cursor-pointer">
                    {q.options.A}
                  </div>
                  <div className="border rounded px-4 py-2 hover:bg-emerald-300 cursor-pointer">
                    {q.options.B}
                  </div>
                  <div className="border rounded px-4 py-2 hover:bg-emerald-300 cursor-pointer">
                    {q.options.C}
                  </div>
                  <div className="border rounded px-4 py-2 hover:bg-emerald-300 cursor-pointer">
                    {q.options.D}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;

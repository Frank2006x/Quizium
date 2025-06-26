"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQues } from "@/store/useQues";
import { ModeToggle } from "@/components/ThemeToggler";
import { useSession } from "next-auth/react";
import { TextAnimate } from "@/components/magicui/text-animate";
import PyraLoader from "@/components/pyraLoader";

const loaderTexts = [
  "Summoning brain cells...",
  "Brewing up some tricky questions...",
  "Sharpening the pencils...",
  "Loading your quiz adventure...",
  "Tickling neurons...",
  "Warming up the question engines...",
  "Fetching brain teasers just for you...",
  "Powering up the quiz portal...",
  "Unleashing the quiz beast...",
  "Generating mind-bending challenges...",
];

const Home = () => {
  const { data: session } = useSession();
  const slogans = [
    "Brace yourself, [Username] — today’s quiz won’t conquer itself!",
    "Ready to rule the quiz realm, [Username]?",
    "[Username], your quiz conquest starts now!",
    "It's quiz o'clock, [Username] — time to shine!",
    "Sharpen your mind, [Username] — the challenge awaits!",
    "Today’s quiz is calling, [Username] — will you answer?",
    "[Username], let’s turn questions into victories!",
    "Step up, [Username] — your knowledge journey begins now!",
    "Quizium's ready, [Username] — are you?",
  ];
  const personalizedSlogans = slogans.map((slogan) =>
    slogan.replace("[Username]", session!.user!.name!)
  );
  const randomSlogan = useRef("");
  useEffect(() => {
    randomSlogan.current =
      personalizedSlogans[
        Math.floor(Math.random() * personalizedSlogans.length)
      ];
  }, []);
  const { questions, getQuestions, isGenerating } = useQues();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loaderText, setLoaderText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        loaderTexts[Math.floor(Math.random() * loaderTexts.length)];
      setLoaderText(random);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);
  const handleGenerate = async () => {
    await getQuestions(topic);
  };

  return (
    <>
      <div className="fixed right-2 top-2">
        <ModeToggle />
      </div>
      <div className="h-100 flex  flex-col items-center  mx-auto my-auto">
        {randomSlogan && (
          <TextAnimate
            animation="blurIn"
            as="h1"
            className="text-2xl mb-4 font-josefin-sans"
          >
            {randomSlogan.current}
          </TextAnimate>
        )}
        <div className=" bg-secondary flex gap-4  rounded-3xl p-7 w-200 ">
          <input
            type="text"
            placeholder="Enter your Topic"
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg  focus:border-0 ring-0 focus:outline-none focus:ring-0 focus:border-none border-none px-4 py-3 text-white   transition"
          />

          <div className="flex gap-4 ">
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full max-w-xs rounded-lg  bg-accend px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              defaultValue=""
            >
              <option value="" disabled className="bg-accent">
                Select Difficulty
              </option>
              <option value="easy" className="bg-accent">
                Easy
              </option>
              <option value="medium" className="bg-accent">
                Medium
              </option>
              <option value="hard" className="bg-accent">
                Hard
              </option>
            </select>
            <button
              onClick={handleGenerate}
              className="relative inline-flex items-center justify-center h-12 w-64 rounded-full border-2 border-teal-500 bg-slate-900 text-white font-semibold tracking-wide transition-all duration-500 hover:border-emerald-400 hover:text-emerald-300 hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-10">Generate</span>

              <span className="absolute w-10 h-10 bg-indigo-500 rounded-full blur-lg right-3 top-2 z-0 transition-all duration-500 group-hover:right-12 group-hover:bottom-[-12px]" />
              <span className="absolute w-16 h-16 bg-teal-400 rounded-full blur-lg right-6 top-4 z-0 transition-all duration-500 group-hover:-right-6 group-hover:scale-110" />
            </button>
          </div>
        </div>
        {isGenerating && (
          <div className="flex flex-col justify-center items-center">
            <PyraLoader />
            <h3 className="text-center">{loaderText}</h3>
          </div>
        )}
      </div>
      {/* <div className="mt-8 space-y-6">
        {questions &&
          questions.map((q, index: number) => {
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
      </div> */}
    </>
  );
};

export default Home;

{
}

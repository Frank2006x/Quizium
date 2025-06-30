"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQues } from "@/store/useQues";
import { ModeToggle } from "@/components/ThemeToggler";
import { useSession } from "next-auth/react";
import { TextAnimate } from "@/components/magicui/text-animate";
import PyraLoader from "@/components/pyraLoader";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
      <div className="h-100 flex  flex-col  items-center  m-auto ">
        {randomSlogan && (
          <TextAnimate
            animation="blurIn"
            as="h1"
            className="text-2xl mb-4 font-josefin-sans"
          >
            {randomSlogan.current}
          </TextAnimate>
        )}
        <div className="relative bg-secondary flex flex-col sm:flex-row gap-4  rounded-3xl p-7 min-w-75 max-w-200 overflow-hidden ">
          <BorderBeam
            className="bg-gradient-to-r from-transparent  via-emerald-500  to-transparent"
            size={200}
          />

          <input
            type="text"
            placeholder="Enter your Topic"
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg  focus:border-0 ring-0 focus:outline-none focus:ring-0 focus:border-none border-none px-4 py-3 text-white   transition"
          />

          <div className="flex gap-4 ">
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full max-w-xs rounded-lg border  bg-slate-800 text-white px-4  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow focus:shadow-lg"
              defaultValue=""
            >
              <option
                value=""
                disabled
                className="bg-slate-700 text-slate-400 "
              >
                Select Difficulty
              </option>
              <option value="easy" className="text-green-400">
                Easy
              </option>
              <option value="medium" className="text-yellow-400">
                Medium
              </option>
              <option value="hard" className="text-red-400">
                Hard
              </option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={questions.length != 0}
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
        {questions.length != 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto mt-10"
          >
            <Card className="shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  Quiz Ready!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  Your quiz has been successfully generated. Click below to
                  begin!
                </p>
                <InteractiveHoverButton
                  onClick={() => router.push("/quiz")}
                >
                  Start Quiz
                </InteractiveHoverButton>
              </CardContent>
              <ShineBorder shineColor={["#A78BFA", "#38BDF8", "#4ADE80"]} />
            </Card>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Home;

{
}

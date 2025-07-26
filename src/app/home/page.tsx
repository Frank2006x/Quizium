"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQues } from "@/store/useQues";
import { ModeToggle } from "@/components/ThemeToggler";
import { useSession } from "next-auth/react";
import { TextAnimate } from "@/components/magicui/text-animate";
import PyraLoader from "@/components/pyraLoader";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useClear } from "@/store/useClear";
import { X } from "lucide-react";

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
  const { questions, getQuestions, isGenerating } = useQues();
  const { inputVal, setInputValue } = useClear();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [loaderText, setLoaderText] = useState("");
  const [thrownError, setThrownError] = useState<Error | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const router = useRouter();

  useEffect(() => {
    randomSlogan.current =
      personalizedSlogans[
        Math.floor(Math.random() * personalizedSlogans.length)
      ];
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        loaderTexts[Math.floor(Math.random() * loaderTexts.length)];
      setLoaderText(random);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await getQuestions(inputVal, difficulty);
      if (res?.error) {
        setThrownError(new Error(res.error));
      }
    } catch {
      setThrownError(new Error("Something went wrong in handleGenerate"));
    }
  };
  if (thrownError) {
    throw thrownError;
  }

  return (
    <>
      {showDisclaimer && (
        <div className="bg-red-500 absolute bottom-0 w-full z-10 h-10 flex justify-center items-center gap-2">
          <p>
            This application is currently under development. Some features may
            not work as expected.
          </p>
          <X onClick={() => setShowDisclaimer(false)} />
        </div>
      )}
      <div className="h-100 flex  flex-col  items-center  m-auto ">
        {randomSlogan && (
          <TextAnimate
            animation="blurIn"
            as="h1"
            className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 font-josefin-sans text-center"
          >
            {randomSlogan.current}
          </TextAnimate>
        )}
        <div
          className={`relative bg-secondary flex flex-col sm:flex-row gap-4  rounded-3xl p-2 md:p-7  md:min-w-75  overflow-hidden ${
            questions.length != 0 ? "hidden" : "block"
          }`}
        >
          <BorderBeam
            className="bg-gradient-to-r from-transparent  via-emerald-500  to-transparent"
            size={200}
          />
          <input
            type="text"
            value={inputVal}
            placeholder="Enter your Topic"
            onChange={(e) => setInputValue(e.target.value)}
            className={` box-content rounded-lg  focus:border-0 ring-0 focus:outline-none focus:ring-0 max-w-full focus:border-none border-none px-4 py-3 dark:text-white text-black   transition ${
              questions.length != 0 ? "hidden" : "block"
            }`}
          />

          <div className="flex md:gap-4 flex-row gap-2 md:justify-center items-center">
            <Select
              onValueChange={setDifficulty}
              value={difficulty}
              defaultValue=""
            >
              <SelectTrigger className="md-w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy" className="text-green-400">
                  Easy
                </SelectItem>
                <SelectItem value="medium" className="text-yellow-400">
                  Medium
                </SelectItem>
                <SelectItem value="hard" className="text-red-400">
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleGenerate}
              disabled={questions.length != 0}
              className="relative  inline-flex items-center text-sm md:text-md justify-center h-12 w-24 md:w-32 rounded-full border-2 border-teal-500 bg-slate-900 text-white font-semibold tracking-wide transition-all duration-500 hover:border-emerald-400 hover:text-emerald-300 hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-5">Generate</span>

              <span className="absolute w-10 h-10 bg-indigo-500 rounded-full blur-lg right-3 top-2 z-0 transition-all duration-500 group-hover:right-12 group-hover:bottom-[-12px]" />
              <span className="absolute w-16 h-16 bg-teal-400 rounded-full blur-lg right-6 top-4 z-0 transition-all duration-500 group-hover:-right-6 group-hover:scale-110" />
            </button>
          </div>
        </div>
        {isGenerating && (
          <div
            className="flex absolute backdrop-blur-lg  h-screen w-screen lg:hidden
           z-100 flex-col justify-center items-center top-0 right-0"
          >
            <PyraLoader />
            <h3 className="text-center">{loaderText}</h3>
          </div>
        )}
        {isGenerating && (
          <div className="lg:flex flex-col justify-center items-center hidden ">
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
                <InteractiveHoverButton onClick={() => router.push("/quiz")}>
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

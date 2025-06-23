"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Meteors } from "@/components/magicui/meteors";
import { NavbarDemo } from "@/components/NavBar";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { MagicCard } from "@/components/magicui/magic-card";
import { Ripple } from "@/components/magicui/ripple";
import { useTheme } from "next-themes";
import QuiziumInfo from "@/components/quiziumInfo";
import {
  Brain,
  BookOpen,
  Trophy,
  LineChart,
  BarChart3,
  BookCheck,
  SlidersHorizontal,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { Loader } from "@/components/ui/Loader";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
const Page = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  if (loading || status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="sticky top-0 left-0 z-10">
        <NavbarDemo />
      </div>

      <section className="relative flex   min-h-screen w-full flex-col items-center justify-center overflow-hidden ">
        <div className="flex gap-4">
          <TextAnimate
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl "
            animation="slideLeft"
            by="character"
          >
            AI That
          </TextAnimate>
          <AuroraText className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl ">
            Challenges
          </AuroraText>
        </div>
        <div className="flex gap-4">
          <TextAnimate
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl "
            animation="slideLeft"
            by="character"
          >
            You That
          </TextAnimate>
          <AuroraText className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl ">
            Conquer
          </AuroraText>
        </div>
        <div
          onClick={() => {
            if (status === "authenticated") {
              redirect("/home");
            } else {
              signIn("google", { callbackUrl: "/home", prompt: "select_account" });
            }
          }}
          className="mt-4 lg:hidden group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] "
        >
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Introducing Quizium
          </AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </div>
        <Meteors number={40} />
      </section>
      <section className="grid  grid-cols-1 md:grid-cols-2  border-none">
        <QuiziumInfo />
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background ">
          <p className="z-10  text-center text-5xl font-medium tracking-tighter ">
            Quizium
          </p>
          <Ripple className="border-none" />
        </div>
      </section>
      <section className="py-16  min-h-screen  " id="features">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Makes Quizium Smarter?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg shadow-md">
              <MagicCard
                className="p-6"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  AI-Powered Quizzing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Questions adapt to your performance, helping you improve
                  faster and smarter.
                </p>
              </MagicCard>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg shadow-md">
              <MagicCard
                className="p-6"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Topic-Based Practice
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pick from curated subjects and sharpen your skills one topic
                  at a time.
                </p>
              </MagicCard>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg shadow-md">
              <MagicCard
                className="p-6"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Gamified Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn XP, unlock levels, and climb leaderboards to keep
                  learning fun and addictive.
                </p>
              </MagicCard>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg shadow-md">
              <MagicCard
                className="p-6"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                  <LineChart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Track Your Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your growth with smart analytics and personalized
                  learning stats.
                </p>
              </MagicCard>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-black" id="how-it-works">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            How Quizium Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Step 1 */}
            <div className="text-center px-6">
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                <UserPlus className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sign Up & Choose Topics
              </h3>
              <p className="">
                Create your account, pick subjects you want to master, and get
                started instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center px-6">
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                <SlidersHorizontal className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold  mb-2">
                AI Tailors Your Quiz
              </h3>
              <p className="">
                The AI engine adapts difficulty based on your performance in
                real time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center px-6">
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                <BookCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Answer, Learn & Improve
              </h3>
              <p className="">
                Get instant feedback, explanations, and retry questions until
                you master them.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center px-6" id="how">
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Get Personalized Insights
              </h3>
              <p className="">
                Understand your strengths, fix weak areas, and follow smart
                study plans generated just for you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 -z-1">
              Quizium
            </h2>
            <p className="text-sm">
              AI-powered quizzes that adapt to you. Learn smarter, not harder.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:underline">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a href="" className="hover:underline">
                  support@quizium.ai
                </a>
              </li>
              <li>
                Twitter:{" "}
                <a href="" className="hover:underline">
                  @quizium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-xs text-gray-500 dark:text-gray-600">
          &copy; 2025 Quizium. All rights reserved.
        </div>
      </footer>
      {/* <button
        onClick={() =>
          signIn("google", { callbackUrl: "/", prompt: "select_account" })
        }
      >
        Sign in with Google
      </button>
      <button onClick={() => signOut({ redirectTo: "/" })}>Sign Out</button> */}
    </>
  );
};

export default Page;

"use client";

import { useClear } from "@/store/useClear";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { clearInput } = useClear();
  useEffect(() => {
    console.error("An unexpected error occurred:", error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen text-center px-4 py-8 
      bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-red-700 dark:text-red-200 p-8 rounded-xl shadow-lg max-w-md w-full border border-red-200 dark:border-red-800">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
          {error.message ||
            "An unexpected error has occurred. Please try again later."}
        </p>
        <button
          onClick={() => {
            reset();
            clearInput();
          }}
          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors text-white px-6 py-2 rounded-md font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

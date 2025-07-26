import { NextRequest, NextResponse } from "next/server";
import quizModal from "@/models/quiz.modal";
import { OptionKey, QuestionType, QuizData } from "@/store/useQues";
function isOptionKey(key: unknown): key is OptionKey {
  return typeof key === "string" && ["A", "B", "C", "D"].includes(key);
}

function isQuestionType(obj: unknown): obj is QuestionType {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const maybe = obj as {
    question?: unknown;
    options?: Record<string, unknown>;
    answer?: unknown;
  };

  return (
    typeof maybe.question === "string" &&
    typeof maybe.options === "object" &&
    maybe.options !== null &&
    ["A", "B", "C", "D"].every(
      (key) => typeof maybe.options?.[key] === "string"
    ) &&
    Array.isArray(maybe.answer) &&
    maybe.answer.length === 2 &&
    isOptionKey(maybe.answer[0]) &&
    typeof maybe.answer[1] === "string"
  );
}

function isQuizData(data: unknown): data is QuizData {
  return Array.isArray(data) && data.every(isQuestionType);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const question = await quizModal.find({ _id: id });
  console.log(question[0]);
  if (!question[0] || !isQuizData(question[0].questions)) {
    console.log("invaild quiz data");
    return NextResponse.json({ error: "Invalid quiz data" }, { status: 400 });
  }
  return NextResponse.json({ ques: question[0] });
}

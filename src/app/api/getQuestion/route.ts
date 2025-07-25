import { NextRequest, NextResponse } from "next/server";
import quizModal from "@/models/quiz.modal";
import { OptionKey, QuestionType, QuizData } from "@/store/useQues";

function isOptionKey(key: any): key is OptionKey {
  return ["A", "B", "C", "D"].includes(key);
}

function isQuestionType(obj: any): obj is QuestionType {
  return (
    typeof obj === "object" &&
    typeof obj.question === "string" &&
    typeof obj.options === "object" &&
    ["A", "B", "C", "D"].every((key) => typeof obj.options[key] === "string") &&
    Array.isArray(obj.answer) &&
    obj.answer.length === 2 &&
    isOptionKey(obj.answer[0]) &&
    typeof obj.answer[1] === "string"
  );
}
function isQuizData(data: any): data is QuizData {
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

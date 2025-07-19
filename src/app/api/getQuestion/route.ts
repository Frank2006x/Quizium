import { NextRequest, NextResponse } from "next/server";
import quizModal from "@/models/quiz.modal";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const question = await quizModal.find({ _id: id });
  return NextResponse.json({ ques:question[0] });
}

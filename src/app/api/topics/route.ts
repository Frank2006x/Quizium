import connectDB from "@/lib/mongodb";
import quizModal from "@/models/quiz.modal";
import SessionModel from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;
  const { userId } = await SessionModel.findOne({ sessionToken: token });

  const topic = (await quizModal.find({ userId },{topic:1,_id:1})).reverse();

  return NextResponse.json(topic);
}

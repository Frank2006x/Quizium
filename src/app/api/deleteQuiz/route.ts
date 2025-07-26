import { NextRequest, NextResponse } from "next/server";
import quizModal from "@/models/quiz.modal";
import SessionModel from "@/models/session.model";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });

  try {
    const res = await quizModal.findOneAndDelete({ _id: id, userId: userId });
    if (!res) {
      return NextResponse.json({ message: "quiz not found" }, { status: 404 });
    }

  } catch {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
  return NextResponse.json(
    { message: "quiz is successfully deleted" },
    { status: 200 }
  );
}

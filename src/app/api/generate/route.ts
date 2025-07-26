import { GoogleGenAI } from "@google/genai";
import { jsonrepair } from "jsonrepair";
import quizModal from "@/models/quiz.modal";
import { NextRequest } from "next/server";
import SessionModel from "@/models/session.model";
import connectDB from "@/lib/mongodb";
import { QuizData } from "@/store/useQues";
export async function POST(req: NextRequest) {
  connectDB();
  const body = await req.json();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });

  const topic = body.topic;
  const difficulty = body.difficulty;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate 5 multiple-choice questions on the topic "${topic}" in difficuly "${difficulty}". Return the response as a JSON object in this exact format:
    
    {
      "success": true,
      "data": [
        {
          "question": "Question here",
          "options": {
            "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
        },
        "answer": ["CorrectOptionKey","explanation to the answer"]
        },
        ...
  ]
}

- Do NOT include any text or explanation before or after the JSON.
- Do NOT wrap the JSON in code blocks (no \`\`\`).
- All option keys must be A, B, C, D.
- The answer must return as array where first element match one of the option key and second element is explaination to the answer.
- Only return a single valid JSON object.`,
    config: {
      maxOutputTokens: 2000,
      temperature: 0.2,
    },
  });

  let parsed = null;

  try {
    if (response.text === undefined) {
      return Response.json({
        success: false,
        error: "quiz not generated please try again later",
      });
    }
    const fixed = jsonrepair(response.text);
    parsed = JSON.parse(fixed);

    const quizData: QuizData = parsed.data;
    await quizModal.insertOne({
      userId,
      questions: quizData,
      topic,
      difficulty,
    });
  } catch {
    return Response.json({
      success: false,
      error: "AI returned incomplete or invalid JSON",
      questions: response.text,
    });
  }

  return Response.json({ success: true, data: parsed.data });
}

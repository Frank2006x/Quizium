import { GoogleGenAI } from "@google/genai";
import { jsonrepair } from "jsonrepair";
import quizModal from "@/models/quiz.modal";
import { after, NextRequest } from "next/server";
import SessionModel from "@/models/session.model";
import connectDB from "@/lib/mongodb";
import { QuizData } from "@/store/useQues";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createAgent } from "langchain";

import * as z from "zod";

const ResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      question: z.string(),
      options: z.object({
        A: z.string(),
        B: z.string(),
        C: z.string(),
        D: z.string(),
      }),
      answer: z.object({
        option: z.enum(["A", "B", "C", "D"]),
        text: z.string(),
      }),
    })
  ),
});

export async function POST(req: NextRequest) {
  connectDB();
  const body = await req.json();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });

  const topic = body.topic;
  const difficulty = body.difficulty;
  const llm = new ChatGoogleGenerativeAI({
    temperature: 0.2,
    model: "gemini-2.5-flash",
    maxOutputTokens: 10000,
    apiKey: process.env.GEMINI_API_KEY,
  });
 
  const agent = createAgent({
    model: llm,
    responseFormat: ResponseSchema,
    systemPrompt: `You are an expert quiz question generator. Generate 10 multiple-choice questions in JSON format with four options (A, B, C, D) and indicate the correct answer. Ensure the questions are on the specified topic and difficulty level. The output should be a JSON object with a "data" field containing an array of questions.`,
  });
  const userMsg = new HumanMessage(
    `Generate 10 multiple-choice questions on the topic "${topic}" in difficuly "${difficulty}"`
  );

  

  const response = await agent.invoke({
    messages: [userMsg],
  });

  

  // try {
  //   if (response.su === undefined) {
  //     return Response.json({
  //       success: false,
  //       error: "quiz not generated please try again later",
  //     });
  //   }
  //   const fixed = jsonrepair(response.text);
  //   parsed = JSON.parse(fixed);

  //   const quizData: QuizData = parsed.data;
  //   await quizModal.insertOne({
  //     userId,
  //     questions: quizData,
  //     topic,
  //     difficulty,
  //   });
  // } catch {
  //   return Response.json({
  //     success: false,
  //     error: "AI returned incomplete or invalid JSON",
  //     questions: response.text,
  //   });
  // }
  // if(response.success === false){
  //   return Response.json({
  //     success: false,
  //     error: "quiz not generated please try again later",
  //   });
  // }
  console.log("response", response.structuredResponse);
  if(!response.structuredResponse.success){
    return Response.json({
      success: false,
      error: "quiz not generated please try again later",
    });
  }
  const quizData: QuizData = response.structuredResponse.data;
  await quizModal.insertOne({
    userId,
    questions: quizData,
    topic,
    difficulty,
  });
  return Response.json({ success: true, data: response.structuredResponse.data });
}

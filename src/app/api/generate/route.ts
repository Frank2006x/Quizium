import { GoogleGenAI } from "@google/genai";
import { jsonrepair } from "jsonrepair";
import dotenv from "dotenv";
dotenv.config();
export async function POST(req) {
  const body = await req.json();

  const topic = body.topic;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate 5 multiple-choice questions on the topic "${topic}". Return the response as a JSON object in this exact format:

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
      maxOutputTokens: 1000,
      temperature: 0.1,
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
  } catch (err: unknown) {
    console.error("❌ Invalid JSON from AI:", err.message);
    return Response.json({
      success: false,
      error: "AI returned incomplete or invalid JSON",
      questions: response.text,
    });
  }

  return Response.json({ success: true, data: parsed.data });
}

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
      "answer": "CorrectOptionKey"
    },
    ...
  ]
}

- Do NOT include any text or explanation before or after the JSON.
- Do NOT wrap the JSON in code blocks (no \`\`\`).
- All option keys must be A, B, C, D.
- The answer must match one of the option keys.
- Only return a single valid JSON object.`,
    config: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    },
  });
  const questions = response.text;
  //   console.log(response);
  //   questions = questions
  //     .replace(/^```json\s*/, "")
  //     .replace(/```$/, "")
  //     .trim();

  //   console.log("-------------", questions);

  let parsed = null;

  try {
    const fixed = jsonrepair(questions);
    parsed = JSON.parse(fixed);
  } catch (err) {
    console.error("❌ Invalid JSON from AI:", err.message);
    return Response.json({
      success: false,
      error: "AI returned incomplete or invalid JSON",
      questions, // for debugging
    });
  }

  return Response.json({ success: true, data: parsed.data });
}

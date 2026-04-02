import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  let prompt = "";

  try {
    const body = await req.json();
    prompt = body?.prompt ?? "";

    if (!prompt.trim()) {
      return NextResponse.json({ result: "⚠️ Please provide a prompt." });
    }

    // 🧠 Try real AI first
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant for freelancers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResult = response.choices[0].message?.content ?? "";

    return NextResponse.json({ result: aiResult });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    // ⚠️ HANDLE QUOTA ERROR OR RATE LIMIT
    if (error?.code === "insufficient_quota" || error?.status === 429) {
      return NextResponse.json({
        result:
          "⚠️ AI limit reached. Here's a quick suggestion:\n\n" +
          fallbackResponse(prompt),
      });
    }

    // ⚠️ GENERIC FALLBACK
    return NextResponse.json({
      result:
        "⚠️ Something went wrong. Try again.\n\n" +
        fallbackResponse(prompt),
    });
  }
}

// =========================================
// 💡 SMART FALLBACK LOGIC
// Always returns a string even if prompt is empty
// =========================================
function fallbackResponse(prompt: string) {
  if (!prompt) {
    return "Break your request into clear steps and focus on delivering value.";
  }

  const lower = prompt.toLowerCase();

  if (lower.includes("proposal")) {
    return "Start with a strong intro, define the problem, propose your solution, and end with a clear call to action.";
  }

  if (lower.includes("pitch")) {
    return "Keep your pitch clear: who you are, what you offer, why you're different, and what the client gains.";
  }

  if (lower.includes("summarize")) {
    return "Break the brief into: goals, requirements, timeline, and deliverables.";
  }

  return "Break your request into clear steps and focus on delivering value to the client.";
}
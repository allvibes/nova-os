import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  let prompt = "";

  try {
    const body = await req.json().catch(() => ({}));
    prompt = body?.prompt ?? "";

    if (!prompt.trim()) {
      return NextResponse.json({ result: "⚠️ Please provide a prompt." });
    }

    // ✅ INIT INSIDE HANDLER (CRITICAL FIX)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // ✅ HANDLE MISSING KEY (build-safe)
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        result:
          "⚠️ AI not configured. Here's a quick suggestion:\n\n" +
          fallbackResponse(prompt),
      });
    }

    // 🧠 REAL AI CALL
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant for freelancers." },
        { role: "user", content: prompt },
      ],
    });

    const aiResult = response.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ result: aiResult });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    // ⚠️ QUOTA / RATE LIMIT
    if (error?.code === "insufficient_quota" || error?.status === 429) {
      return NextResponse.json({
        result:
          "⚠️ AI limit reached. Here's a quick suggestion:\n\n" +
          fallbackResponse(prompt),
      });
    }

    // ⚠️ GENERIC ERROR
    return NextResponse.json({
      result:
        "⚠️ Something went wrong. Try again.\n\n" +
        fallbackResponse(prompt),
    });
  }
}

// 💡 FALLBACK
function fallbackResponse(prompt: string) {
  if (!prompt) return "Break your request into clear steps and focus on value.";

  const lower = prompt.toLowerCase();

  if (lower.includes("proposal"))
    return "Start with a strong intro, define the problem, propose your solution, and end with a call to action.";

  if (lower.includes("pitch"))
    return "Keep your pitch clear: who you are, what you offer, why you're different, and what the client gains.";

  if (lower.includes("summarize"))
    return "Break the brief into: goals, requirements, timeline, and deliverables.";

  return "Break your request into clear steps and focus on delivering value.";
}
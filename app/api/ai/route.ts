import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant for freelancers." },
        { role: "user", content: prompt }
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return Response.json(
      {
        result: "⚠️ AI is currently unavailable. Please check your API billing or try again later.",
      },
      { status: 200 } // important: don't break frontend
    );
  }
}
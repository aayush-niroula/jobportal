import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    if (!role)
      return NextResponse.json({ error: "Role is required" }, { status: 400 });

    const prompt = `Generate a job posting for "${role}" in JSON format:
{
  "description": "A short paragraph about the role",
  "responsibilities": ["..."],
  "requirements": ["..."],
  "preferred_qualifications": ["..."]
}
`;

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY)
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You must output JSON only." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenRouter API error:", text);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    const data = await res.json();

    const textOutput = data.choices?.[0]?.message?.content || "";

    const jsonString = textOutput.replace(/```json|```/g, "").trim();

    let aiResult;
    try {
      aiResult = JSON.parse(jsonString);
    } catch (err) {
      console.warn("JSON parse failed, fallback:", err, jsonString);
      aiResult = {
        description: jsonString,
        responsibilities: [],
        requirements: [],
        preferred_qualifications: [],
      };
    }

    return NextResponse.json(aiResult);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";
import PDFParser from "pdf2json";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const OR = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});
const model = OR.chat("deepseek/deepseek-chat-v3");

function parsePdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (err: any) => reject(err));
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      const text = pdfData?.Pages?.map((p: any) =>
        p?.Texts?.map((t: any) => decodeURIComponent(t.R[0].T)).join(" ")
      ).join("\n");
      resolve(text || "");
    });
    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const facilitator = await prisma.jobFacilitator.findUnique({
    where:{
        user_id:auth.userId
    }
  })
  if (!facilitator) {
  return NextResponse.json({ error: "Facilitator not found" }, { status: 404 });
}

  try {
    const body = await req.json();
    const { document_url, registration_no,company_name, email, phone, address, website } = body;

    if (!document_url || !registration_no) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

   
    const pdfRes = await fetch(document_url);
    const arrayBuffer = await pdfRes.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const extractedText = await parsePdf(pdfBuffer);
    if (!extractedText.trim()) {
      return NextResponse.json({ error: "Could not extract text from document" }, { status: 400 });
    }

    const prompt = `
You are a legal business document verification expert.
Verify this business registration document.

Registration Number: ${registration_no}

Document Text:
${extractedText}

Return JSON ONLY in this format:
{
  "is_real": true,
  "confidence": 85,
  "reason": "clear government format"
}
`;

    const result = await generateText({
      model,
      messages: [
        { role: "system", content: "You verify business documents." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });

    let structured;
    try {
      const jsonString = ((result as any)._output || result.output)
        .replace(/```json\s*/, "")
        .replace(/```/, "")
        .trim();
      structured = JSON.parse(jsonString);
    } catch {
      structured = { is_real: false, confidence: 0, reason: "Parse failed" };
    }

    const { confidence, is_real } = structured;
    const status = confidence >= 70 && is_real ? "verified" : "pending";

   
    const verification = await prisma.facilitator_verification.upsert({
      where: { facilitator_id: facilitator?.id },
      update: { document_url, registration_no, status, submitted_at: new Date() },
      create: { facilitator_id: facilitator?.id, document_url, registration_no, status, submitted_at: new Date() },
    });

   
    const updateData: any = {};
    if (email) updateData.company_email = email;
    if (phone) updateData.company_phone = phone;
    if (address) updateData.location = address;
    if (website) updateData.website_link = website;
    if(company_name) updateData.company_name = company_name

    if (Object.keys(updateData).length > 0) {
      await prisma.jobFacilitator.update({
        where: { id: facilitator?.id },
        data: updateData,
      });
    }

    return NextResponse.json({
      success: true,
      status,
      ai: structured,
      verification,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

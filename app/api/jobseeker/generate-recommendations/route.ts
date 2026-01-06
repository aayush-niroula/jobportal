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
        p?.Texts?.map((t: any) =>
          decodeURIComponent(t.R[0].T)
        ).join(" ")
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
  const userId = auth.userId;

  try {

    const seeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId },
      select: { resume_url: true },
    });

    if (!seeker?.resume_url) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

 
    const pdfRes = await fetch(seeker.resume_url);
    const arrayBuffer = await pdfRes.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);


    const resumeText = await parsePdf(pdfBuffer);
    if (!resumeText.trim()) {
      return NextResponse.json({
        jobs: [],
        message: "Could not extract text from resume",
      }, { status: 400 });
    }

    console.log("Extracted Resume text",resumeText);
    
  
    const prompt = `You are an expert resume parser. Extract skills, job titles, and experience years from the resume text.
    Return JSON ONLY in this format:
{
  "skills": ["example skill1", "example skill2"],
  "experience_years": 3,
  "job_titles": ["Software Engineer", "Frontend Developer"]
}

Resume Text:
${resumeText}
`;

    const result = await generateText({
      model,
      messages: [
        { role: "system", content: "You extract structured resume information." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });

    console.log("DEEPSEEK OUTPUT:", result);




 let structuredData;
    try {
      const jsonString = ((result as any)._output || result.output)
        .replace(/```json\s*/, "")
        .replace(/```/, "")
        .trim();

      structuredData = JSON.parse(jsonString);
    } catch {
      structuredData = { skills: [], experience_years: 0, job_titles: [] };
    }

    const { skills, experience_years, job_titles } = structuredData;

    if ((!skills || skills.length === 0) && (!job_titles || job_titles.length === 0)) {
      return NextResponse.json({ jobs: [], message: "No skills or job titles found in resume" }, { status: 400 });
    }


 
    const orConditions: any[] = [];
    if (skills.length > 0) orConditions.push({ skills: { hasSome: skills } });
    if (job_titles.length > 0) orConditions.push({ job_name: { in: job_titles } });

    const jobs = await prisma.jobs.findMany({
      where: {
        OR: orConditions,
        experience_level: experience_years
          ? {
              in:
                experience_years <= 2
                  ? ["ENTRY"]
                  : experience_years <= 5
                  ? ["ENTRY", "MID"]
                  : experience_years <= 10
                  ? ["MID", "SENIOR"]
                  : ["SENIOR", "LEAD"],
            }
          : undefined,
      },
      include: {
        facilitator: {
          select: {
            company_name: true,
            company_logo: true,
            location: true,
            website_link: true,
          },
        },
        category: true,
      },
      orderBy: { created_at: "desc" },
      take: 20,
    });

   
    const scoredJobs = jobs.map(job => {
      const matchedSkills = skills.filter((s: any) => job.skills.includes(s)).length || 0;
      const score = skills.length > 0 ? matchedSkills / skills.length : 0;
      return { ...job, score };
    });

    return NextResponse.json({ success: true, data: scoredJobs });
  } catch (error) {
    console.error("Generate recommendations error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

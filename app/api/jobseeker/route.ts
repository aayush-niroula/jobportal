import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");
    const experience = searchParams.get("experience");
    const education = searchParams.get("education");
    const skill = searchParams.get("skill");

  
    let where: any = {};

    if (location) where.location = location;
    if (experience) where.experience_level = experience;
    if (education) where.educations = { some: { degree: education } };
    if (skill) where.technical_skills = { has: skill }; 

    const candidates = await prisma.jobSeeker.findMany({
      where,
      include: {
        user: true,
        educations: true,
        experiences: true,
      },
    });

    return NextResponse.json({ candidates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching candidates" },
      { status: 500 }
    );
  }
}

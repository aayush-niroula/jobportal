import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = auth;

  try {
    const body = await req.json();

    const {
      job_name,
      description, // now should be string[]
      location,
      salary,
      deadline,
      time,
      category_id,
      responsibilities,
      requirements,
      preferred_qualifications,
      job_type,
      work_mode,
      experience_level,
      salary_min,
      salary_max,
      salary_type,
      benefits,
      skills,
    } = body;

    // Make sure facilitator exists
    const facilitatorRecord = await prisma.jobFacilitator.findUnique({
      where: { user_id: userId },
    });

    if (!facilitatorRecord) {
      return NextResponse.json(
        { error: "User is not a facilitator" },
        { status: 403 }
      );
    }

    // Create new job
    const newJob = await prisma.jobs.create({
      data: {
        job_name,
        description: Array.isArray(description) ? description : [description],
        location,
        salary: salary ?? null,
        deadline: deadline ? new Date(deadline) : null,
        time: time ? new Date(time) : null,
        responsibilities: responsibilities ?? [],
        requirements: requirements ?? [],
        preferred_qualifications: preferred_qualifications ?? [],
        job_type,
        work_mode,
        experience_level,
        category_id,
        salary_min: salary_min ?? null,
        salary_max: salary_max ?? null,
        salary_type,
        benefits: benefits ?? [],
        skills: skills ?? [],
        facilitator_id: facilitatorRecord.id,
      },
    });

    return NextResponse.json(
      { message: "New job created successfully", newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/postajob error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) return auth;

  const userId = auth.userId;

  try {
    const {
      jobId,
      phone,
      experience,
      coverLetter,
      resume_url,
    } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (phone && phone !== user.phone) {
      await prisma.user.update({
        where: { id: userId },
        data: { phone },
      });
    }

    const role = await prisma.role.findUnique({
      where: { role_name: "JobSeeker" },
    });

    const seeker = await prisma.jobSeeker.upsert({
      where: { user_id: userId },
      update: {
        resume_url,
        experience_level: experience,
      },
      create: {
        user_id: userId,
        role_id: role!.id,
        resume_url,
        experience_level: experience,
      },
    });


    const application = await prisma.applications.create({
      data: {
        job_id: jobId,
        jobseeker_id: seeker.id,
        status: "PENDING",
        message: coverLetter,
      },
    });

    return NextResponse.json({
      message: "Application submitted",
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return NextResponse.json(
      { message: "Failed to submit application" },
      { status: 500 }
    );
  }
}

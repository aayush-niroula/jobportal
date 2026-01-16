import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }


    const job = await prisma.jobs.findUnique({
      where: { id: jobId },
      select: { facilitator_id: true },
    });

    if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

 
    await prisma.jobs.update({
      where: { id: jobId },
      data: { views: { increment: 1 } },
    });

 
    await prisma.jobFacilitator.update({
      where: { id: job.facilitator_id },
      data: { profile_views: { increment: 1 } },
    });

    return NextResponse.json({ message: "Views incremented" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

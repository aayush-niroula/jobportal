import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const seeker = await prisma.jobSeeker.findUnique({
    where: { user_id: auth.userId },
    select: { resume_url: true },
  });

  if (!seeker?.resume_url) {
    return NextResponse.json({ error: "No resume found" }, { status: 404 });
  }


  const response = await fetch(seeker.resume_url);
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }

  const arrayBuffer = await response.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=resume.pdf",
      "Cache-Control": "private, max-age=3600",
    },
  });
}

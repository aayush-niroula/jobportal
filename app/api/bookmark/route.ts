import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) return auth;

  try {
    const { job_id } = await req.json();
    if (!job_id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    
    const jobseeker = await prisma.jobSeeker.findUnique({
      where: { user_id: auth.userId },
      select: { id: true },
    });

    if (!jobseeker) {
      return NextResponse.json(
        { error: "Jobseeker not found" },
        { status: 404 }
      );
    }

    const existingBookmark = await prisma.bookmarks.findUnique({
      where: {
        jobseeker_id_job_id: {
          jobseeker_id: jobseeker.id,
          job_id,
        },
      },
    });

    
    if (existingBookmark) {
      await prisma.bookmarks.delete({
        where: {
          jobseeker_id_job_id: {
            jobseeker_id: jobseeker.id,
            job_id,
          },
        },
      });

      return NextResponse.json({
        message: "Bookmark removed",
        bookmarked: false,
      });
    }

    await prisma.bookmarks.create({
      data: {
        jobseeker_id: jobseeker.id,
        job_id,
      },
    });

    return NextResponse.json({
      message: "Job bookmarked",
      bookmarked: true,
    });

  } catch (error) {
    console.error("Bookmark error:", error);
    return NextResponse.json(
      { error: "Failed to toggle bookmark" },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) return auth;

  try {
    const jobseeker = await prisma.jobSeeker.findUnique({
      where: { user_id: auth.userId },
      select: { id: true },
    });

    if (!jobseeker) {
      return NextResponse.json({ error: "Jobseeker not found" }, { status: 404 });
    }

  
    const bookmarks = await prisma.bookmarks.findMany({
      where: { jobseeker_id: jobseeker.id },
      select: { 
        job: true,
        created_at:true
     },
     
 
    });

    const bookmarkedJobs = bookmarks.map(b => ({
      ...b.job,
      isBookmarked: true,
    }));

    return NextResponse.json(bookmarkedJobs); 
  } catch (error) {
    console.error("Fetch bookmarked jobs error:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarked jobs" }, { status: 500 });
  }
}



import { prisma } from "@/lib/prisma";
import { JobType, WorkMode } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const search = searchParams.get("search") || "";
  const industry = searchParams.get("industry") || "all"; 
  const jobType = searchParams.get("jobType") || "all";
  const workMode = searchParams.get("workMode") || "all";

  try {
  
    const categoryFilter = industry !== "all" ? { category_id: industry } : {};

    const jobs = await prisma.jobs.findMany({
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        facilitator: true,
        category: true,
        bookmarks: true,
      },
      where: {
        AND: [
          search
            ? {
                OR: [
                  { job_name: { contains: search, mode: "insensitive" } },
                  { facilitator: { company_name: { contains: search, mode: "insensitive" } } },
                ],
              }
            : {},
          categoryFilter,
          jobType !== "all" ? { job_type: jobType as JobType } : {},
          workMode !== "all" ? { work_mode: workMode as WorkMode } : {},
        ],
      },
    });

    const totalJobs = await prisma.jobs.count({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { job_name: { contains: search, mode: "insensitive" } },
                  { facilitator: { company_name: { contains: search, mode: "insensitive" } } },
                ],
              }
            : {},
          categoryFilter,
          jobType !== "all" ? { job_type: jobType as JobType } : {},
          workMode !== "all" ? { work_mode: workMode as WorkMode } : {},
        ],
      },
    });

    const jobWithBookMark = jobs.map((job) => ({
      ...job,
      isBookmarked: job.bookmarks?.length > 0,
    }));

   const categoryCounts = await prisma.jobs.groupBy({
  by: ["category_id"],
  _count: { _all: true }
});

const jobTypeCounts = await prisma.jobs.groupBy({
  by: ["job_type"],
  _count: { _all: true }
});

const workModeCounts = await prisma.jobs.groupBy({
  by: ["work_mode"],
  _count: { _all: true }
});


    return NextResponse.json({
      data: jobWithBookMark,
      pagination: {
        total: totalJobs,
        page,
        limit,
        totalPages: Math.ceil(totalJobs / limit),
      },
      counts:{
    category: categoryCounts,
    jobType: jobTypeCounts,
    workMode: workModeCounts
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

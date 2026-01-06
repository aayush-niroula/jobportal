import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";


export async function POST(req: NextRequest) {
 
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { skills, experience_years, job_titles } = body;

    if ((!skills || skills.length === 0) && (!job_titles || job_titles.length === 0)) {
      return NextResponse.json(
        { jobs: [], message: "No skills or job titles provided" },
        { status: 400 }
      );
    }

  
    const orConditions = [];
    if (skills && skills.length > 0) {
      orConditions.push({ skills: { hasSome: skills } });
    }
    if (job_titles && job_titles.length > 0) {
      orConditions.push({ job_name: { in: job_titles } });
    }

    const jobs = await prisma.jobs.findMany({
      where: {
        OR: orConditions,
        experience_level:
          experience_years !== undefined
            ? {
                in: experience_years <= 2
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
      orderBy: {
        created_at: "desc",
      },
      take: 20,
    });


    const scoredJobs = jobs.map((job) => {
      const matchedSkills =
        skills?.filter((s:string) => job.skills.includes(s))?.length || 0;
      const score =
        skills && skills.length > 0 ? matchedSkills / skills.length : 0;

      return {
        ...job,
        score,
      };
    });

    return NextResponse.json({ jobs: scoredJobs }, { status: 200 });
  } catch (error) {
    console.error("Job matching error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching jobs" },
      { status: 500 }
    );
  }
}

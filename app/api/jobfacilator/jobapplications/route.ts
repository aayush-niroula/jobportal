import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth"; // your auth middleware

export async function GET(req: NextRequest) {
  try {
  
    const auth = await authenticate(req);

    if (!auth || !("userId" in auth)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const facilitator = await prisma.jobFacilitator.findUnique({
        where:{
            user_id:auth.userId
        },
        select:{
            company_name:true,
            company_logo:true,
            department:true,
            id:true,
            profile_views:true
        }
    })

    const jobs = await prisma.jobs.findMany({
      where: { facilitator_id: facilitator?.id },
      select: {
        id: true,
        job_name: true,
        location:true,
        work_mode:true,
        views:true,
        applications: {
          select: {
            status: true,
          },
        },
      },
    });

    const jobStats = jobs.map((job) => {
      const statusCounts = {
        PENDING: 0,
        SCREENING: 0,
        INTERVIEW: 0,
        REJECTED: 0,
      };

      job.applications.forEach((app) => {
        const status = app.status?.toUpperCase();

        switch (status) {
          case "PENDING":
            statusCounts.PENDING += 1;
            break;
          case "SCREENING":
            statusCounts.SCREENING += 1;
            break;
          case "INTERVIEW":
            statusCounts.INTERVIEW += 1;
            break;
          case "REJECTED":
            statusCounts.REJECTED += 1;
            break;
        }
      });

      return {
        jobId: job.id,
        jobName: job.job_name,
        location:job.location,
        workmode:job.work_mode,
        facilitator:facilitator,
        views:job.views,
        totalApplications: job.applications.length,
        statusCounts,
      };
    });

    return NextResponse.json({ jobs: jobStats });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

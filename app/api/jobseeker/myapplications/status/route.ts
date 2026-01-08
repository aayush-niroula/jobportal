import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) return auth;

  try {
    const { applicationId, status } = await req.json();

    if (!applicationId || !status) {
      return NextResponse.json({ error: "Some field is missing" }, { status: 400 });
    }

    const validStatuses = ["PENDING", "SCREENING", "REJECTED", "INTERVIEW"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

  
    const application = await prisma.applications.findUnique({
      where: { id: applicationId },
      include: {
        job: true,
        seeker: {
          include: { user: true },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }


    const updated = await prisma.applications.update({
      where: { id: applicationId },
      data: {
        status,
        reviewed_at: new Date(),
      },
    });


    const notification = await prisma.notifications.create({
      data: {
        user_id: application.seeker.user.id,
        type: "APPLICATION_STATUS",
        message: `Your application for "${application.job.job_name}" is now ${status}`,
      },
    });

   
    return NextResponse.json({
      message: "Status updated successfully",
      updated,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

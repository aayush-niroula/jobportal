import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    
    const auth = await authenticate(req)
     if(!auth || "userId" in auth === false) return auth

     const {applicationId,scheduledAt,interviewType,meetingLink,notes}= await req.json()

     if(!applicationId || !scheduledAt || !interviewType){
        return NextResponse.json({error:"Somefield is missing"},{status:400})
     }

 const application = await prisma.applications.findUnique({
    where: { id: applicationId },
    include: {
      job: true,
    },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

     const exisiting = await prisma.interviews.findUnique({
        where:{
       application_id:applicationId
        }
     })

     if(exisiting){
        return NextResponse.json({"message":"Interview already scheduled"},{status:409})
     }

     await prisma.$transaction([
    prisma.interviews.create({
      data: {
        application_id: applicationId,
        scheduled_at: new Date(scheduledAt),
        interview_type: interviewType,
        meeting_link: interviewType === "ONLINE" ? meetingLink : null,
        notes: notes || null,
        scheduled_by: auth.userId,
      },
    }),
    prisma.applications.update({
      where: { id: applicationId },
      data: {
        status: "INTERVIEW",
        reviewed_at: new Date(),
      },
    }),
  ]);

     return NextResponse.json({"message":"Interview scheduled succesfully"},{status:201})
}


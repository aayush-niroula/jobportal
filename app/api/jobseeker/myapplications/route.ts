import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
    const auth = await authenticate(req)
    if (!auth || "userId" in auth === false) return auth;

    const userId = auth.userId

    const job_seeker = await prisma.jobSeeker.findUnique({
        where:{
            user_id:userId
        },
    })
        const applications = await prisma.applications.findMany({
      where: { jobseeker_id: job_seeker?.id },
      include: {
        job: {
          select: {
            job_name: true,
            job_type: true,
            experience_level: true,
            location: true,
            salary_min: true,
            salary_max: true,
            description: true,
            requirements:true,
            facilitator: {
              select: {
                company_name: true,
                company_logo: true,
                user:true
              },
            },
          },
        },
        interviews:true
      },
    });

    const formatted = applications.map(app => ({
      id: app.id,
      status: app.status,                
      appliedAt: app.applied_at,         
      reviewedAt: app.reviewed_at,
      message: app.message,
      job: {
        ...app.job,
      },
    }));


    return NextResponse.json({"message":"All applications feteched successfully",application:formatted})
        
    } catch (error) {
        console.log(error);
       return NextResponse.json({error:"Something went wrong"}) 
    }
}
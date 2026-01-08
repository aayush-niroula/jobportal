import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

export async function PUT(req: NextRequest) {  
  try {
    const body = await req.json();

    const {
      userId,
      name,
      email,
      phone,
      experience_level,
      technical_skills,
      soft_skills,
      professional_summary,
      availability,
      expected_salary_min,
      expected_salary_max,
      job_type,
      work_mode,
      linkedin_url,
      portfolio_url,
      work_experiences,
      educations,
    } = body;

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }


    const updateUserData: any = {};
    if (name) updateUserData.name = name;
    if (email) updateUserData.email = email;
    if (phone) updateUserData.phone = phone;

    await prisma.user.update({
      where: { id: userId },
      data: updateUserData
    });
    const role = await prisma.role.findUnique({ where: { role_name: "JobSeeker" } });
    if (!role) return NextResponse.json({ error: "JobSeeker role not found" }, { status: 400 });
    const jobSeekerRoleId = role.id;


    const existing = await prisma.jobSeeker.findUnique({ where: { user_id: userId } });

    const jobSeekerData: any = {
      ...(experience_level && { experience_level }),
      ...(technical_skills && { technical_skills }),
      ...(soft_skills && { soft_skills }),
      ...(professional_summary && { professional_summary }),
      ...(availability && { availability }),
      ...(expected_salary_min !== undefined && { expected_salary_min }),
      ...(expected_salary_max !== undefined && { expected_salary_max }),
      ...(job_type && { job_type }),
      ...(work_mode && { work_mode }),
      ...(linkedin_url && { linkedin_url }),
      ...(portfolio_url && { portfolio_url }),
    };

    if (work_experiences) {
      jobSeekerData.experiences = {
        deleteMany: {},
        create: work_experiences.map((we: any) => ({
          role: we.role,
          company: we.company,
          start_date: new Date(we.start_date),
          end_date: we.end_date ? new Date(we.end_date) : null,
          points: we.points,
        })),
      };
    }

    if (educations) {
      jobSeekerData.educations = {
        deleteMany: {},
        create: educations.map((ed: any) => ({
          degree: ed.degree,
          institution: ed.institution,
          start_year: ed.start_year,
          end_year: ed.end_year || null,
        })),
      };
    }

    if (existing) {
      await prisma.jobSeeker.update({
        where: { user_id: userId },
        data: jobSeekerData,
      });
    } else {
      await prisma.jobSeeker.create({
        data: {
          user_id: userId,
          role_id: jobSeekerRoleId,
          ...jobSeekerData,
        },
      });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("JobSeeker Profile Update Error:", err);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) return auth;

  const seeker = await prisma.jobSeeker.findUnique({
    where: { user_id: auth.userId },
    select: {
      user:{
        select:{
        name:true,
        email:true,
        }
      },
      applications:true,
      profile_image: true,
      resume_url: true,
      experience_level: true,
      professional_summary: true,
      technical_skills: true,
      soft_skills: true,
      availability: true,
      expected_salary_min: true,
      expected_salary_max: true,
      job_type: true,
      work_mode: true,
      linkedin_url: true,
      portfolio_url: true,
      educations: true,
      experiences:true,
      bookmarks:true
    },

  
  });

  return NextResponse.json(seeker);
}



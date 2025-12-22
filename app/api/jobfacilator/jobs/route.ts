import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {job_name,description,location,salary,deadline,time,category,responsibilities,requirements,preferred_qualifications,job_type,work_mode,expericence_level,salary_min,salary_max,salary_type,benefits,skills}= body
        
        const newJob = await prisma.jobs.create({
            data: {
                job_name:job_name,
                description:description,
                location:location,
                salary:salary,
                deadline:deadline,
                time:time,
                responsibilities:responsibilities,
                requirements:requirements,
                preferrred_qualifications:preferred_qualifications,
                job_type:job_type,
                work_mode:work_mode,
                expericence_level:expericence_level,
                category:category,
                salary_min:salary_min,
                salary_max:salary_max,
                salary_type:salary_type,
                benefits:benefits,
                skills:skills
               
            }
        })
    } catch (error) {
        console.log(error);
        
    }
}
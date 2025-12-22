import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {job_name,description,location,salary,deadline,time,category,responsibilites,requirements,preferred_qualifications,job_type,work_mode,expericence_level,salary_min,salary_max,salary_type,benefits,skills}= body
        
        const newJob = await prisma.jobs.create({
            data: {
                job_name:job_name,
                description:description,
                location:location,
                salary:salary,
                deadline:deadline,
                time:time,
                category:category,
                responsibilities:responsibilites,
                requirements:requirements,
                
            }
        })
    } catch (error) {
        console.log(error);
        
    }
}
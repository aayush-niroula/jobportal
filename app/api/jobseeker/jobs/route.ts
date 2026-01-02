import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
const page = parseInt(searchParams.get("page") || "1");
 const limit = parseInt(searchParams.get("limit") || "10");
 const skip = (page - 1) * limit;
 try {
    const jobs = await prisma.jobs.findMany({
        skip,
        take:limit,
        orderBy:{
            time:"desc"
        },
        include:{
            facilitator:true,
            category:true
        }
    })

    const totalJobs = await prisma.jobs.count()

    return NextResponse.json({
        data:jobs,
        pagination:{
            total:totalJobs,
            page,
            limit,
            totalPages:Math.ceil(totalJobs/limit)
        }
    })
    
 } catch (error) {
    console.log(error);
    return NextResponse.json({error:"Something went wrong"})
    
 }
}
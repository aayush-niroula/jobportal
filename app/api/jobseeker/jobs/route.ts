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
            created_at:"desc"
        },
        include:{
            facilitator:true,
            category:true,
            bookmarks:true
        }
    })
    const jobWithBookMark = jobs.map(job =>({
        ...job,
        isBookmarked:job.bookmarks.length > 0
    }))

    const totalJobs = await prisma.jobs.count()

    return NextResponse.json({
        data:jobWithBookMark,
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
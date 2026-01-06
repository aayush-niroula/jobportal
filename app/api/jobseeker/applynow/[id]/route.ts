import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string }
}
export async function GET(req:NextRequest,{params}:Params){
    const resolvedParams = await params;
    const id = resolvedParams.id
    console.log("Backend",resolvedParams);
    
    try {
        const jobs = await prisma.jobs.findUnique({
            where:{
                id:id
            },
            include:{
                facilitator:true,
                applications:true,
                category:true
            }
        })

        if(!jobs){
            return NextResponse.json({error:"Job not found"})
        }

        return NextResponse.json({"message":"Jobs fetched successfully",jobs})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong"})
        
    }

}
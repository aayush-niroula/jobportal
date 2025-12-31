import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string }
}
export async function GET(req:NextRequest,{params}:Params) {
   
   const resolvedParams = await params;
   const id = resolvedParams.id;
   console.log(id);
   
    
    
    try {
    const candidate = await prisma.jobSeeker.findUnique({
        where:{id },
        include:{
            user:true,
            educations:true,
            experiences:true,
        }
    })

    if(!candidate){
        return NextResponse.json({message:"Candidate not found"})
    }

    return NextResponse.json(candidate)
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal Server error"},{status:500})
    }

}
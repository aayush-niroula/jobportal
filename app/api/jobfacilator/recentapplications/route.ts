import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest) {
    
    const auth = await authenticate(req)
    if(!auth || "userId" in auth === false) return NextResponse.json({error:"UnAuthorized"})

    try {

        const facilitator = await prisma.jobFacilitator.findUnique({
            where:{
                user_id:auth.userId
            }
        })
     const application = await prisma.applications.findMany({
        where:{
            job:{
                facilitator_id:facilitator?.id
            },
        },
        include:{
         seeker:{
            include:{
                user:true
            }
         },
         job:true
        }
    })

    if(!application){
        return NextResponse.json({"message":"Applications not found"})
    }

    return NextResponse.json(application)
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong"})
        
    }
}
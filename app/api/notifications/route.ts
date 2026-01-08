import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    
    const auth = await authenticate(req)
    if(!auth || "userId" in auth === false) return 

    const user_id = auth.userId
    try {
     const body = await req.json();
    const {message, type } = body;

    const notification = await prisma.notifications.create({
        data:{
            user_id,
            message,
            type,
        }
    })

    return NextResponse.json({ notification });


    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong "})
        
    }
}


export async function GET(req:NextRequest) {
    const auth = await authenticate(req)
    if(!auth || "userId" in auth === false) return 

    const user_id = auth.userId

    const notification = await prisma.notifications.findMany({
        where:{
            user_id:user_id
        },
        include:{
            user:true
        },
        orderBy:{
            created_at:"desc"
        }
    })

    return NextResponse.json(notification)
}
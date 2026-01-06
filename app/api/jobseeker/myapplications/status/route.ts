import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req:NextRequest) {
    const auth = await authenticate(req)
    if(!auth || "userId" in auth === false) return auth

   try {
     const {applicationId,status} = await req.json();
 
     if(!applicationId || !status){
         return NextResponse.json({error:"Somefield is missing"})
     }
 
     const validStatuses = ["PENDING", "SCREENING", "REJECTED", "INTERVIEW"];
     if (!validStatuses.includes(status)) {
       return NextResponse.json({ error: "Invalid status" }, { status: 400 });
     }
     const updated = await prisma.applications.update({
         where:{
             id:applicationId
         },
         data:{
             status,
             reviewed_at:new Date()
         }
     })
 
     return NextResponse.json({"message":"Status updated succesfully",updated})
   } catch (error) {
    console.log(error);
    return NextResponse.json({error:"Something went wrong"})    
   }

    
} 

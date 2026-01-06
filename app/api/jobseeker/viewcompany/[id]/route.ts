import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string }
}
export async function GET(req:NextRequest,{params}:Params) {
    const resolvedParams = await params;
    const facilitator_id = resolvedParams.id;

   if(!facilitator_id){
    return NextResponse.json({error:"Facilator id is required"})
   }

try {
    
       const company = await prisma.jobFacilitator.findUnique({
        where:{
            id:facilitator_id
        },
        select:{
            id:true,
            company_description:true,
            company_email:true,
            company_location_link:true,
            gallery_images:true,
            company_logo:true,
            company_name:true,
            company_size:true,
            created_at:true,
            department:true,
            location:true,
            features:true,
            founded_year:true,
            industry:true,
            website_link:true,
            jobs:{
                select:{
                    id:true
                }
            }
            
    
        },
         
       })
    
       if(!company){
        return NextResponse.json({"message":"Company Not found"})
       }
    
    
       return NextResponse.json({"message":"Company fetched successfully",company})
    
} catch (error) {
    console.log(error);
    return NextResponse.json({error:"Something went wrong"})
    
}
    


}
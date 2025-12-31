import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const auth = await authenticate(req)
    if(!auth || "userId" in auth === false) return auth

    try {
        const body = await req.json()
        const {category_name,description}= body

        if(!category_name) return NextResponse.json({error:"Category Name is required"})

        const exisitingCategory = await prisma.job_Category.findUnique({
            where:{
                category_name
            }
        })
        if(exisitingCategory) return NextResponse.json({error:"Category with this name already exists"})

        const newCategory = await prisma.job_Category.create({
            data:{
                category_name,
                description
            }
        })
        return NextResponse.json({message:"Category created",category:newCategory},{status:201})
    } catch (error) {
        
    }
}

export async function GET() {
  try {
    const categories = await prisma.job_Category.findMany({
      select: { id: true, category_name: true },
    });
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
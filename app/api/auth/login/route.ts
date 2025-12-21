import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req:NextRequest){
    try {
    const body = await req.json()
    const {email,password,role_name}= body;

    if(!email || !password || !role_name){
        return NextResponse.json({error:"Missing fielda are required"})
    }
 

    const user = await prisma.user.findUnique({
        where:{email:email},
       include:{role:true}
    })
    
    
    if(!user){
        return NextResponse.json({error:"User not found"})
    }

    if (!user.password) {
        return NextResponse.json({error:"Invalid credentials"})
    }
    if(user.role.role_name!== role_name){
        return NextResponse.json({error:"Role name not matched"})
    }
    
    const checkpassword = await bcrypt.compare(password, user.password)

    if(!checkpassword){
        return NextResponse.json({error:"Your entered password is incorrect"})
    }

     const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!,{
        expiresIn:'1h'
     })
    
    return NextResponse.json({token,user:{id:user.id,email:user.email,name:user.name,role:user.role.role_name}})



        
    } catch (error) {
        console.log(error);
        
    }
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const candidates = await prisma.jobSeeker.findMany({
       include:{
        user:true,
        educations:true,
        experiences:true
       }
    });
    return NextResponse.json({ candidates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching candidates" },
      { status: 500 }
    );
  }
}


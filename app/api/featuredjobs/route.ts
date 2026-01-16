import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
   
    const featuredJobs = await prisma.jobs.findMany({
      where: {},
      orderBy: { views: "desc" },
      take: 5,  
    });

  
    await prisma.jobs.updateMany({
      where: { id: { in: featuredJobs.map(j => j.id) } },
      data: { is_featured: true },
    });

    return NextResponse.json({ featuredJobs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch featured jobs" }, { status: 500 });
  }
}

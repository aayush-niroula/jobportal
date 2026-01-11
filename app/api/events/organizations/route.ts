import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orgs = await prisma.jobFacilitator.findMany({
      select: {
        id: true,
        company_name: true,
        company_logo: true,
        _count: {
          select: { events: true },
        },
      },
      orderBy: {
        events: { _count: "desc" },
      },
      take: 4,
    });

    return NextResponse.json(orgs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

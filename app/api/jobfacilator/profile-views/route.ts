
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await authenticate(req);

    if (!auth || !("userId" in auth)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

 
    const facilitator = await prisma.jobFacilitator.findUnique({
      where: { user_id: auth.userId },
      select: { profile_views: true },
    });

    if (!facilitator) {
      return NextResponse.json({ error: "Facilitator not found" }, { status: 404 });
    }


    return NextResponse.json({ profileViews: facilitator.profile_views ?? 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch profile views" }, { status: 500 });
  }
}

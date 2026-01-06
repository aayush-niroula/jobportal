import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.jobSeeker.findUnique({
      where: {
        user_id: auth.userId,
      },
      select: {
        resume_url: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}

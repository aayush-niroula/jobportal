import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/app/utils/auth";

export async function PATCH(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const notifications = await prisma.notifications.updateMany({
      where: { user_id: auth.userId },
      data: { is_read: true },
    });
    return NextResponse.json(notifications);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to mark all as read" }, { status: 500 });
  }
}

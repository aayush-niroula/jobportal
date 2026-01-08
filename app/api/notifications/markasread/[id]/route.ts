import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
 const resolvedParams = await params
 const id = resolvedParams.id

  try {
    const notification = await prisma.notifications.update({
      where: { id },
      data: { is_read: true },
    });
    return NextResponse.json(notification);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const resolvedParams = await params
 const id = resolvedParams.id

  try {
    await prisma.notifications.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}

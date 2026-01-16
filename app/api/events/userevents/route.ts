import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);


  if (!auth || "userId" in auth === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const facilitator = await prisma.jobFacilitator.findUnique({
    where: { user_id: auth.userId },
  });

  if (!facilitator) {
    return NextResponse.json(
      { error: "Only facilitators allowed" },
      { status: 403 }
    );
  }

 
  const events = await prisma.events.findMany({
    include: { facilitator: true, registrations: true },
    orderBy: { date: "asc" },
  });

 
  const marked = events.map((ev) => ({
    ...ev,
    isMine: ev.facilitator_id === facilitator.id,
  }));

  return NextResponse.json({ events: marked });
}

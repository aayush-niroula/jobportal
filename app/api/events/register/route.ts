import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const existing = await prisma.eventRegistrations.findUnique({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: auth.userId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Already registered" }, { status: 400 });
    }

    const seeker = await prisma.jobSeeker.findUnique({ where: { user_id: auth.userId } });
    const facilitator = await prisma.jobFacilitator.findUnique({ where: { user_id: auth.userId } });

    const role = seeker ? "JobSeeker" : facilitator ? "Facilitator" : "User";

    const registration = await prisma.eventRegistrations.create({
      data: {
        event_id: eventId,
        user_id: auth.userId,
        role,
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { eventId, ...updateData } = body;

    if (!eventId) return NextResponse.json({ error: "Event ID required" }, { status: 400 });

    const event = await prisma.events.findUnique({ where: { id: eventId } });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

   
    const facilitator = await prisma.jobFacilitator.findUnique({ where: { user_id: auth.userId } });

    if (!facilitator || facilitator.id !== event.facilitator_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedEvent = await prisma.events.update({
      where: { id: eventId },
      data: {
        ...updateData,
        date: updateData.date ? new Date(updateData.date) : undefined,
        capacity: updateData.capacity ? Number(updateData.capacity) : undefined,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { eventId } = await req.json();
    if (!eventId) return NextResponse.json({ error: "Event ID required" }, { status: 400 });

    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const facilitator = await prisma.jobFacilitator.findUnique({ where: { user_id: auth.userId } });

    if (!facilitator || facilitator.id !== event.facilitator_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.events.delete({ where: { id: eventId } });
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
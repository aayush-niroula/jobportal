import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    
    const auth = await authenticate(req)
        if(!auth || "userId" in auth === false) return NextResponse.json({error:"UnAuthorized"},{status:401})

   
    try {
    const facilitator = await prisma.jobFacilitator.findUnique({
        where:{
            user_id:auth.userId
        }
    })
     if (!facilitator) {
      return NextResponse.json(
        { error: "Only facilitators can post events" },
        { status: 403 }
      );
    }


    const body = await req.json();
      const event = await prisma.events.create({
      data: {
      facilitator_id: facilitator?.id,
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      time: body.time,
      location: body.location,
      capacity: Number(body.capacity),
      duration: body.duration,
      category: body.category,
      price: body.price,
      prerequisites: body.prerequisites,
      whatYouWillLearn: body.whatYouWillLearn,
      requirments: body.requirments,
      image_url: body.image_url,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
   catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong"})
    }
}



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const date = searchParams.get("date");

  const events = await prisma.events.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        category ? { category } : {},
        location ? { location } : {},
        date ? { date: new Date(date) } : {},
      ],
    },
    include: {
      facilitator: true,
      registrations: true,
    },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(events);
}

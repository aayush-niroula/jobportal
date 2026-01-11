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
      field:body.field,
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
  const field = searchParams.get("field");
  const page = Number(searchParams.get("page") || 1);
  const limit = 5;
  const skip = (page - 1) * limit;

 
  const where: any = {
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      category ? { category: { equals: category, mode: "insensitive" } } : undefined,
      field ? { field: { equals: field, mode: "insensitive" } } : undefined,
      location ? { location: { contains: location, mode: "insensitive" } } : undefined,
      date ? { date: new Date(date) } : undefined,
    ].filter(Boolean),
  };

  const [events, total, categoryCountsRaw, fieldCountsRaw] = await Promise.all([
    prisma.events.findMany({
      where,
      include: { facilitator: true, registrations: true },
      orderBy: { date: "asc" },
      skip,
      take: limit,
    }),
    prisma.events.count({ where }),
    prisma.events.groupBy({
      by: ["category"],
      _count: { category: true },
    }),
    prisma.events.groupBy({
      by: ["field"],
      _count: { field: true },
    }),
  ]);

  const categoryCounts = categoryCountsRaw.reduce(
    (acc, c) => ({ ...acc, [c.category]: c._count.category }),
    {}
  );

 const fieldCounts = fieldCountsRaw.reduce(
    (acc: Record<string, number>, f) => {
      if (f.field) acc[f.field] = f._count.field;
      return acc;
    },
    {}
  );

  return NextResponse.json({
    events,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    categoryCounts,
    fieldCounts,
  });
}


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

interface Params {
  params: { id: string }
}
export async function GET(req: NextRequest,{params}:Params) {

const resolvedParams = await params
const userId = resolvedParams.id

  const facilitator = await prisma.jobFacilitator.findUnique({
    where:{
      user_id:userId
    }
  })

   if (!facilitator) {
      return NextResponse.json(
        { error: "Facilitator profile not found" },
        { status: 404 }
      );
    }

  try {
    const jobs = await prisma.jobs.findMany({
      where: {
      facilitator_id:facilitator?.id
      },
      include: {
        category: true,
        facilitator: true,
        applications: {
          include: {
            seeker:{
              include:{
                user:true
              }
            }
          },
        },
      },
    });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

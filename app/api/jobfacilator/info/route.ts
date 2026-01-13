import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const facilitator = await prisma.jobFacilitator.findUnique({
      where: { user_id: auth.userId },
      select: {
        id: true,
        company_name: true,
        company_email: true,
        company_phone: true,
        location: true,
        website_link: true,
      },
    });

    if (!facilitator) {
      return NextResponse.json({ error: "Facilitator not found" }, { status: 404 });
    }


    const verification = await prisma.facilitator_verification.findUnique({
      where: { facilitator_id: facilitator.id },
      select: {
        document_url: true,
        status: true,
        registration_no: true,
      },
    });

    return NextResponse.json({
      id: facilitator.id,
      company_name: facilitator.company_name,
      registration_no: verification?.registration_no,
      email: facilitator.company_email,
      phone: facilitator.company_phone,
      address: facilitator.location,
      website: facilitator.website_link,
      document_url: verification?.document_url || "",
      status: verification?.status || "pending",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch facilitator info" }, { status: 500 });
  }
}

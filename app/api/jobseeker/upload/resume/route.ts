import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json({ message: "File and userId are required" }, { status: 400 });
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json({ message: "Only PDF files allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "job-portal/resumes",
          public_id: `${userId}-resume`,
          overwrite: true,
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    const role = await prisma.role.findUnique({ where: { role_name: "JobSeeker" } });
    if (!role) return NextResponse.json({ error: "JobSeeker role not found" }, { status: 400 });
    const jobSeekerRoleId = role.id;

    const updated = await prisma.jobSeeker.upsert({
  where: { user_id: userId },
  update: {
    resume_url: uploadResult.secure_url,
  },
  create: {
    user_id: userId,
    role_id: jobSeekerRoleId,
    resume_url: uploadResult.secure_url,
  },
});

    return NextResponse.json({ message: "Resume uploaded", url: uploadResult.secure_url }, { status: 200 });

  } catch (error) {
    console.error("Resume Upload Error:", error);
    return NextResponse.json({ message: "Failed to upload resume" }, { status: 500 });
  }
}

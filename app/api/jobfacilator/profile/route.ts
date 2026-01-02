
import { authenticate } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(req: NextRequest) {

  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) return auth;
  const userId = auth.userId;

  try {
    const formData = await req.formData();
    const company_name = formData.get("company_name")?.toString();
    const company_email = formData.get("company_email")?.toString();
    const phone = formData.get("phone")?.toString();
    const industry = formData.get("industry")?.toString();
    const department = formData.get("department")?.toString();
    const company_size = formData.get("company_size")?.toString();
    const founded_year = formData.get("founded_year") ? Number(formData.get("founded_year")) : undefined;
    const location = formData.get("location")?.toString();
    const company_location_link = formData.get("company_location_link")?.toString();
    const website_link = formData.get("website_link")?.toString();
    const company_description = formData.get("company_description")?.toString();
    const features = formData.get("features")?.toString()?.split(",").map(f => f.trim());


    let company_logo: string | undefined;
    const logoFile = formData.get("company_logo") as File | null;
    if (logoFile && logoFile.size > 0) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      company_logo = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "company_logos" },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    }


    let gallery_images: string[] | undefined;
    const galleryFiles = formData.getAll("gallery_images") as File[];
    if (galleryFiles.length > 0) {
      gallery_images = [];
      for (const file of galleryFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "company_gallery" },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(buffer);
        });
        gallery_images.push(url);
      }
    }

    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      select: { role_id: true },
    });
    if (!userRecord?.role_id) {
      return NextResponse.json({ error: "User role not found" }, { status: 400 });
    }

    const existingProfile = await prisma.jobFacilitator.findUnique({
      where: { user_id: userId },
    });

  
    const updateData: any = {};
    if (company_name) updateData.company_name = company_name;
    if (company_email) updateData.company_email = company_email;
    if (company_logo) updateData.company_logo = company_logo;
    if (gallery_images && gallery_images.length > 0) updateData.gallery_images = gallery_images;
    if (location) updateData.location = location;
    if (company_location_link) updateData.company_location_link = company_location_link;
    if (website_link) updateData.website_link = website_link;
    if (features) updateData.features = features;
    if (company_description) updateData.company_description = company_description;
    if (department) updateData.department = department;
    if (industry) updateData.industry = industry;
    if (company_size) updateData.company_size = company_size;
    if (founded_year) updateData.founded_year = founded_year;
    if (phone) updateData.phone = phone;

    const createData = {
      user_id: userId,
      role_id: userRecord.role_id,
      company_name: company_name || existingProfile?.company_name || "Default Company Name",
      company_email: company_email || existingProfile?.company_email || "email@company.com",
      company_logo: company_logo || existingProfile?.company_logo || "",
      gallery_images: gallery_images || existingProfile?.gallery_images || [],
      location: location || existingProfile?.location || "",
      company_location_link: company_location_link || existingProfile?.company_location_link || "",
      website_link: website_link || existingProfile?.website_link || "",
      features: features || existingProfile?.features || [],
      company_description: company_description || existingProfile?.company_description || "No description",
      department: department || existingProfile?.department || "",
      industry: industry || existingProfile?.industry || "",
      company_size: company_size || existingProfile?.company_size || "",
      founded_year: founded_year || existingProfile?.founded_year || 2000,

    };


    const updatedProfile = await prisma.jobFacilitator.upsert({
      where: { user_id: userId },
      update: updateData,
      create: createData,
    });

    return NextResponse.json({ message: "Profile updated successfully", data: updatedProfile });

  } catch (error: any) {
    console.error("Update company profile error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}




export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || "userId" in auth === false) return auth;

  const userId = auth.userId;

  try {
    const profile = await prisma.jobFacilitator.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found", data: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Profile fetched successfully", data: profile },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get company profile error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

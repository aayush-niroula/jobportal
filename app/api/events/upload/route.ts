import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/app/utils/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!auth || !("userId" in auth))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { file } = await req.json(); // expects base64 string: "data:image/png;base64,..."
    if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });

    const matches = file.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) return NextResponse.json({ error: "Invalid file format" }, { status: 400 });

    const [, mimeType, base64Data] = matches;
    const buffer = Buffer.from(base64Data, "base64");

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "job-portal/event-images",
          public_id: `${auth.userId}-${Date.now()}`,
          resource_type: "image",
          overwrite: true,
          format: mimeType.split("/")[1],
          transformation: [{ width: 800, height: 600, crop: "fill" }],
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

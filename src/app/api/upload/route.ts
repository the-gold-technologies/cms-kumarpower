import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

function uploadBufferToCloudinary(buffer: Buffer, options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const uploadedFiles: string[] = [];

    for (const [, value] of formData.entries()) {
      const file = value as File;
      if (file && typeof file === "object" && file.name) {
        if (file.size > MAX_FILE_SIZE) {
          const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
          return NextResponse.json(
            {
              success: false,
              error: `File size is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`,
            },
            { status: 400 },
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const isPdf =
          file.type.includes("pdf") || file.name.toLowerCase().endsWith(".pdf");
        const isVideo =
          file.type.includes("video") ||
          !!file.name.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i);
        const resourceType = isPdf ? "raw" : isVideo ? "video" : "auto";

        const uploadResponse = await uploadBufferToCloudinary(buffer, {
          folder: "KumarPower-Assets",
          resource_type: resourceType,
        });

        uploadedFiles.push(uploadResponse.secure_url);
      }
    }

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: `Upload Failed: ${error.message}` },
      { status: 500 },
    );
  }
}

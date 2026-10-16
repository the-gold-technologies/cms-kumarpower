import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";
const MAX_ADMIN_FILE_SIZE = 100 * 1024 * 1024; // 100MB for authenticated admin
const MAX_PUBLIC_RESUME_SIZE = 5 * 1024 * 1024; // 5MB limit for public resumes

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
    // Check authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const isAuthenticated = AUTH_TOKEN !== "" && (authToken === AUTH_TOKEN || bearerToken === AUTH_TOKEN);

    const formData = await req.formData();
    const uploadedFiles: string[] = [];

    for (const [, value] of formData.entries()) {
      const file = value as File;
      if (file && typeof file === "object" && file.name) {
        const isPdf = file.type.includes("pdf") || file.name.toLowerCase().endsWith(".pdf");
        const isDoc = file.name.toLowerCase().match(/\.(docx?|rtf|txt)$/i);
        const isResumeDoc = isPdf || !!isDoc;

        // Security check for unauthenticated public uploads
        if (!isAuthenticated) {
          if (!isResumeDoc) {
            return NextResponse.json(
              {
                success: false,
                error: "Unauthorized: Public uploads are strictly limited to resume documents (.pdf, .doc, .docx).",
              },
              { status: 403 }
            );
          }
          if (file.size > MAX_PUBLIC_RESUME_SIZE) {
            return NextResponse.json(
              {
                success: false,
                error: "File size too large: Public resume uploads must be under 5MB.",
              },
              { status: 400 }
            );
          }
        }

        // Size check for authenticated admin
        if (file.size > MAX_ADMIN_FILE_SIZE) {
          const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
          return NextResponse.json(
            {
              success: false,
              error: `File size is too big (${sizeMb}MB). Maximum allowed limit is 100MB.`,
            },
            { status: 400 }
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const isVideo =
          file.type.includes("video") ||
          !!file.name.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i);
        const resourceType = isResumeDoc ? "raw" : isVideo ? "video" : "auto";

        const uploadOptions: Record<string, any> = {
          folder: "KumarPower-Assets",
          resource_type: resourceType,
        };

        // Incoming transformation for images to prevent oversized raw uploads
        if (resourceType === "auto") {
          uploadOptions.transformation = [
            { width: 2400, crop: "limit", quality: "auto:good", fetch_format: "auto" }
          ];
        } else if (resourceType === "video") {
          uploadOptions.eager = [
            { width: 1280, crop: "limit", quality: "auto", video_codec: "h264" }
          ];
          uploadOptions.eager_async = true;
        }

        const uploadResponse = await uploadBufferToCloudinary(buffer, uploadOptions);
        uploadedFiles.push(uploadResponse.secure_url);
      }
    }

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: `Upload Failed: ${error.message}` },
      { status: 500 }
    );
  }
}

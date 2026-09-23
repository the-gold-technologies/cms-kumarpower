import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error("Database fetch error (Job Applications):", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message, resumeUrl } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Full name, email and phone number are required." },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        id: `app-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message ? message.trim() : null,
        resumeUrl: resumeUrl || null,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error("Database save error (Job Application):", error);
    return NextResponse.json({ success: false, message: "Failed to save application." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "id and status are required." },
        { status: 400 }
      );
    }

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Database update error (Job Application):", error);
    return NextResponse.json({ success: false, message: "Failed to update status." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idFromQuery = searchParams.get("id");
    let id = idFromQuery;

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // body might be empty
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "id is required." }, { status: 400 });
    }

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Application deleted successfully." });
  } catch (error) {
    console.error("Database delete error (Job Application):", error);
    return NextResponse.json({ success: false, message: "Failed to delete application." }, { status: 500 });
  }
}

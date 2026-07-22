import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: enquiries, leads: enquiries });
  } catch (error) {
    console.error("Database fetch error for leads:", error);
    return NextResponse.json({ success: false, data: [], leads: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enquiry = await prisma.enquiry.create({
      data: {
        id: `lead-${Date.now()}`,
        name: body.name || "Anonymous Client",
        email: body.email || "client@example.com",
        phone: body.phone || "+91 98110 00000",
        company: body.company || "N/A",
        interestedIn: body.interestedIn || body.service || "General Lead",
        message: body.message || "",
        status: "New",
      },
    });
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Database save error for leads:", error);
    return NextResponse.json({ success: false, message: "Database save error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "id and status required" }, { status: 400 });
    }
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Database update error for leads:", error);
    return NextResponse.json({ success: false, message: "Database update error" }, { status: 500 });
  }
}

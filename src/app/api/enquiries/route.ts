import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enquiry = await prisma.enquiry.create({
      data: {
        id: `enq-${Date.now()}`,
        name: body.name || "Anonymous Client",
        email: body.email || "client@example.com",
        phone: body.phone || "+91 98110 00000",
        company: body.company || "N/A",
        interestedIn: body.interestedIn || "General Inquiry",
        message: body.message || "",
        status: "New",
      },
    });
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json({ success: false, message: "Database save error" }, { status: 500 });
  }
}

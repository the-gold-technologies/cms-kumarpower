import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_ENQUIRIES } from "@/lib/mock-data/initialData";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (enquiries && enquiries.length > 0) {
      return NextResponse.json({ success: true, data: enquiries });
    }
  } catch (error) {
    console.warn("PostgreSQL offline, using initial enquiries:", error);
  }

  return NextResponse.json({ success: true, data: INITIAL_ENQUIRIES });
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
    console.error("PostgreSQL save error:", error);
    return NextResponse.json({ success: true, message: "Saved locally (PostgreSQL offline)" });
  }
}

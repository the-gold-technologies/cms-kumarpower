import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const navLinks = await prisma.navLink.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: navLinks });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (Array.isArray(body)) {
      for (const item of body) {
        await prisma.navLink.upsert({
          where: { id: item.id },
          update: { ...item },
          create: { ...item },
        });
      }
    }
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json({ success: false, message: "Database save error" }, { status: 500 });
  }
}

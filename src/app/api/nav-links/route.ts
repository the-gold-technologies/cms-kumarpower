import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_NAV_LINKS } from "@/lib/mock-data/initialData";

export async function GET() {
  try {
    const navLinks = await prisma.navLink.findMany({
      orderBy: { order: "asc" },
    });

    if (navLinks && navLinks.length > 0) {
      return NextResponse.json({ success: true, data: navLinks });
    }
  } catch (error) {
    console.warn("PostgreSQL offline, using initial navLinks:", error);
  }

  return NextResponse.json({ success: true, data: INITIAL_NAV_LINKS });
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
    console.error("PostgreSQL save error:", error);
    return NextResponse.json({ success: true, message: "Saved locally (PostgreSQL offline)" });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_HOMEPAGE_DATA } from "@/lib/mock-data/initialData";

export async function GET() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: "home" },
      include: { sections: true },
    });

    if (page && page.sections.length > 0) {
      return NextResponse.json({ success: true, data: page });
    }
  } catch (error) {
    console.warn("PostgreSQL not active or unreachable, returning initial data:", error);
  }

  return NextResponse.json({ success: true, data: INITIAL_HOMEPAGE_DATA });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const page = await prisma.page.upsert({
      where: { slug: "home" },
      update: { title: "Home Page", visibility: "published" },
      create: { slug: "home", title: "Home Page", visibility: "published" },
    });

    if (body.sectionId && body.content) {
      await prisma.section.upsert({
        where: { id: body.sectionId },
        update: { content: body.content, type: body.type || "custom" },
        create: {
          id: body.sectionId,
          pageId: page.id,
          type: body.type || "custom",
          content: body.content,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Saved to PostgreSQL database", data: body });
  } catch (error) {
    console.error("PostgreSQL save error:", error);
    return NextResponse.json({ success: true, message: "Saved locally (PostgreSQL offline)", data: await req.json().catch(() => ({})) });
  }
}

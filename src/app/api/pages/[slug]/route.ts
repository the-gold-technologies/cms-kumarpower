import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ success: true, data: {} });
    }

    const sectionsMap: Record<string, unknown> = {};
    for (const section of page.sections) {
      sectionsMap[section.type] = section.content;
    }

    return NextResponse.json({ success: true, data: sectionsMap, page });
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return NextResponse.json(
      { success: false, error: "Database query error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const body = await req.json();
    const { section, content } = body;

    if (!section || typeof section !== "string") {
      return NextResponse.json(
        { success: false, error: "'section' (string) is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "'content' (object) is required" },
        { status: 400 }
      );
    }

    const page = await prisma.page.upsert({
      where: { slug },
      create: {
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug,
        type: "standard",
        visibility: "published",
      },
      update: {},
    });

    const existingSection = await prisma.section.findFirst({
      where: { pageId: page.id, type: section },
    });

    let savedSection;
    if (existingSection) {
      savedSection = await prisma.section.update({
        where: { id: existingSection.id },
        data: { content },
      });
    } else {
      const sectionCount = await prisma.section.count({
        where: { pageId: page.id },
      });
      savedSection = await prisma.section.create({
        data: {
          id: `sec-${slug}-${section}`,
          pageId: page.id,
          type: section,
          content,
          order: sectionCount + 1,
        },
      });
    }

    return NextResponse.json({ success: true, data: savedSection });
  } catch (error) {
    console.error(`Error saving page ${slug}:`, error);
    return NextResponse.json(
      { success: false, error: "Database save error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const PAGE_SLUG = "servo-stabilizer";

export async function GET() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: PAGE_SLUG },
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

    return NextResponse.json({ success: true, data: sectionsMap, page: page ? { metaTitle: page.metaTitle, metaDescription: page.metaDescription, keywords: page.keywords, canonicalUrl: page.canonicalUrl, noIndex: page.noIndex, ogTitle: page.ogTitle, ogDescription: page.ogDescription, ogImage: page.ogImage, schema: page.schema, headingOptions: page.headingOptions } : undefined });
  } catch (error) {
    console.error("Error fetching servo-stabilizer content:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { section, content } = body;

    const sectionType = section || body.type || PAGE_SLUG;
    const sectionContent = content !== undefined ? content : body;

    const page = await prisma.page.upsert({
      where: { slug: PAGE_SLUG },
      create: {
        title: "Servo Voltage Stabilizers",
        slug: PAGE_SLUG,
        type: "static",
        visibility: "published",
      },
      update: {},
    });

    const existingSection = await prisma.section.findFirst({
      where: { pageId: page.id, type: sectionType },
    });

    let savedSection;
    if (existingSection) {
      savedSection = await prisma.section.update({
        where: { id: existingSection.id },
        data: { content: sectionContent },
      });
    } else {
      const sectionCount = await prisma.section.count({
        where: { pageId: page.id },
      });
      savedSection = await prisma.section.create({
        data: {
          pageId: page.id,
          type: sectionType,
          content: sectionContent,
          order: sectionCount,
        },
      });
    }

    return NextResponse.json({ success: true, data: savedSection });
  } catch (error) {
    console.error("Error saving servo-stabilizer section:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return PUT(request);
}

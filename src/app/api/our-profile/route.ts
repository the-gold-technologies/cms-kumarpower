import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const PAGE_SLUG = "our-profile";

export async function GET() {
  try {
    const page = await prisma.page.findFirst({
      where: {
        OR: [{ slug: "our-profile" }, { slug: "about" }],
      },
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

    return NextResponse.json({ success: true, data: sectionsMap });
  } catch (error) {
    console.error("Error fetching our-profile page content:", error);
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

    const sectionType = section || body.type;
    const sectionContent = content !== undefined ? content : body;

    if (!sectionType || typeof sectionType !== "string") {
      return NextResponse.json(
        { success: false, error: "'section' string is required" },
        { status: 400 }
      );
    }

    let page = await prisma.page.findFirst({
      where: {
        OR: [{ slug: "our-profile" }, { slug: "about" }],
      },
    });

    if (!page) {
      page = await prisma.page.create({
        data: {
          title: "Our Profile",
          slug: PAGE_SLUG,
          type: "static",
          visibility: "published",
        },
      });
    }

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
    console.error("Error saving our-profile page section:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return PUT(request);
}

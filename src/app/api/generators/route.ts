import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const PAGE_SLUG = "generators";
const FALLBACK_SLUG = "kirloskar-diesel-generator";

export async function GET() {
  try {
    let page = await prisma.page.findUnique({
      where: { slug: PAGE_SLUG },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page || !page.sections || page.sections.length === 0) {
      page = await prisma.page.findUnique({
        where: { slug: FALLBACK_SLUG },
        include: {
          sections: {
            orderBy: { order: "asc" },
          },
        },
      });
    }

    if (!page) {
      return NextResponse.json({ success: true, data: {} });
    }

    const sectionsMap: Record<string, unknown> = {};
    for (const section of page.sections) {
      sectionsMap[section.type] = section.content;
    }

    return NextResponse.json({
      success: true,
      data: sectionsMap,
      page: page
        ? {
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            keywords: page.keywords,
            canonicalUrl: page.canonicalUrl,
            noIndex: page.noIndex,
            ogTitle: page.ogTitle,
            ogDescription: page.ogDescription,
            ogImage: page.ogImage,
            schema: page.schema,
            headingOptions: page.headingOptions,
          }
        : undefined,
    });
  } catch (error) {
    console.error("Error fetching generators content:", error);
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
        title: "Generators",
        slug: PAGE_SLUG,
        type: "static",
        visibility: "published",
      },
      update: {},
    });

    const existingSection = await prisma.section.findFirst({
      where: { pageId: page.id, type: sectionType },
    });

    let finalContent = sectionContent;
    if (
      existingSection &&
      typeof existingSection.content === "object" &&
      existingSection.content !== null &&
      !Array.isArray(existingSection.content) &&
      typeof sectionContent === "object" &&
      sectionContent !== null &&
      !Array.isArray(sectionContent)
    ) {
      finalContent = {
        ...(existingSection.content as Record<string, unknown>),
        ...sectionContent,
      };
    }

    let savedSection;
    if (existingSection) {
      savedSection = await prisma.section.update({
        where: { id: existingSection.id },
        data: { content: finalContent },
      });
    } else {
      const sectionCount = await prisma.section.count({
        where: { pageId: page.id },
      });
      savedSection = await prisma.section.create({
        data: {
          pageId: page.id,
          type: sectionType,
          content: finalContent,
          order: sectionCount,
        },
      });
    }

    try {
      const fallbackPage = await prisma.page.upsert({
        where: { slug: FALLBACK_SLUG },
        create: {
          title: "Generators",
          slug: FALLBACK_SLUG,
          type: "static",
          visibility: "published",
        },
        update: {},
      });

      const existingFallbackSection = await prisma.section.findFirst({
        where: { pageId: fallbackPage.id, type: sectionType },
      });

      if (existingFallbackSection) {
        await prisma.section.update({
          where: { id: existingFallbackSection.id },
          data: { content: finalContent },
        });
      } else {
        await prisma.section.create({
          data: {
            pageId: fallbackPage.id,
            type: sectionType,
            content: finalContent,
            order: 0,
          },
        });
      }
    } catch (mirrorErr) {
      console.warn("Could not mirror to fallback page:", mirrorErr);
    }

    return NextResponse.json({ success: true, data: savedSection });
  } catch (error) {
    console.error("Error saving generators section:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return PUT(request);
}

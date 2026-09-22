import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const SLUG = "solar";
const SECTION_TYPE = "solar";

export async function GET() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: SLUG },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      // Fallback default response
      return NextResponse.json({
        success: true,
        data: {
          [SECTION_TYPE]: {
            heroHeadingPart1: "High-Efficiency",
            heroHeadingPart2: "Solar Panels & Systems",
            heroSub: "Tier-1 Mono PERC and TOPCon Bifacial solar photovoltaic panels engineered for commercial, industrial, and residential rooftop clean energy generation.",
            heroBg: "https://res.cloudinary.com/dpa93copz/image/upload/v1790057405/KumarPower-Assets/solar/z9t1nchzpb9zozfilo1g.jpg",
            sectionTitle: "Solar Photovoltaic Panel Range",
            sectionDesc: "Harness clean solar energy with Tier-1 high-efficiency panels engineered for maximum yield, DG synchronization, and seamless integration with Kumar Power BESS.",
            products: [],
          },
        },
      });
    }

    const sectionsMap: Record<string, any> = {};
    for (const sec of page.sections) {
      sectionsMap[sec.type] = sec.content;
    }

    return NextResponse.json({
      success: true,
      data: sectionsMap,
      page: {
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
      },
    });
  } catch (error: any) {
    console.error("GET /api/solar error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { type, content } = body;

    if (!type || !content) {
      return NextResponse.json(
        { success: false, error: "Missing type or content" },
        { status: 400 }
      );
    }

    let page = await prisma.page.findUnique({
      where: { slug: SLUG },
    });

    if (!page) {
      page = await prisma.page.create({
        data: {
          title: "Solar Panels & Systems",
          slug: SLUG,
          description: "High-efficiency Solar Photovoltaic Panels and rooftop systems.",
          visibility: "published",
        },
      });
    }

    const existingSection = await prisma.section.findFirst({
      where: {
        pageId: page.id,
        type: type,
      },
    });

    if (existingSection) {
      await prisma.section.update({
        where: { id: existingSection.id },
        data: { content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: type,
          order: 0,
          content,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error: any) {
    console.error("PUT /api/solar error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

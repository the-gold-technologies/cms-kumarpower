import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    let page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      page = await prisma.page.findUnique({
        where: { slug: `blog/${slug}` },
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
      let secContent: any = section.content;
      // If content was saved as a numeric-keyed object { "0": ..., "1": ... }, convert back to array
      // and auto-repair in the database so production DB is permanently updated
      if (secContent && typeof secContent === "object" && !Array.isArray(secContent)) {
        const keys = Object.keys(secContent);
        if (keys.length > 0 && keys.every((k) => !isNaN(Number(k)))) {
          const arrayContent = Object.values(secContent);
          secContent = arrayContent;
          // Auto-repair database entry in background
          prisma.section
            .update({
              where: { id: section.id },
              data: { content: arrayContent as any },
            })
            .catch((err) => console.error("Auto-heal section error:", err));
        }
      }
      sectionsMap[section.type] = secContent;
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
        { success: false, error: "section (string) is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "content (object or array) is required" },
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
      let newContent: any;
      if (Array.isArray(content)) {
        // If content is an Array, preserve it strictly as an array of objects
        newContent = content;
      } else if (typeof content === "object" && content !== null) {
        const existingContent =
          existingSection.content &&
          typeof existingSection.content === "object" &&
          !Array.isArray(existingSection.content)
            ? (existingSection.content as Record<string, unknown>)
            : {};
        newContent = {
          ...existingContent,
          ...content,
        };
      } else {
        newContent = content;
      }

      savedSection = await prisma.section.update({
        where: { id: existingSection.id },
        data: {
          content: newContent,
        },
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

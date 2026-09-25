import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const PAGE_SLUG = "home";
const SECTION_TYPE = "footer";

// Social link field names stored within the footer section
const SOCIAL_FIELDS = ["linkedinUrl", "youtubeUrl", "instagramUrl", "facebookUrl", "connectTitle"];

export async function GET() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: PAGE_SLUG },
      include: {
        sections: {
          where: { type: SECTION_TYPE },
        },
      },
    });

    const footerContent = (page?.sections?.[0]?.content as Record<string, any>) || {};

    const socialLinks: Record<string, string> = {};
    for (const field of SOCIAL_FIELDS) {
      socialLinks[field] = footerContent[field] || "";
    }

    return NextResponse.json({ success: true, data: socialLinks });
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json({ success: false, data: {} }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Only pick the social fields from body
    const socialData: Record<string, string> = {};
    for (const field of SOCIAL_FIELDS) {
      if (body[field] !== undefined) {
        socialData[field] = body[field];
      }
    }

    // Get or create the home page
    const page = await prisma.page.upsert({
      where: { slug: PAGE_SLUG },
      create: {
        title: "Home",
        slug: PAGE_SLUG,
        type: "static",
        visibility: "published",
      },
      update: {},
    });

    // Find existing footer section
    const existingSection = await prisma.section.findFirst({
      where: { pageId: page.id, type: SECTION_TYPE },
    });

    if (existingSection) {
      // Merge social fields into existing footer content
      const existingContent = (existingSection.content as Record<string, any>) || {};
      const merged = { ...existingContent, ...socialData };

      await prisma.section.update({
        where: { id: existingSection.id },
        data: { content: merged },
      });
    } else {
      // Create footer section with just social fields
      const sectionCount = await prisma.section.count({ where: { pageId: page.id } });
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: SECTION_TYPE,
          content: socialData,
          order: sectionCount,
        },
      });
    }

    return NextResponse.json({ success: true, data: socialData });
  } catch (error) {
    console.error("Error saving social links:", error);
    return NextResponse.json({ success: false, message: "Save failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string | string[] }> }
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

    // 1. Try exact match
    let page = await prisma.page.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true,
        canonicalUrl: true,
        noIndex: true,
        ogTitle: true,
        ogDescription: true,
        ogImage: true,
        schema: true,
        headingOptions: true,
      },
    });

    // 2. Fallback to matching last segment of URL (e.g. services/annual-maintenance -> annual-maintenance)
    if (!page && slug.includes("/")) {
      const parts = slug.split("/");
      const lastPart = parts[parts.length - 1];
      page = await prisma.page.findUnique({
        where: { slug: lastPart },
        select: {
          id: true,
          title: true,
          slug: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
          canonicalUrl: true,
          noIndex: true,
          ogTitle: true,
          ogDescription: true,
          ogImage: true,
          schema: true,
          headingOptions: true,
        },
      });
    }

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching page SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string | string[] }> }
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

    const body = await request.json();
    const { seo } = body;

    if (!seo) {
      return NextResponse.json(
        { success: false, error: "SEO data is required" },
        { status: 400 }
      );
    }

    // 1. Resolve slug to target database record
    let targetSlug = slug;
    let existingPage = await prisma.page.findUnique({ where: { slug } });

    if (!existingPage && slug.includes("/")) {
      const parts = slug.split("/");
      const lastPart = parts[parts.length - 1];
      existingPage = await prisma.page.findUnique({ where: { slug: lastPart } });
      if (existingPage) {
        targetSlug = lastPart;
      }
    }

    const updatedPage = await prisma.page.upsert({
      where: { slug: targetSlug },
      update: {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        keywords: seo.targetKeywords || seo.keywords,
        canonicalUrl: seo.canonicalUrl,
        noIndex: seo.noIndex,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImage,
        schema: seo.schema,
        headingOptions: seo.headingOptions,
      },
      create: {
        slug: targetSlug,
        title: seo.metaTitle || targetSlug.charAt(0).toUpperCase() + targetSlug.slice(1),
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        keywords: seo.targetKeywords || seo.keywords,
        canonicalUrl: seo.canonicalUrl,
        noIndex: seo.noIndex || false,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImage,
        schema: seo.schema,
        headingOptions: seo.headingOptions || {},
        visibility: "published",
      },
    });

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error("Error updating page SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

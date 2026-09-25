import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getPageSlugForUrl } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string | string[] }> },
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;
    const canonicalSlug = getPageSlugForUrl(slug);

    let page = await prisma.page.findUnique({
      where: { slug: canonicalSlug },
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

    if (!page && slug !== canonicalSlug) {
      page = await prisma.page.findUnique({
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
    }

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching page SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string | string[] }> },
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;
    const targetSlug = getPageSlugForUrl(slug);

    const body = await request.json();
    const { seo } = body;

    if (!seo) {
      return NextResponse.json(
        { success: false, error: "SEO data is required" },
        { status: 400 },
      );
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
        title:
          seo.metaTitle ||
          targetSlug.charAt(0).toUpperCase() + targetSlug.slice(1),
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        keywords: seo.targetKeywords || seo.keywords,
        canonicalUrl: seo.canonicalUrl,
        noIndex: seo.noIndex || false,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImage,
        schema: seo.schema,
        headingOptions: seo.headingOptions || "h1",
        visibility: "published",
      },
    });

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error("Error updating page SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

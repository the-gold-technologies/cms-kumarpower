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
    const targetSlug = slug.startsWith("blog/")
      ? slug
      : getPageSlugForUrl(slug);

    // 1. Find existing page in database
    let page = await prisma.page.findUnique({
      where: { slug: targetSlug },
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

    if (!page && slug !== targetSlug) {
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

    if (!page && !targetSlug.startsWith("blog/")) {
      page = await prisma.page.findUnique({
        where: { slug: `blog/${targetSlug}` },
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

    if (!page && targetSlug.startsWith("blog/")) {
      const bareSlug = targetSlug.replace(/^blog\//i, "");
      page = await prisma.page.findUnique({
        where: { slug: bareSlug },
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

    // 2. If not found, check if it's a blog post and return empty fields
    if (!page) {
      const cleanSlug = slug
        .replace(/^blog\//i, "")
        .replace(/^\/+|\/+$/g, "")
        .toLowerCase();

      const blogsPage = await prisma.page.findUnique({
        where: { slug: "blogs" },
        include: { sections: true },
      });

      const articlesSection = blogsPage?.sections.find(
        (s: any) => s.type === "articles",
      );

      const rawArticles = Array.isArray(articlesSection?.content)
        ? articlesSection.content
        : typeof articlesSection?.content === "object" &&
            articlesSection?.content !== null
          ? Object.values(articlesSection.content)
          : [];

      const article = (rawArticles as any[]).find((a: any) => {
        if (!a || !a.slug) return false;
        const aSlug = a.slug
          .replace(/^blog\//i, "")
          .replace(/^\/+|\/+$/g, "")
          .toLowerCase();
        return aSlug === cleanSlug;
      });

      if (article) {
        return NextResponse.json({
          success: true,
          data: {
            id: `blog-post-${article.id || cleanSlug}`,
            title: article.title || cleanSlug,
            slug: targetSlug,
            metaTitle: "",
            metaDescription: "",
            keywords: "",
            canonicalUrl: "",
            noIndex: false,
            ogTitle: "",
            ogDescription: "",
            ogImage: "",
            schema: "",
            headingOptions: "h1",
          },
        });
      }
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
    const targetSlug = slug.startsWith("blog/")
      ? slug
      : getPageSlugForUrl(slug);

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
        metaTitle: seo.metaTitle || null,
        metaDescription: seo.metaDescription || null,
        keywords: seo.targetKeywords || seo.keywords || null,
        canonicalUrl: seo.canonicalUrl || null,
        noIndex: seo.noIndex || false,
        ogTitle: seo.ogTitle || null,
        ogDescription: seo.ogDescription || null,
        ogImage: seo.ogImage || null,
        schema: seo.schema || null,
        headingOptions: seo.headingOptions || "h1",
      },
      create: {
        slug: targetSlug,
        title:
          seo.metaTitle ||
          targetSlug.charAt(0).toUpperCase() + targetSlug.slice(1),
        type: targetSlug.startsWith("blog/") ? "blog" : "standard",
        metaTitle: seo.metaTitle || null,
        metaDescription: seo.metaDescription || null,
        keywords: seo.targetKeywords || seo.keywords || null,
        canonicalUrl: seo.canonicalUrl || null,
        noIndex: seo.noIndex || false,
        ogTitle: seo.ogTitle || null,
        ogDescription: seo.ogDescription || null,
        ogImage: seo.ogImage || null,
        schema: seo.schema || null,
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

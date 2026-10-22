import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPageSlugForUrl } from "@/lib/utils";

// Additional pages in footer/site (AMC and Emergency Support removed)
const FOOTER_ADDITIONAL_PAGES = [
  {
    url: "/about/Testimonials",
    label: "Testimonials",
    pageSlug: "testimonials",
  },
  {
    url: "/about/PhotoGallery",
    label: "Photo Gallery",
    pageSlug: "photo-gallery",
  },
  {
    url: "/about/Certifications",
    label: "Certifications & Awards",
    pageSlug: "certifications",
  },
  {
    url: "/services/installation",
    label: "Installation Services",
    pageSlug: "installation",
  },
  {
    url: "/services/repair-overhaul",
    label: "Repair & Overhaul",
    pageSlug: "repair-overhaul",
  },
  {
    url: "/services/annual-maintenance",
    label: "Annual Maintenance Contracts",
    pageSlug: "annual-maintenance",
  },
  {
    url: "/services/emergency-support",
    label: "24/7 Emergency Support",
    pageSlug: "emergency-support",
  },
  {
    url: "/privacy-policy",
    label: "Privacy Policy",
    pageSlug: "privacy-policy",
  },
  {
    url: "/terms-and-conditions",
    label: "Terms & Conditions",
    pageSlug: "terms-and-conditions",
  },
];

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        metaTitle: true,
        metaDescription: true,
        type: true,
        visibility: true,
      },
    });

    const links = await prisma.navLink.findMany({
      orderBy: { order: "asc" },
    });

    // 1. Process Main Navigation Links
    const mainNavData = links.map((link: any) => {
      const canonicalSlug = getPageSlugForUrl(link.url);
      const matchedPage = pages.find(
        (p: any) =>
          p.slug.toLowerCase() === canonicalSlug.toLowerCase() ||
          p.slug.toLowerCase() ===
            link.url.replace(/^\/+|\/+$/g, "").toLowerCase(),
      );

      return {
        id: link.id,
        pageId: matchedPage?.id || null,
        title: link.label,
        slug: link.url === "/" ? "home" : link.url.replace(/^\/+|\/+$/g, ""),
        metaTitle: matchedPage?.metaTitle || null,
        metaDescription: matchedPage?.metaDescription || null,
        type: link.type || matchedPage?.type || "Main Link",
        visibility: matchedPage?.visibility || "published",
        parent: link.parent,
        order: link.order,
        description: link.description,
        navTitle: link.title,
        isStatic: link.isStatic ?? true,
      };
    });

    // 2. Process Blog Articles (as dropdown children under Blogs / Insights)
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
    const articles = (rawArticles as any[]).filter((a: any) => a && a.slug);

    // Find the blogs link in navigation
    const blogsLink = links.find(
      (l: any) =>
        l.url === "/blogs" ||
        l.url === "blogs" ||
        l.label?.toLowerCase() === "insights" ||
        l.label?.toLowerCase() === "blogs",
    );

    const blogParentId = blogsLink ? blogsLink.id : "parent-blogs";

    const blogArticlesData = articles.map((article: any, idx: number) => {
      const cleanSlug = article.slug.replace(/^\/+|\/+$/g, "");
      const blogSlug = `blog/${cleanSlug}`;
      const matchedPage = pages.find(
        (p: any) =>
          p.slug.toLowerCase() === blogSlug.toLowerCase() ||
          p.slug.toLowerCase() === cleanSlug.toLowerCase(),
      );

      return {
        id: `blog-item-${article.id || cleanSlug}`,
        pageId: matchedPage?.id || null,
        title: article.title || cleanSlug,
        slug: blogSlug,
        metaTitle: matchedPage?.metaTitle || null,
        metaDescription: matchedPage?.metaDescription || null,
        type: "Blog Post",
        visibility: article.status === "Published" ? "published" : "draft",
        parent: blogParentId,
        order: idx + 1,
        description: article.excerpt || null,
        navTitle: article.title,
        isStatic: false,
      };
    });

    // Mark the parent blogs link as a Dropdown so it renders with expand/collapse chevron
    if (blogsLink && articles.length > 0) {
      const foundMain = mainNavData.find((m: any) => m.id === blogsLink.id);
      if (foundMain) {
        foundMain.type = "Dropdown";
      }
    } else if (!blogsLink && articles.length > 0) {
      // If no blogs link was in NavLink, create a parent Blogs group row
      const matchedBlogsPage = pages.find((p: any) => p.slug === "blogs");
      mainNavData.push({
        id: "parent-blogs",
        pageId: matchedBlogsPage?.id || null,
        title: "Blogs & Articles",
        slug: "blogs",
        metaTitle: matchedBlogsPage?.metaTitle || null,
        metaDescription: matchedBlogsPage?.metaDescription || null,
        type: "Dropdown",
        visibility: "published",
        parent: "-",
        order: 99,
        description: "Blog Articles and Insights",
        navTitle: "Blogs",
        isStatic: false,
      });
    }

    // 3. Process Footer / Additional Pages at the bottom (excluding AMC & Emergency Support)
    const existingUrls = new Set(links.map((l: any) => l.url.toLowerCase()));
    let nextOrder = links.length + articles.length + 1;

    const footerData: any[] = [];
    for (const item of FOOTER_ADDITIONAL_PAGES) {
      if (!existingUrls.has(item.url.toLowerCase())) {
        const canonicalSlug = getPageSlugForUrl(item.url);
        const matchedPage = pages.find(
          (p: any) =>
            p.slug.toLowerCase() === canonicalSlug.toLowerCase() ||
            p.slug.toLowerCase() === item.pageSlug.toLowerCase(),
        );

        footerData.push({
          id: `footer-${canonicalSlug}`,
          pageId: matchedPage?.id || null,
          title: item.label,
          slug: item.url.replace(/^\/+|\/+$/g, ""),
          metaTitle: matchedPage?.metaTitle || null,
          metaDescription: matchedPage?.metaDescription || null,
          type: "Footer Page",
          visibility: matchedPage?.visibility || "published",
          parent: "-",
          order: nextOrder++,
          description: null,
          navTitle: item.label,
          isStatic: true,
        });
      }
    }

    const finalData = [...mainNavData, ...blogArticlesData, ...footerData];

    return NextResponse.json({ success: true, data: finalData });
  } catch (error) {
    console.error("Error fetching pages for SEO:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

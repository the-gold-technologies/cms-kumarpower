import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPageSlugForUrl } from "@/lib/utils";

// Additional pages in footer/site (AMC and Emergency Support removed)
const FOOTER_ADDITIONAL_PAGES = [
  { url: "/about/Testimonials", label: "Testimonials", pageSlug: "testimonials" },
  { url: "/about/PhotoGallery", label: "Photo Gallery", pageSlug: "photo-gallery" },
  { url: "/about/Certifications", label: "Certifications & Awards", pageSlug: "certifications" },
  { url: "/services/installation", label: "Installation Services", pageSlug: "installation" },
  { url: "/services/repair-overhaul", label: "Repair & Overhaul", pageSlug: "repair-overhaul" },
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
          p.slug.toLowerCase() === link.url.replace(/^\/+|\/+$/g, "").toLowerCase()
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

    // 2. Process Footer / Additional Pages at the bottom (excluding AMC & Emergency Support)
    const existingUrls = new Set(links.map((l: any) => l.url.toLowerCase()));
    let nextOrder = links.length + 1;

    const footerData: any[] = [];
    for (const item of FOOTER_ADDITIONAL_PAGES) {
      if (!existingUrls.has(item.url.toLowerCase())) {
        const canonicalSlug = getPageSlugForUrl(item.url);
        const matchedPage = pages.find(
          (p: any) =>
            p.slug.toLowerCase() === canonicalSlug.toLowerCase() ||
            p.slug.toLowerCase() === item.pageSlug.toLowerCase()
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

    const finalData = [...mainNavData, ...footerData];

    return NextResponse.json({ success: true, data: finalData });
  } catch (error) {
    console.error("Error fetching pages for SEO:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    const mergedData = links.map((link: any) => {
      const urlMatchesSlug = (url: string, slug: string) => {
        if (url === "/" && slug === "home") return true;
        // Strip out slashes, dashes, and casing to compare
        const normalizedUrl = url.toLowerCase().replace(/^\//, "").replace(/-/g, "").replace(/\//g, "");
        const normalizedSlug = slug.toLowerCase().replace(/-/g, "").replace(/\//g, "");
        return normalizedUrl === normalizedSlug || normalizedUrl.endsWith(normalizedSlug);
      };

      // Find matched page in Page model
      const matchedPage = pages.find((p: any) => urlMatchesSlug(link.url, p.slug));

      if (matchedPage) {
        return {
          id: link.id,
          pageId: matchedPage.id,
          title: link.label,
          slug: matchedPage.slug,
          metaTitle: matchedPage.metaTitle,
          metaDescription: matchedPage.metaDescription,
          type: link.type || matchedPage.type,
          visibility: matchedPage.visibility,
          parent: link.parent,
          order: link.order,
          description: link.description,
          navTitle: link.title,
          isStatic: link.isStatic,
        };
      }

      // Default fallback
      return {
        id: link.id,
        pageId: null,
        title: link.label,
        slug: link.url === "/" ? "home" : link.url.replace(/^\//, ""),
        metaTitle: null,
        metaDescription: null,
        type: link.type || "static",
        visibility: "published",
        parent: link.parent,
        order: link.order,
        description: link.description,
        navTitle: link.title,
        isStatic: link.isStatic,
      };
    });

    // Also include service subpages that might not be in NavLinks but exist as Pages
    const additionalPages = pages.filter((page: any) => {
      return !mergedData.some((m: any) => m.slug === page.slug);
    });

    const additionalMapped = additionalPages.map((page: any) => {
      // If it's a service sub-page, group it under "Services" dropdown or list at root
      // In seed.ts, parent of services is usually "-" or "nav-4"
      let parent = "-";
      if (["annual-maintenance", "repair-overhaul", "emergency-support"].includes(page.slug)) {
        // Find if there is a main Services link
        const servicesLink = links.find((l: any) => l.label.toLowerCase() === "services" || l.url === "/services");
        if (servicesLink) parent = servicesLink.id;
      }

      return {
        id: `page-add-${page.id}`,
        pageId: page.id,
        title: page.title || page.slug,
        slug: page.slug,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        type: "Sub Link",
        visibility: page.visibility,
        parent: parent,
        order: page.order || 99,
        isStatic: page.isStatic,
        description: "",
        navTitle: page.title || "",
      };
    });

    const finalData = mergedData.concat(additionalMapped);

    return NextResponse.json({ success: true, data: finalData });
  } catch (error) {
    console.error("Error fetching pages for SEO:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, metaTitle, metaDescription, keywords, canonicalUrl, noIndex, ogTitle, ogDescription, ogImage, schema } = body;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
    }

    const updatedPage = await prisma.page.upsert({
      where: { slug },
      update: {
        metaTitle,
        metaDescription,
        keywords,
        canonicalUrl,
        noIndex: !!noIndex,
        ogTitle,
        ogDescription,
        ogImage,
        schema,
      },
      create: {
        slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        metaTitle,
        metaDescription,
        keywords,
        canonicalUrl,
        noIndex: !!noIndex,
        ogTitle,
        ogDescription,
        ogImage,
        schema,
      },
    });

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error("Error updating SEO page settings:", error);
    return NextResponse.json({ success: false, error: "Database save error" }, { status: 500 });
  }
}

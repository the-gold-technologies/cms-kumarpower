import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const config = await prisma.globalConfig.findUnique({
      where: { id: "global" },
      select: { sitemapEnabled: true, sitemapCustomContent: true },
    });

    if (config?.sitemapEnabled === false) {
      return new NextResponse("Sitemap disabled", { status: 404 });
    }

    if (config?.sitemapCustomContent && config.sitemapCustomContent.trim().length > 0) {
      return new NextResponse(config.sitemapCustomContent, {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
        },
      });
    }

    // Generate dynamic sitemap
    const pages = await prisma.page.findMany({
      where: {
        visibility: "published",
        noIndex: false,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.kumarpower.com";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    // Handle home page special case
    let urlPath = page.slug === "home" || page.slug === "/" ? "" : `/${page.slug}`;
    
    // Clean up trailing/leading slashes if any
    if (urlPath.startsWith("//")) urlPath = urlPath.replace("//", "/");

    return `  <url>
    <loc>${websiteUrl}${urlPath}</loc>
    <lastmod>${page.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.slug === "home" ? "daily" : "weekly"}</changefreq>
    <priority>${page.slug === "home" ? "1.0" : "0.8"}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap.xml:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}

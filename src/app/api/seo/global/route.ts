import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let config = await prisma.globalConfig.findUnique({
      where: { id: "global" },
    });

    if (!config) {
      config = await prisma.globalConfig.create({
        data: {
          id: "global",
          siteTitle: "Kumar Power | Kirloskar Generator Dealer",
          siteDescription: "Authorized dealer of Kirloskar Green CPCB IV+ Silent Diesel Generators in Delhi NCR.",
          robotsTxt: "User-agent: *\nAllow: /\n\nSitemap: https://www.kumarpower.com/sitemap.xml",
        },
      });
    }

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("Error fetching global SEO config:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { config } = body;

    if (!config) {
      return NextResponse.json({ success: false, error: "Config payload is required" }, { status: 400 });
    }

    const updatedConfig = await prisma.globalConfig.upsert({
      where: { id: "global" },
      update: {
        siteTitle: config.siteTitle,
        siteDescription: config.siteDescription,
        favicon: config.favicon,
        googleAnalyticsId: config.googleAnalyticsId,
        gtmId: config.gtmId,
        searchConsoleId: config.searchConsoleId,
        customHeaderScripts: config.customHeaderScripts,
        customFooterScripts: config.customFooterScripts,
        socialLinks: config.socialLinks,
        schema: config.schema,
        headingOptions: config.headingOptions,
        sitemapEnabled: config.sitemapEnabled !== undefined ? !!config.sitemapEnabled : true,
        sitemapCustomContent: config.sitemapCustomContent,
        robotsTxt: config.robotsTxt,
      },
      create: {
        id: "global",
        siteTitle: config.siteTitle || "Kumar Power",
        siteDescription: config.siteDescription || "",
        favicon: config.favicon,
        googleAnalyticsId: config.googleAnalyticsId,
        gtmId: config.gtmId,
        searchConsoleId: config.searchConsoleId,
        customHeaderScripts: config.customHeaderScripts,
        customFooterScripts: config.customFooterScripts,
        socialLinks: config.socialLinks,
        schema: config.schema,
        headingOptions: config.headingOptions,
        sitemapEnabled: config.sitemapEnabled !== undefined ? !!config.sitemapEnabled : true,
        sitemapCustomContent: config.sitemapCustomContent,
        robotsTxt: config.robotsTxt,
      },
    });

    return NextResponse.json({ success: true, data: updatedConfig });
  } catch (error) {
    console.error("Error updating global SEO config:", error);
    return NextResponse.json({ success: false, error: "Database save error" }, { status: 500 });
  }
}

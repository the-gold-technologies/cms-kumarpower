import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /submissions/

Sitemap: https://www.kumarpower.com/sitemap.xml`;

export async function GET() {
  try {
    let config = await prisma.globalConfig.findUnique({
      where: { id: "global" },
      select: { robotsTxt: true },
    });

    return NextResponse.json({
      success: true,
      data: { robotsTxt: config?.robotsTxt || DEFAULT_ROBOTS },
    });
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { robotsTxt } = body;

    if (typeof robotsTxt !== "string") {
      return NextResponse.json({ success: false, error: "robotsTxt string is required" }, { status: 400 });
    }

    const updatedConfig = await prisma.globalConfig.upsert({
      where: { id: "global" },
      update: { robotsTxt },
      create: {
        id: "global",
        siteTitle: "Kumar Power",
        siteDescription: "Authorized Kirloskar Generator Dealer in Delhi NCR",
        robotsTxt,
      },
    });

    return NextResponse.json({ success: true, data: { robotsTxt: updatedConfig.robotsTxt } });
  } catch (error) {
    console.error("Error saving robots.txt:", error);
    return NextResponse.json({ success: false, error: "Database save error" }, { status: 500 });
  }
}

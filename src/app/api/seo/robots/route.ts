import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /submissions/

Sitemap: https://www.kumarpower.com/sitemap.xml`;

export async function GET() {
  try {
    const config = await prisma.globalConfig.findUnique({
      where: { id: "global" },
      select: { robotsTxt: true },
    });

    const robotsContent = config?.robotsTxt || DEFAULT_ROBOTS;

    return new NextResponse(robotsContent, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
    return new NextResponse(DEFAULT_ROBOTS, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.upsert({
      where: { id: body.id || `prod-${Date.now()}` },
      update: { ...body },
      create: { id: body.id || `prod-${Date.now()}`, ...body },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json({ success: false, message: "Database save error" }, { status: 500 });
  }
}

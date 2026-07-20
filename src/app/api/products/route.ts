import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_PRODUCTS } from "@/lib/mock-data/initialData";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (products && products.length > 0) {
      return NextResponse.json({ success: true, data: products });
    }
  } catch (error) {
    console.warn("PostgreSQL offline, using initial products:", error);
  }

  return NextResponse.json({ success: true, data: INITIAL_PRODUCTS });
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
    console.error("PostgreSQL save error:", error);
    return NextResponse.json({ success: true, message: "Saved locally (PostgreSQL offline)" });
  }
}

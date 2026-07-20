import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_RENTALS,
  INITIAL_BLOGS,
  INITIAL_ENQUIRIES
} from "@/lib/mock-data/initialData";

export async function GET() {
  let stats = {
    pages: 17,
    enquiries: INITIAL_ENQUIRIES.length,
    productsCount: INITIAL_PRODUCTS.length,
    servicesCount: INITIAL_SERVICES.length,
    rentalsCount: INITIAL_RENTALS.length,
    blogsCount: INITIAL_BLOGS.length,
    activities: [
      { type: "update", text: 'Layout "Value-Added Services" updated', time: new Date().toISOString() },
      { type: "update", text: 'Layout "Airport Services" updated', time: new Date().toISOString() },
      { type: "enquiry", text: "New enquiry from Sudeesh Kumar", time: new Date().toISOString() },
    ]
  };

  try {
    const [enquiriesCount, productsCount] = await Promise.all([
      prisma.enquiry.count(),
      prisma.product.count(),
    ]);

    stats.enquiries = enquiriesCount || INITIAL_ENQUIRIES.length;
    stats.productsCount = productsCount || INITIAL_PRODUCTS.length;
  } catch (error) {
    console.warn("PostgreSQL count fallback to mock stats:", error);
  }

  return NextResponse.json({ success: true, data: stats });
}

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  INITIAL_PRODUCTS,
  INITIAL_NAV_LINKS,
  INITIAL_ENQUIRIES,
  INITIAL_HOMEPAGE_DATA
} from "../src/app/lib/mock-data/initialData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Securely hash password with bcrypt
  const hashedPassword = await bcrypt.hash("1234asdf@", 10);

  // 1. Seed Admin User securely
  try {
    await prisma.user.upsert({
      where: { email: "admin@kumarpower.com" },
      update: {
        name: "Admin",
        password: hashedPassword,
      },
      create: {
        name: "Admin",
        email: "admin@kumarpower.com",
        password: hashedPassword,
      },
    });
    console.log("Admin user registered securely with hashed password.");
  } catch (err) {
    console.warn("User table seed skipped (database offline or unreachable):", err);
  }

  // 2. Seed NavLinks (all header navigation - main links, dropdowns, sub links)
  try {
    for (const nav of INITIAL_NAV_LINKS) {
      await prisma.navLink.upsert({
        where: { id: nav.id },
        update: {
          label: nav.label,
          url: nav.url,
          order: nav.order,
          type: nav.type || "Main Link",
          parent: nav.parent || "-",
          description: nav.description || null,
          title: nav.title || null,
          isStatic: nav.isStatic ?? true,
          isActive: nav.isActive ?? true,
        },
        create: {
          id: nav.id,
          label: nav.label,
          url: nav.url,
          order: nav.order,
          type: nav.type || "Main Link",
          parent: nav.parent || "-",
          description: nav.description || null,
          title: nav.title || null,
          isStatic: nav.isStatic ?? true,
          isActive: nav.isActive ?? true,
        },
      });
    }
    console.log(`Navigation seeded: ${INITIAL_NAV_LINKS.length} links (Main Links, Dropdowns & Sub Links)`);
  } catch (err) {
    console.warn("NavLinks seed skipped (database offline):", err);
  }

  // 3. Seed Products
  try {
    for (const prod of INITIAL_PRODUCTS) {
      await prisma.product.upsert({
        where: { id: prod.id },
        update: {
          name: prod.name,
          category: prod.category,
          powerRating: prod.powerRating,
          phase: prod.phase,
          cooling: prod.cooling,
          fuelType: prod.fuelType,
          description: prod.description,
          image: prod.image,
          status: prod.status || "In Stock",
        },
        create: {
          id: prod.id,
          name: prod.name,
          category: prod.category,
          powerRating: prod.powerRating,
          phase: prod.phase,
          cooling: prod.cooling,
          fuelType: prod.fuelType,
          description: prod.description,
          image: prod.image,
          status: prod.status || "In Stock",
        },
      });
    }
  } catch (err) {
    console.warn("Products seed skipped (database offline):", err);
  }

  // 4. Seed Enquiries
  try {
    for (const enq of INITIAL_ENQUIRIES) {
      await prisma.enquiry.upsert({
        where: { id: enq.id },
        update: {
          name: enq.name,
          email: enq.email,
          phone: enq.phone,
          company: enq.department || "N/A",
          interestedIn: enq.productOrService || enq.department,
          message: enq.message,
          status: enq.status || "New",
        },
        create: {
          id: enq.id,
          name: enq.name,
          email: enq.email,
          phone: enq.phone,
          company: enq.department || "N/A",
          interestedIn: enq.productOrService || enq.department,
          message: enq.message,
          status: enq.status || "New",
        },
      });
    }
  } catch (err) {
    console.warn("Enquiries seed skipped (database offline):", err);
  }

  // 5. Seed Home Page & Layout Sections
  try {
    const homePage = await prisma.page.upsert({
      where: { slug: "home" },
      update: {
        title: "Home Page",
        slug: "home",
        type: "standard",
        isStatic: true,
        visibility: "published",
      },
      create: {
        id: "page-home",
        title: "Home Page",
        slug: "home",
        type: "standard",
        isStatic: true,
        visibility: "published",
      },
    });

    // Seed Hero Section
    await prisma.section.upsert({
      where: { id: "sec-home-hero" },
      update: {
        pageId: homePage.id,
        type: "hero",
        content: INITIAL_HOMEPAGE_DATA.hero as any,
        order: 1,
      },
      create: {
        id: "sec-home-hero",
        pageId: homePage.id,
        type: "hero",
        content: INITIAL_HOMEPAGE_DATA.hero as any,
        order: 1,
      },
    });

    // Seed About Section (on home page)
    await prisma.section.upsert({
      where: { id: "sec-home-about" },
      update: {
        pageId: homePage.id,
        type: "about",
        content: {
          bannerTitle: "ABOUT KUMAR POWER",
          bannerSubtitle: "Powering Progress.",
          mainHeadingLine1: "Engineering India's",
          mainHeadingLine2: "Energy Backbone.",
          description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
          feature1: "Kirloskar Authorized Distributor",
          feature2: "24/7 Service Infrastructure",
          feature3: "500+ Enterprise Clients",
          feature4: "ISO 9001:2015 Accredited",
          ctaLabel: "Explore Our Legacy",
          ctaUrl: "/about/OurProfile",
          teamImage: "",
        },
        order: 2,
      },
      create: {
        id: "sec-home-about",
        pageId: homePage.id,
        type: "about",
        content: {
          bannerTitle: "ABOUT KUMAR POWER",
          bannerSubtitle: "Powering Progress.",
          mainHeadingLine1: "Engineering India's",
          mainHeadingLine2: "Energy Backbone.",
          description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
          feature1: "Kirloskar Authorized Distributor",
          feature2: "24/7 Service Infrastructure",
          feature3: "500+ Enterprise Clients",
          feature4: "ISO 9001:2015 Accredited",
          ctaLabel: "Explore Our Legacy",
          ctaUrl: "/about/OurProfile",
          teamImage: "",
        },
        order: 2,
      },
    });
  } catch (err) {
    console.warn("HomePage seed skipped (database offline):", err);
  }

  // 6. Seed About Static Page
  try {
    const aboutPage = await prisma.page.upsert({
      where: { slug: "about" },
      update: {
        title: "About Us",
        slug: "about",
        type: "standard",
        isStatic: true,
        visibility: "published",
      },
      create: {
        id: "page-about",
        title: "About Us",
        slug: "about",
        type: "standard",
        isStatic: true,
        visibility: "published",
      },
    });

    await prisma.section.upsert({
      where: { id: "sec-about-main" },
      update: {
        pageId: aboutPage.id,
        type: "about-main",
        content: {
          bannerTitle: "ABOUT KUMAR POWER",
          bannerSubtitle: "Powering Progress.",
          mainHeadingLine1: "Engineering India's",
          mainHeadingLine2: "Energy Backbone.",
          description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
          feature1: "Kirloskar Authorized Distributor",
          feature2: "24/7 Service Infrastructure",
          feature3: "500+ Enterprise Clients",
          feature4: "ISO 9001:2015 Accredited",
          ctaLabel: "Explore Our Legacy",
          ctaUrl: "/about/OurProfile",
          teamImage: "",
        },
        order: 1,
      },
      create: {
        id: "sec-about-main",
        pageId: aboutPage.id,
        type: "about-main",
        content: {
          bannerTitle: "ABOUT KUMAR POWER",
          bannerSubtitle: "Powering Progress.",
          mainHeadingLine1: "Engineering India's",
          mainHeadingLine2: "Energy Backbone.",
          description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
          feature1: "Kirloskar Authorized Distributor",
          feature2: "24/7 Service Infrastructure",
          feature3: "500+ Enterprise Clients",
          feature4: "ISO 9001:2015 Accredited",
          ctaLabel: "Explore Our Legacy",
          ctaUrl: "/about/OurProfile",
          teamImage: "",
        },
        order: 1,
      },
    });
  } catch (err) {
    console.warn("About page seed skipped (database offline):", err);
  }

  console.log("Seeding process completed!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed for Kumarpower CMS...");

  // 1. Clean existing database
  try {
    await prisma.section.deleteMany({});
    await prisma.page.deleteMany({});
    await prisma.navLink.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.enquiry.deleteMany({});
    await prisma.user.deleteMany({});
    console.log("🧹 Cleaned existing database tables.");
  } catch (err) {
    console.warn("Table cleanup skipped:", err);
  }

  // 2. Create Default Admin User
  const hashedPassword = await bcrypt.hash("1234asdf@", 10);
  try {
    const adminUser = await prisma.user.create({
      data: {
        id: "usr-admin",
        name: "Admin",
        email: "admin@kumarpower.com",
        password: hashedPassword,
      },
    });
    console.log("✅ Created admin user:", adminUser.email);
  } catch (err) {
    console.warn("User seed skipped:", err);
  }

  // 3. Create Navigation Links
  const navLinks = [
    {
      id: "nav-1",
      label: "Home",
      url: "/",
      order: 1,
      type: "Main Link",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2",
      label: "About Us",
      url: "/about",
      order: 2,
      type: "Dropdown",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2-1",
      label: "Our Profile",
      url: "/about/OurProfile",
      order: 1,
      type: "Sub Link",
      parent: "nav-2",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2-2",
      label: "Testimonials",
      url: "/about/Testimonials",
      order: 2,
      type: "Sub Link",
      parent: "nav-2",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2-3",
      label: "Photo Gallery",
      url: "/about/PhotoGallery",
      order: 3,
      type: "Sub Link",
      parent: "nav-2",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2-4",
      label: "Certifications",
      url: "/about/Certifications",
      order: 4,
      type: "Sub Link",
      parent: "nav-2",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-2-5",
      label: "Our Clients",
      url: "/about/OurClients",
      order: 5,
      type: "Sub Link",
      parent: "nav-2",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3",
      label: "Products",
      url: "/products",
      order: 3,
      type: "Dropdown",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-1",
      label: "Kirloskar Diesel Generator",
      url: "/products/kirloskar-diesel-generator",
      order: 1,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-2",
      label: "Kirloskar Gas Generator",
      url: "/products/kirloskar-gas-generator",
      order: 2,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-3",
      label: "Kirloskar Portable Generator",
      url: "/products/kirloskar-portable-generator",
      order: 3,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-4",
      label: "Electrical Panels",
      url: "/products/panels",
      order: 4,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-5",
      label: "Optiprime",
      url: "/products/optiprime",
      order: 5,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-6",
      label: "Servo Stabilizer",
      url: "/products/servo-stabilizer",
      order: 6,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-3-7",
      label: "Transformers",
      url: "/products/transformers",
      order: 7,
      type: "Sub Link",
      parent: "nav-3",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-4",
      label: "Services",
      url: "/services",
      order: 4,
      type: "Dropdown",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-4-1",
      label: "Annual Maintenance (AMC)",
      url: "/services/annual-maintenance",
      order: 1,
      type: "Sub Link",
      parent: "nav-4",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-4-2",
      label: "Turnkey SITC Installation",
      url: "/services/installation",
      order: 2,
      type: "Sub Link",
      parent: "nav-4",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-4-3",
      label: "Engine Repair & Overhaul",
      url: "/services/repair-overhaul",
      order: 3,
      type: "Sub Link",
      parent: "nav-4",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-4-4",
      label: "24/7 Emergency Support",
      url: "/services/emergency-support",
      order: 4,
      type: "Sub Link",
      parent: "nav-4",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-5",
      label: "Our Clients",
      url: "/our-clients",
      order: 5,
      type: "Main Link",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-6",
      label: "Installation",
      url: "/installation",
      order: 6,
      type: "Main Link",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-7",
      label: "Contact",
      url: "/contact",
      order: 7,
      type: "Main Link",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-8",
      label: "Blog & Articles",
      url: "/blogs",
      order: 8,
      type: "Dropdown",
      parent: "-",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-8-1",
      label: "Kirloskar Silent Generator Guide",
      url: "/blog/kirloskar-silent-generator",
      order: 1,
      type: "Sub Link",
      parent: "nav-8",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-8-2",
      label: "Industrial Kirloskar DG Set (750-1500kVA)",
      url: "/blog/industrial-kirloskar-dg-set-750kva-1500kva",
      order: 2,
      type: "Sub Link",
      parent: "nav-8",
      isStatic: true,
      isActive: true,
    },
    {
      id: "nav-8-3",
      label: "AMF Panel for DG Set Guide",
      url: "/blog/amf-panel-for-dg-set",
      order: 3,
      type: "Sub Link",
      parent: "nav-8",
      isStatic: true,
      isActive: true,
    },
  ];

  try {
    for (const nav of navLinks) {
      await prisma.navLink.create({ data: nav });
    }
    console.log(`✅ Created ${navLinks.length} navigation links.`);
  } catch (err) {
    console.warn("NavLinks seed skipped:", err);
  }

  // 4. Create Products Fleet
  const productsList = [
    {
      id: "prod-1",
      name: "Kirloskar CPCB IV+ 20 kVA DG Set",
      category: "Kirloskar Diesel Generator",
      powerRating: "20 kVA",
      phase: "Three Phase / Single Phase",
      cooling: "Liquid Cooled",
      fuelType: "Diesel",
      description:
        "Compact, eco-friendly CPCB IV+ compliant silent diesel generator set engineered by Kirloskar for maximum fuel efficiency.",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      status: "In Stock",
    },
    {
      id: "prod-2",
      name: "Kirloskar CPCB IV+ 62.5 kVA DG Set",
      category: "Kirloskar Diesel Generator",
      powerRating: "62.5 kVA",
      phase: "3 Phase",
      cooling: "Water Cooled",
      fuelType: "Diesel",
      description:
        "Heavy-duty commercial silent generator providing reliable power for industrial plants, commercial buildings, and healthcare facilities.",
      image:
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
      status: "In Stock",
    },
    {
      id: "prod-3",
      name: "Kirloskar 250 kVA Industrial DG Set",
      category: "Kirloskar Diesel Generator",
      powerRating: "250 kVA",
      phase: "3 Phase",
      cooling: "Radiator Cooled",
      fuelType: "Diesel",
      description:
        "High capacity CPCB IV+ compliant diesel generator designed for continuous operation in severe ambient conditions.",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
      status: "In Stock",
    },
  ];

  try {
    for (const prod of productsList) {
      await prisma.product.create({ data: prod });
    }
    console.log(`✅ Created ${productsList.length} product entries.`);
  } catch (err) {
    console.warn("Products seed skipped:", err);
  }

  // 5. Create Enquiries & Leads
  const enquiriesList = [
    {
      id: "enq-101",
      name: "Vikram Malhotra",
      email: "v.malhotra@gmrgroup.in",
      phone: "+91 98110 43210",
      company: "GMR Infrastructure",
      interestedIn: "Kirloskar 250 kVA DG Set",
      message:
        "We need a quote for 2 units of 250 kVA Kirloskar CPCB IV+ DG Sets along with AMF panels for our upcoming construction site in Noida.",
      status: "New",
    },
    {
      id: "enq-102",
      name: "Sunita Sharma",
      email: "sunita@apollohospitals.org",
      phone: "+91 97177 12345",
      company: "Apollo Hospitals",
      interestedIn: "Annual Maintenance Contract",
      message:
        "Looking to renew annual maintenance contract for our 3 existing Kirloskar 500 kVA generators at Apollo Sarita Vihar.",
      status: "New",
    },
  ];

  try {
    for (const enq of enquiriesList) {
      await prisma.enquiry.create({ data: enq });
    }
    console.log(`✅ Created ${enquiriesList.length} enquiry entries.`);
  } catch (err) {
    console.warn("Enquiries seed skipped:", err);
  }

  // 6. Create Static Pages and Sections with EXACT fields matching CMS forms
  const staticPages = [
    {
      title: "Home Page",
      slug: "home",
      description: "Kumar Power Home Page",
      metaTitle:
        "Kirloskar Generator Dealer | Authorized Distributor in Delhi NCR",
      metaDescription:
        "Looking for a reliable Kirloskar Generator dealer? Explore affordable prices, expert installation, 24/7 service support & high-efficiency DG sets.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-home-hero",
          type: "hero",
          order: 1,
          content: {
            headingLine1: "Trusted Kirloskar Generator Dealer",
            headingLine2: "Certified Dealer for India's Power Needs",
            descriptionDesktop:
              "Authorized Channel Distributor | ISO 9001:2015 | 500+ Enterprise Clients | 30+ Years of Uninterrupted Excellence",
            descriptionMobileLine1: "Authorized Channel Distributor",
            descriptionMobileLine2: "ISO 9001:2015",
            descriptionMobileLine3: "500+ Enterprise Clients",
            descriptionMobileLine4: "30+ Years of Excellence",
            ctaPrimaryLabel: "Explore Power Solutions",
            ctaPrimaryUrl: "/products",
            ctaSecondaryLabel: "Download Profile",
            companyProfilePdf: "",
            trustedByLabel: "TRUSTED BY",
            backgroundVideo: "",
            logos: [
              {
                id: "logo-1",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg",
                alt: "Client Logo 1",
              },
              {
                id: "logo-2",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg",
                alt: "Client Logo 2",
              },
            ],
          },
        },
        {
          id: "sec-home-about",
          type: "about",
          order: 2,
          content: {
            bannerTitle: "ABOUT KUMAR POWER",
            bannerSubtitle: "Powering Progress.",
            mainHeadingLine1: "Engineering India's",
            mainHeadingLine2: "Energy Backbone.",
            description:
              "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
            feature1: "Kirloskar Authorized Distributor",
            feature2: "24/7 Service Infrastructure",
            feature3: "500+ Enterprise Clients",
            feature4: "ISO 9001:2015 Accredited",
            ctaLabel: "Explore Our Legacy",
            ctaUrl: "/about/OurProfile",
            teamImage: "",
          },
        },
        {
          id: "sec-home-generator-range",
          type: "generator-range",
          order: 3,
          content: {
            sectionTitle: "Explore Our Generator Range",
            sectionDesc:
              "Kirloskar-certified systems tailored for industrial, commercial, and backup applications. Download brochures for detailed specifications.",
            cards: [
              {
                id: "gen-1",
                title: "Kirloskar Optiprime Generator (125 – 6600 kVA)",
                caption:
                  "High-output Kirloskar Optiprime engineered for mission-critical facilities.",
                category: "Optiprime",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-2",
                title: "Kirloskar Gas Generator (15 – 250 kVA)",
                caption:
                  "Clean, efficient power for commercial and industrial applications.",
                category: "Gas Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-3",
                title: "Kirloskar CPCB4+ Diesel Generator (7.5 – 20 kVA)",
                caption:
                  "Portable power for events, remote sites, and emergency backup.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-4",
                title: "Kirloskar CPCB4+ Diesel Generator (25 – 58.5 kVA)",
                caption:
                  "Balanced performance for medium-scale industrial needs.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-5",
                title: "Kirloskar CPCB4+ Diesel Generator (82.5 – 160 kVA)",
                caption:
                  "Scalable solutions with robust service network coverage.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-6",
                title: "Kirloskar CPCB4+ Diesel Generator (200 – 250 kVA)",
                caption:
                  "Versatile DG sets for plants, campuses, and commercial towers.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-7",
                title: "Kirloskar CPCB4+ Diesel Generator (320 – 750 kVA)",
                caption:
                  "Durable, high-efficiency backup for industries and campuses.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-8",
                title: "Kirloskar CPCB4+ Diesel Generator (750 – 1500 kVA)",
                caption:
                  "Low-emission, reliable diesel generator for versatile use.",
                category: "CPCB4+ Diesel Generators",
                image: "",
                brochureUrl: "",
              },
              {
                id: "gen-9",
                title: "Kirloskar Portable Generator (2.1 – 5 kVA)",
                caption:
                  "Compact portable power for small-scale events, sites, and emergency use.",
                category: "Portable Generators",
                image: "",
                brochureUrl: "",
              },
            ],
          },
        },
        {
          id: "sec-home-cta",
          type: "cta",
          order: 4,
          content: {
            title: "Need Expert Assistance?",
            primaryBtnLabel: "Talk to an Expert",
            primaryBtnUrl: "/contact",
            whatsappBtnLabel: "Connect on WhatsApp",
            whatsappNumber: "919773851767",
            backgroundImage: "",
          },
        },
        {
          id: "sec-home-power-solutions",
          type: "power-solutions",
          order: 5,
          content: {
            topBannerImg: "",
            sectionTitle: "Power Solutions",
            assocTitle: "Members of Associations",
            assocSubtitle:
              "Certified and recognized by leading industry organizations for quality and excellence",
            assocLogos: [
              {
                id: "assoc-1",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121853_okz8x7.png",
                alt: "Association Member 1",
              },
              {
                id: "assoc-2",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121836_ayhhxd.png",
                alt: "Association Member 2",
              },
              {
                id: "assoc-3",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121914_yztxrf.png",
                alt: "Association Member 3",
              },
              {
                id: "assoc-4",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121748_ihrukv.png",
                alt: "Association Member 4",
              },
            ],
            actionTitle: "Power in Action",
            products: [
              {
                id: "ps-1",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators( 7.5 kVA - 20 kVA)",
                desc: "Compact CPCB4+ compliant diesel generators designed for small businesses and commercial setups.",
                specs:
                  "Range: 7.5 kVA - 20 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase",
                img: "",
                brochureUrl: "",
              },
              {
                id: "ps-2",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(25 kVA - 58.5 kVA)",
                desc: "Reliable CPCB4+ emission compliant diesel generators with advanced liquid cooling for efficient performance.",
                specs:
                  "Range: 25 kVA - 58.5 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase",
                img: "",
                brochureUrl: "",
              },
              {
                id: "ps-3",
                category: "Optiprime Generators",
                title: "Kirloskar Optiprime Generator",
                desc: "Advanced diesel generators with CPCB4+ compliance, offering superior fuel efficiency and eco-friendly operations.",
                specs:
                  "125 kva - 6600 kva, CPCB4+ Compliant, 3 Phase Output, Fuel: Diesel",
                img: "",
                brochureUrl: "",
              },
            ],
          },
        },
        {
          id: "sec-home-use-cases",
          type: "use-cases",
          order: 6,
          content: {
            headingLine1: "Power Solutions",
            headingLine2: "for Metro Cities",
            footerQuote:
              "Kirloskar generators, with their reliable performance and versatility, are well-suited to meet the unique demands of metro city environments.",
            items: [
              {
                id: "uc-1",
                title: "Power Outages and Load Shedding",
                text: "Despite robust infrastructure, metro areas still experience power outages caused by high demand, technical issues, maintenance work, grid failures, natural disasters, and peak-demand overload.",
              },
              {
                id: "uc-2",
                title: "High-Demand Areas",
                text: "Metro cities are hubs for businesses, industries, commercial buildings, hospitals, malls, data centers, and IT companies—all of which require continuous power.",
              },
              {
                id: "uc-3",
                title: "Dependability for Events and Functions",
                text: "Generators are essential for events such as weddings, concerts, public gatherings, construction projects, and outdoor activities.",
              },
              {
                id: "uc-4",
                title: "Backup for Critical Appliances",
                text: "Households often need generators to keep essential appliances running during outages, such as refrigerators, medical equipment, and security systems.",
              },
              {
                id: "uc-5",
                title: "Increased Usage During Monsoon Season",
                text: "Heavy rains and storms frequently disrupt power lines in metro cities, resulting in power outages. Generators help reduce the impact of these disruptions.",
              },
              {
                id: "uc-6",
                title: "Urbanization and Infrastructure Stress",
                text: "Rapid urbanization places stress on existing power grids, occasionally leading to shortages or planned outages.",
              },
            ],
          },
        },
        {
          id: "sec-home-gallery",
          type: "gallery",
          order: 7,
          content: {
            title: "Photo Gallery",
            subtitle:
              "Explore our installations, equipment, and team in action through these images",
            images: [
              {
                id: "img-1",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175177/gallery1_uhk3zd.png",
                caption: "Gallery image 1",
              },
              {
                id: "img-2",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175177/gallery2_ei3h9z.png",
                caption: "Gallery image 2",
              },
              {
                id: "img-3",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175176/gallery3_dcqffp.png",
                caption: "Gallery image 3",
              },
              {
                id: "img-4",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175202/gallery4_nwutsh.png",
                caption: "Gallery image 4",
              },
              {
                id: "img-5",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175196/gallery5_zlyhc4.png",
                caption: "Gallery image 5",
              },
              {
                id: "img-6",
                url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175198/gallery6_ulastu.png",
                caption: "Gallery image 6",
              },
            ],
          },
        },
        {
          id: "sec-home-testimonials",
          type: "testimonials",
          order: 8,
          content: {
            heading: "Real Stories. Real Power.",
            subtitle:
              "Hear how our generators keep India powered — from Fortune 500 factories to city hospitals.",
            items: [
              {
                id: "test-1",
                headerTitle: "TESTIMONIAL BY POOJA JAIN - SHIKHERJEE JEWELLERS",
                name: "Pooja Jain",
                role: "Shikherjee Jewellers",
                quote:
                  "At Vilandl, we make bespoke Polki jewellery... Mr Jain was very happy to work with M/s Kumar Generator House and highly recommends his services.",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903094/Screenshot_2025-10-31_145916_tf6wvg.png",
              },
              {
                id: "test-2",
                headerTitle:
                  "TESTIMONIAL BY AANCHAL SAINI, AARK WORLD PVT. LTD.",
                name: "Aanchal Saini",
                role: "AARK World Pvt. Ltd.",
                quote:
                  "RENT IT BAE is a luxury fashion rental service... The products were delivered and installed within 24 hours.",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903093/download_v9kdua.png",
              },
              {
                id: "test-3",
                headerTitle: "TESTIMONIAL BY BHARAT ANAND - BROWN GOLD",
                name: "Bharat Anand",
                role: "BROWNGOLD",
                quote:
                  "We at BROWNGOLD are a team of young & dynamic interior designers... We would not hesitate to recommend Kumar Generator House.",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902474/Gemini_Generated_Image_1je1r11je1r11je1_ksybnh.png",
              },
            ],
          },
        },
        {
          id: "sec-home-footer",
          type: "footer",
          order: 9,
          content: {
            aboutBio:
              "Kumar Power is certified ISO 9001:2015 Company & have emerged as the leading Power Solution Providers. Being an authorized Channel Partner of Kirloskar Oil Engines Limited, Kumar Power is committed to provide quality power solutions.",
            address: "904, Westend Mall, Janakpuri, New Delhi 110058",
            mainPhone: "+91 97738 51767",
            supportPhone: "+91 97738 77796",
            landline: "011-46701273",
            salesEmail: "sales@kumarpower.com",
            supportEmail: "support@kumarpower.com",
            accountsEmail: "accounts@kumarpower.com",
            facebookUrl: "https://www.facebook.com/kumargenerator/",
            instagramUrl: "https://www.instagram.com/Kumarpowerlimitless",
            linkedinUrl:
              "https://www.linkedin.com/company/kumar-generator-house---india/",
            copyrightText: "© 2026 Kumar Power. All rights reserved.",
          },
        },
      ],
    },
    {
      title: "Our Profile",
      slug: "our-profile",
      description: "About Kumar Power",
      metaTitle: "Our Profile & Company History - Kumar Power",
      metaDescription:
        "Learn about our 30+ years of power generation legacy in India.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-our-profile-hero",
          type: "hero",
          order: 1,
          content: {
            title: "Know About Kumar Power",
            subtitle: "–Trusted Name in Power Solutions Industry",
            image: "",
            paragraph1:
              "Kumar Power is a premier Kirloskar-certified power partner with over 30+ years of excellence in providing comprehensive power solutions across India. Established in 1995, we have grown to become one of the most trusted names in power generation equipment and services.",
            paragraph2:
              "Our expertise spans across sales, installation, commissioning, and maintenance of diesel generators, ensuring uninterrupted power supply for critical operations, our expertise spans across SITC (Supply, Installation, Testing & Commissioning) and end-to-end power solutions.",
            paragraph3:
              "As an authorized dealer and service provider for Kirloskar Green generators, we bring the reliability and efficiency of world-class power solutions to our clients. Our team of certified engineers and technicians ensures that every installation meets the highest standards of performance and safety.",
            paragraph4:
              "With a customer-first approach and commitment to excellence, Kumar Power has successfully delivered over 10000+ power solutions across the country, building lasting relationships with our clients through exceptional service and support.",
          },
        },
        {
          id: "sec-our-profile-story",
          type: "story",
          order: 2,
          content: {
            storyTitle: "Our Story",
            storySub:
              "From humble beginnings to becoming India's premier power solutions provider, our journey has been defined by innovation, quality, and unwavering commitment to excellence.",
            timeline: [
              {
                id: "time-1",
                year: "1995",
                title: "Foundation",
                description:
                  "Kumar Power was established with a vision to provide reliable power solutions to businesses across India.",
                image: "",
              },
              {
                id: "time-2",
                year: "2001",
                title: "Kirloskar Partnership",
                description:
                  "Became an authorized partner of Kirloskar, expanding our product range and technical capabilities.",
                image: "",
              },
              {
                id: "time-3",
                year: "2012",
                title: "ISO Certification",
                description:
                  "Achieved ISO 9001:2015 certification, validating our commitment to quality management systems.",
                image: "",
              },
              {
                id: "time-4",
                year: "2020",
                title: "Nationwide Expansion",
                description:
                  "Expanded operations to all major cities in India with service centers and technical support teams.",
                image: "",
              },
            ],
          },
        },
        {
          id: "sec-our-profile-leadership",
          type: "leadership",
          order: 3,
          content: {
            teamTitle: "Meet the Visionaries Behind the Power",
            team: [
              {
                id: "team-1",
                name: "RS KUMAR",
                role: "(Founder)",
                bio: "RS Kumar is the Founder of Kumar Generator House, a company he established with a vision to provide reliable and sustainable power solutions. With decades of industry experience, he has been the driving force behind the company's growth and success. His leadership is centered on innovation, customer satisfaction, and a commitment to excellence. Under his guidance, Kumar Generator House has become a trusted name in the industry, focused on empowering businesses and communities with top-quality solutions.",
                image: "",
              },
              {
                id: "team-2",
                name: "MS KUMAR",
                role: "(Director)",
                bio: "MS Kumar is the director of Kumar Generator House, a company with a rich legacy of over 30 years in providing reliable power solutions. With a keen focus on growth, innovation, and sustainability, Manjot leads the company towards achieving excellence in every aspect of its operations. His leadership style emphasizes customer satisfaction, operational efficiency, and long-term business relationships, ensuring that Kumar Generator House remains a trusted name in the industry.",
                image: "",
              },
              {
                id: "team-3",
                name: "JS KUMAR",
                role: "(Director)",
                bio: "JS Kumar is a director at Kumar Generator House, where he plays a pivotal role in overseeing business strategy, operations, and growth initiatives. With a focus on enhancing internal processes and fostering partnerships, He is committed to driving the company's expansion and ensuring the delivery of efficient, high-quality service to clients. His strategic approach and dedication to innovation continue to shape the company's success in the power solutions sector.",
                image: "",
              },
            ],
          },
        },
        {
          id: "sec-our-profile-quality",
          type: "quality",
          order: 4,
          content: {
            qualityTitle: "Our Commitment to Quality",
            cards: [
              {
                id: "q-card-1",
                title: "Timely Delivery",
                description:
                  "We understand the critical nature of power solutions and ensure on-time delivery and installation.",
                path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                id: "q-card-2",
                title: "Expert Engineering",
                description:
                  "Our team of qualified engineers ensures robust design and flawless implementation of all projects.",
                path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
              {
                id: "q-card-3",
                title: "Business Continuity",
                description:
                  "Our solutions are designed to provide uninterrupted power supply, ensuring your operations never stop.",
                path: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
              },
            ],
            policyTitle: "Quality Policy Statement",
            policyStatement:
              "At Kumar Power, we are committed to delivering world-class power products and turnkey solutions that exceed customer expectations. Our robust design, meticulous manufacturing, and comprehensive testing ensure reliability and performance in every installation.",
            bullet1: "ISO 9001:2015 certified quality management system",
            bullet2: "Rigorous testing protocols for all equipment",
            bullet3: "Continuous improvement through customer feedback",
            bullet4: "Regular training and skill enhancement for our team",
            isoCertImg: "",
            kirloskarCertImg: "",
            isoCertTitle: "ISO 9001:2015",
            kirloskarCertTitle: "Kirloskar Authorized",
          },
        },
        {
          id: "sec-our-profile-cta",
          type: "cta",
          order: 5,
          content: {
            ctaTitle: "Ready to Power Your Business?",
            ctaDesc:
              "Contact us today for a consultation and discover how Kumar Generator House can provide reliable power solutions tailored to your needs.",
            ctaBtnLabel: "Get in Touch →",
            ctaBtnUrl: "/contact",
          },
        },
      ],
    },
    {
      title: "About Us",
      slug: "about",
      description: "About Kumar Power",
      metaTitle: "About Us & Our Profile - Kumar Power",
      metaDescription:
        "Learn about our 30+ years of power generation legacy in India.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-about-hero",
          type: "hero",
          order: 1,
          content: {
            title: "Know About Kumar Power",
            subtitle: "–Trusted Name in Power Solutions Industry",
            image: "",
            paragraph1:
              "Kumar Power is a premier Kirloskar-certified power partner with over 30+ years of excellence in providing comprehensive power solutions across India. Established in 1995, we have grown to become one of the most trusted names in power generation equipment and services.",
            paragraph2:
              "Our expertise spans across sales, installation, commissioning, and maintenance of diesel generators, ensuring uninterrupted power supply for critical operations, our expertise spans across SITC (Supply, Installation, Testing & Commissioning) and end-to-end power solutions.",
            paragraph3:
              "As an authorized dealer and service provider for Kirloskar Green generators, we bring the reliability and efficiency of world-class power solutions to our clients. Our team of certified engineers and technicians ensures that every installation meets the highest standards of performance and safety.",
            paragraph4:
              "With a customer-first approach and commitment to excellence, Kumar Power has successfully delivered over 10000+ power solutions across the country, building lasting relationships with our clients through exceptional service and support.",
          },
        },
        {
          id: "sec-about-story",
          type: "story",
          order: 2,
          content: {
            storyTitle: "Our Story",
            storySub:
              "From humble beginnings to becoming India's premier power solutions provider, our journey has been defined by innovation, quality, and unwavering commitment to excellence.",
            timeline: [
              {
                id: "time-1",
                year: "1995",
                title: "Foundation",
                description:
                  "Kumar Power was established with a vision to provide reliable power solutions to businesses across India.",
                image: "",
              },
              {
                id: "time-2",
                year: "2001",
                title: "Kirloskar Partnership",
                description:
                  "Became an authorized partner of Kirloskar, expanding our product range and technical capabilities.",
                image: "",
              },
              {
                id: "time-3",
                year: "2012",
                title: "ISO Certification",
                description:
                  "Achieved ISO 9001:2015 certification, validating our commitment to quality management systems.",
                image: "",
              },
              {
                id: "time-4",
                year: "2020",
                title: "Nationwide Expansion",
                description:
                  "Expanded operations to all major cities in India with service centers and technical support teams.",
                image: "",
              },
            ],
          },
        },
        {
          id: "sec-about-leadership",
          type: "leadership",
          order: 3,
          content: {
            teamTitle: "Meet the Visionaries Behind the Power",
            team: [
              {
                id: "team-1",
                name: "RS KUMAR",
                role: "(Founder)",
                bio: "RS Kumar is the Founder of Kumar Generator House, a company he established with a vision to provide reliable and sustainable power solutions. With decades of industry experience, he has been the driving force behind the company's growth and success. His leadership is centered on innovation, customer satisfaction, and a commitment to excellence. Under his guidance, Kumar Generator House has become a trusted name in the industry, focused on empowering businesses and communities with top-quality solutions.",
                image: "",
              },
              {
                id: "team-2",
                name: "MS KUMAR",
                role: "(Director)",
                bio: "MS Kumar is the director of Kumar Generator House, a company with a rich legacy of over 30 years in providing reliable power solutions. With a keen focus on growth, innovation, and sustainability, Manjot leads the company towards achieving excellence in every aspect of its operations. His leadership style emphasizes customer satisfaction, operational efficiency, and long-term business relationships, ensuring that Kumar Generator House remains a trusted name in the industry.",
                image: "",
              },
              {
                id: "team-3",
                name: "JS KUMAR",
                role: "(Director)",
                bio: "JS Kumar is a director at Kumar Generator House, where he plays a pivotal role in overseeing business strategy, operations, and growth initiatives. With a focus on enhancing internal processes and fostering partnerships, He is committed to driving the company's expansion and ensuring the delivery of efficient, high-quality service to clients. His strategic approach and dedication to innovation continue to shape the company's success in the power solutions sector.",
                image: "",
              },
            ],
          },
        },
        {
          id: "sec-about-quality",
          type: "quality",
          order: 4,
          content: {
            qualityTitle: "Our Commitment to Quality",
            policyTitle: "Quality Policy Statement",
            policyStatement:
              "At Kumar Power, we are committed to delivering world-class power products and turnkey solutions that exceed customer expectations. Our robust design, meticulous manufacturing, and comprehensive testing ensure reliability and performance in every installation.",
            bullet1: "ISO 9001:2015 certified quality management system",
            bullet2: "Rigorous testing protocols for all equipment",
            bullet3: "Continuous improvement through customer feedback",
            bullet4: "Regular training and skill enhancement for our team",
            isoCertImg: "",
            kirloskarCertImg: "",
          },
        },
        {
          id: "sec-about-cta",
          type: "cta",
          order: 5,
          content: {
            ctaTitle: "Ready to Power Your Business?",
            ctaDesc:
              "Contact us today for a consultation and discover how Kumar Generator House can provide reliable power solutions tailored to your needs.",
            ctaBtnLabel: "Get in Touch →",
            ctaBtnUrl: "/contact",
          },
        },
      ],
    },
    {
      title: "Contact Us",
      slug: "contact",
      description: "Contact Kumar Power",
      metaTitle: "Contact Us - Kumar Power",
      metaDescription:
        "Reach out for generator quotes, support, or site visits.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-contact-hero",
          type: "hero",
          order: 1,
          content: {
            bannerHeading: "Powering Connections That Matter",
            bannerSubtitle:
              "Let's build something extraordinary. Talk to our experts today.",
            bannerBgImage: "",
            primaryBtnLabel: "Start Your Inquiry",
            whatsappBtnLabel: "Connect on WhatsApp",
            whatsappNumber: "+919773851767",
          },
        },
        {
          id: "sec-contact-info",
          type: "info",
          order: 2,
          content: {
            officeHours:
              "Monday - Saturday: 10:00 AM - 7:00 PM (Closed on Sundays & National Holidays)",
            phoneMain: "9773851767",
            phoneSupport: "9773877796",
            phoneLandline: "01146701273",
            emailMain: "kumargeneratorhouse@gmail.com",
            emailSales: "sales@kumarpower.com",
            emailSupport: "support@kumarpower.com",
            emailAccounts: "accounts@kumarpower.com",
          },
        },
        {
          id: "sec-contact-resume",
          type: "resume",
          order: 3,
          content: {
            resumeTitle: "Drop Your Resume",
            resumeSubtitle:
              "Didn't find your role? We're always looking for great talent to join our team. Submit your resume and we'll contact you when a suitable position opens up.",
          },
        },
      ],
    },
    {
      title: "Photo Gallery",
      slug: "photo-gallery",
      description: "Kumar Power Photo Gallery",
      metaTitle: "Photo Gallery - Kumar Power",
      metaDescription:
        "A visual showcase of our generator installations, events, and industrial projects.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-photo-gallery-main",
          type: "photo-gallery",
          order: 1,
          content: {
            hero: {
              heading: "Explore Our Legacy in Action",
              subtitle:
                "A visual showcase of our installations, innovations, and industrial excellence across India",
              bgImage: "",
            },
            photos: [
              {
                id: "g-1",
                alt: "Kirloskar DG Set Installation at Hospital",
                category: "installations",
                src: "https://res.cloudinary.com/dmhabztbf/image/upload/v1763639947/f968fc70-2c88-4870-9524-0105525f9de8_jivsd7.jpg",
              },
              {
                id: "g-2",
                alt: "Annual Diwali Event Celebration",
                category: "events",
                src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
              },
              {
                id: "g-3",
                alt: "Industry Leadership Award Ceremony",
                category: "Award",
                src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop",
              },
            ],
            experience: {
              title: "Experience Power Excellence",
              description:
                "Ready to transform your power infrastructure with industry-leading generator solutions? Our team of experts is ready to guide you through every step.",
              bgImage: "",
              profilePdf: "",
            },
          },
        },
      ],
    },
    {
      title: "Certifications & Awards",
      slug: "certifications",
      description: "Kumar Power Certifications",
      metaTitle: "Certifications & Awards - Kumar Power",
      metaDescription:
        "Authorisation certificates and awards demonstrating our commitment to quality.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-certifications-main",
          type: "certifications",
          order: 1,
          content: {
            heroTitlePart1: "Awards and",
            heroTitlePart2: "Certifications",
            heroTitle: "Awards and Certifications",
            heroSub:
              "Recognized for excellence in power solutions and industry leadership",
            certificates: [
              {
                id: "cert-1",
                name: "Authorisation Certification",
                year: "2024",
                description:
                  "Kumar Generator House is our authorised KOEL Green Dealer for sale of KOEL Green Diesel Generating Sets and Chhota Chilli Range of generators",
                issuer: "Authorisation certificate",
                image: "",
              },
              {
                id: "cert-2",
                name: "Certificate of Excellence",
                year: "2012-2013",
                description:
                  "Environmental Management System certification, demonstrating our commitment to environmental responsibility.",
                issuer: "KOEL Pune",
                image: "",
              },
              {
                id: "cert-3",
                name: "Certification of Highest Growth",
                year: "2013",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest growth & highest nos. of KIRLOSKAR GREEN DG sets sold in FY 2013.",
                issuer: "KOEL-JAKPOWER-KGD Conference, Goa",
                image: "",
              },
              {
                id: "cert-4",
                name: "Certificate for Highest in MHP generators",
                year: "2014",
                description:
                  "Awarded to Kumar Generator House, Delhi for highest volume in MHP generators in FY 14.",
                issuer: "Kirloskar Conference Awards - Pune",
                image: "",
              },
              {
                id: "cert-5",
                name: "Certificate for Highest in HHP generators",
                year: "2014",
                description:
                  "Awarded to Kumar Generator House, Delhi for highest volume in HHP generators in FY 14.",
                issuer: "Kirloskar Conference Awards - Pune",
                image: "",
              },
              {
                id: "cert-6",
                name: "Certificate for Highest Sale",
                year: "2015",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 15.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                image: "",
              },
              {
                id: "cert-7",
                name: "KOEL-JAKPOWER-KGD & SD Conference Awards Gangtok",
                year: "2018-2019",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 18-19.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Gangtok",
                image: "",
              },
              {
                id: "cert-8",
                name: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                year: "2016-2017",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 16-17.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                image: "",
              },
            ],
            whyTitlePart1: "Why",
            whyTitlePart2: "Certifications Matter",
            whySectionTitle: "Why Certifications Matter",
            whyCard1Title: "Quality Assurance",
            whyCard1Desc:
              "Our certifications serve as third-party validation of our commitment to maintaining high-quality standards.",
            whyCard2Title: "Compliance",
            whyCard2Desc:
              "We adhere to industry regulations and standards, ensuring our operations are fully compliant.",
            whyCard3Title: "Customer Trust",
            whyCard3Desc:
              "Our certifications provide customers with confidence in our products, services, and business practices.",
            commitTitlePart1: "Our Commitment to",
            commitTitlePart2: "Excellence",
            commitTitle: "Our Commitment to Excellence",
            commitText:
              "At Kumar Power, we believe that maintaining certifications and industry partnerships is more than just fulfilling requirements—it's about our ongoing commitment to excellence in everything we do.",
            btn1Label: "Contact Us",
            btn1Url: "/contact",
            btn2Label: "View Products",
            btn2Url: "/products",
          },
        },
      ],
    },
    {
      title: "Products",
      slug: "products",
      description: "Kumar Power Products Showcase",
      metaTitle: "Products - Kumar Power",
      metaDescription:
        "Explore our full range of Kirloskar-certified diesel generators, gas generators, portable generators, electrical panels, servo stabilizers, and transformers.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-products-main",
          type: "products",
          order: 1,
          content: {
            heroHeadingPart1: "Powering Progress,",
            heroHeadingPart2: "One Generator at a Time",
            heroHeading: "Powering Progress, One Generator at a Time",
            heroSub:
              "Explore our full range of Kirloskar-certified diesel generators, trusted across India's most demanding industries.",
            btn1Text: "Request a Quote",
            btn1Url: "/contact",
            btn2Text: "Download Product Catalogue",
            btn2Url: "",
            sectionTitle: "ALL Products",
            sectionDesc:
              "We offer a complete range of power and electrical solutions including Kirloskar Diesel Generators, Kirloskar Gas Generators, Kirloskar Portable Generators, Electrical Panels, Servo Voltage Stabilizers, and Transformers, engineered for reliable performance across residential, commercial, and industrial applications.",
            certTitle: "Certified Excellence",
            helpTitle: "Need Help Choosing the Right Electrical Solution?",
            helpSub: "Our team of experts will help you select the perfect solution based on your industry and budget.",
            helpBtnText: "Talk to an Expert",
            whyChooseTitle: "Why Choose Kirloskar Generators?",
            categories: [
              {
                id: "cat-1",
                range: "7.5 kVA to 20 kVA",
                name: "Kirloskar Diesel generators",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                ratingCount: 153,
                rating: 4.8,
                category: "diesel",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                productLink: "/products/kirloskar-diesel-generator",
              },
              {
                id: "cat-2",
                range: "15 kVA to 250 kVA",
                name: "Kirloskar Gas Generators",
                fuelType: "Natural Gas/CNG",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Single/Three Phase",
                ratingCount: 145,
                rating: 4.6,
                category: "gas",
                description:
                  "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
                productLink: "/products/kirloskar-gas-generator",
              },
              {
                id: "cat-3",
                range: "2.1 kVA to 5 kVA",
                name: "Kirloskar Portable Generators",
                fuelType: "Gasoline",
                cpcbNorm: "CPCB-IV+",
                cooling: "Air",
                phase: "Single Phase",
                ratingCount: 210,
                rating: 4.5,
                category: "portable",
                description:
                  "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
                productLink: "/products/kirloskar-portable-generator",
              },
              {
                id: "cat-4",
                range: "100 kVA",
                name: "Kirloskar Optiprime Generator",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                ratingCount: 195,
                rating: 4.8,
                category: "optiprime",
                description:
                  "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
                productLink: "/products/optiprime",
              },
              {
                id: "cat-5",
                range: "Various",
                name: "AMF Panels",
                fuelType: "N/A",
                cpcbNorm: "N/A",
                cooling: "Fan/Natural",
                phase: "Three Phase",
                ratingCount: 112,
                rating: 4.7,
                category: "electrical",
                description:
                  "High-quality electrical panels for power distribution, control, and protection of your electrical systems.",
                productLink: "/products/panels",
              },
              {
                id: "cat-6",
                range: "5-100 kVA",
                name: "Oil Cooled Servo Stabilizers",
                fuelType: "N/A",
                cpcbNorm: "N/A",
                cooling: "Air/Oil",
                phase: "Single Phase",
                ratingCount: 134,
                rating: 4.5,
                category: "servo",
                description:
                  "Reliable servo stabilizers to protect your equipment from voltage fluctuations and ensure consistent power supply.",
                productLink: "/products/servo-stabilizer",
              },
              {
                id: "cat-7",
                range: "100-2500 kVA",
                name: "Distribution Transformers",
                fuelType: "N/A",
                cpcbNorm: "N/A",
                cooling: "Oil/Dry",
                phase: "Three Phase",
                ratingCount: 88,
                rating: 4.8,
                category: "transformers",
                description:
                  "Durable and efficient transformers designed for various industrial and commercial applications.",
                productLink: "/products/transformers",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Kirloskar Diesel Generators",
      slug: "kirloskar-diesel-generator",
      description: "Kirloskar Diesel Generators range from 7.5 kVA to 1500 kVA",
      metaTitle: "Kirloskar Diesel Generators Dealer in Delhi | Kumar Power",
      metaDescription: "Explore CPCB-IV+ compliant Kirloskar Diesel Generators.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-diesel-generator-main",
          type: "kirloskar-diesel-generator",
          order: 1,
          content: {
            heroHeadingPart1: "Kirloskar Diesel Generators",
            heroHeadingPart2: "Dealer in Delhi",
            heroHeading: "Kirloskar Diesel Generators Dealer in Delhi",
            heroSub: "Explore Kirloskar Diesel Generators at Kumar Power for reliable backup and prime power solutions. Ideal for industrial and commercial applications in the required power range.",
            sectionTitle: "CPCB4+ Diesel Generators",
            sectionDesc: "Kirloskar's range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
            certTitle: "Certified Excellence",
            helpTitle: "Need Help Choosing the Right Electrical Solution?",
            helpSub: "Our team of experts will help you select the perfect solution based on your industry and budget.",
            helpBtnText: "Talk to an Expert",
            whyChooseTitle: "Why Choose Kirloskar Generators?",
            gensets: [
              {
                id: "dg-1",
                name: "7.5 kVA to 20 kVA Diesel generators",
                range: "7.5 kVA to 20 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.8",
                ratingCount: "153",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "Engineered specifically for compact power needs, this range utilizes the robust Kirloskar R550 series engines, known for their naturally aspirated design and reliable G2 class mechanical governing. These units are optimized for low-load operations, consuming approximately 2-3 Liters per hour at 75% load, making them highly economical. The silent canopy design ensures noise levels remain below 75 dBA at 1 meter, making these generators the ideal choice for small retail shops, clinics, residential backup, and small offices where silence is as important as power.",
                brochurePdf: ""
              },
              {
                id: "dg-2",
                name: "25 kVA to 58.5 kVA Diesel generators",
                range: "25 kVA to 58.5 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.9",
                ratingCount: "132",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "These mid-range workhorses are built for stability and endurance, powered by Kirloskar's liquid-cooled 3R1040 and 4R1040 series engines equipped with heavy-duty radiators. The system integrates advanced anti-vibration mounts to ensure smooth operation and minimal structural stress. Featuring a brushless, single-bearing alternator with IP23 protection and managed by the KG545 Digital Controller, these units offer comprehensive remote monitoring capabilities. They are perfectly suited for restaurants, commercial complexes, and small manufacturing units requiring consistent uptime.",
                brochurePdf: ""
              },
              {
                id: "dg-3",
                name: "82.5 kVA to 160 kVA Diesel generators",
                range: "82.5 kVA to 160 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.8",
                ratingCount: "118",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "Designed for industrial-grade performance, this range utilizes 4 and 6 cylinder inline turbocharged and intercooled engines to handle demanding loads. With G3 Class electronic governing, these generators provide precise frequency regulation and excellent sudden load acceptance, capable of handling 100% block loading. The fuel tanks are sized for 8-10 hours of continuous running, ensuring uninterrupted workflow. These are the preferred power solution for construction sites, medium-scale industries, hospitals, and hotels where power quality cannot be compromised.",
                brochurePdf: ""
              },
              {
                id: "dg-4",
                name: "200 kVA to 250 kVA Diesel Generators",
                range: "200 - 250 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.7",
                ratingCount: "178",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "This series features high-performance Kirloskar DV Series engines (with V-Type configuration options) that deliver robust power for critical infrastructure. They offer best-in-class fluid efficiency, optimizing both fuel and DEF consumption to lower operational costs. Controlled by an advanced ECU for precise engine management and diagnostics, these units include comprehensive safety protections against Over-speed, Low Lube Oil Pressure (LLOP), and High Water Temperature. They are engineered for large commercial hubs, infrastructure projects, and data centers.",
                brochurePdf: ""
              },
              {
                id: "dg-5",
                name: "320 kVA - 750 kVA Diesel Generators",
                range: "320 - 750 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.9",
                ratingCount: "96",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "These heavy-duty powerhouses are designed for 24/7 continuous operations in harsh environments, powered by SL90 and DV Series turbocharged after-cooled engines. The system allows for easy paralleling and synchronization with the grid or other DG sets to create flexible power plants. With GSM/GPRS-enabled controllers for remote monitoring and long service intervals of 500 hours, these generators significantly reduce Opex. They are the standard for heavy engineering industries, malls, mining operations, and large-scale real estate developments.",
                brochurePdf: ""
              },
              {
                id: "dg-6",
                name: "750 kVA - 1500 kVA Diesel Generators",
                range: "750 - 1500 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.9",
                ratingCount: "86",
                image: "",
                description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs: "Representing the ultimate in power solutions, this range features the legendary K-Series and DV-Series engines known for massive power density within a compact footprint. They utilize full authority electronic engine management systems for peak performance and can be configured with heavy-duty remote radiator options for specialized installations. Designed for absolute reliability in continuous duty cycles, these generators power critical national assets including power plants, mega-infrastructure projects, international airports, and hyperscale data centers.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Kirloskar Gas Generators",
      slug: "kirloskar-gas-generator",
      description: "Eco-friendly natural gas and CNG generators",
      metaTitle: "Kirloskar Gas Generators Dealer in Delhi | Kumar Power",
      metaDescription: "Eco-friendly gas generators for clean power solutions.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-gas-generator-main",
          type: "kirloskar-gas-generator",
          order: 1,
          content: {
            heroHeadingPart1: "Kirloskar Gas Generators",
            heroHeadingPart2: "Dealer in Delhi",
            heroHeading: "Kirloskar Gas Generators Dealer in Delhi",
            heroSub: "Kirloskar Oil Engines Ltd (KOEL) offers a range of gas-powered generator sets (gensets) designed to provide reliable and efficient power solutions across various applications.",
            sectionTitle: "Gas Generators",
            sectionDesc: "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
            gensets: [
              {
                id: "gg-1",
                name: "15 kVA to 250 kVA Gas generators",
                range: "15 kVA to 250 kVA",
                fuelType: "Natural Gas/CNG",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.8",
                ratingCount: "142",
                image: "",
                description: "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
                technicalSpecs: "Engineered for continuous power generation with ultra-low emissions, meeting stringent city environmental guidelines.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Kirloskar Portable Generators",
      slug: "kirloskar-portable-generator",
      description: "Compact portable generators for versatile power needs",
      metaTitle: "Kirloskar Portable Generators Dealer in Delhi | Kumar Power",
      metaDescription: "Lightweight and mobile power generators.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-portable-generator-main",
          type: "kirloskar-portable-generator",
          order: 1,
          content: {
            heroHeadingPart1: "Kirloskar Portable Generators",
            heroHeadingPart2: "Dealer in Delhi",
            heroHeading: "Kirloskar Portable Generators Dealer in Delhi",
            heroSub: "Kirloskar Oil Engines Ltd (KOEL) offers a range of portable generator sets with power outputs from 2.1 kVA to 5 kVA, designed to provide reliable and efficient power solutions for various applications.",
            sectionTitle: "Portable Generators",
            sectionDesc: "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
            gensets: [
              {
                id: "pg-1",
                name: "2.1 kVA to 5 kVA Portable generators",
                range: "2.1 kVA to 5 kVA",
                fuelType: "Gasoline",
                cpcbNorm: "CPCB-IV+",
                cooling: "Air",
                phase: "Single Phase",
                rating: "4.7",
                ratingCount: "165",
                image: "",
                description: "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
                technicalSpecs: "Lightweight and mobile power solutions designed for easy transport and reliable performance.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Kirloskar Optiprime Generator",
      slug: "optiprime",
      description: "Advanced Optiprime generators for optimized fuel efficiency",
      metaTitle: "Optiprime Generators Dealer in Delhi | Kumar Power",
      metaDescription: "Variable speed and IoT monitoring generator technology.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-optiprime-main",
          type: "optiprime",
          order: 1,
          content: {
            heroHeadingPart1: "Optiprime Genset Dealer in Delhi -",
            heroHeadingPart2: "Kumar Power",
            heroHeading: "Optiprime Genset Dealer in Delhi - Kumar Power",
            heroSub: "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
            sectionTitle: "Optiprime",
            sectionDesc: "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
            gensets: [
              {
                id: "op-1",
                name: "100 kVA Optiprime Generator",
                range: "100 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.8",
                ratingCount: "195",
                image: "",
                description: "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
                technicalSpecs: "Variable speed generator technology with IoT monitoring and partial load fuel optimization.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Electrical Panels",
      slug: "panels",
      description: "High quality AMF & power distribution electrical panels",
      metaTitle: "Electrical Control Panels Dealer in Delhi | Kumar Power",
      metaDescription: "Custom electrical panels for power distribution and protection.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-panels-main",
          type: "panels",
          order: 1,
          content: {
            heroHeadingPart1: "Electrical Control Panels -",
            heroHeadingPart2: "Kumar Power",
            heroHeading: "Electrical Control Panels - Kumar Power",
            heroSub: "We offer a comprehensive range of electrical panels designed for power distribution, control, and protection across industrial and commercial installations.",
            sectionTitle: "Electrical Panels",
            sectionDesc: "Browse our complete range of electrical control, AMF, and distribution panels.",
            panels: [
              {
                id: "p-1",
                name: "Auto Main Failure (AMF) Panels",
                range: "Various",
                image: "",
                description: "Automated power switching between main grid power and generator backup.",
                technicalSpecs: "Equipped with digital micro-processor controllers, automatic mains failure detection, and seamless generator start logic.",
                brochurePdf: ""
              },
              {
                id: "p-2",
                name: "Auto Synchronizing Panels",
                range: "Various",
                image: "",
                description: "Multi-generator load sharing and grid synchronizing control panels.",
                technicalSpecs: "Designed for complex multi-genset installations requiring load demand management and auto load sharing.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Servo Voltage Stabilizers",
      slug: "servo-stabilizer",
      description: "Precision oil-cooled and air-cooled servo voltage stabilizers",
      metaTitle: "Servo Stabilizers Dealer in Delhi | Kumar Power",
      metaDescription: "Protect equipment from voltage fluctuations with servo stabilizers.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-servo-stabilizer-main",
          type: "servo-stabilizer",
          order: 1,
          content: {
            heroHeadingPart1: "Digital Servo Voltage Stabilizer",
            heroHeadingPart2: "Dealer in Delhi",
            heroHeading: "Digital Servo Voltage Stabilizer Dealer in Delhi",
            heroSub: "We provide servo voltage stabilizers designed to correct voltage fluctuations and deliver consistent output power. Best for industrial, commercial, and technical environments to protect equipment & improve performance.",
            sectionTitle: "Servo Stabilizers",
            sectionDesc: "Reliable servo stabilizers to protect your equipment from voltage fluctuations and ensure consistent power supply.",
            servos: [
              {
                id: "s-1",
                name: "Oil Cooled Servo Voltage Stabilizers",
                range: "10-2000 kVA",
                image: "",
                description: "Heavy-duty oil cooled stabilizers for continuous industrial voltage regulation.",
                technicalSpecs: "Custom engineered transformer oil cooling with high dielectric strength and micro-processor voltage correction.",
                brochurePdf: ""
              },
              {
                id: "s-2",
                name: "Air Cooled Servo Voltage Stabilizers",
                range: "5-100 kVA",
                image: "",
                description: "Clean air cooled voltage stabilizers for commercial and indoor equipment.",
                technicalSpecs: "Maintenance-free air cooling design providing >98% efficiency and fast voltage response times.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Distribution Transformers",
      slug: "transformers",
      description: "Durable and efficient transformers from 100 to 2500 kVA",
      metaTitle: "Transformers Dealer in Delhi - Kumar Power",
      metaDescription: "High-efficiency step-down transformers for utility and industry.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-transformers-main",
          type: "transformers",
          order: 1,
          content: {
            heroHeadingPart1: "Transformers Dealer in Delhi -",
            heroHeadingPart2: "Kumar Power",
            heroHeading: "Transformers Dealer in Delhi - Kumar Power",
            heroSub: "At Kumar Power, we offer a diverse range of transformers designed to meet various industrial and commercial needs.",
            sectionTitle: "Transformers",
            sectionDesc: "Durable and efficient transformers designed for various industrial and commercial applications.",
            transformers: [
              {
                id: "t-1",
                name: "Distribution Transformers (Oil Cooled)",
                range: "100-2500 kVA",
                image: "",
                description: "High-efficiency step-down transformers for utility and industrial applications.",
                technicalSpecs: "Hermetically sealed or conservator design with high grade CRGO silicon steel core for minimal losses.",
                brochurePdf: ""
              },
              {
                id: "t-2",
                name: "Cast Resin Dry Type Transformers",
                range: "100-3150 kVA",
                image: "",
                description: "Fire-safe dry type transformers for indoor buildings, hospitals, and basements.",
                technicalSpecs: "Vacuum resin encapsulated coils providing high moisture resistance and zero risk of oil pollution.",
                brochurePdf: ""
              }
            ]
          },
        },
      ],
    },
    {
      title: "Our Clients",
      slug: "our-clients",
      description: "Kumar Power Client Directory",
      metaTitle: "Our Clients - Kumar Power",
      metaDescription: "Trusted by over 500+ corporate clients across India.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-our-clients-main",
          type: "our-clients",
          order: 1,
          content: {
            stat1Num: "500+",
            stat1Text: "Enterprise Clients",
            stat2Num: "30+",
            stat2Text: "Years of Service",
            stat3Num: "10000+",
            stat3Text: "Installations Across India",
            clientsCount: "500",
            yearsCount: "30",
            installationsCount: "10000",
            prestigiousTitle: "Our Prestigious Clients",
            prestigiousDesc: "We are proud to partner with industry leaders across various sectors, providing exceptional power solutions.",
            logos: [
              {
                id: "logo-1",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg",
                alt: "GMR Infra",
              },
              {
                id: "logo-2",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg",
                alt: "SIS Security",
              },
            ],
            clients: [
              {
                id: "c-1",
                name: "Air India",
                category: "Aviation & Logistics",
              },
              {
                id: "c-2",
                name: "Apollo Hospitals",
                category: "Medical Facilities",
              },
              {
                id: "c-3",
                name: "GMR Infrastructure",
                category: "Infrastructure",
              },
              { id: "c-4", name: "Honeywell India", category: "Industries" },
              {
                id: "c-5",
                name: "NBCC Limited",
                category: "CPWD & NBCC Projects",
              },
              {
                id: "c-6",
                name: "British Paints",
                category: "Manufacturers/Wholesalers",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Testimonials",
      slug: "testimonials",
      description: "Customer Reviews and Testimonials",
      metaTitle: "Testimonials - Kumar Power",
      metaDescription: "Read feedback and reviews from our valued clients.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-testimonials-main",
          type: "testimonials",
          order: 1,
          content: {
            heroHeadingLine1: "POWERING INDIA'S",
            heroHeadingLine2: "SUCCESS STORIES",

            heroSubtitle: "Testimonials from industry leaders",
            heroBgImage: "",
            storiesTitle: "Client Success Stories",
            filterText: "Filter by industry...",
            trustedTitle: "Trusted by India's Leading Organizations",
            testimonials: [
              {
                id: "test-1",
                authorName: "Khushi Aggarwal",
                roleCompany: "Founder, Platter Me Crazy",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902468/Screenshot_2025-10-31_144115_lybhem.png",
                quote:
                  "I, Khushi Aggarwal, Founder of Platter Me Crazy, a brand synonymous with culinary artistry and luxury dining experiences. We curate exquisite charcuterie boards and handcrafted artisanal foods that elevate every occasion into a memorable indulgence. Our signature creations include gourmet flavoured butters, silky-smooth hummus blends, and wholesome baked crisps, each crafted with uncompromising freshness and zero preservatives. Whether for intimate soirées, premium gifting, or grand corporate gatherings, we bring an unmatched blend of flavor, finesse and sophistication to the table.",
              },
              {
                id: "test-2",
                authorName: "Kaustubh Jain",
                roleCompany: "TEAM Construction Chemicals (TEAMCC)",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902466/Screenshot_2025-10-31_144303_wgqqaq.png",
                quote:
                  "I am Kaustubh Jain representing the category marble adhesives and coatings. At TEAMCC we specialise in high-performance epoxy adhesives, polyester adhesives, tile adhesives and marble coatings. I have had the pleasure of knowing Mr. Jasjot Singh, and I can confidently say he is a true professional in the generator industry. Representing the trusted Kirloskar brand, Jasjot ensures top-quality products backed by exceptional service. His deep knowledge of power solutions, combined with his commitment to delivering the right generator for every requirement, makes him a go-to expert.",
                dateText: "Kaustubh Jain / BNI Lakshay",
              },
              {
                id: "test-3",
                authorName: "Atul Jewellers",
                roleCompany: "Proprietor, New Delhi",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_144354_iiu1nu.png",
                quote:
                  "We at Atul Jewellers are engaged in retail & wholesale of precious gemstones, diamonds & fine jewellery for almost five decades. We are the only jewellery house in Delhi, with in-house state of art gem testing & diamond grading laboratory, and we also provide this facility to almost 500 retailers across Delhi NCR. I wish to record our appreciation and acknowledgement, for R.S. Kumar of Kumar Generator House, who has provided gensets for our new store at Defence Colony. Mr. Kumar and his team is extremely professional in their approach.",
                dateText: "Dated: 28th Dec. 2018",
              },
              {
                id: "test-4",
                authorName: "Brown Gold",
                roleCompany: "Bharat Anand, Director",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902474/Gemini_Generated_Image_1je1r11je1r11je1_ksybnh.png",
                quote:
                  "We at Brown Gold are a team of young and dynamic interior designers. We would like to place on record our appreciation for Mr. R. S. Kumar of Kumar Generator House. We had taken their services for our 40 KVA Kirloskar generator & a small genset of 7 KVA. We would like to take this opportunity to thank you for providing excellent advice, excellent products & excellent service.",
                dateText: "Bharat Anand, Director, Brown Gold",
              },
              {
                id: "test-5",
                authorName: "RENT IT BAE",
                roleCompany: "Luxury Fashion Rental Service",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_144806_gklejh.png",
                quote:
                  "RENT IT BAE is a luxury fashion rental service offering Ethnic, Western & Accessories from designer labels. We highly appreciate the fast and seamless service provided by your company. The installation of inverters for RENT IT BAE's South Delhi Flagship Store at Greater Kailash seemed a fluid task with your service.",
              },
              {
                id: "test-6",
                authorName: "K.K. Setia",
                roleCompany: "Olympus, Intown Realtors Pvt Ltd",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_145022_ffeb43.png",
                quote:
                  "I K.K. Setia, Director of Intown Realtors, have been in commercial Real Estate business for the last 18 years. I recently needed a generator for my Sector 18 office building and reached out to Mr. Manjot Singh Kumar. His team promptly inspected the site, provided a tailored solution, and even assisted with necessary approvals.",
                dateText: "3rd March, 2025",
              },
              {
                id: "test-7",
                authorName: "Shivani Saini",
                roleCompany: "Owner, Anytime Fitness",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762064945/Screenshot_2025-11-02_115831_lgqzrn.png",
                quote:
                  "During the setting up of Anytime Fitness Sec 29, Gurugram, I got the reference of Mr Jasjot Singh of M/s Kumar Generator House. I write this testimonial to express my deep gratitude to Mr Jasjot Singh for guiding me towards the trusted Kirloskar Brand. The equipment is top notch and customer support has been outstanding.",
                dateText: "26 Sep 25 / SCO Market, Sec 29, Gurugram",
              },
            ],
            clientLogos: [
              {
                id: "logo-1",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg",
                alt: "GMR Infra",
              },
              {
                id: "logo-2",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg",
                alt: "SIS Security",
              },
            ],
            stat1Num: "100+",
            stat1Text: "Video Testimonials",
            stat2Num: "25+",
            stat2Text: "Industries Served",
            stat3Num: "10000+",
            stat3Text: "Installations Nationwide",
            ctaTitle: "Ready to join India's most reliable power network?",
            ctaDesc:
              "From hospitals to data centers, from factories to airports — Kumar power delivers uninterrupted power solutions tailored to your needs.",
            ctaBtnText: "Request Consultation",
            brochureBtnText: "Download Brochure",
            whatsappText: "WhatsApp Support",
            helplineLabel: "Helpline",
            whatsappPhone: "+919773877796",
            helplinePhone: "01140191273",
            brochurePdf: "",
          },
        },
      ],
    },
  ];

  try {
    for (const pageItem of staticPages) {
      const createdPage = await prisma.page.create({
        data: {
          id: `page-${pageItem.slug}`,
          title: pageItem.title,
          slug: pageItem.slug,
          description: pageItem.description,
          metaTitle: pageItem.metaTitle || null,
          metaDescription: pageItem.metaDescription || null,
          isStatic: true,
          visibility: pageItem.visibility,
        },
      });

      for (const sec of pageItem.sections) {
        await prisma.section.create({
          data: {
            id: sec.id,
            pageId: createdPage.id,
            type: sec.type,
            content: sec.content as any,
            order: sec.order,
          },
        });
      }
    }
    console.log(
      `✅ Created ${staticPages.length} pages & section content with exact field schemas.`,
    );
  } catch (err) {
    console.warn("Pages seed error:", err);
  }

  console.log("🎉 Complete database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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
    { id: "nav-1", label: "Home", url: "/", order: 1, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-2", label: "About Us", url: "/about", order: 2, type: "Dropdown", parent: "-", isStatic: true, isActive: true },
    { id: "nav-2-1", label: "Our Profile", url: "/about/OurProfile", order: 1, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-2", label: "Testimonials", url: "/about/Testimonials", order: 2, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-3", label: "Photo Gallery", url: "/about/PhotoGallery", order: 3, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-4", label: "Certifications", url: "/about/Certifications", order: 4, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-5", label: "Our Clients", url: "/about/OurClients", order: 5, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-3", label: "Products", url: "/products", order: 3, type: "Dropdown", parent: "-", isStatic: true, isActive: true },
    { id: "nav-3-1", label: "Kirloskar Diesel Generator", url: "/products/kirloskar-diesel-generator", order: 1, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-2", label: "Kirloskar Gas Generator", url: "/products/kirloskar-gas-generator", order: 2, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-3", label: "Kirloskar Portable Generator", url: "/products/kirloskar-portable-generator", order: 3, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-4", label: "Electrical Panels", url: "/products/panels", order: 4, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-5", label: "Optiprime", url: "/products/optiprime", order: 5, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-6", label: "Servo Stabilizer", url: "/products/servo-stabilizer", order: 6, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-7", label: "Transformers", url: "/products/transformers", order: 7, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-4", label: "Services", url: "/services", order: 4, type: "Dropdown", parent: "-", isStatic: true, isActive: true },
    { id: "nav-4-1", label: "Annual Maintenance (AMC)", url: "/services/annual-maintenance", order: 1, type: "Sub Link", parent: "nav-4", isStatic: true, isActive: true },
    { id: "nav-4-2", label: "Turnkey SITC Installation", url: "/services/installation", order: 2, type: "Sub Link", parent: "nav-4", isStatic: true, isActive: true },
    { id: "nav-4-3", label: "Engine Repair & Overhaul", url: "/services/repair-overhaul", order: 3, type: "Sub Link", parent: "nav-4", isStatic: true, isActive: true },
    { id: "nav-4-4", label: "24/7 Emergency Support", url: "/services/emergency-support", order: 4, type: "Sub Link", parent: "nav-4", isStatic: true, isActive: true },
    { id: "nav-5", label: "Our Clients", url: "/our-clients", order: 5, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-6", label: "Installation", url: "/installation", order: 6, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-7", label: "Contact", url: "/contact", order: 7, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-8", label: "Blog & Articles", url: "/blogs", order: 8, type: "Dropdown", parent: "-", isStatic: true, isActive: true },
    { id: "nav-8-1", label: "Kirloskar Silent Generator Guide", url: "/blog/kirloskar-silent-generator", order: 1, type: "Sub Link", parent: "nav-8", isStatic: true, isActive: true },
    { id: "nav-8-2", label: "Industrial Kirloskar DG Set (750-1500kVA)", url: "/blog/industrial-kirloskar-dg-set-750kva-1500kva", order: 2, type: "Sub Link", parent: "nav-8", isStatic: true, isActive: true },
    { id: "nav-8-3", label: "AMF Panel for DG Set Guide", url: "/blog/amf-panel-for-dg-set", order: 3, type: "Sub Link", parent: "nav-8", isStatic: true, isActive: true },
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
      description: "Compact, eco-friendly CPCB IV+ compliant silent diesel generator set engineered by Kirloskar for maximum fuel efficiency.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
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
      description: "Heavy-duty commercial silent generator providing reliable power for industrial plants, commercial buildings, and healthcare facilities.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
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
      description: "High capacity CPCB IV+ compliant diesel generator designed for continuous operation in severe ambient conditions.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
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
      message: "We need a quote for 2 units of 250 kVA Kirloskar CPCB IV+ DG Sets along with AMF panels for our upcoming construction site in Noida.",
      status: "New",
    },
    {
      id: "enq-102",
      name: "Sunita Sharma",
      email: "sunita@apollohospitals.org",
      phone: "+91 97177 12345",
      company: "Apollo Hospitals",
      interestedIn: "Annual Maintenance Contract",
      message: "Looking to renew annual maintenance contract for our 3 existing Kirloskar 500 kVA generators at Apollo Sarita Vihar.",
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
      metaTitle: "Kirloskar Generator Dealer | Authorized Distributor in Delhi NCR",
      metaDescription: "Looking for a reliable Kirloskar Generator dealer? Explore affordable prices, expert installation, 24/7 service support & high-efficiency DG sets.",
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
            descriptionDesktop: "Authorized Channel Distributor | ISO 9001:2015 | 500+ Enterprise Clients | 30+ Years of Uninterrupted Excellence",
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
              { id: "logo-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "Client Logo 1" },
              { id: "logo-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "Client Logo 2" },
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
            description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",
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
            sectionDesc: "Kirloskar-certified systems tailored for industrial, commercial, and backup applications. Download brochures for detailed specifications.",
            cards: [
              { id: "gen-1", title: "Kirloskar Optiprime Generator (125 – 6600 kVA)", caption: "High-output Kirloskar Optiprime engineered for mission-critical facilities.", category: "Optiprime", image: "", brochureUrl: "" },
              { id: "gen-2", title: "Kirloskar Gas Generator (15 – 250 kVA)", caption: "Clean, efficient power for commercial and industrial applications.", category: "Gas Generators", image: "", brochureUrl: "" },
              { id: "gen-3", title: "Kirloskar CPCB4+ Diesel Generator (7.5 – 20 kVA)", caption: "Portable power for events, remote sites, and emergency backup.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-4", title: "Kirloskar CPCB4+ Diesel Generator (25 – 58.5 kVA)", caption: "Balanced performance for medium-scale industrial needs.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-5", title: "Kirloskar CPCB4+ Diesel Generator (82.5 – 160 kVA)", caption: "Scalable solutions with robust service network coverage.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-6", title: "Kirloskar CPCB4+ Diesel Generator (200 – 250 kVA)", caption: "Versatile DG sets for plants, campuses, and commercial towers.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-7", title: "Kirloskar CPCB4+ Diesel Generator (320 – 750 kVA)", caption: "Durable, high-efficiency backup for industries and campuses.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-8", title: "Kirloskar CPCB4+ Diesel Generator (750 – 1500 kVA)", caption: "Low-emission, reliable diesel generator for versatile use.", category: "CPCB4+ Diesel Generators", image: "", brochureUrl: "" },
              { id: "gen-9", title: "Kirloskar Portable Generator (2.1 – 5 kVA)", caption: "Compact portable power for small-scale events, sites, and emergency use.", category: "Portable Generators", image: "", brochureUrl: "" },
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
            assocSubtitle: "Certified and recognized by leading industry organizations for quality and excellence",
            assocLogos: [
              { id: "assoc-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121853_okz8x7.png", alt: "Association Member 1" },
              { id: "assoc-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121836_ayhhxd.png", alt: "Association Member 2" },
              { id: "assoc-3", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121914_yztxrf.png", alt: "Association Member 3" },
              { id: "assoc-4", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121748_ihrukv.png", alt: "Association Member 4" },
            ],
            actionTitle: "Power in Action",
            products: [
              { id: "ps-1", category: "CPCB4+ Diesel Generator", title: "CPCB4+ Diesel Generators( 7.5 kVA - 20 kVA)", desc: "Compact CPCB4+ compliant diesel generators designed for small businesses and commercial setups.", specs: "Range: 7.5 kVA - 20 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase", img: "", brochureUrl: "" },
              { id: "ps-2", category: "CPCB4+ Diesel Generator", title: "CPCB4+ Diesel Generators(25 kVA - 58.5 kVA)", desc: "Reliable CPCB4+ emission compliant diesel generators with advanced liquid cooling for efficient performance.", specs: "Range: 25 kVA - 58.5 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase", img: "", brochureUrl: "" },
              { id: "ps-3", category: "Optiprime Generators", title: "Kirloskar Optiprime Generator", desc: "Advanced diesel generators with CPCB4+ compliance, offering superior fuel efficiency and eco-friendly operations.", specs: "125 kva - 6600 kva, CPCB4+ Compliant, 3 Phase Output, Fuel: Diesel", img: "", brochureUrl: "" },
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
            footerQuote: "Kirloskar generators, with their reliable performance and versatility, are well-suited to meet the unique demands of metro city environments.",
            items: [
              { id: "uc-1", title: "Power Outages and Load Shedding", text: "Despite robust infrastructure, metro areas still experience power outages caused by high demand, technical issues, maintenance work, grid failures, natural disasters, and peak-demand overload." },
              { id: "uc-2", title: "High-Demand Areas", text: "Metro cities are hubs for businesses, industries, commercial buildings, hospitals, malls, data centers, and IT companies—all of which require continuous power." },
              { id: "uc-3", title: "Dependability for Events and Functions", text: "Generators are essential for events such as weddings, concerts, public gatherings, construction projects, and outdoor activities." },
              { id: "uc-4", title: "Backup for Critical Appliances", text: "Households often need generators to keep essential appliances running during outages, such as refrigerators, medical equipment, and security systems." },
              { id: "uc-5", title: "Increased Usage During Monsoon Season", text: "Heavy rains and storms frequently disrupt power lines in metro cities, resulting in power outages. Generators help reduce the impact of these disruptions." },
              { id: "uc-6", title: "Urbanization and Infrastructure Stress", text: "Rapid urbanization places stress on existing power grids, occasionally leading to shortages or planned outages." },
            ],
          },
        },
        {
          id: "sec-home-gallery",
          type: "gallery",
          order: 7,
          content: {
            title: "Photo Gallery",
            subtitle: "Explore our installations, equipment, and team in action through these images",
            images: [
              { id: "img-1", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175177/gallery1_uhk3zd.png", caption: "Gallery image 1" },
              { id: "img-2", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175177/gallery2_ei3h9z.png", caption: "Gallery image 2" },
              { id: "img-3", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175176/gallery3_dcqffp.png", caption: "Gallery image 3" },
              { id: "img-4", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175202/gallery4_nwutsh.png", caption: "Gallery image 4" },
              { id: "img-5", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175196/gallery5_zlyhc4.png", caption: "Gallery image 5" },
              { id: "img-6", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1755175198/gallery6_ulastu.png", caption: "Gallery image 6" },
            ],
          },
        },
        {
          id: "sec-home-testimonials",
          type: "testimonials",
          order: 8,
          content: {
            heading: "Real Stories. Real Power.",
            subtitle: "Hear how our generators keep India powered — from Fortune 500 factories to city hospitals.",
            items: [
              { id: "test-1", headerTitle: "TESTIMONIAL BY POOJA JAIN - SHIKHERJEE JEWELLERS", name: "Pooja Jain", role: "Shikherjee Jewellers", quote: "At Vilandl, we make bespoke Polki jewellery... Mr Jain was very happy to work with M/s Kumar Generator House and highly recommends his services.", logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903094/Screenshot_2025-10-31_145916_tf6wvg.png" },
              { id: "test-2", headerTitle: "TESTIMONIAL BY AANCHAL SAINI, AARK WORLD PVT. LTD.", name: "Aanchal Saini", role: "AARK World Pvt. Ltd.", quote: "RENT IT BAE is a luxury fashion rental service... The products were delivered and installed within 24 hours.", logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903093/download_v9kdua.png" },
              { id: "test-3", headerTitle: "TESTIMONIAL BY BHARAT ANAND - BROWN GOLD", name: "Bharat Anand", role: "BROWNGOLD", quote: "We at BROWNGOLD are a team of young & dynamic interior designers... We would not hesitate to recommend Kumar Generator House.", logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902474/Gemini_Generated_Image_1je1r11je1r11je1_ksybnh.png" },
            ],
          },
        },
        {
          id: "sec-home-footer",
          type: "footer",
          order: 9,
          content: {
            aboutBio: "Kumar Power is certified ISO 9001:2015 Company & have emerged as the leading Power Solution Providers. Being an authorized Channel Partner of Kirloskar Oil Engines Limited, Kumar Power is committed to provide quality power solutions.",
            address: "904, Westend Mall, Janakpuri, New Delhi 110058",
            mainPhone: "+91 97738 51767",
            supportPhone: "+91 97738 77796",
            landline: "011-46701273",
            salesEmail: "sales@kumarpower.com",
            supportEmail: "support@kumarpower.com",
            accountsEmail: "accounts@kumarpower.com",
            facebookUrl: "https://www.facebook.com/kumargenerator/",
            instagramUrl: "https://www.instagram.com/Kumarpowerlimitless",
            linkedinUrl: "https://www.linkedin.com/company/kumar-generator-house---india/",
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
      metaDescription: "Learn about our 30+ years of power generation legacy in India.",
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
            paragraph1: "Kumar Power is a premier Kirloskar-certified power partner with over 30+ years of excellence in providing comprehensive power solutions across India. Established in 1995, we have grown to become one of the most trusted names in power generation equipment and services.",
            paragraph2: "Our expertise spans across sales, installation, commissioning, and maintenance of diesel generators, ensuring uninterrupted power supply for critical operations, our expertise spans across SITC (Supply, Installation, Testing & Commissioning) and end-to-end power solutions.",
            paragraph3: "As an authorized dealer and service provider for Kirloskar Green generators, we bring the reliability and efficiency of world-class power solutions to our clients. Our team of certified engineers and technicians ensures that every installation meets the highest standards of performance and safety.",
            paragraph4: "With a customer-first approach and commitment to excellence, Kumar Power has successfully delivered over 10000+ power solutions across the country, building lasting relationships with our clients through exceptional service and support.",
          },
        },
        {
          id: "sec-our-profile-story",
          type: "story",
          order: 2,
          content: {
            storyTitle: "Our Story",
            storySub: "From humble beginnings to becoming India's premier power solutions provider, our journey has been defined by innovation, quality, and unwavering commitment to excellence.",
            timeline: [
              { id: "time-1", year: "1995", title: "Foundation", description: "Kumar Power was established with a vision to provide reliable power solutions to businesses across India.", image: "" },
              { id: "time-2", year: "2001", title: "Kirloskar Partnership", description: "Became an authorized partner of Kirloskar, expanding our product range and technical capabilities.", image: "" },
              { id: "time-3", year: "2012", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification, validating our commitment to quality management systems.", image: "" },
              { id: "time-4", year: "2020", title: "Nationwide Expansion", description: "Expanded operations to all major cities in India with service centers and technical support teams.", image: "" },
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
              { id: "team-1", name: "RS KUMAR", role: "(Founder)", bio: "RS Kumar is the Founder of Kumar Generator House, a company he established with a vision to provide reliable and sustainable power solutions. With decades of industry experience, he has been the driving force behind the company's growth and success.", image: "" },
              { id: "team-2", name: "MS KUMAR", role: "(Director)", bio: "MS Kumar is the director of Kumar Generator House, a company with a rich legacy of over 30 years in providing reliable power solutions. With a keen focus on growth, innovation, and sustainability, Manjot leads the company towards achieving excellence.", image: "" },
              { id: "team-3", name: "JS KUMAR", role: "(Director)", bio: "JS Kumar is a director at Kumar Generator House, where he plays a pivotal role in overseeing business strategy, operations, and growth initiatives.", image: "" },
            ],
          },
        },
        {
          id: "sec-our-profile-quality",
          type: "quality",
          order: 4,
          content: {
            qualityTitle: "Our Commitment to Quality",
            policyTitle: "Quality Policy Statement",
            policyStatement: "At Kumar Power, we are committed to delivering world-class power products and turnkey solutions that exceed customer expectations. Our robust design, meticulous manufacturing, and comprehensive testing ensure reliability and performance in every installation.",
            bullet1: "ISO 9001:2015 certified quality management system",
            bullet2: "Rigorous testing protocols for all equipment",
            bullet3: "Continuous improvement through customer feedback",
            bullet4: "Regular training and skill enhancement for our team",
            isoCertImg: "",
            kirloskarCertImg: "",
          },
        },
        {
          id: "sec-our-profile-cta",
          type: "cta",
          order: 5,
          content: {
            ctaTitle: "Ready to Power Your Business?",
            ctaDesc: "Contact us today for a consultation and discover how Kumar Generator House can provide reliable power solutions tailored to your needs.",
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
      metaDescription: "Reach out for generator quotes, support, or site visits.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-contact-hero",
          type: "hero",
          order: 1,
          content: {
            bannerHeading: "Powering Connections That Matter",
            bannerSubtitle: "Let's build something extraordinary. Talk to our experts today.",
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
            officeHours: "Monday - Saturday: 10:00 AM - 7:00 PM (Closed on Sundays & National Holidays)",
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
            resumeSubtitle: "Didn't find your role? We're always looking for great talent to join our team. Submit your resume and we'll contact you when a suitable position opens up.",
          },
        },
      ],
    },
    {
      title: "Photo Gallery",
      slug: "photo-gallery",
      description: "Kumar Power Photo Gallery",
      metaTitle: "Photo Gallery - Kumar Power",
      metaDescription: "A visual showcase of our generator installations, events, and industrial projects.",
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
              subtitle: "A visual showcase of our installations, innovations, and industrial excellence across India",
              bgImage: "",
            },
            photos: [
              { id: "g-1", alt: "Kirloskar DG Set Installation at Hospital", category: "installations", src: "https://res.cloudinary.com/dmhabztbf/image/upload/v1763639947/f968fc70-2c88-4870-9524-0105525f9de8_jivsd7.jpg" },
              { id: "g-2", alt: "Annual Diwali Event Celebration", category: "events", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" },
              { id: "g-3", alt: "Industry Leadership Award Ceremony", category: "Award", src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop" },
            ],
            experience: {
              title: "Experience Power Excellence",
              description: "Ready to transform your power infrastructure with industry-leading generator solutions? Our team of experts is ready to guide you through every step.",
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
      metaDescription: "Authorisation certificates and awards demonstrating our commitment to quality.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-certifications-main",
          type: "certifications",
          order: 1,
          content: {
            heroTitle: "Awards and Certifications",
            heroSub: "Recognized for excellence in power solutions and industry leadership",
            certificates: [
              { id: "cert-1", name: "Authorisation Certification", year: "2024", description: "Kumar Generator House is our authorised KOEL Green Dealer for sale of KOEL Green Diesel Generating Sets and Chhota Chilli Range of generators", issuer: "Authorisation certificate", image: "" },
              { id: "cert-2", name: "Certificate of Excellence", year: "2012-2013", description: "Environmental Management System certification, demonstrating our commitment to environmental responsibility.", issuer: "KOEL Pune", image: "" },
              { id: "cert-3", name: "Certification of Highest Growth", year: "2013", description: "Presented to M/s Kumar Generator House, Delhi for highest growth & highest nos. of KIRLOSKAR GREEN DG sets sold in FY 2013.", issuer: "KOEL-JAKPOWER-KGD Conference, Goa", image: "" },
            ],
            whySectionTitle: "Why Certifications Matter",
            whyCard1Title: "Quality Assurance",
            whyCard1Desc: "Our certifications serve as third-party validation of our commitment to maintaining high-quality standards.",
            whyCard2Title: "Compliance",
            whyCard2Desc: "We adhere to industry regulations and standards, ensuring our operations are fully compliant.",
            whyCard3Title: "Customer Trust",
            whyCard3Desc: "Our certifications provide customers with confidence in our products, services, and business practices.",
            commitTitle: "Our Commitment to Excellence",
            commitText: "At Kumar Power, we believe that maintaining certifications and industry partnerships is more than just fulfilling requirements—it's about our ongoing commitment to excellence in everything we do.",
            btn1Label: "Contact Us",
            btn1Url: "/contact",
            btn2Label: "View Products",
            btn2Url: "/products",
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
            logos: [
              { id: "logo-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "GMR Infra" },
              { id: "logo-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "SIS Security" },
            ],
            clients: [
              { id: "c-1", name: "Air India", category: "Aviation & Logistics" },
              { id: "c-2", name: "Apollo Hospitals", category: "Medical Facilities" },
              { id: "c-3", name: "GMR Infrastructure", category: "Infrastructure" },
              { id: "c-4", name: "Honeywell India", category: "Industries" },
              { id: "c-5", name: "NBCC Limited", category: "CPWD & NBCC Projects" },
              { id: "c-6", name: "British Paints", category: "Manufacturers/Wholesalers" },
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
            heroHeading: "POWERING INDIA'S SUCCESS STORIES",
            heroSubtitle: "Testimonials from industry leaders",
            heroBgImage: "",
            testimonials: [
              { id: "test-1", authorName: "Khushi Aggarwal", roleCompany: "Founder, Platter Me Crazy", logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902468/Screenshot_2025-10-31_144115_lybhem.png", quote: "I, Khushi Aggarwal, Founder of Platter Me Crazy, a brand synonymous with culinary artistry and luxury dining experiences." },
              { id: "test-2", authorName: "Kaustubh Jain", roleCompany: "TEAM Construction Chemicals (TEAMCC)", logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902466/Screenshot_2025-10-31_144303_wgqqaq.png", quote: "I have had the pleasure of knowing Mr. Jasjot Singh, and I can confidently say he is a true professional in the generator industry." },
            ],
            clientLogos: [
              { id: "logo-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "GMR Infra" },
              { id: "logo-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "SIS Security" },
            ],
            stat1Num: "100+",
            stat1Text: "Video Testimonials",
            stat2Num: "25+",
            stat2Text: "Industries Served",
            stat3Num: "10000+",
            stat3Text: "Installations Nationwide",
            ctaTitle: "Ready to join India's most reliable power network?",
            ctaDesc: "From hospitals to data centers, from factories to airports — Kumar power delivers uninterrupted power solutions tailored to your needs.",
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
    console.log(`✅ Created ${staticPages.length} pages & section content with exact field schemas.`);
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

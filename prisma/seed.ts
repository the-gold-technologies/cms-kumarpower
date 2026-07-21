import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed (matching ENCO TECH CMS architecture)...");

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
    console.warn("Table cleanup skipped or tables not created yet:", err);
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
    { id: "nav-2-1", label: "Our Story", url: "/about/OurProfile", order: 1, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-2", label: "Testimonials", url: "/about/Testimonials", order: 2, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-3", label: "Photo gallery", url: "/about/PhotoGallery", order: 3, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-2-4", label: "Certifications", url: "/about/Certifications", order: 4, type: "Sub Link", parent: "nav-2", isStatic: true, isActive: true },
    { id: "nav-3", label: "Products", url: "/products", order: 3, type: "Dropdown", parent: "-", isStatic: true, isActive: true },
    { id: "nav-3-1", label: "Kirloskar Diesel Generator", url: "/products/kirloskar-diesel-generator", order: 1, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-2", label: "Kirloskar Gas Generator", url: "/products/kirloskar-gas-generator", order: 2, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-3", label: "Kirloskar Portable Generator", url: "/products/kirloskar-portable-generator", order: 3, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-4", label: "Panels", url: "/products/panels", order: 4, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-5", label: "Optiprime", url: "/products/optiprime", order: 5, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-6", label: "Servo Stabilizer", url: "/products/servo-stabilizer", order: 6, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-3-7", label: "Transformers", url: "/products/transformers", order: 7, type: "Sub Link", parent: "nav-3", isStatic: true, isActive: true },
    { id: "nav-4", label: "Our Clients", url: "/about/OurClients", order: 4, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-5", label: "Installation", url: "/installation", order: 5, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-6", label: "Contact", url: "/contact", order: 6, type: "Main Link", parent: "-", isStatic: true, isActive: true },
    { id: "nav-7", label: "Blog", url: "/blogs", order: 7, type: "Main Link", parent: "-", isStatic: true, isActive: true },
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

  // 6. Create Static Pages and Sections
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
            title: "Powering India with Kirloskar Reliability",
            subtitle: "Authorized Dealer of Kirloskar Green CPCB IV+ Silent Diesel Generators, Gas Gensets & Turnkey Power Solutions",
            ctaPrimary: "Request a Quote",
            ctaSecondary: "Explore Products",
            bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
            stats: [
              { label: "Years of Excellence", value: "35+" },
              { label: "Generators Installed", value: "12,500+" },
              { label: "Happy Clients", value: "8,000+" },
              { label: "Service Response SLA", value: "< 60 Mins" },
            ],
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
            header: {
              title: "Authorisations & Certificates",
              subtitle: "Demonstrating our commitment to excellence, quality, and industry-leading standards.",
              bgImage: "",
            },
            certificates: [
              { name: "Authorisation Certification", description: "Kumar Generator House is our authorised KOEL Green Dealer for sale of KOEL Green Diesel Generating Sets.", issuer: "Kirloskar Oil Engines Ltd", year: "2024" },
              { name: "Certificate of Excellence", description: "Recognizing outstanding customer service and technical excellence in DG set installations.", issuer: "KOEL Green", year: "2023" },
              { name: "Certification of Highest Growth", description: "Awarded for achieving highest sales growth in northern region power generation market.", issuer: "Kirloskar Group", year: "2022" },
            ],
            whyMatters: [
              { title: "Quality Assurance", desc: "Rigorous standards ensure consistent, reliable performance under all operational conditions." },
              { title: "Regulatory Compliance", desc: "Full adherence to environmental CPCB IV+ norms and safety regulations." },
              { title: "Customer Trust", desc: "Proven track record verified by industry certifications and channel partner awards." },
            ],
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
          id: "sec-our-profile-main",
          type: "our-profile",
          order: 1,
          content: {
            hero: {
              title: "Powering India's Progress Since 1995",
              subtitle: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions.",
              bgImage: "",
            },
            story: {
              heading: "Our Journey & Legacy",
              p1: "Founded in 1995, Kumar Power started with a singular mission: to eliminate power vulnerability for growing Indian enterprises.",
              p2: "As an authorized channel partner for Kirloskar Oil Engines Limited (KOEL), we have deployed over 12,500+ generators spanning 2.1 kVA to 1500 kVA.",
            },
            leadership: [
              { name: "RS Kumar", role: "Managing Director", bio: "30+ years of visionary leadership in power generation and industrial engineering." },
              { name: "MS Kumar", role: "Director - Operations", bio: "Overseeing pan-India service logistics, SITC projects, and client relationships." },
              { name: "JS Kumar", role: "Technical Director", bio: "Leading engineering innovations, CPCB IV+ compliance, and smart monitoring." },
            ],
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
            stats: [
              { label: "Enterprise Clients", value: "500+" },
              { label: "Years Experience", value: "30+" },
              { label: "Units Installed", value: "12,500+" },
              { label: "Service Response SLA", value: "< 2 Hours" },
            ],
            clients: [
              { name: "Air India", category: "Aviation & Logistics" },
              { name: "Apollo Hospitals", category: "Healthcare" },
              { name: "GMR Infrastructure", category: "Airports & Infrastructure" },
              { name: "Honeywell India", category: "Technology & Industrial" },
              { name: "NBCC Limited", category: "Government Construction" },
              { name: "British Paints", category: "Manufacturing" },
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
            hero: {
              title: "Client Testimonials & Feedback",
              subtitle: "Hear how Kumar Power keeps mission-critical operations running uninterrupted across India.",
              bgImage: "",
            },
            testimonials: [
              { name: "Khushi Aggarwal", company: "Hospitality Manager", feedback: "Kumar Power delivered and installed our 125 kVA Kirloskar generator seamlessly. Zero downtime during peak summer!" },
              { name: "Kaustubh Jain", company: "Commercial Real Estate", feedback: "The 24/7 AMC response team is incredible. Their engineers arrived within 45 minutes during a storm emergency." },
              { name: "Atul Jewellers", company: "Retail Chain", feedback: "Compact portable generator with ultra-quiet operation. Perfect for our high-end retail showroom." },
            ],
          },
        },
      ],
    },
    {
      title: "Products Overview",
      slug: "products",
      description: "Kumar Power Product Catalog",
      metaTitle: "Kirloskar Silent Diesel & Gas Generators | Kumar Power",
      metaDescription: "Explore our range of Kirloskar CPCB IV+ compliant silent diesel generators.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-products-main",
          type: "products",
          order: 1,
          content: {
            hero: {
              title: "Powering Progress, One Generator at a Time",
              subtitle: "Explore our full range of Kirloskar-certified diesel generators, trusted across India's most demanding industries.",
              ctaPrimaryLabel: "Request a Quote",
              ctaPrimaryUrl: "/contact",
            },
            compliancePdfs: {
              bharatRajpat: "Bharat_Rajpat.pdf",
              direction76: "Direction_76.pdf",
            },
            ctaBanner: {
              title: "Need Help Choosing the Right Electrical Solution?",
              description: "Our team of experts will help you select the perfect solution based on your industry and budget.",
              primaryBtnLabel: "Talk to an Expert",
              primaryBtnUrl: "/contact",
              phoneHotline: "+919773877796",
            },
          },
        },
      ],
    },
    {
      title: "Services Overview",
      slug: "services",
      description: "Kumar Power Services Catalog",
      metaTitle: "Generator AMC, Repair & Installation Services | Kumar Power",
      metaDescription: "Expert generator AMC services, 24/7 breakdown support, installation, and overhaul.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-services-main",
          type: "services",
          order: 1,
          content: {
            hero: {
              title: "Comprehensive Generator Services",
              subtitle: "From turnkey SITC installation to 24/7 AMC preventive maintenance and major overhauling.",
            },
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
          id: "sec-contact-main",
          type: "contact",
          order: 1,
          content: {
            hero: {
              title: "Contact Kumar Power",
              subtitle: "Connect with our power experts for quotes, site inspections, 24/7 service, or career opportunities.",
              bgImage: "",
            },
            info: {
              headOffice: "Kumar Generator House, Plot No. 12, Industrial Area, New Delhi - 110015",
              salesHotline: "+91 97738 77796",
              serviceHelpline: "011-40191273",
              email: "info@kumarpower.com",
            },
          },
        },
      ],
    },
    {
      title: "Kirloskar Diesel Generator",
      slug: "kirloskar-diesel-generator",
      description: "Kirloskar Diesel Generator Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-diesel-main",
          type: "kirloskar-diesel-generator",
          order: 1,
          content: {
            hero: {
              title: "Kirloskar Diesel Generators Dealer in Delhi",
              subtitle: "Explore Kirloskar Diesel Generators at Kumar Power for reliable backup and prime power solutions.",
            },
            helpBanner: {
              title: "Need Help Choosing the Right Electrical Solution?",
              description: "Our team of experts will help you select the perfect solution based on your industry and budget.",
              btnLabel: "Talk to an Expert",
            },
          },
        },
      ],
    },
    {
      title: "Kirloskar Gas Generator",
      slug: "kirloskar-gas-generator",
      description: "Kirloskar Gas Generator Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-gas-main",
          type: "kirloskar-gas-generator",
          order: 1,
          content: {
            hero: {
              title: "Kirloskar Gas Generators Dealer in Delhi",
              subtitle: "Explore eco-friendly Natural Gas and CNG generators for clean, efficient power solutions.",
            },
          },
        },
      ],
    },
    {
      title: "Kirloskar Portable Generator",
      slug: "kirloskar-portable-generator",
      description: "Kirloskar Portable Generator Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-kirloskar-portable-main",
          type: "kirloskar-portable-generator",
          order: 1,
          content: {
            hero: {
              title: "Kirloskar Portable Generators Dealer in Delhi",
              subtitle: "Explore lightweight, mobile, and reliable air-cooled petrol generators.",
            },
          },
        },
      ],
    },
    {
      title: "Optiprime Generator",
      slug: "optiprime",
      description: "Optiprime Series Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-optiprime-main",
          type: "optiprime",
          order: 1,
          content: {
            hero: {
              title: "Kirloskar Optiprime Series Generators",
              subtitle: "Next-generation smart power solutions engineered for max fuel economy and IoT telemetry.",
            },
          },
        },
      ],
    },
    {
      title: "Electrical Panels",
      slug: "panels",
      description: "Electrical Panels Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-panels-main",
          type: "panels",
          order: 1,
          content: {
            hero: {
              title: "Electrical Panels Manufacturer in Delhi",
              subtitle: "High-performance AMF, LT, synchronizing & distribution panels.",
            },
          },
        },
      ],
    },
    {
      title: "Servo Voltage Stabilizers",
      slug: "servo-stabilizer",
      description: "Servo Voltage Stabilizers Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-servo-main",
          type: "servo-stabilizer",
          order: 1,
          content: {
            hero: {
              title: "Servo Voltage Stabilizers Manufacturer in Delhi",
              subtitle: "Precision oil-cooled and air-cooled servo voltage stabilizers.",
            },
          },
        },
      ],
    },
    {
      title: "Distribution Transformers",
      slug: "transformers",
      description: "Transformers Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-transformers-main",
          type: "transformers",
          order: 1,
          content: {
            hero: {
              title: "Distribution Transformers Manufacturer in Delhi",
              subtitle: "High-efficiency step-down distribution transformers.",
            },
          },
        },
      ],
    },
    {
      title: "Annual Maintenance Contracts",
      slug: "annual-maintenance",
      description: "Annual Maintenance Contracts Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-amc-main",
          type: "annual-maintenance",
          order: 1,
          content: {
            hero: {
              tagline: "ANNUAL MAINTENANCE CONTRACTS",
              title: "Preventive Care for Uninterrupted Power",
              subtitle: "Ensure maximum uptime and equipment longevity with our comprehensive maintenance solutions.",
            },
          },
        },
      ],
    },
    {
      title: "Turnkey Installation & Commissioning",
      slug: "installation",
      description: "Installation Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-installation-main",
          type: "installation",
          order: 1,
          content: {
            hero: {
              badge: "Professional Services",
              title: "Installation & Commissioning",
              subtitle: "Expert power system installation and commissioning services for optimal performance, reliability, and compliance.",
              ctaLabel: "Schedule a Consultation",
            },
            expertise: {
              tagline: "KUMAR POWER EXPERTISE",
              heading: "Professional Power System Installation",
              p1: "Kumar Power delivers end-to-end installation and commissioning services for all types of power generation equipment...",
              p2: "Our certified technicians handle everything from site assessment and planning to final commissioning...",
            },
          },
        },
      ],
    },
    {
      title: "Engine Repair & Overhauling",
      slug: "repair-overhaul",
      description: "Engine Repair Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-repair-main",
          type: "repair-overhaul",
          order: 1,
          content: {
            hero: {
              tagline: "ENGINE REPAIR & OVERHAULING",
              title: "Heavy-Duty Engine Overhauling & Component Repair",
              subtitle: "Restore peak factory performance and extend working lifespan.",
            },
          },
        },
      ],
    },
    {
      title: "24/7 Emergency Support",
      slug: "emergency-support",
      description: "Emergency Support Subpage",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-emergency-main",
          type: "emergency-support",
          order: 1,
          content: {
            hero: {
              tagline: "24/7 EMERGENCY POWER SUPPORT",
              title: "Rapid Emergency Breakdown Response",
              subtitle: "Round-the-clock emergency dispatch team for critical power outages in Delhi-NCR.",
            },
            hotline: {
              phone: "+919773877796",
              landline: "01140191273",
              whatsapp: "+919773877796",
              sla: "120 Minutes Response SLA within Delhi-NCR",
            },
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
    console.log(`✅ Created ${staticPages.length} pages & section content.`);
  } catch (err) {
    console.warn("Pages seed skipped:", err);
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

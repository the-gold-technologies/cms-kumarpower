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
    await prisma.globalConfig.deleteMany({});
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

  // 2.5 Create Global SEO Config
  try {
    await prisma.globalConfig.create({
      data: {
        id: "global",
        siteTitle: "Kumar Power | Kirloskar Generator Dealer",
        siteDescription:
          "Authorized dealer of Kirloskar Green CPCB IV+ Silent Diesel Generators in Delhi NCR.",
        googleAnalyticsId: "G-XXXXXXXXXX",
        gtmId: "GTM-XXXXXXX",
        searchConsoleId: "google-site-verification-code",
        customHeaderScripts: "<!-- Custom Head Scripts -->",
        customFooterScripts: `<link rel="stylesheet" href="https://sidewidget.vercel.app/react-widget-uv.css">\n<script>window.process = { env: {} };</script>\n<script src="https://sidewidget.vercel.app/react-widget-uv.iife.js"></script>\n<react-widget-uv agent_id="9efb6a86-285d-4201-a1fe-b77b58efa2cf" schema="6af30ad4-a50c-4acc-8996-d5f562b6987f" type="thunderemotionlite"></react-widget-uv>`,
        schema:
          '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Kumar Power",\n  "url": "https://www.kumarpower.com"\n}',
        headingOptions: "h1",
        sitemapEnabled: true,
        robotsTxt:
          "User-agent: *\nAllow: /\n\nSitemap: https://www.kumarpower.com/sitemap.xml",
      },
    });
    console.log("✅ Seeded Global SEO Config with Analytics & Scripts");
  } catch (err) {
    console.warn("Global Config seed skipped:", err);
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
      slug: "repair-overhaul",
      description: "Repair & Overhaul Services",
      metaTitle: "Repair & Overhaul Services - Kumar Power",
      metaDescription:
        "Professional restoration and renewal of power systems for optimal performance and reliability",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-repair-main",
          type: "services",
          order: 1,
          content: {
            heroBadge: "Expert Services",
            heroHeading: "Repair & Overhaul Services",
            heroSub:
              "Professional restoration and renewal of power systems for optimal performance and reliability",
            heroCtaLabel: "Request Emergency Service",
            introTitle: "Expert Generator Repair & Overhaul Services",
            introDesc1:
              "From emergency repairs to complete system rebuilds, Kumar Power's certified technicians possess the expertise to diagnose and resolve complex mechanical and electrical issues.",
            introTagline: "KUMAR POWER EXPERTISE",
            introDesc2:
              "We use only genuine parts and industry-leading techniques to restore your equipment to optimal performance, ensuring reliability when you need it most while maximizing your investment in critical power infrastructure.",
            introBtn1Label: "Request Repair Service",
            introBtn2Label: "Emergency Repair Hotline",
            benefitsTagline: "WHY PROFESSIONAL REPAIR MATTERS",
            benefitsHeading: "Benefits of Expert Repair & Overhaul",
            benefitsDesc:
              "Investing in professional repair services delivers long-term value and peace of mind",
            benefitsCtaLabel: "Schedule Your Repair Service",
            processTagline: "OUR SYSTEMATIC APPROACH",
            processHeading: "Our Repair Process",
            processDesc:
              "A systematic approach to efficiently diagnose and resolve power system issues",
            diffTagline: "MAKING THE RIGHT CHOICE",
            diffHeading: "Repair vs. Overhaul: Understanding the Difference",
            diffDesc:
              "Knowing when your power equipment needs a simple repair versus a comprehensive overhaul",
            servicesTagline: "COMPREHENSIVE SOLUTIONS",
            servicesHeading: "Our Repair & Overhaul Services",
            servicesDesc:
              "Comprehensive solutions for all your power equipment repair and restoration needs",
            faqTagline: "FREQUENTLY ASKED QUESTIONS",
            faqHeading: "Common Questions About Repairs",
            faqDesc:
              "Get answers to frequently asked questions about our repair and overhaul services",
            hotlineLabel: "Emergency Repair Hotline",
            helpTitle: "Need Generator Repair or Overhaul Services?",
            helpSub:
              "Contact our expert technicians today for fast, reliable repair services that get your power systems back to peak performance.",
            helpBtnLabel: "Request Repair Service",
            emergencyPhone: "+919773851767",
            services: [
              {
                title: "Emergency Repairs",
                description:
                  "Rapid response services for unexpected breakdowns and critical failures requiring immediate attention.",
                icon: "AlertTriangle",
                features: [
                  "24/7 emergency response with guaranteed arrival times",
                  "Fully equipped mobile repair units for on-site solutions",
                  "Priority parts sourcing through our extensive supplier network",
                  "Temporary power solutions to minimize operational disruption",
                  "Comprehensive root cause analysis to prevent recurrence",
                ],
              },
              {
                title: "Engine Repairs & Overhaul",
                description:
                  "Complete engine servicing from minor repairs to full overhaul and rebuilding for optimal performance.",
                icon: "Wrench",
                features: [
                  "Advanced diagnostic technology for precise issue identification",
                  "Specialized cylinder head refurbishment and valve reconditioning",
                  "Precision crankshaft grinding and bearing replacement",
                  "Complete fuel system rebuilding and calibration",
                  "Full engine rebuilding with genuine OEM components",
                ],
              },
              {
                title: "Electrical System Repairs",
                description:
                  "Expert troubleshooting and repair of generator control systems, alternators, and power distribution components.",
                icon: "Cpu",
                features: [
                  "Professional alternator rewinding and insulation restoration",
                  "Precision AVR replacement, calibration, and testing",
                  "Advanced control panel diagnostics and component replacement",
                  "Comprehensive switchgear inspection and servicing",
                  "Circuit breaker testing, maintenance, and certification",
                ],
              },
              {
                title: "Preventive Overhaul",
                description:
                  "Scheduled major overhauls to extend equipment life and prevent costly breakdowns before they occur.",
                icon: "Clock",
                features: [
                  "Data-driven condition assessment and predictive analysis",
                  "Detailed component life evaluation and wear pattern analysis",
                  "Strategic component replacement based on usage patterns",
                  "Performance-enhancing system upgrades and modernization",
                  "Complete performance restoration and efficiency optimization",
                ],
              },
            ],
            benefits: [
              {
                title: "Extended Equipment Life",
                description:
                  "Professional repairs and overhauls can significantly extend the operational lifespan of your power equipment, maximizing your return on investment.",
                icon: "Clock",
              },
              {
                title: "Improved Reliability",
                description:
                  "Properly repaired and overhauled systems experience fewer breakdowns and provide consistent, dependable power when you need it most.",
                icon: "Shield",
              },
              {
                title: "Enhanced Performance",
                description:
                  "Our repair services restore or even improve your system's original performance specifications, ensuring optimal efficiency and output.",
                icon: "Activity",
              },
              {
                title: "Cost Effectiveness",
                description:
                  "Quality repairs and strategic overhauls are often more economical than replacement, especially for larger power systems.",
                icon: "FileText",
              },
              {
                title: "Regulatory Compliance",
                description:
                  "Our repair services ensure your equipment meets all current regulatory standards for emissions, safety, and performance.",
                icon: "CheckCircle2",
              },
              {
                title: "Minimized Downtime",
                description:
                  "Fast, efficient repair processes and temporary power solutions help minimize operational disruptions during necessary service work.",
                icon: "Zap",
              },
            ],
            processSteps: [
              {
                title: "Initial Assessment & Diagnostics",
                description:
                  "Our technicians conduct a thorough inspection and diagnostic testing to identify the root cause of the issue and any related problems that need addressing.",
                features: [
                  "Comprehensive digital diagnostics using advanced testing equipment",
                  "Detailed inspection by certified technicians with specialized expertise",
                ],
              },
              {
                title: "Detailed Scope & Estimate",
                description:
                  "We provide a comprehensive scope of work and detailed cost estimate, explaining all required repairs, parts, and labor before proceeding with any work.",
                features: [
                  "Transparent pricing with detailed breakdown of all costs",
                  "Clear timeline expectations with completion estimates",
                ],
              },
              {
                title: "Parts Procurement",
                description:
                  "Our team sources genuine OEM parts or high-quality alternatives as specified, ensuring quick availability for time-sensitive repairs.",
                features: [
                  "Extensive parts inventory for common repair components",
                  "Direct relationships with manufacturers for expedited shipping",
                ],
              },
              {
                title: "Skilled Repair Execution",
                description:
                  "Our certified technicians perform the necessary repairs or overhaul procedures according to manufacturer specifications and industry best practices.",
                features: [
                  "Factory-trained technicians with specialized certifications",
                  "Advanced tooling and equipment for precise repairs",
                ],
              },
              {
                title: "Testing & Quality Assurance",
                description:
                  "We conduct comprehensive post-repair testing under load conditions to ensure all systems function properly and meet performance specifications.",
                features: [
                  "Load bank testing to verify performance under various conditions",
                  "Detailed performance metrics verification and documentation",
                ],
              },
              {
                title: "Detailed Documentation & Warranty",
                description:
                  "We provide complete documentation of all work performed, parts replaced, and testing results, along with warranty information for your records.",
                features: [
                  "Comprehensive service reports with detailed findings",
                  "Clear warranty terms and recommended follow-up service",
                ],
              },
            ],
            faqs: [
              {
                question:
                  "How do I know if my generator needs repair or overhaul?",
                answer:
                  "Warning signs include unusual noises, excessive vibration, increased fuel consumption, difficulty starting, frequent shutdowns, visible leaks, or decreased power output. Our technicians can perform a diagnostic assessment to determine the exact issues and recommend appropriate repairs.",
              },
              {
                question:
                  "Can you repair generators on-site or do they need to be transported to your facility?",
                answer:
                  "We can perform many repairs on-site, including most electrical system repairs, minor to moderate engine work, and control system troubleshooting. Major overhauls, engine rebuilds, and alternator rewinding typically require transportation to our specialized workshop facilities.",
              },
              {
                question: "How long does a typical repair or overhaul take?",
                answer:
                  "Repair timeframes vary based on the scope of work. Minor repairs may be completed in hours, while standard repairs typically take 1-3 days. Major overhauls can require 1-2 weeks, and complete engine rebuilds may take 2-4 weeks. We provide estimated timelines during our initial assessment.",
              },
              {
                question: "Do you provide warranty on repairs and overhauls?",
                answer:
                  "Yes, all our repair work comes with a comprehensive warranty. Minor repairs carry a 3-month warranty, standard repairs have a 6-month warranty, and major overhauls or rebuilds are warrantied for 12 months or 500 operating hours, whichever comes first.",
              },
              {
                question:
                  "Can you provide temporary power during major repairs?",
                answer:
                  "Yes, we offer rental generators to ensure continuous power during extended repairs or overhauls. Our team will assess your power requirements and provide appropriately sized temporary power solutions to minimize disruption to your operations.",
              },
              {
                question: "Do you use OEM parts for repairs and overhauls?",
                answer:
                  "Yes, we primarily use genuine OEM (Original Equipment Manufacturer) parts for all repairs to ensure optimal performance and reliability. In situations where OEM parts may have extended lead times, we offer high-quality aftermarket alternatives after discussing the options with you.",
              },
            ],
          },
        },
      ],
    },
    {
      slug: "installation",
      description: "Installation & Commissioning Services",
      metaTitle: "Installation Services - Kumar Power",
      metaDescription:
        "Expert power system installation and commissioning services for optimal performance, reliability, and compliance.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-installation-main",
          type: "services",
          order: 1,
          content: {
            heroBadge: "Professional Services",
            heroHeading: "Installation & Commissioning",
            heroSub:
              "Expert power system installation and commissioning services for optimal performance, reliability, and compliance.",
            heroBg:
              "https://res.cloudinary.com/dmhabztbf/image/upload/v1763639947/f968fc70-2c88-4870-9524-0105525f9de8_jivsd7.jpg",
            heroCtaLabel: "Schedule a Consultation",

            introTagline: "KUMAR POWER EXPERTISE",
            introHeading: "Professional Power System Installation",
            introP1:
              "Kumar Power delivers end-to-end installation and commissioning services for all types of power generation equipment, ensuring your systems operate at peak efficiency from day one.",
            introP2:
              "Our certified technicians handle everything from site assessment and planning to final commissioning and operator training, delivering turnkey solutions that maximize reliability and minimize downtime across industries.",
            introImage:
              "https://res.cloudinary.com/dmhabztbf/image/upload/v1763639947/f968fc70-2c88-4870-9524-0105525f9de8_jivsd7.jpg",

            steps: [
              {
                id: "step-1",
                stepNum: "1",
                title: "Initial Consultation & Site Survey",
                description:
                  "We begin with a thorough assessment of your power requirements and site conditions to determine the optimal system configuration, placement, and infrastructure needs.",
                bullet1:
                  "Comprehensive load analysis and power requirements assessment",
                bullet2:
                  "Detailed site inspection and infrastructure evaluation",
              },
              {
                id: "step-2",
                stepNum: "2",
                title: "Detailed Design & Planning",
                description:
                  "Our engineers develop comprehensive installation plans including electrical schematics, mechanical layouts, and project timelines tailored to your specific needs.",
                bullet1: "Custom system design optimized for your facility",
                bullet2: "Detailed project timeline and resource allocation",
              },
              {
                id: "step-3",
                stepNum: "3",
                title: "Permitting & Compliance",
                description:
                  "We handle all necessary permits, regulatory approvals, and compliance requirements to ensure your installation meets all local and national standards.",
                bullet1: "Complete management of permit acquisition process",
                bullet2: "Regulatory compliance verification and documentation",
              },
              {
                id: "step-4",
                stepNum: "4",
                title: "Professional Installation",
                description:
                  "Our certified technicians execute the installation according to the detailed plan, ensuring all components are properly installed, connected, and secured.",
                bullet1:
                  "Expert mechanical and electrical installation by certified technicians",
                bullet2:
                  "Quality control checks at each installation milestone",
              },
              {
                id: "step-5",
                stepNum: "5",
                title: "Testing & Commissioning",
                description:
                  "We conduct comprehensive testing of all systems, including load testing, performance verification, and safety checks to ensure everything functions correctly.",
                bullet1:
                  "Full-load testing under various operational conditions",
                bullet2: "System performance optimization and calibration",
              },
              {
                id: "step-6",
                stepNum: "6",
                title: "Training & Handover",
                description:
                  "We provide thorough training for your staff on system operation and basic maintenance, along with complete documentation and warranty information.",
                bullet1:
                  "Comprehensive operator training and knowledge transfer",
                bullet2:
                  "Complete system documentation and maintenance schedules",
              },
            ],

            portfolio: [
              {
                id: "p-2",
                name: "Commercial Power System",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785773/kumarpower_website/installation/guodeq5wfayiqizjosyo.png",
              },
              {
                id: "p-3",
                name: "Residential Backup Generator",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785774/kumarpower_website/installation/ycoqx8bsjhsguktp3ytx.png",
              },
              {
                id: "p-4",
                name: "Hospital Emergency Power",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785775/kumarpower_website/installation/egue8gfplzzdsoxk5jxm.png",
              },
              {
                id: "p-5",
                name: "Data Center Installation",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785777/kumarpower_website/installation/xyindqnknrwmp1qoblkt.png",
              },
              {
                id: "p-6",
                name: "Manufacturing Facility Setup",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785778/kumarpower_website/installation/ylhbdzmjtig05y2kod9n.png",
              },
              {
                id: "p-7",
                name: "Office Building Generator",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785779/kumarpower_website/installation/gop2i6nud1muuvl3vmnq.png",
              },
              {
                id: "p-8",
                name: "Home Standby Power",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785780/kumarpower_website/installation/jzvvgmyaw4mhndywyqmc.png",
              },
              {
                id: "p-9",
                name: "Retail Power Solution",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785781/kumarpower_website/installation/tzsy4o5xoq7mqup4jx7x.png",
              },
              {
                id: "p-10",
                name: "Industrial Complex System",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785782/kumarpower_website/installation/s37sx7vj1tlaamn56yoj.png",
              },
              {
                id: "p-11",
                name: "Apartment Building Generator",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785784/kumarpower_website/installation/xjuxkmnxyusuaq1phwtm.png",
              },
              {
                id: "p-13",
                name: "Hotel Backup System",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785785/kumarpower_website/installation/daxn0alf01qxxydgmx1z.png",
              },
              {
                id: "p-14",
                name: "Residential Power Solution",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785786/kumarpower_website/installation/jnt9eaeqoahtwlhotbb5.png",
              },
              {
                id: "p-15",
                name: "Warehouse Power Setup",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785788/kumarpower_website/installation/dg0ejmbtpjnc7nhdocld.png",
              },
              {
                id: "p-16",
                name: "School Generator Installation",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785789/kumarpower_website/installation/bkfdvscjdx39e2nasqls.png",
              },
              {
                id: "p-17",
                name: "Single Family Home System",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785790/kumarpower_website/installation/s6ahrbyurixhk0wdmnjt.png",
              },
              {
                id: "p-18",
                name: "Manufacturing Plant Power",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785796/kumarpower_website/installation/kfls8rdusseihosymvfr.png",
              },
              {
                id: "p-19",
                name: "Office Complex Generator",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785798/kumarpower_website/installation/sj4abdq9xq8mwokufkqs.png",
              },
              {
                id: "p-20",
                name: "Luxury Home Installation",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785801/kumarpower_website/installation/aqf2ezfnpemnpjqpdkvh.png",
              },
              {
                id: "p-21",
                name: "Industrial Site Power",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785802/kumarpower_website/installation/ujcqfjfnqbqj2upn06gi.png",
              },
              {
                id: "p-22",
                name: "Retail Center Backup",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785803/kumarpower_website/installation/worwqehowpwyq8bycefk.png",
              },
              {
                id: "p-23",
                name: "Residential Community System",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785804/kumarpower_website/installation/s84kpdvhijphbizzblj9.png",
              },
              {
                id: "p-24",
                name: "Production Facility Setup",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785805/kumarpower_website/installation/jonrcctqfhtz2mxppmvz.png",
              },
              {
                id: "p-25",
                name: "Medical Center Installation",
                category: "Commercial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785806/kumarpower_website/installation/ofusnniz7swob84vzezl.png",
              },
              {
                id: "p-26",
                name: "Suburban Home Generator",
                category: "Residential",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785808/kumarpower_website/installation/kc8kpugy750domysjros.png",
              },
              {
                id: "p-27",
                name: "Distribution Center Power",
                category: "Industrial",
                imageUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784785809/kumarpower_website/installation/tqqoewhovwlt6m14ihwr.png",
              },
            ],

            faqs: [
              {
                id: "f-1",
                question: "How long does the installation process take?",
                answer:
                  "The installation timeline varies based on the system complexity and site conditions. Small to medium generators typically take 1-3 days, while larger industrial installations may require 1-2 weeks. Our team will provide a detailed timeline during the initial assessment.",
              },
              {
                id: "f-2",
                question: "Do you handle all required permits and approvals?",
                answer:
                  "Yes, we manage the entire permitting process. Our team handles all necessary documentation, regulatory compliance, and approvals from local authorities, ensuring your installation meets all legal requirements.",
              },
              {
                id: "f-3",
                question: "Can you install generators in difficult locations?",
                answer:
                  "Absolutely. Our installation teams are equipped to handle challenging locations including rooftops, basements, confined spaces, and remote sites. We have specialized equipment for crane lifts, custom mounting solutions, and extended cable runs.",
              },
              {
                id: "f-4",
                question:
                  "Will the installation cause disruption to our operations?",
                answer:
                  "We minimize disruption by carefully planning the installation process. Most electrical connections requiring power interruption can be scheduled during off-hours. Our team coordinates closely with your staff to develop an installation plan that accommodates your operational needs.",
              },
              {
                id: "f-5",
                question: "What happens after installation is complete?",
                answer:
                  "Following installation, we conduct comprehensive commissioning tests, provide detailed operator training, and deliver complete documentation including operation manuals, warranty information, and maintenance schedules. We also offer ongoing maintenance contracts to keep your system operating at peak performance.",
              },
              {
                id: "f-6",
                question: "Are your installations covered by warranty?",
                answer:
                  "Yes, all our installation work is backed by a comprehensive warranty. We provide a standard 12-month warranty on labor and workmanship, in addition to any manufacturer warranties on the equipment. Extended warranty options are also available for added peace of mind.",
              },
            ],

            benefits: [
              {
                id: "b-1",
                title: "Maximize System Reliability",
                description:
                  "Proper installation ensures your power system performs optimally during critical situations, minimizing the risk of failures when you need power most.",
              },
              {
                id: "b-2",
                title: "Extend Equipment Lifespan",
                description:
                  "Professional installation with correct mounting, connections, and calibration significantly extends the operational life of your generator and related components.",
              },
              {
                id: "b-3",
                title: "Ensure Code Compliance",
                description:
                  "Our certified technicians ensure all installations meet or exceed local codes, national standards, and manufacturer specifications.",
              },
              {
                id: "b-4",
                title: "Optimize Performance",
                description:
                  "Expert installation and commissioning maximize fuel efficiency, power output, and system responsiveness for optimal performance.",
              },
              {
                id: "b-5",
                title: "Minimize Maintenance Issues",
                description:
                  "Correctly installed systems require less maintenance and experience fewer operational problems over their lifetime.",
              },
              {
                id: "b-6",
                title: "Protect Warranty Coverage",
                description:
                  "Professional installation by authorized technicians maintains manufacturer warranty coverage and provides additional installation workmanship guarantees.",
              },
            ],
          },
        },
      ],
    },
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
            companyProfilePdf:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703721/kumarpower_website/lwslbfk9cagxu3m0khzy.pdf",
            trustedByLabel: "TRUSTED BY",
            backgroundVideo:
              "https://res.cloudinary.com/dpa93copz/video/upload/v1784704185/kumarpower_website/rz0nppx2f85aevxezjma.mp4",
            logos: [
              {
                id: "logo-1",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703672/kumarpower_website/egvye1xjbviosybczmy5.jpg",
                alt: "Tech Innovators",
              },
              {
                id: "logo-2",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703674/kumarpower_website/vo2ekpdop7dovku0rc8n.jpg",
                alt: "EcoPower Solutions",
              },
              {
                id: "logo-3",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703675/kumarpower_website/gbtxkuml1jukdiu4wlyh.jpg",
                alt: "ManufacturePro",
              },
              {
                id: "logo-4",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703677/kumarpower_website/xs3x2tpwjztqwrmhb3py.png",
                alt: "LogiTrans",
              },
              {
                id: "logo-5",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703679/kumarpower_website/gjm6k7mwcmvnsewffrsc.jpg",
                alt: "BuildMaster",
              },
              {
                id: "logo-6",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703681/kumarpower_website/qvwibw8fuw4gmlkk9n4c.png",
                alt: "BuildMaster",
              },
              {
                id: "logo-7",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703682/kumarpower_website/cvntuob1pan8lodaj37k.jpg",
                alt: "BuildMaster",
              },
              {
                id: "logo-8",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703685/kumarpower_website/i2hcjyehbydll3hg67nf.jpg",
                alt: "BuildMaster",
              },
              {
                id: "logo-9",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703686/kumarpower_website/uhmlaewcidzkrefpnl8g.jpg",
                alt: "BuildMaster",
              },
              {
                id: "logo-10",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703688/kumarpower_website/pgpf5ubc3ylvzfnjn7my.jpg",
                alt: "BuildMaster",
              },
              {
                id: "logo-11",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg",
                alt: "Trusted Partner",
              },
              {
                id: "logo-12",
                url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg",
                alt: "Trusted Client",
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
            teamImage:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703171/kumarpower_website/vha58bhrkpu6yhmhammc.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703235/kumarpower_website/i31vcugsqskwv56ixrhv.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "gen-2",
                title: "Kirloskar Gas Generator (15 – 250 kVA)",
                caption:
                  "Clean, efficient power for commercial and industrial applications.",
                category: "Gas Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703237/kumarpower_website/yparf7bahdtrfl3p0tjz.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705062/kumarpower_website/brochures/wcwvg3lsx6msr06uz7wx.pdf",
              },
              {
                id: "gen-3",
                title: "Kirloskar CPCB4+ Diesel Generator (7.5 – 20 kVA)",
                caption:
                  "Portable power for events, remote sites, and emergency backup.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703242/kumarpower_website/qnckibpukq9qy7h83s7p.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705067/kumarpower_website/brochures/wxyqlv6wwcawpbrgezaf.pdf",
              },
              {
                id: "gen-4",
                title: "Kirloskar CPCB4+ Diesel Generator (25 – 58.5 kVA)",
                caption:
                  "Balanced performance for medium-scale industrial needs.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703247/kumarpower_website/j1rhhm2jwtonnds72k5d.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705069/kumarpower_website/brochures/ahmtcmwtnicw9domtbul.pdf",
              },
              {
                id: "gen-5",
                title: "Kirloskar CPCB4+ Diesel Generator (82.5 – 160 kVA)",
                caption:
                  "Scalable solutions with robust service network coverage.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703244/kumarpower_website/bx4dizebcdvadsuozqfd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705070/kumarpower_website/brochures/b2zbwjsfjpx2wqi6xkij.pdf",
              },
              {
                id: "gen-6",
                title: "Kirloskar CPCB4+ Diesel Generator (200 – 250 kVA)",
                caption:
                  "Versatile DG sets for plants, campuses, and commercial towers.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703245/kumarpower_website/inxnbk5rir4rykhj0cfr.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705072/kumarpower_website/brochures/jkzmsw5vtm9s5vscy4cm.pdf",
              },
              {
                id: "gen-7",
                title: "Kirloskar CPCB4+ Diesel Generator (320 – 750 kVA)",
                caption:
                  "Durable, high-efficiency backup for industries and campuses.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703249/kumarpower_website/ohwufq3yx4yuuuahmw3g.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705074/kumarpower_website/brochures/u8uso0xo6g1p12layufn.pdf",
              },
              {
                id: "gen-8",
                title: "Kirloskar CPCB4+ Diesel Generator (750 – 1500 kVA)",
                caption:
                  "Low-emission, reliable diesel generator for versatile use.",
                category: "CPCB4+ Diesel Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703251/kumarpower_website/m1k3mjmhyughj3ajg9a0.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705078/kumarpower_website/brochures/smd0e0uokpc0bies5bqu.pdf",
              },
              {
                id: "gen-9",
                title: "Kirloskar Portable Generator (2.1 – 5 kVA)",
                caption:
                  "Compact portable power for small-scale events, sites, and emergency use.",
                category: "Portable Generators",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784703239/kumarpower_website/b3tdsaxtpw136j20rlxh.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
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
            backgroundImage:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703170/kumarpower_website/hif6xnvv5mggerl73bkd.png",
          },
        },
        {
          id: "sec-home-power-solutions",
          type: "power-solutions",
          order: 5,
          content: {
            topBannerImg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
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
                specs: [
                  "Range: 7.5 kVA - 20 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703242/kumarpower_website/qnckibpukq9qy7h83s7p.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-2",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(25 kVA - 58.5 kVA)",
                desc: "Reliable CPCB4+ emission compliant diesel generators with advanced liquid cooling for efficient performance.",
                specs: [
                  "Range: 25 kVA - 58.5 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703247/kumarpower_website/j1rhhm2jwtonnds72k5d.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-3",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(82.5 kVA - 160 kVA)",
                desc: "Versatile CPCB4+ compliant diesel generators designed for medium-scale industries and businesses.",
                specs: [
                  "Range: 82.5 kVA - 160 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703244/kumarpower_website/bx4dizebcdvadsuozqfd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705070/kumarpower_website/brochures/b2zbwjsfjpx2wqi6xkij.pdf",
              },
              {
                id: "ps-4",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(200 kVA - 250 kVA)",
                desc: "High-performance CPCB4+ compliant diesel generators with liquid cooling, ideal for industrial and commercial usage.",
                specs: [
                  "Range: 200 kVA - 250 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703245/kumarpower_website/inxnbk5rir4rykhj0cfr.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705072/kumarpower_website/brochures/jkzmsw5vtm9s5vscy4cm.pdf",
              },
              {
                id: "ps-5",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(320 kVA - 750 kVA)",
                desc: "Heavy-duty CPCB4+ compliant diesel generators offering superior efficiency and power reliability.",
                specs: [
                  "Range: 320 kVA - 750 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703249/kumarpower_website/ohwufq3yx4yuuuahmw3g.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705074/kumarpower_website/brochures/u8uso0xo6g1p12layufn.pdf",
              },
              {
                id: "ps-6",
                category: "CPCB4+ Diesel Generator",
                title: "CPCB4+ Diesel Generators(750 kVA - 1500 kVA)",
                desc: "High-capacity CPCB4+ diesel generators for continuous heavy industrial and commercial applications.",
                specs: [
                  "Range: 750 kVA - 1500 kVA",
                  "CPCB Norm: CPCB4+ Emission Compliance",
                  "Fuel: Diesel",
                  "Cooling: Liquid",
                  "Phase: Three Phase",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703251/kumarpower_website/m1k3mjmhyughj3ajg9a0.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705078/kumarpower_website/brochures/smd0e0uokpc0bies5bqu.pdf",
              },
              {
                id: "ps-7",
                category: "Optiprime Generators",
                title: "Kirloskar Optiprime Generator",
                desc: "Advanced diesel generators with CPCB4+ compliance, offering superior fuel efficiency and eco-friendly operations.",
                specs: [
                  "125 kva - 6600 kva",
                  "CPCB4+ Compliant",
                  "3 Phase Output",
                  "Fuel: Diesel",
                  "Application: Industrial, Commercial",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703235/kumarpower_website/i31vcugsqskwv56ixrhv.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-8",
                category: "Gas Generators",
                title: "Gas Generators",
                desc: "Eco-friendly natural gas and LPG generators with lower emissions and operational costs for sustainable power generation.",
                specs: [
                  "15 kVA - 250 kVA",
                  "Low Emissions",
                  "Quiet Operation",
                  "Fuel: Natural Gas, LPG",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703237/kumarpower_website/yparf7bahdtrfl3p0tjz.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705062/kumarpower_website/brochures/wcwvg3lsx6msr06uz7wx.pdf",
              },
              {
                id: "ps-9",
                category: "Portable Generators",
                title: "Portable Generators",
                desc: "Compact and mobile power solutions for construction sites, events, and emergency backup with easy transport features.",
                specs: [
                  "2.1 kVA to 5 kVA",
                  "Lightweight Design",
                  "Fuel: Portable, Diesel",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703239/kumarpower_website/b3tdsaxtpw136j20rlxh.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-10",
                category: "Electrical Panels",
                title: "AMF Panels",
                desc: "Automatic Mains Failure panels for seamless switching between mains and backup power supply, ensuring uninterrupted operation.",
                specs: [
                  "Auto/Manual Operation",
                  "Engine Protection",
                  "Programmable Logic Control",
                  "Current Rating: 100-630A",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-11",
                category: "Electrical Panels",
                title: "Vacuum Circuit Breaker",
                desc: "High-performance vacuum circuit breakers designed for medium voltage applications, ensuring safe and reliable power distribution.",
                specs: [
                  "Voltage Rating: Up to 36kV",
                  "Interrupting Medium: Vacuum",
                  "Low Maintenance Design",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-12",
                category: "Electrical Panels",
                title: "Distribution Boxes",
                desc: "Sturdy and safe distribution boxes to manage and distribute electrical power efficiently for various installations.",
                specs: [
                  "Voltage Rating: Up to 415V",
                  "Circuit Protection with MCB/ELCB",
                  "Compact & Robust Design",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-13",
                category: "Electrical Panels",
                title: "Feeder Pillars",
                desc: "Robust outdoor electrical distribution pillars designed for safe and efficient power distribution in various environments.",
                specs: [
                  "Voltage Rating: Up to 11kV",
                  "Weather Resistant Design",
                  "IP54 Protection Rating",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-14",
                category: "Servo Stabilizers",
                title: "Oil Cooled Servo Stabilizers",
                desc: "Heavy-duty oil-cooled stabilizers designed for high-load applications, ensuring superior voltage regulation and thermal efficiency.",
                specs: [
                  "Power Range: 5kVA - 5000kVA",
                  "Cooling: Oil Immersion",
                  "Voltage Accuracy: ±1%",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-15",
                category: "Servo Stabilizers",
                title: "Air Cooled Servo Stabilizers",
                desc: "Compact and efficient air-cooled stabilizers for commercial and IT infrastructure, offering reliable power protection.",
                specs: [
                  "Power Range: 5kVA - 500kVA",
                  "Cooling: Natural/Forced Air",
                  "Voltage Accuracy: ±1%",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-16",
                category: "Transformers",
                title: "Distribution Transformers",
                desc: "Reliable and efficient transformers designed for safe power distribution in commercial and industrial sectors.",
                specs: [
                  "Capacity: 10kVA - 5000kVA",
                  "Type: Oil-Filled/Dry Type",
                  "Cooling: ONAN/ONAF",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-17",
                category: "Transformers",
                title: "Power Transformers",
                desc: "Heavy-duty power transformers designed for high voltage transmission with superior energy efficiency and performance.",
                specs: [
                  "Capacity: 5MVA - 500MVA",
                  "Type: Oil-Immersed",
                  "Cooling: ONAF/OFWF",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-18",
                category: "Transformers",
                title: "Cast Resin Transformers",
                desc: "Eco-friendly, low-maintenance dry-type transformers ideal for commercial and indoor installations.",
                specs: [
                  "Capacity: 100kVA - 2500kVA",
                  "Type: Epoxy Resin Encapsulated",
                  "Cooling: Air Natural (AN)",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "ps-19",
                category: "Transformers",
                title: "Unitized Package Substation",
                desc: "Compact and factory-built substations designed for fast installation, providing safe and efficient power distribution.",
                specs: [
                  "Voltage Rating: Up to 36kV",
                  "Integrated Transformer, Switchgear & Protection",
                  "Compact Outdoor Design",
                ],
                img: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703168/kumarpower_website/imxbzh1nuz8lw8im0vwd.jpg",
                brochureUrl:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
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
                  "At Vilandl, we make bespoke Polki jewellery with the finest syndicate polkis, coloured gemstones and even finer details. We are extremely conscious about quality and create pieces that will be cherished for generations. We manufacture all of our jewellery pieces in-house and cater to both B2B and B2C clients. Recently, I referred Mr. R. S. Kumar from M/S Kumar Generator House to Mr Abhishek Jain of Jainco Sphere, a real estate company developing luxury homes in Delhi NCR. They had a detailed meeting and were really impressed with the knowledge and command he had on his industry. He suggested some important changes in their existing selection of material and design of LT panels and also, some value-added services which would enrich the experience of their customers. He was so convincing and transparent with his pricing and product detailing that Mr Abhishek gave an order for 2 of his under-construction buildings for Distribution panels, LT panels and chemical earthings. Also, the execution of work at the site was carried out with thorough professionalism and in a really time-bound manner. Mr Jain was very happy to work with M/s Kumar Generator House and highly recommends his services for Best quality, Best pricing and Best services.",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903094/Screenshot_2025-10-31_145916_tf6wvg.png",
              },
              {
                id: "test-2",
                headerTitle:
                  "TESTIMONIAL BY AANCHAL SAINI, AARK WORLD PVT. LTD.",
                name: "Aanchal Saini",
                role: "AARK World Pvt. Ltd.",
                quote:
                  "RENT IT BAE is a luxury fashion rental service offering Ethnic, Western & Accessories from designer labels at a fraction of MRP. Servicing 15 cities via Website, m-site, Android & iOS apps. First to introduce Monthly Fashion Subscription in the country. The company has it's 2 Flagship Stores in New Delhi (Rajouri Garden and Greater Kailash-1). RENT IT BAE has taken the media limelight for building country's first tech driven store. We highly appreciate the fast and seamless service provided by your company. The installation of inverters for RENT IT BAE's South Delhi Flagship Store at Greater Kailash seemed a fluid task with your service. The requirement for a power back up is a must for all companies now days especially in the retail sector. You understood the requirement and delivered the apt products at a reasonable price. All was done post one phone call. No follow ups were required. The products were delivered and installed within 24 hours. We would be happy to recommend your products and service.",
                logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903093/download_v9kdua.png",
              },
              {
                id: "test-3",
                headerTitle: "TESTIMONIAL BY BHARAT ANAND - BROWN GOLD",
                name: "Bharat Anand",
                role: "BROWNGOLD",
                quote:
                  "We at BROWNGOLD are a team of young & dynamic interior designers engaged in the business of providing complete design solutions for our clients, be it individuals, architects or corporate for the last 3 decades. We have a passion of interiors which enables us in providing quality & timely delivery of our design services & products for our clients pan India. We would like to place on record our appreciation for Mr. R.S. Kumar of Kumar Generator House. We had taken their services for our 40 kva kirloskar generator & a small generator of 7 kva. We would like to take this opportunity to thank you for providing excellent advice, excellent products & excellent service. We would not hesitate to recommend Kumar Generator House to prospective clients, looking for a high level of professional service, with attention on a long term client focused relationship. We are extremely pleased & look forward to increasing our level of business with yourselves in the coming",
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
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704202/kumarpower_website/uecht8cyoejxorpstiwp.png",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704223/kumarpower_website/bwgeiy0jke8ywdmfdorc.png",
              },
              {
                id: "time-2",
                year: "2001",
                title: "Kirloskar Partnership",
                description:
                  "Became an authorized partner of Kirloskar, expanding our product range and technical capabilities.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704228/kumarpower_website/s5gywmnc1lrmjatpwtdj.png",
              },
              {
                id: "time-3",
                year: "2012",
                title: "ISO Certification",
                description:
                  "Achieved ISO 9001:2015 certification, validating our commitment to quality management systems.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
              },
              {
                id: "time-4",
                year: "2020",
                title: "Nationwide Expansion",
                description:
                  "Expanded operations to all major cities in India with service centers and technical support teams.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704226/kumarpower_website/gwmb07sfgghp7czfvdrc.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704214/kumarpower_website/qinxclk113sp7i6njiwz.jpg",
              },
              {
                id: "team-2",
                name: "MS KUMAR",
                role: "(Director)",
                bio: "MS Kumar is the director of Kumar Generator House, a company with a rich legacy of over 30 years in providing reliable power solutions. With a keen focus on growth, innovation, and sustainability, Manjot leads the company towards achieving excellence in every aspect of its operations. His leadership style emphasizes customer satisfaction, operational efficiency, and long-term business relationships, ensuring that Kumar Generator House remains a trusted name in the industry.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704215/kumarpower_website/lzucapxqx652nhlr6ufm.jpg",
              },
              {
                id: "team-3",
                name: "JS KUMAR",
                role: "(Director)",
                bio: "JS Kumar is a director at Kumar Generator House, where he plays a pivotal role in overseeing business strategy, operations, and growth initiatives. With a focus on enhancing internal processes and fostering partnerships, He is committed to driving the company's expansion and ensuring the delivery of efficient, high-quality service to clients. His strategic approach and dedication to innovation continue to shape the company's success in the power solutions sector.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704217/kumarpower_website/ahzrtelijqxkyg5hmafo.jpg",
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
            isoCertImg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
            kirloskarCertImg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704221/kumarpower_website/mtjwhs960zambsokn9z5.png",
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
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704223/kumarpower_website/bwgeiy0jke8ywdmfdorc.png",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704228/kumarpower_website/s5gywmnc1lrmjatpwtdj.png",
              },
              {
                id: "time-2",
                year: "2001",
                title: "Kirloskar Partnership",
                description:
                  "Became an authorized partner of Kirloskar, expanding our product range and technical capabilities.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
              },
              {
                id: "time-3",
                year: "2012",
                title: "ISO Certification",
                description:
                  "Achieved ISO 9001:2015 certification, validating our commitment to quality management systems.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704226/kumarpower_website/gwmb07sfgghp7czfvdrc.jpg",
              },
              {
                id: "time-4",
                year: "2020",
                title: "Nationwide Expansion",
                description:
                  "Expanded operations to all major cities in India with service centers and technical support teams.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704214/kumarpower_website/qinxclk113sp7i6njiwz.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704215/kumarpower_website/lzucapxqx652nhlr6ufm.jpg",
              },
              {
                id: "team-2",
                name: "MS KUMAR",
                role: "(Director)",
                bio: "MS Kumar is the director of Kumar Generator House, a company with a rich legacy of over 30 years in providing reliable power solutions. With a keen focus on growth, innovation, and sustainability, Manjot leads the company towards achieving excellence in every aspect of its operations. His leadership style emphasizes customer satisfaction, operational efficiency, and long-term business relationships, ensuring that Kumar Generator House remains a trusted name in the industry.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704217/kumarpower_website/ahzrtelijqxkyg5hmafo.jpg",
              },
              {
                id: "team-3",
                name: "JS KUMAR",
                role: "(Director)",
                bio: "JS Kumar is a director at Kumar Generator House, where he plays a pivotal role in overseeing business strategy, operations, and growth initiatives. With a focus on enhancing internal processes and fostering partnerships, He is committed to driving the company's expansion and ensuring the delivery of efficient, high-quality service to clients. His strategic approach and dedication to innovation continue to shape the company's success in the power solutions sector.",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784704217/kumarpower_website/ahzrtelijqxkyg5hmafo.jpg",
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
            isoCertImg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
            kirloskarCertImg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784704221/kumarpower_website/mtjwhs960zambsokn9z5.png",
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
            bannerBgImage:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703170/kumarpower_website/hif6xnvv5mggerl73bkd.png",
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
              bgImage:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784712926/kumarpower_website/pages/cmhdtexux4t9hf0c7eo8.png",
            },
            photos: [
              {
                id: "g-2",
                alt: "Kirloskar Generator Installation 3",
                category: "installations",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713096/kumarpower_website/pages/ikyj9qxbves5g2vzfqi6.jpg",
              },
              {
                id: "g-3",
                alt: "Kirloskar Generator Installation 4",
                category: "installations",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713097/kumarpower_website/pages/jhkaubhzzyegimfwujao.jpg",
              },
              {
                id: "g-4",
                alt: "Kirloskar Generator Installation 5",
                category: "installations",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713098/kumarpower_website/pages/zxellajmsguby11rn3kx.jpg",
              },
              {
                id: "g-5",
                alt: "Kirloskar Generator Installation 6",
                category: "installations",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713099/kumarpower_website/pages/ie7rz6jlndxbeag8m40f.jpg",
              },
              {
                id: "g-6",
                alt: "Kirloskar Generator Installation 7",
                category: "installations",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713101/kumarpower_website/pages/xwgvfolwnrwrvycmyfil.jpg",
              },
              {
                id: "g-21",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712956/kumarpower_website/pages/qt8loinzrnq50syaujdv.jpg",
              },
              {
                id: "g-22",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712958/kumarpower_website/pages/swrdixw71xzk13zytxwi.jpg",
              },
              {
                id: "g-23",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712961/kumarpower_website/pages/nv1coti0pbt9updj9zem.jpg",
              },
              {
                id: "g-24",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712964/kumarpower_website/pages/gg2shdmfvkk0i5qrjodh.jpg",
              },
              {
                id: "g-25",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712967/kumarpower_website/pages/cvsmedinsicc7qciyvim.jpg",
              },
              {
                id: "g-26",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712970/kumarpower_website/pages/madcl8k7zhfsmo9ucts0.jpg",
              },
              {
                id: "g-27",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712973/kumarpower_website/pages/miolur5mveja7yw0rl8l.jpg",
              },
              {
                id: "g-28",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712976/kumarpower_website/pages/zzr4gqgedwmppk7duidl.jpg",
              },
              {
                id: "g-29",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712979/kumarpower_website/pages/rgzhffoi0hx09m72pzvx.jpg",
              },
              {
                id: "g-30",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712982/kumarpower_website/pages/lmzbwpyfadbvcuho7lek.jpg",
              },
              {
                id: "g-31",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712986/kumarpower_website/pages/k223hwqie50ggnqzdt78.jpg",
              },
              {
                id: "g-32",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712989/kumarpower_website/pages/nk6xkui0cm9ynjy5vbpq.jpg",
              },
              {
                id: "g-33",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712992/kumarpower_website/pages/vbbvbtx9t8zzu0en4akt.jpg",
              },
              {
                id: "g-34",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712995/kumarpower_website/pages/xugoluyfihyajmkumrjx.jpg",
              },
              {
                id: "g-35",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712998/kumarpower_website/pages/yudvlnbchlxu8mtwl4c1.jpg",
              },
              {
                id: "g-36",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713001/kumarpower_website/pages/ox3adev6neffgw8c9sxd.jpg",
              },
              {
                id: "g-37",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713004/kumarpower_website/pages/avprzvnmqxcdzr2uafhp.jpg",
              },
              {
                id: "g-38",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713007/kumarpower_website/pages/s63zsrq2o63qq0nkz0pg.jpg",
              },
              {
                id: "g-39",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713010/kumarpower_website/pages/y8jsme7h59hllzwonl7h.jpg",
              },
              {
                id: "g-40",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713013/kumarpower_website/pages/yvmkazbsvsbtkcmj4dih.jpg",
              },
              {
                id: "g-41",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713016/kumarpower_website/pages/jketih93qcrdpxrvtmf3.jpg",
              },
              {
                id: "g-42",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713019/kumarpower_website/pages/jfdnccb81yneb83yer7l.jpg",
              },
              {
                id: "g-43",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713028/kumarpower_website/pages/lnuiwaiwcvxfelztnsso.jpg",
              },
              {
                id: "g-44",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713034/kumarpower_website/pages/hfcszjbsbyi1iwzvziqz.jpg",
              },
              {
                id: "g-45",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713037/kumarpower_website/pages/rltviaqeaqm9ot2au053.jpg",
              },
              {
                id: "g-46",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713041/kumarpower_website/pages/gf2k0wr7drka29n0acwc.jpg",
              },
              {
                id: "g-47",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713044/kumarpower_website/pages/gdrjvvk9f90zvoadqpwa.jpg",
              },
              {
                id: "g-48",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713047/kumarpower_website/pages/bh3icegv40evgebek8ag.jpg",
              },
              {
                id: "g-49",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713050/kumarpower_website/pages/icaxvtbwczzhgsvcvc70.jpg",
              },
              {
                id: "g-50",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713053/kumarpower_website/pages/xz2eeoog5r65hwgewnfc.jpg",
              },
              {
                id: "g-51",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713056/kumarpower_website/pages/ubeyjv6tyhthshuz60jl.jpg",
              },
              {
                id: "g-52",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713059/kumarpower_website/pages/ojp0f0wkemp5xku0yamr.jpg",
              },
              {
                id: "g-53",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713062/kumarpower_website/pages/naoiko106181rzzppvnz.jpg",
              },
              {
                id: "g-54",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713065/kumarpower_website/pages/uswf2qfqembwzbxmapm4.jpg",
              },
              {
                id: "g-55",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713068/kumarpower_website/pages/bouwkmloxqr2wozu6eaq.jpg",
              },
              {
                id: "g-56",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713071/kumarpower_website/pages/ygivfklnolxphk6bhsd8.jpg",
              },
              {
                id: "g-57",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713075/kumarpower_website/pages/dvennlfd24b2g23vhyop.jpg",
              },
              {
                id: "g-58",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713077/kumarpower_website/pages/mhnmskiuvnua37epcfks.jpg",
              },
              {
                id: "g-59",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713080/kumarpower_website/pages/cvo1k2qifwxhq7ea4kt5.jpg",
              },
              {
                id: "g-60",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713083/kumarpower_website/pages/fiyy3sf7ookg4pbof3r6.jpg",
              },
              {
                id: "g-61",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713085/kumarpower_website/pages/nbc8kbi3opluohr0h2j2.jpg",
              },
              {
                id: "g-62",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713088/kumarpower_website/pages/tal91jbd1llqctfuix8u.jpg",
              },
              {
                id: "g-63",
                alt: "Diwali Celebration Event",
                category: "events",
                src: "https://res.cloudinary.com/dpa93copz/image/upload/v1784713091/kumarpower_website/pages/nqysgnrnvrilohhu57yh.jpg",
              },
            ],
            seeMoreLabel: "See More",
            showLessLabel: "Show Less",
            experience: {
              title: "Experience Power Excellence",
              description:
                "Ready to transform your power infrastructure with industry-leading generator solutions? Our team of experts is ready to guide you through every step.",
              bgImage:
                "https://res.cloudinary.com/dmhabztbf/image/upload/v1763019219/Group_9_cc74ol.png",
              profilePdf:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
              btn1Label: "Book Your Consultation →",
              btn1Url: "/contact",
              btn2Label: "Download Company Profile",
              btn2Url: "",

              stickyTextPart1: "Kumar Power:",
              stickyTextPart2:
                "India's Most Trusted Kirloskar-Certified Generator Brand!",
              downloadBtn1Label: "Download Bharat Rajptar",
              downloadBtn1Url:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
              downloadBtn2Label: "Download Direction 76",
              downloadBtn2Url:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
              talkBtnLabel: "Talk to Power Expert",
              requestBtnLabel: "Request Quote",
              cert1Title: "ISO 9001:2015",
              cert2Title: "CPCB-IV+",
              cert3Title: "Kirloskar Authorized",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714152/kumarpower_website/products_and_certs/glrlbbblktcu31rtsgdq.jpg",
              },
              {
                id: "cert-2",
                name: "Certificate of Excellence",
                year: "2012-2013",
                description:
                  "Environmental Management System certification, demonstrating our commitment to environmental responsibility.",
                issuer: "KOEL Pune",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714153/kumarpower_website/products_and_certs/ajfrxxpc7fjhfm49efh2.jpg",
              },
              {
                id: "cert-3",
                name: "Certification of Highest Growth",
                year: "2013",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest growth & highest nos. of KIRLOSKAR GREEN DG sets sold in FY 2013.",
                issuer: "KOEL-JAKPOWER-KGD Conference, Goa",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714154/kumarpower_website/products_and_certs/jf46y3vwkmu0wmaps8q7.jpg",
              },
              {
                id: "cert-4",
                name: "Certificate for Highest in MHP generators",
                year: "2014",
                description:
                  "Awarded to Kumar Generator House, Delhi for highest volume in MHP generators in FY 14.",
                issuer: "Kirloskar Conference Awards - Pune",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714156/kumarpower_website/products_and_certs/w0no32nuna1dumo6rgxq.jpg",
              },
              {
                id: "cert-5",
                name: "Certificate for Highest in HHP generators",
                year: "2014",
                description:
                  "Awarded to Kumar Generator House, Delhi for highest volume in HHP generators in FY 14.",
                issuer: "Kirloskar Conference Awards - Pune",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714157/kumarpower_website/products_and_certs/jwmcrg2fr5nmhofjoomj.jpg",
              },
              {
                id: "cert-6",
                name: "Certificate for Highest Sale",
                year: "2015",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 15.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714158/kumarpower_website/products_and_certs/ff6mtao7uacsqfevimnm.jpg",
              },
              {
                id: "cert-7",
                name: "KOEL-JAKPOWER-KGD & SD Conference Awards Gangtok",
                year: "2018-2019",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 18-19.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Gangtok",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714160/kumarpower_website/products_and_certs/q9o29pkkudtdfahynvbx.jpg",
              },
              {
                id: "cert-8",
                name: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                year: "2016-2017",
                description:
                  "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 16-17.",
                issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714161/kumarpower_website/products_and_certs/cd4yb3lc8ppznmxftwhf.jpg",
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

            stickyTextPart1: "Kumar Power:",
            stickyTextPart2:
              "India's Most Trusted Kirloskar-Certified Generator Brand!",
            downloadBtn1Label: "Download Bharat Rajptar",
            downloadBtn1Url:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
            downloadBtn2Label: "Download Direction 76",
            downloadBtn2Url:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
            talkBtnLabel: "Talk to Power Expert",
            requestBtnLabel: "Request Quote",
            cert1Title: "ISO 9001:2015",
            cert2Title: "CPCB-IV+",
            cert3Title: "Kirloskar Authorized",
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
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            btn1Text: "Request a Quote",
            btn1Url: "/contact",
            btn2Text: "Download Product Catalogue",
            btn2Url:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",

            stickyTextPart1: "Kumar Power:",
            stickyTextPart2:
              "India's Most Trusted Kirloskar-Certified Generator Brand!",
            downloadBtn1Label: "Download Bharat Rajptar",
            downloadBtn1Url:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
            downloadBtn2Label: "Download Direction 76",
            downloadBtn2Url:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784713245/kumarpower_website/pages/oftso21rubdamr9nvjvz.pdf",
            talkBtnLabel: "Talk to Power Expert",
            requestBtnLabel: "Request Quote",
            cert1Title: "ISO 9001:2015",
            cert2Title: "CPCB-IV+",
            cert3Title: "Kirloskar Authorized",

            sectionTitle: "ALL Products",
            sectionDesc:
              "We offer a complete range of power and electrical solutions including Kirloskar Diesel Generators, Kirloskar Gas Generators, Kirloskar Portable Generators, Electrical Panels, Servo Voltage Stabilizers, and Transformers, engineered for reliable performance across residential, commercial, and industrial applications.",
            certTitle: "Certified Excellence",
            helpTitle: "Need Help Choosing the Right Electrical Solution?",
            helpSub:
              "Our team of experts will help you select the perfect solution based on your industry and budget.",
            helpBtnText: "Talk to an Expert",
            whyChooseTitle: "Why Choose Kirloskar Generators?",

            whyChooseCard1Title: "Unmatched Reliability",
            whyChooseCard1Desc:
              "Engineered for 24/7 operation with redundant systems and fail-safe mechanisms.",
            whyChooseCard2Title: "Fuel Efficiency",
            whyChooseCard2Desc:
              "Advanced engine technology delivers optimal fuel consumption and lower operating costs.",
            whyChooseCard3Title: "Rapid Response",
            whyChooseCard3Desc:
              "Quick start capability ensures minimal downtime during power outages.",
            whyChooseCard4Title: "Low Noise Operation",
            whyChooseCard4Desc:
              "Acoustic engineering reduces noise levels for urban and sensitive environments.",
            whyChooseCard5Title: "Easy Maintenance",
            whyChooseCard5Desc:
              "Modular design with accessible components simplifies service and maintenance.",
            whyChooseCard6Title: "Smart Controls",
            whyChooseCard6Desc:
              "Advanced digital interfaces with remote monitoring and diagnostic capabilities.",
            // cert properties removed as they are duplicates

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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714180/kumarpower_website/products_and_certs/xrrqjdwx727kuavykav3.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "Engineered specifically for compact power needs, this range utilizes the robust Kirloskar R550 series engines, known for their naturally aspirated design and reliable G2 class mechanical governing. These units are optimized for low-load operations, consuming approximately 2-3 Liters per hour at 75% load, making them highly economical. The silent canopy design ensures noise levels remain below 75 dBA at 1 meter, making these generators the ideal choice for small retail shops, clinics, residential backup, and small offices where silence is as important as power.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714172/kumarpower_website/products_and_certs/jok8mlfzuk4ycexlywjo.jpg",
                description:
                  "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
                technicalSpecs:
                  "Utilizing state-of-the-art gas engine technology, this range offers a greener footprint with extremely low NOx and PM emissions that exceed CPCB norms. The engines employ stoichiometric combustion to ensure high thermal efficiency, resulting in operating costs that are 40-50% lower than comparable diesel gensets. With inherent fuel flexibility (compatible with Natural Gas, CNG, and LPG) and a quieter combustion process, these generators are ideal for urban areas with strict pollution norms, green buildings, and cost-conscious businesses.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714188/kumarpower_website/products_and_certs/gw95efnw5vjihttymsdf.jpg",
                description:
                  "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
                technicalSpecs:
                  "These lightweight and mobile power solutions are designed for 'on-the-go' reliability. Featuring ergonomic designs with wheels and handles on select models, they offer easy mobility for any user. The units come with options for easy recoil start or electric start and feature copper-wound alternators for stable voltage output. Equipped with circuit breaker protection and oil alert systems to prevent damage, they are ideal for food trucks, camping trips, home backup for lights and fans, and operating small construction tools.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714167/kumarpower_website/products_and_certs/gnoy4jyfav3qis3leaey.jpg",
                description:
                  "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
                technicalSpecs:
                  "The Optiprime series represents the next evolution in generator efficiency, utilizing variable speed and optimized fuel mapping technology. This advanced system delivers significantly better fuel economy at partial loads compared to standard generators, drastically reducing running costs. It comes integrated with an IoT device for real-time health monitoring and predictive maintenance, ensuring maximum uptime. Housed in an enhanced canopy for superior weather protection, the Optiprime is the perfect solution for telecom towers, ATMs, and remote sites with varying load patterns.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714197/kumarpower_website/products_and_certs/wzzvqr27kooz9g6f6jnb.png",
                description:
                  "High-quality electrical panels for power distribution, control, and protection of your electrical systems.",
                technicalSpecs:
                  "Our Auto Mains Failure (AMF) panels are engineered for seamless power transition, featuring a microprocessor-based controller that manages automatic start/stop logic with precision. The panels utilize high-quality contactors or motorized breakers for reliable changeover operations. Comprehensive protection logic safeguards the load from voltage fluctuations, phase reversals, and frequency errors. The interface includes clear LED/LCD indications for Mains and DG status, ensuring operators have full visibility of the power system at all times.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714202/kumarpower_website/products_and_certs/azaokay703ttagwvjix4.jpg",
                description:
                  "Reliable servo stabilizers to protect your equipment from voltage fluctuations and ensure consistent power supply.",
                technicalSpecs:
                  "This range delivers precision voltage correction using advanced oil-immersed technology, making it ideal for heavy-duty cycles. It achieves correction speeds greater than 20V per second with an output voltage regulation accuracy of ±1%. The oil-cooled design ensures superior heat dissipation, extending component life. Built with high-grade variacs (toroidal transformers) and buck-boost transformers, it offers comprehensive protection including low/high voltage cutoffs and overload protection, ensuring total safety for connected equipment.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714204/kumarpower_website/products_and_certs/zae649ckiadypi91wztf.jpg",
                description:
                  "Durable and efficient transformers designed for various industrial and commercial applications.",
                technicalSpecs:
                  "These reliable step-down transformers are crafted for utility and industrial use, featuring a core made from CRGO (Cold Rolled Grain Oriented) silicon steel laminations to minimize losses. The windings are constructed from high-quality Electrolytic Copper or Aluminum with robust paper insulation. Utilizing ONAN (Oil Natural Air Natural) cooling and complying with IS 1180 energy efficiency levels, they include an off-circuit tap changer, allowing for precise voltage adjustments to match network requirements.",
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
      metaDescription:
        "Explore CPCB-IV+ compliant Kirloskar Diesel Generators.",
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
            heroSub:
              "Explore Kirloskar Diesel Generators at Kumar Power for reliable backup and prime power solutions. Ideal for industrial and commercial applications in the required power range.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "CPCB4+ Diesel Generators",
            sectionDesc:
              "Kirloskar's range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
            certTitle: "Certified Excellence",
            helpTitle: "Need Help Choosing the Right Electrical Solution?",
            helpSub:
              "Our team of experts will help you select the perfect solution based on your industry and budget.",
            helpBtnText: "Talk to an Expert",
            whyChooseTitle: "Why Choose Kirloskar Generators?",

            whyChooseCard1Title: "Unmatched Reliability",
            whyChooseCard1Desc:
              "Engineered for 24/7 operation with redundant systems and fail-safe mechanisms.",
            whyChooseCard2Title: "Fuel Efficiency",
            whyChooseCard2Desc:
              "Advanced engine technology delivers optimal fuel consumption and lower operating costs.",
            whyChooseCard3Title: "Rapid Response",
            whyChooseCard3Desc:
              "Quick start capability ensures minimal downtime during power outages.",
            whyChooseCard4Title: "Low Noise Operation",
            whyChooseCard4Desc:
              "Acoustic engineering reduces noise levels for urban and sensitive environments.",
            whyChooseCard5Title: "Easy Maintenance",
            whyChooseCard5Desc:
              "Modular design with accessible components simplifies service and maintenance.",
            whyChooseCard6Title: "Smart Controls",
            whyChooseCard6Desc:
              "Advanced digital interfaces with remote monitoring and diagnostic capabilities.",
            cert1Title: "ISO 9001:2015",
            cert2Title: "CPCB-IV+",
            cert3Title: "Kirloskar Authorized",

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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714180/kumarpower_website/products_and_certs/xrrqjdwx727kuavykav3.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "Engineered specifically for compact power needs, this range utilizes the robust Kirloskar R550 series engines, known for their naturally aspirated design and reliable G2 class mechanical governing. These units are optimized for low-load operations, consuming approximately 2-3 Liters per hour at 75% load, making them highly economical. The silent canopy design ensures noise levels remain below 75 dBA at 1 meter, making these generators the ideal choice for small retail shops, clinics, residential backup, and small offices where silence is as important as power.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714228/kumarpower_website/products_and_certs/p43cmp3eergzesyylcqe.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714184/kumarpower_website/products_and_certs/xdwoqirxbqvzwz5sllkq.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "These mid-range workhorses are built for stability and endurance, powered by Kirloskar's liquid-cooled 3R1040 and 4R1040 series engines equipped with heavy-duty radiators. The system integrates advanced anti-vibration mounts to ensure smooth operation and minimal structural stress. Featuring a brushless, single-bearing alternator with IP23 protection and managed by the KG545 Digital Controller, these units offer comprehensive remote monitoring capabilities. They are perfectly suited for restaurants, commercial complexes, and small manufacturing units requiring consistent uptime.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714231/kumarpower_website/products_and_certs/vuismmwuz2zcgqh1bhsh.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714178/kumarpower_website/products_and_certs/j9vig3utu86xmqjukvl4.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "Designed for industrial-grade performance, this range utilizes 4 and 6 cylinder inline turbocharged and intercooled engines to handle demanding loads. With G3 Class electronic governing, these generators provide precise frequency regulation and excellent sudden load acceptance, capable of handling 100% block loading. The fuel tanks are sized for 8-10 hours of continuous running, ensuring uninterrupted workflow. These are the preferred power solution for construction sites, medium-scale industries, hospitals, and hotels where power quality cannot be compromised.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714235/kumarpower_website/products_and_certs/tztxdfdga87zbyguxg3p.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714165/kumarpower_website/products_and_certs/n0s7hl3qm65qyueqpkra.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "This series features high-performance Kirloskar DV Series engines (with V-Type configuration options) that deliver robust power for critical infrastructure. They offer best-in-class fluid efficiency, optimizing both fuel and DEF consumption to lower operational costs. Controlled by an advanced ECU for precise engine management and diagnostics, these units include comprehensive safety protections against Over-speed, Low Lube Oil Pressure (LLOP), and High Water Temperature. They are engineered for large commercial hubs, infrastructure projects, and data centers.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714239/kumarpower_website/products_and_certs/d9d72hlytpr3awuux62e.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714169/kumarpower_website/products_and_certs/rdvkcepag17r62vonbao.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "These heavy-duty powerhouses are designed for 24/7 continuous operations in harsh environments, powered by SL90 and DV Series turbocharged after-cooled engines. The system allows for easy paralleling and synchronization with the grid or other DG sets to create flexible power plants. With GSM/GPRS-enabled controllers for remote monitoring and long service intervals of 500 hours, these generators significantly reduce Opex. They are the standard for heavy engineering industries, malls, mining operations, and large-scale real estate developments.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714242/kumarpower_website/products_and_certs/zxjcgmnltc5lzyyqlovq.jpg",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714186/kumarpower_website/products_and_certs/lfs4vcyoxue0s64vlpt3.jpg",
                description:
                  "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
                technicalSpecs:
                  "Representing the ultimate in power solutions, this range features the legendary K-Series and DV-Series engines known for massive power density within a compact footprint. They utilize full authority electronic engine management systems for peak performance and can be configured with heavy-duty remote radiator options for specialized installations. Designed for absolute reliability in continuous duty cycles, these generators power critical national assets including power plants, mega-infrastructure projects, international airports, and hyperscale data centers.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714246/kumarpower_website/products_and_certs/hwrisjalxeanjxazoulw.jpg",
              },
            ],
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
            heroSub:
              "Kirloskar Oil Engines Ltd (KOEL) offers a range of gas-powered generator sets (gensets) designed to provide reliable and efficient power solutions across various applications.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "Gas Generators",
            sectionDesc:
              "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
            gensets: [
              {
                id: "gg-1",
                name: "15 kVA to 250 kVA Gas Generators",
                range: "15 kVA to 250 kVA",
                fuelType: "Natural Gas/CNG",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Single/Three Phase",
                rating: "4.8",
                ratingCount: "142",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714172/kumarpower_website/products_and_certs/jok8mlfzuk4ycexlywjo.jpg",
                description:
                  "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
                technicalSpecs:
                  "Utilizing state-of-the-art gas engine technology, this range offers a greener footprint with extremely low NOx and PM emissions that exceed CPCB norms. The engines employ stoichiometric combustion to ensure high thermal efficiency, resulting in operating costs that are 40-50% lower than comparable diesel gensets. With inherent fuel flexibility (compatible with Natural Gas, CNG, and LPG) and a quieter combustion process, these generators are ideal for urban areas with strict pollution norms, green buildings, and cost-conscious businesses.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714249/kumarpower_website/products_and_certs/h3vfgttfpmmvs8kxiulg.jpg",
              },
            ],
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
            heroSub:
              "Kirloskar Oil Engines Ltd (KOEL) offers a range of portable generator sets with power outputs from 2.1 kVA to 5 kVA, designed to provide reliable and efficient power solutions for various applications.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "Portable Generators",
            sectionDesc:
              "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
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
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714188/kumarpower_website/products_and_certs/gw95efnw5vjihttymsdf.jpg",
                description:
                  "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
                technicalSpecs:
                  "These lightweight and mobile power solutions are designed for 'on-the-go' reliability. Featuring ergonomic designs with wheels and handles on select models, they offer easy mobility for any user. The units come with options for easy recoil start or electric start and feature copper-wound alternators for stable voltage output. Equipped with circuit breaker protection and oil alert systems to prevent damage, they are ideal for food trucks, camping trips, home backup for lights and fans, and operating small construction tools.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714210/kumarpower_website/products_and_certs/tzrlmnc6fnymyk4hpacr.jpg",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Kirloskar Optiprime Generator",
      slug: "optiprime",
      description:
        "Advanced Optiprime generators for optimized fuel efficiency",
      metaTitle: "Optiprime Generators Dealer in Delhi | Kumar Power",
      metaDescription:
        "Variable speed and IoT monitoring generator technology.",
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
            heroSub:
              "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "Optiprime",
            sectionDesc:
              "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
            gensets: [
              {
                id: "op-1",
                name: "Kirloskar Optiprime Generator",
                range: "100 kVA",
                fuelType: "Diesel",
                cpcbNorm: "CPCB-IV+",
                cooling: "Liquid",
                phase: "Three Phase",
                rating: "4.8",
                ratingCount: "195",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714167/kumarpower_website/products_and_certs/gnoy4jyfav3qis3leaey.jpg",
                description:
                  "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
                technicalSpecs:
                  "The Optiprime series represents the next evolution in generator efficiency, utilizing variable speed and optimized fuel mapping technology. This advanced system delivers significantly better fuel economy at partial loads compared to standard generators, drastically reducing running costs. It comes integrated with an IoT device for real-time health monitoring and predictive maintenance, ensuring maximum uptime. Housed in an enhanced canopy for superior weather protection, the Optiprime is the perfect solution for telecom towers, ATMs, and remote sites with varying load patterns.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714225/kumarpower_website/products_and_certs/a2zvjvfh1fiqkavdyppg.jpg",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Electrical Panels",
      slug: "panels",
      description: "High quality AMF & power distribution electrical panels",
      metaTitle: "Electrical Control Panels Dealer in Delhi | Kumar Power",
      metaDescription:
        "Custom electrical panels for power distribution and protection.",
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
            heroSub:
              "We offer a comprehensive range of electrical panels designed for power distribution, control, and protection across industrial and commercial installations.",
            sectionTitle: "Electrical Panels",
            sectionDesc:
              "Browse our complete range of electrical control, AMF, and distribution panels.",
            panels: [
              {
                id: "p-1",
                name: "Auto Main Failure (AMF) Panels",
                range: "Various",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714184/kumarpower_website/products_and_certs/xdwoqirxbqvzwz5sllkq.jpg",
                description:
                  "Automated power switching between main grid power and generator backup.",
                technicalSpecs:
                  "Equipped with digital micro-processor controllers, automatic mains failure detection, and seamless generator start logic.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "p-2",
                name: "Auto Synchronizing Panels",
                range: "Various",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714178/kumarpower_website/products_and_certs/j9vig3utu86xmqjukvl4.jpg",
                description:
                  "Multi-generator load sharing and grid synchronizing control panels.",
                technicalSpecs:
                  "Designed for complex multi-genset installations requiring load demand management and auto load sharing.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Servo Voltage Stabilizers",
      slug: "servo-stabilizer",
      description:
        "Precision oil-cooled and air-cooled servo voltage stabilizers",
      metaTitle: "Servo Stabilizers Dealer in Delhi | Kumar Power",
      metaDescription:
        "Protect equipment from voltage fluctuations with servo stabilizers.",
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
            heroSub:
              "We provide servo voltage stabilizers designed to correct voltage fluctuations and deliver consistent output power. Best for industrial, commercial, and technical environments to protect equipment & improve performance.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "Servo Stabilizers",
            sectionDesc:
              "Reliable servo stabilizers to protect your equipment from voltage fluctuations and ensure consistent power supply.",
            servos: [
              {
                id: "s-1",
                name: "Oil Cooled Servo Voltage Stabilizers",
                range: "10-2000 kVA",
                rating: "4.9",
                ratingCount: "185",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714202/kumarpower_website/products_and_certs/azaokay703ttagwvjix4.jpg",
                description:
                  "Heavy-duty oil cooled stabilizers for continuous industrial voltage regulation.",
                technicalSpecs:
                  "Custom engineered transformer oil cooling with high dielectric strength and micro-processor voltage correction.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "s-2",
                name: "Air Cooled Servo Voltage Stabilizers",
                range: "5-100 kVA",
                rating: "4.8",
                ratingCount: "134",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714203/kumarpower_website/products_and_certs/eewzp3qihuoxbkpxdwj5.jpg",
                description:
                  "Clean air cooled voltage stabilizers for commercial and indoor equipment.",
                technicalSpecs:
                  "Maintenance-free air cooling design providing >98% efficiency and fast voltage response times.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Distribution Transformers",
      slug: "transformers",
      description: "Durable and efficient transformers from 100 to 2500 kVA",
      metaTitle: "Transformers Dealer in Delhi - Kumar Power",
      metaDescription:
        "High-efficiency step-down transformers for utility and industry.",
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
            heroSub:
              "At Kumar Power, we offer a diverse range of transformers designed to meet various industrial and commercial needs.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784714163/kumarpower_website/products_and_certs/htfecupmwgbydkqudwji.jpg",
            sectionTitle: "Transformers",
            sectionDesc:
              "Durable and efficient transformers designed for various industrial and commercial applications.",
            transformers: [
              {
                id: "t-1",
                name: "Oil Immersed Step Down Transformers",
                range: "100-2500 kVA",
                rating: "4.9",
                ratingCount: "142",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714204/kumarpower_website/products_and_certs/zae649ckiadypi91wztf.jpg",
                description:
                  "High-efficiency step-down transformers for utility and industrial applications.",
                technicalSpecs:
                  "Hermetically sealed or conservator design with high grade CRGO silicon steel core for minimal losses.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
              {
                id: "t-2",
                name: "Dry Type Resin Encapsulated Transformers",
                range: "100-3150 kVA",
                rating: "4.8",
                ratingCount: "98",
                image:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784714206/kumarpower_website/products_and_certs/vjb5xintrvujvimj3k0u.jpg",
                description:
                  "Fire-safe dry type transformers for indoor buildings, hospitals, and basements.",
                technicalSpecs:
                  "Vacuum resin encapsulated coils providing high moisture resistance and zero risk of oil pollution.",
                brochurePdf:
                  "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
              },
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
            heroHeading: "Powering India's\nElite Enterprises",
            heroDesc:
              "For over three decades, Kumar Generator House has been the trusted power partner for India's most demanding institutions.",
            heroImage:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1785144132/kumarpower_website/pages/ourc-handshake.png",
            heroCtaText: "Explore our client portfolio",
            esteemedTitle: "Our Esteemed Clients",
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
            prestigiousDesc:
              "We are proud to partner with industry leaders across various sectors, providing exceptional power solutions.",
            clientCategories: {
              mallsAndFarms: {
                title: "Malls/Banquet Halls/Farm & Guest Houses",
                clients: [
                  "Bridge Green Farm (Farmhouse)",
                  "Mr. Sanjeev Puri & Geeta Puri, Uppal Farms, Bilaspur. (Farmhouse)",
                  "Silver Grand Services (Banquet Hall)",
                  "Ananda Farm (Farmhouse)",
                  "Baghol Hospitality Infra Services (P) Ltd. (Guest House)",
                  "Celebration de grande (Banquet Hall)",
                  "Variety Shopping Centre (Shopping Mall)",
                  "Mr. Pawan, Eden Garden (Farmhouse)",
                  "Saifi Farm (Farm House)",
                  "Mark Mall (Shopping Mall)",
                  "Aashirwad Banquet Hall",
                  "RD FIESTA (Banquet Hall)",
                  "Beauty Green Farm House",
                  "Mr. P.J. Sight, Chattarpur (Farm House)",
                  "Mr. Lalit Dua, Dua Farms (Farm House)",
                  "Farida Begum, Farm No. 7 (Farm House)",
                  "UK Chaudhary, Jona Farm House (Farm House)",
                  "Mr. Karma, Green Beauty Farms (Farm House)",
                  "AMA Guest House (Guest House)",
                  "Saurabh Chopra, Farm House",
                ],
              },
              contractors: {
                title: "Contractors/Govt Offices",
                clients: [
                  "National Engineers & Contractors (MES) - Company Clos",
                  "Chauhan Hi-Tech Projects (P) Ltd.",
                  "The Collector, Camp Office, Tiruvannamalai.",
                  "Trishul Enterprises",
                  "JM Associates",
                  "BD Raizada & Co. (MES)",
                  "Ajit Jain & Co. (MES)",
                  "Gupta Engineers & Contactors (MES)",
                  "RS Sharma Contractors (P) Ltd. (MES)",
                  "Globe Civil Projects Pvt.Ltd.",
                  "Dharamraj Contracts (I) (P) Ltd.",
                  "Trilok & Associates",
                  "Ace Pipeline Contracts (P) Ltd.",
                  "Jai Mangla",
                  "Pacific Trade Links (MES)",
                  "Ganjoo & co. (MES)",
                  "Amit Associates (Amit goel) - MES",
                  "Jain Associates (MES)",
                  "Kansal & Company - Construction (MES)",
                  "Virender Construction (MES)",
                  "Yogesh - MR sales (MES)",
                  "Global Enterprises (MES)",
                  "Surjit Ling & Done (MES)",
                ],
              },
              builders: {
                title: "Builders",
                clients: [
                  "Mango Infatech Solutions (P) Ltd.",
                  "LG Builders",
                  "Vikas Buildtech (P) Ltd.",
                  "Surjit Singh & Sons",
                  "SSG Buildcon LLP",
                  "Pal & Paul Builders Ltd",
                  "Piyare Lal Hari Singh Builders (P) Ltd.",
                  "M/s. Property Shopee",
                  "M/s. Ratan Buildtech (P) Ltd.",
                  "Chettinad Property Developers (P) Ltd.",
                  "M/s. Osaaka Realtors (P) Ltd.",
                  "Chopra Promotors",
                  "M/s. Chauhan Associates",
                  "Shomit Finance Ltd.",
                  "Mr. SK Goyal (PLHS Builders)",
                  "UP INFRAESTATE PVT. LTD.",
                  "JS Builders",
                  "PCR Infratech (P) Ltd.",
                  "Auris Developers (P) Ltd.",
                  "Nishtha Builders",
                  "JK BUILDTECH",
                  "Yograj Builders",
                  "Starcity Real Estates (P) Ltd.",
                  "Akrati Technimont Ltd.",
                  "Lamba Builders",
                  "SANSKAR",
                  "Dkrrish Builders (P) Ltd.",
                  "Eco Green Buildtech (P) Ltd.",
                  "Investsmart Solutions (P) Ltd.",
                  "Celina Projects (P) Ltd",
                ],
              },
              petrol: {
                title: "Petrol Pump",
                clients: [
                  "Delhi Aviation Fuel Facility (P) Ltd",
                  "JK Filling Station, Bharat Petroleum Pump",
                  "MKR Highway Filling Station, (U.P.)",
                  "Tuli Motors",
                  "Sheetla Filling Station, Rewari.",
                  "Shaheed Anusuya Dhyani Service Station, Hari Nagar",
                  "Yash Filling Station, Najafgarh",
                  "Kartar Kissan Sewa Kendra, Distt. Jhajjar",
                  "Auto Fuel Indian Oil Petrol Pump",
                  "National Service Station",
                  "Bedi Saxena Service Station",
                  "Mangla Petro, Pitampura",
                ],
              },
              industries: {
                title: "Industries",
                clients: [
                  "Anjani Broadband Solutions (P) Ltd.",
                  "Grapes Digital (P) Ltd.",
                  "Berger Paints (1) Ltd.",
                  "Irisi Global Services (P) Ltd.",
                  "Veolia India (P) Ltd.",
                  "Faction Communication Pvt. Ltd.",
                  "Accord BPO Services (P) Ltd.",
                  "Auto Power Gen. Systems (P) Ltd.",
                  "N.K. Kapur & Co. (P) Ltd.",
                  "Leo Network Power Systems",
                  "Kaks Financial & Management Consultants Pvt. Ltd.",
                  "Unitop International",
                  "Vij Engineers & Consultants Pvt. Ltd.",
                  "Safe & Secure Online Marketing (P) Ltd.",
                  "Capital Business Solutions (P) Ltd.",
                  "Gigatel Networks Private Limited",
                  "Channel One",
                  "Sark EPC Projects Pvt Ltd.",
                  "Comed Chemicals Ltd.",
                  "Orian Automobiles (P) Ltd.",
                  "National Heavy Electric Corporation",
                  "D.S. DUCTOFAB SYSTEMS PVT. LTD.",
                  "Sapieo Software India (P) Ltd.",
                  "HDFC Sales Pvt. Ltd.",
                  "Meraki Sport and Entertainment (P) Ltd.",
                  "LRG Steel Concept (P) Ltd.",
                  "Elite HR Practices (P) Ltd.",
                  "Worldwide Facility Management Services (P) Ltd. (Aroon Aviation)",
                  "Webon Flex Marketing (P) Ltd.",
                  "Uttar Bharat Hydro Power (P) Ltd.",
                  "Divyanshi Power Solution",
                  "World Phone Internet Services (P) Ltd.",
                  "Cyber Group India Pvt. Ltd.",
                  "Seco Industries",
                  "Shubhankr Texfab India",
                  "AJS Software Tech. (P) Ltd.",
                  "Sharad Advertising (P) Ltd.",
                  "KGL Logistics Pvt. Ltd.",
                  "Glaze Trading India Pvt Ltd.",
                  "Sehgal Industries",
                  "Maco Infotech Ltd.",
                  "Tata Chemicals Ltd",
                  "Nirja Publishers & Printers (P) Ltd.",
                  "SIS India Ltd.",
                  "Market X-Cel Data Matrix (P) Ltd.",
                  "Dhanluxmi Agro Industries",
                  "Dreams Hospitality (P) Ltd.",
                  "M+V Marketing & Sales (P) Ltd.",
                  "SKETS Studio (P) Ltd.",
                  "Falcon Force (P) Ltd.",
                  "North East Region Finservices Ltd.",
                  "Hexagramm",
                  "SJVN Ltd., Rampur Hydro Electric Project",
                  "Sandys Hospitality (P) Ltd.",
                  "Moment Expro",
                  "Le-Grand Hospitality (P) Ltd.",
                  "Tirupati Cement",
                  "R.K. Global",
                  "Swagatam Enterprises",
                  "Automation Engineers",
                  "GND India Ltd.",
                  "World Phone internet P. Ltd.",
                  "Concept Communication",
                ],
              },
              retail: {
                title: "Retail Outlets",
                clients: [
                  "Samir Orange n White",
                  "Delhi Designer Studio",
                  "Numer uno KVC Retail",
                  "ADI Sports (1) (P) Ltd.",
                  "Max Hypermarkets India (P) Ltd.",
                  "Cutecumber Designs Pvt. Ltd.",
                  "Gems Mart Jewellers",
                  "Jindal Agro International",
                  "Aman Hosiery",
                  "Jaydeep Fashion",
                  "Grover Garments",
                  "KS Selection (P) Ltd.",
                  "VS Jeweller",
                  "Shivam Jewellers",
                  "Girdhari Lal & Sons",
                  "Harbans Jwellers",
                  "Atul Jewellers.",
                  "Shery Clothing and Designs (P) Ltd.",
                  "Incense Fashions",
                  "Mohan Lal & Sons",
                  "Nike Showroom",
                  "Anekvarna",
                  "Pritam Jewellers",
                  "Big C",
                  "Bansal Textiles",
                  "Roop Jewellers",
                  "CHEAP-Shoe Store",
                  "AK Fashion",
                  "Sanskriti Apparels",
                  "AG Fashions",
                  "Harbans Jewellers",
                  "Global Mode & Accessories (P) Ltd.",
                  "Kridha Footwear",
                  "Malik Jewellers",
                  "MB Jewellers",
                  "Fineese International Design Pvt. Ltd.",
                  "Rich Trend",
                  "SDS Creations",
                  "Sha Sha Fashion Trendz (P) Ltd.",
                ],
              },
              banks: {
                title: "Banks",
                clients: [
                  "Central Bank of India",
                  "Bank of India, Mahipalpur",
                  "Andhra Bank, Paschim Vihar, New Delhi.",
                  "State Bank Of Patiala",
                  "Kangra Bank, Prahladpur, New Delhi.",
                  "Axis Bank",
                  "Canara Bank, Meerut",
                  "The Karnataka Bank",
                  "Citi Bank, Punjabi Bagh",
                ],
              },
              embassies: {
                title: "Embassies",
                clients: [
                  "Embassy of The Democratic Republic of Congo",
                  "Embassy of the republic of Lithuania",
                  "Sikkim House",
                  "Romania Embassy",
                  "The Embassy of Sultanate of Oman",
                ],
              },
              education: {
                title: "Educational Institutions",
                clients: [
                  "Lamba Book Depot",
                  "Baba Haridass Institute of Nursing Education",
                  "KD Campus (P) ltd.",
                  "Green Tree Education (P) Ltd.",
                  "School of Business Management & Technologies",
                  "IIT College",
                  "Oscar Public School",
                  "Shishu Bharti School",
                  "Lakshay Online Test Centre",
                  "Vikas Publication (P) Ltd",
                  "SDS Institute of Modern Studies",
                  "Akash Institute",
                  "Delhi Technical Campus",
                  "Mount St. Mary's School",
                  "MCPS Junior School",
                  "GRM Public School",
                  "ARMY PUBLIC SCHOOL",
                  "Kelvin Institute",
                  "Modern Child Public Sec. School",
                  "Jagannath Engineering Mgt. Technical Campur",
                  "St. Thomas School",
                  "BK Convent School",
                  "Deshbandhu College",
                  "Vinod Gupta Classes",
                  "The Scholar School",
                  "SOUTH DELHI PUBLIC SCHOOL",
                  "Springdales School",
                  "IIT-INAS PACE EDUCATION",
                  "Crescent School",
                  "Sacred Heart College",
                  "Rai Foundation",
                  "BSC Publications",
                  "IGNOU, Regional Centre, NCT of Delhi",
                  "Educity peda gogy (P) Ltd.",
                  "Shadman English Mediam School",
                  "TINU PUBLIC SCHOOL",
                  "Shree Adhya Educational Books (P) Ltd.",
                  "Mahashay Chunnilal Saraswati Bal Mandir Sr. Sec. School",
                  "Kiran Prakashan (P) Ltd.",
                  "Navyug Public School",
                  "Vishal International School",
                  "St. Lawrence School",
                  "Salwan Public School",
                  "New Bal Bharti Public School",
                  "DPS School",
                  "Baghpat Institute of Education & Technology",
                  "Polish Institute",
                ],
              },
              medical: {
                title: "Medical Facilities",
                clients: [
                  "Sarvodya Hospital & institute of medical science.",
                  "Dinesh Baghpat Sarvodya Hospital & Institute of medical sciences.",
                  "Galaxy Hospital",
                  "Hi physix Laboratory",
                  "Amit Test & Calibration Centre",
                  "Toasha Vaccines Ltd.",
                  "Alshifa Multispeciality Hospital",
                  "City Medicos",
                  "Vibes Healthcare Ltd.",
                  "Insight Softlabz",
                  "East Delhi Focus Imaging (LLP) (LAB)",
                  "City X Ray & Scan Clinic (P) Ltd.",
                  "General Hospital, Leh",
                  "Patnaiks Laser Eye Institute",
                  "Global Health Line (P) Ltd.",
                  "Khemchand Chugh Arya Samaj Hospital",
                  "Nueclear Healthcare Ltd.",
                  "Akash Hospital",
                  "Arvind Medicare (P) Ltd.",
                  "Tomer Multi Speciality Hospital",
                  "Vardan Clinic",
                  "Sanyasi Ayurveda",
                  "Viviano Healthcare (P) Ltd.",
                  "Sankalp Hospital",
                  "Gandhi Nursing Home",
                  "Dr. Faheem Ahmed, Fatima Child Care Centre, Rampur, UP",
                  "Nature & Nurture Healthcare (P) Ltd.",
                  "Animal Hospital",
                  "Kesar Hospital",
                  "Revive Hospital",
                  "Hi Physix Laboratory India (P) Ltd.",
                ],
              },
              construction: {
                title: "Construction",
                clients: [
                  "Tribeni Construction Ltd.",
                  "Juneja Construction (P) Ltd.",
                  "Jeet Construction Co.",
                  "Rishab Construction Pvt Ltd",
                  "S&P Infrastructure Developers (P) ltd.",
                  "A&T Engg. (P) Ltd.",
                  "Janhavi Construction",
                  "Varindera Construction Ltd.",
                  "Ramacivil India Construction (P) Ltd.",
                  "Starcity Real Estate Pvt. Ltd.",
                  "Chhavi Construction Co.",
                  "Oriental Structural Engineers (P) Ltd.",
                  "ASGI Reality & Infra developers (P) Ltd",
                  "Angelique International Ltd.",
                  "WELCOME CONSTRUCTION CO LTD, CAMROON",
                  "Amranottos infratech Pvt. Ltd.",
                  "Pinnacle Superstructures (P) Ltd.",
                  "Infra 13 (P) Ltd.",
                  "Nirman Enconprojects (P) Ltd.",
                  "KEC International Ltd.",
                  "Shivom Projects (P) Ltd.",
                  "Arvind Construction",
                  "KC Infratech",
                  "Julka Construction",
                  "Anupam Construction",
                  "Windchimes Construction (P) Ltd.",
                  "Gram Bharti Construction",
                  "J.K. Construction & Developers",
                  "Brahma Construction",
                  "Metamorphosis Construction",
                  "Parnika Commercial & Estates (P) Ltd.",
                  "High Tech Profile (P) Ltd.",
                  "Pashupati Effects (P) Ltd.",
                  "CTC Projects Pvt. Ltd.",
                  "Continental Engineering Corporation",
                  "CEC",
                  "E-Homes Infrastructure (P) Ltd",
                  "S. P. SINGLA CONSTRUCTION PVT. LTD.",
                  "Spherical Construction & Interiors",
                  "Dharamraj Construct (1) Pvt. Ltd.",
                  "ATS Township (P) Ltd.",
                ],
              },
              spiritual: {
                title: "Spiritual & NGOs",
                clients: [
                  "Narayani Tandhandas Deosar Trust, Deosar Mandir, Haryana",
                  "Shiri Sidh Hanuman Mandir, Gurgaon",
                  "Ganga Foundation, Moradabad",
                  "Shri Shiv Durga Mandir, Punjabi Bagh",
                  "Guru Ji Ashram, Ghaziabad",
                  "Dharampal Mehra Charitable Trust, (UP)",
                  "Sulahkul Satsang Mandir, Karnal",
                  "Damian Foundation India (Trust), Qutub Vihar",
                  "Sai Retina Foundation, Dilshad Colony",
                  "Methodist Church, New Delhi.",
                  "St. Thomas Malankara Catholic Church, Uttam Nagar",
                  "Gurudwara Shri Guru Singh Sabha, Old Mahavir Nagar",
                  "DWARKA KALIBARI, Dwarka",
                  "Ganpati Miniral, Gulab Pura",
                  "Sant Nirankari Mandal, Tilak Nagar",
                  "Maa Saheb Dargah, Mehrauli",
                  "Hindu Dharam Sabha Janak Puri,",
                  "Maharaja Sawai Man Singh II Museum Trust, Maharani Bagh",
                  "Swami Sambodh Prakash ji Maharaj, Haridwar",
                  "Manav Mandir Mission Trust, Ashram Ring Road",
                  "Father Wilson, Church, Tahirpur",
                  "GURUDWARA SAHIB, Hari Nagar",
                  "Nutrition Foundation of India, Qutub Institutional Area",
                  "Mahant Dharam Singh Trust, Main Najafgarh Road",
                ],
              },
              society: {
                title: "Society/Apartment",
                clients: [
                  "Group Housing Society Ltd, Dwarka",
                  "Shiksha Enclave Co-op. Housing Society Ltd",
                  "Adam M2K Projects LLP",
                  "Raison Armour Homes Residents Welfare Association, Ghaziabad",
                  "Jeevan Apartment Residents Assoication, Okhla",
                  "Mangalam Villas Module - Ghaziabad.",
                  "New Jyoti Co-operative Group Housing Society Ltd., Dwarka",
                  "Elders Homes Society, Rohini",
                ],
              },
              hospitality: {
                title: "Hospitality & Hotels",
                clients: [
                  "W.G. Hospitality (Restaurant)",
                  "WUSHU Chinese Cuisine (Restaurant)",
                  "Hotel B Continental (Hotel)",
                  "Vivah Residency (Hotel)",
                  "Café Brown Sugar (Restaurant)",
                  "Hotel Corus (Hotel)",
                  "Melody Food Merchant (P) Ltd. (Restaurant)",
                  "Headway Foods & Resturant LLP (Restaurant)",
                  "Karim Restaurant (Restaurant)",
                  "zest Hospitality (P) Ltd (Restaurant)",
                  "Rosedale Inn (P) Ltd. (Hotel)",
                  "Hotel Pluto (Hotel)",
                  "Hotel Runway (Hotel)",
                  "Hotel Singh Empire (Hotel)",
                  "Kwality Dhaba ( Restaurant )",
                  "Hotel USA (Hotel)",
                  "Golden Highway (Restaurant )",
                  "Kalsang Ama café (Restaurant)",
                  "Karat 87 Hotel Pvt. Ltd. (Hotel)",
                  "Hotel Cubic Inn (Hotel)",
                  "Himalayan Splendour Resort (Hotel)",
                  "Darbar Restaurant (Restaurant)",
                  "PRADEEP JI, OYO Hotels, (Hotel)",
                  "THE GRACE HOUSE (Hotel)",
                ],
              },
              cpwd: {
                title: "CPWD & NBCC Projects",
                clients: [
                  "Education",
                  "Builders",
                  "Jaydeep Fashion",
                  "KS Selection (P) Ltd.",
                  "Shivam Jewellers",
                  "Atul Jewellers.",
                  "Jewellers",
                  "Aman Hosiery",
                  "Grover Garments",
                  "VS Jeweller",
                  "Girdhari Lal & Sons",
                ],
              },
              exporters: {
                title: "Exporters",
                clients: [
                  "PMI Engineering Export (P) Ltd, Chennai",
                  "Bishnu Impex (P) Ltd., Noida",
                  "Grandeur Overseas, Karol Bagh",
                  "Aufa Pakua",
                  "Kangra Export, New Delhi",
                  "AL Global (Export)",
                  "Agni Exports, Gurgaon",
                  "Aditya Enterprises",
                  "Deepeeka Exports (P) Ltd, Meerut",
                  "Swaraj Exports, Noida",
                  "Salman",
                  "Neha Exports",
                  "MANISH (Knott Fashion Studio)",
                  "Exim International",
                  "Mount Meru India (P) Ltd.",
                  "Ramnik Overseas",
                  "Patwal",
                  "Doyen Overseas Pvt. Ltd.",
                ],
              },
              manufacturers: {
                title: "Manufacturers/Wholesalers/Suppliers",
                clients: [
                  "Globe Auto Parts (P) Ltd.",
                  "Sonam Furniture",
                  "Modvak Cables (I) (P) Ltd.",
                  "Navnit Blister Packs (P) Ltd.",
                  "KK Lighting India (P) Ltd.",
                  "Suez India (P) Ltd.",
                  "Om Steel Tubes Ltd.",
                  "Vandana Aircraft Services (P) Ltd.",
                  "Ashirwad Oil Engines Ltd.",
                  "Ksheer Dhenu Foods (P) Ltd.",
                  "MRL Tyres Ltd.",
                  "AyurSens Naturals",
                  "ROYAL PAPER IND.",
                  "5 Core Electronics Ltd.",
                  "Harshey India (P) Ltd.",
                  "Volga India Rubber (P) Ltd.",
                  "Indian Scrap Traders",
                  "Malik Seasoning & Spices (P) Ltd.",
                  "LRG Steel Concept (P) Ltd.",
                  "Varmora Granito (P) Ltd.",
                  "Glimps Electronics (P) Ltd.",
                  "Green House & Hestoft Foods (P) Ltd.",
                  "APL Apollo Tubes Ltd.",
                  "KBC Asia & Co. (P) Ltd.",
                  "Wellmake Engineering Company (P) Ltd.",
                  "Relax Technologies (P) Ltd.",
                  "Al badr Seafoods (P) Ltd.",
                  "Bisleri international",
                  "Momspet Apparels (P) Ltd.",
                  "MV Shoecare (P) Ltd.",
                  "Quality materesses (P) Ltd.",
                  "Libra International Ltd.",
                  "Men Moms (P) Ltd.",
                  "Circle E-Retail Pvt. Ltd.",
                  "CRP Metals (P) Ltd.",
                  "Alice Biotech (P) Ltd.",
                  "Craftex India",
                  "Daikin Airconditioning India (P) Ltd.",
                  "Ruchi International",
                  "Mix Power Solutions",
                  "Automation Engineers A.B. Pvt. Ltd.",
                  "Azad Body Builders",
                  "Thermotech Engineering Corporation",
                  "Lloyd Insulation (India) Ltd.",
                  "Marut Techno Tools (P) Ltd.",
                  "Southern Boilers Equipments (P) Ltd.",
                  "CPL Energy India (P) Ltd.",
                  "TESPA TOOLS (P) LTD.",
                  "The Linc Publicity (P) Ltd.",
                  "Bhular India (P) Ltd.",
                  "Trimax Minrals (P) Ltd",
                  "KBM Spices (P) Ltd.",
                  "Ace Mobile Manufacturers (P) Ltd.",
                  "Trodat Marking India (P) Ltd.",
                  "Sardar Frozen Products (P) Ltd.",
                  "Apple Tree Building Maintenance (P) Ltd.",
                  "Gabsons Engineers & Consultants",
                  "Sunrider India (P) Ltd.",
                  "Vaadi Herbals (P) Ltd.",
                  "Divine Seating Collection",
                ],
              },
              infrastructure: {
                title: "Infrastructure",
                clients: [
                  "Green Infrastructures (P) Ltd",
                  "Sikka Infrastructure (P) Ltd",
                  "Joule Infrastructure (P) Ltd.",
                  "JPG Infraestate",
                  "Afcons Infrastructure Ltd.",
                  "SAV Infratech (P) Ltd.",
                  "Kashyapi Infrastructure (P) Ltd.",
                  "Liza Infrastructure Pvt. Ltd.",
                  "Goyala Infra Projects (P) Ltd.",
                ],
              },
              beautySalon: {
                title: "Beauty Salon",
                clients: [
                  "ADAMO SALOON, Malviya Nagar",
                  "Hair Café Beauty Saloon",
                  "Spa Aqua, GK-I",
                  "Toni & Guy, Model Town",
                  "Suhag Beauty Saloon, Dwarka",
                ],
              },
            },
            logos: [
              {
                id: "cl-1",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712863/kumarpower_website/pages/rpsj6uyhi7kl2gdsc8ng.jpg",
                alt: "GMR Infrastructure",
              },
              {
                id: "cl-2",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712895/kumarpower_website/pages/oyqudkfjkh1b3quulplh.png",
                alt: "Honeywell India",
              },
              {
                id: "cl-3",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712896/kumarpower_website/pages/esahf0nbza5bbekpynjy.png",
                alt: "Suez Water",
              },
              {
                id: "cl-4",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712898/kumarpower_website/pages/bhpjqp3anzsiowfrltvt.png",
                alt: "Adani Group",
              },
              {
                id: "cl-5",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712899/kumarpower_website/pages/fia6l5umqisbfn184vix.jpg",
                alt: "S&P Infra",
              },
              {
                id: "cl-6",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712900/kumarpower_website/pages/xbt3t4r0bsw48y1oaucl.png",
                alt: "Apollo Hospitals",
              },
              {
                id: "cl-7",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712872/kumarpower_website/pages/wzn7iloxksjdn9vdl9nz.jpg",
                alt: "CEC",
              },
              {
                id: "cl-8",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712902/kumarpower_website/pages/srgu3xp1bqpt0j0owygp.png",
                alt: "Seasons",
              },
              {
                id: "cl-9",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712903/kumarpower_website/pages/ots16de8ab4ep5y2qtvm.jpg",
                alt: "NCC Limited",
              },
              {
                id: "cl-10",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712905/kumarpower_website/pages/iuibicnolojsadd28sp4.png",
                alt: "Air India",
              },
              {
                id: "cl-11",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712906/kumarpower_website/pages/rbcdges456kvxuzujc9l.jpg",
                alt: "British Paints",
              },
              {
                id: "cl-12",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712908/kumarpower_website/pages/eqgmlclkhvgd3brunbit.png",
                alt: "NBCC Limited",
              },
              {
                id: "cl-13",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712909/kumarpower_website/pages/mznhggiitrdnbyvwxlea.png",
                alt: "Afcons Infrastructure",
              },
              {
                id: "cl-14",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712910/kumarpower_website/pages/bpexoloid3d5rgpf2qju.jpg",
                alt: "KEC International",
              },
              {
                id: "cl-15",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712912/kumarpower_website/pages/veflyibxqbnymwlrndng.jpg",
                alt: "OJC",
              },
              {
                id: "cl-16",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712913/kumarpower_website/pages/h4qlwyke69y5ou0uvhwy.jpg",
                alt: "Mapple Hotels",
              },
              {
                id: "cl-17",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712914/kumarpower_website/pages/npeoktrvuao1tzhnyf2b.jpg",
                alt: "Comed",
              },
              {
                id: "cl-18",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712917/kumarpower_website/pages/n9fiiakuoeyxtlldrasz.jpg",
                alt: "Rai Foundation",
              },
              {
                id: "cl-19",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712920/kumarpower_website/pages/onlo0n5zhobds9eolqzu.png",
                alt: "PWC",
              },
              {
                id: "cl-20",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712921/kumarpower_website/pages/olmrtpm51ks5emr2eyok.jpg",
                alt: "Daikin",
              },
              {
                id: "cl-21",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712923/kumarpower_website/pages/aefj0djwk27dqj8antl2.png",
                alt: "IGNOU",
              },
              {
                id: "cl-22",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712924/kumarpower_website/pages/l9bjz9xrufsdvyurjidz.jpg",
                alt: "Vistara",
              },
              {
                id: "cl-23",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712874/kumarpower_website/pages/mxqbgjryo9awqzfjzyei.jpg",
                alt: "Ace Construction",
              },
              {
                id: "cl-24",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712878/kumarpower_website/pages/pxzw9z3efrvmt4xqrgo6.png",
                alt: "Clarion",
              },
              {
                id: "cl-25",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712881/kumarpower_website/pages/l7vudrgnj0wn8x6geidl.jpg",
                alt: "DPS",
              },
              {
                id: "cl-26",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712883/kumarpower_website/pages/babowmbn5turkicygkbr.jpg",
                alt: "GEPL",
              },
              {
                id: "cl-27",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712884/kumarpower_website/pages/elr86cg9o5ehtbvtn2ks.jpg",
                alt: "Adidas",
              },
            ],
            clients: [
              {
                id: "cl-1",
                name: "GMR Infrastructure",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712863/kumarpower_website/pages/rpsj6uyhi7kl2gdsc8ng.jpg",
              },
              {
                id: "cl-2",
                name: "Honeywell India",
                category: "Industries",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712895/kumarpower_website/pages/oyqudkfjkh1b3quulplh.png",
              },
              {
                id: "cl-3",
                name: "Suez Water",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712896/kumarpower_website/pages/esahf0nbza5bbekpynjy.png",
              },
              {
                id: "cl-4",
                name: "Adani Group",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712898/kumarpower_website/pages/bhpjqp3anzsiowfrltvt.png",
              },
              {
                id: "cl-5",
                name: "S&P Infra",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712899/kumarpower_website/pages/fia6l5umqisbfn184vix.jpg",
              },
              {
                id: "cl-6",
                name: "Apollo Hospitals",
                category: "Medical Facilities",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712900/kumarpower_website/pages/xbt3t4r0bsw48y1oaucl.png",
              },
              {
                id: "cl-7",
                name: "CEC",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712872/kumarpower_website/pages/wzn7iloxksjdn9vdl9nz.jpg",
              },
              {
                id: "cl-8",
                name: "Seasons",
                category: "Commercial",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712902/kumarpower_website/pages/srgu3xp1bqpt0j0owygp.png",
              },
              {
                id: "cl-9",
                name: "NCC Limited",
                category: "CPWD & NBCC Projects",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712903/kumarpower_website/pages/ots16de8ab4ep5y2qtvm.jpg",
              },
              {
                id: "cl-10",
                name: "Air India",
                category: "Aviation & Logistics",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712905/kumarpower_website/pages/iuibicnolojsadd28sp4.png",
              },
              {
                id: "cl-11",
                name: "British Paints",
                category: "Manufacturers/Wholesalers",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712906/kumarpower_website/pages/rbcdges456kvxuzujc9l.jpg",
              },
              {
                id: "cl-12",
                name: "NBCC Limited",
                category: "CPWD & NBCC Projects",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712908/kumarpower_website/pages/eqgmlclkhvgd3brunbit.png",
              },
              {
                id: "cl-13",
                name: "Afcons Infrastructure",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712909/kumarpower_website/pages/mznhggiitrdnbyvwxlea.png",
              },
              {
                id: "cl-14",
                name: "KEC International",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712910/kumarpower_website/pages/bpexoloid3d5rgpf2qju.jpg",
              },
              {
                id: "cl-15",
                name: "OJC",
                category: "Commercial",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712912/kumarpower_website/pages/veflyibxqbnymwlrndng.jpg",
              },
              {
                id: "cl-16",
                name: "Mapple Hotels",
                category: "Hospitality & Hotels",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712913/kumarpower_website/pages/h4qlwyke69y5ou0uvhwy.jpg",
              },
              {
                id: "cl-17",
                name: "Comed",
                category: "Medical Facilities",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712914/kumarpower_website/pages/npeoktrvuao1tzhnyf2b.jpg",
              },
              {
                id: "cl-18",
                name: "Rai Foundation",
                category: "Educational Institutions",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712917/kumarpower_website/pages/n9fiiakuoeyxtlldrasz.jpg",
              },
              {
                id: "cl-19",
                name: "PWC",
                category: "Corporate",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712920/kumarpower_website/pages/onlo0n5zhobds9eolqzu.png",
              },
              {
                id: "cl-20",
                name: "Daikin",
                category: "Industries",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712921/kumarpower_website/pages/olmrtpm51ks5emr2eyok.jpg",
              },
              {
                id: "cl-21",
                name: "IGNOU",
                category: "Educational Institutions",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712923/kumarpower_website/pages/aefj0djwk27dqj8antl2.png",
              },
              {
                id: "cl-22",
                name: "Vistara",
                category: "Aviation & Logistics",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712924/kumarpower_website/pages/l9bjz9xrufsdvyurjidz.jpg",
              },
              {
                id: "cl-23",
                name: "Ace Construction",
                category: "Infrastructure",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712874/kumarpower_website/pages/mxqbgjryo9awqzfjzyei.jpg",
              },
              {
                id: "cl-24",
                name: "Clarion",
                category: "Commercial",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712878/kumarpower_website/pages/pxzw9z3efrvmt4xqrgo6.png",
              },
              {
                id: "cl-25",
                name: "DPS",
                category: "Educational Institutions",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712881/kumarpower_website/pages/l7vudrgnj0wn8x6geidl.jpg",
              },
              {
                id: "cl-26",
                name: "GEPL",
                category: "Industries",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712883/kumarpower_website/pages/babowmbn5turkicygkbr.jpg",
              },
              {
                id: "cl-27",
                name: "Adidas",
                category: "Commercial",
                logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1784712884/kumarpower_website/pages/elr86cg9o5ehtbvtn2ks.jpg",
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
            heroBgImage:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784712861/kumarpower_website/pages/mijnbqaaframtgxjcszo.jpg",
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
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703672/kumarpower_website/egvye1xjbviosybczmy5.jpg",
                alt: "Seasons",
              },
              {
                id: "logo-2",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703672/kumarpower_website/egvye1xjbviosybczmy5.jpg",
                alt: "SIS",
              },
              {
                id: "logo-3",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703674/kumarpower_website/vo2ekpdop7dovku0rc8n.jpg",
                alt: "Vistara",
              },
              {
                id: "logo-4",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703675/kumarpower_website/gbtxkuml1jukdiu4wlyh.jpg",
                alt: "GMR",
              },
              {
                id: "logo-5",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703677/kumarpower_website/xs3x2tpwjztqwrmhb3py.png",
                alt: "Honeywell",
              },
              {
                id: "logo-6",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
                alt: "Kashyapi",
              },
              {
                id: "logo-7",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784704211/kumarpower_website/ec5cfnqrretpdprsbbm1.png",
                alt: "Caritas",
              },
              {
                id: "logo-8",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784704210/kumarpower_website/nacxi10gr8csg6edjohn.jpg",
                alt: "CEC",
              },
              {
                id: "logo-9",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703682/kumarpower_website/cvntuob1pan8lodaj37k.jpg",
                alt: "Adidas",
              },
              {
                id: "logo-10",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703688/kumarpower_website/pgpf5ubc3ylvzfnjn7my.jpg",
                alt: "GEPL",
              },
              {
                id: "logo-11",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703686/kumarpower_website/uhmlaewcidzkrefpnl8g.jpg",
                alt: "DPS",
              },
              {
                id: "logo-12",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703685/kumarpower_website/i2hcjyehbydll3hg67nf.jpg",
                alt: "Comed",
              },
              {
                id: "logo-13",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703679/kumarpower_website/gjm6k7mwcmvnsewffrsc.jpg",
                alt: "Ace Construction",
              },
              {
                id: "logo-14",
                url: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703681/kumarpower_website/qvwibw8fuw4gmlkk9n4c.png",
                alt: "Clarion",
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
            brochurePdf:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784705061/kumarpower_website/brochures/ex3usnl03s0gzrez2rld.pdf",
          },
        },
      ],
    },
    {
      title: "Blogs",
      slug: "blogs",
      description:
        "Explore expert articles, case studies, and latest trends in industrial power solutions.",
      metaTitle: "Blogs & Articles - Kumar Power",
      metaDescription:
        "Explore expert articles, case studies, and latest trends in industrial power solutions.",
      isStatic: true,
      visibility: "published",
      sections: [
        {
          id: "sec-blogs-main",
          type: "blogs",
          order: 1,
          content: {
            heroTagline: "KUMAR POWER BLOG & INSIGHTS",
            heroHeading:
              "Our Blogs: Expert Guide to Industrial Power Generation",
            heroSub:
              "Kumar Power provides expert insights on industrial power generation, focusing on Kirloskar generator efficiency, CPCB IV+ compliance, and energy management for continuous operations. The blog serves as a resource for manufacturing, commercial, and healthcare sectors seeking to optimize power infrastructure and reduce downtime. Read more at Kumar Power.",
            heroBg:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784712861/kumarpower_website/pages/mijnbqaaframtgxjcszo.jpg",
            articlesHeading: "Blogs",
            articlesSub:
              "Explore expert articles, case studies, and latest trends in industrial power solutions.",
            ctaTitle: "Call To Action",
            ctaDescription:
              "Have questions or need more information? We're here to help!",
            ctaPrimaryLabel: "Enquire Now",
            ctaPrimaryUrl: "/contact",
            ctaSecondaryLabel: "Download Our Company Profile",
            companyProfilePdf:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1784703721/kumarpower_website/lwslbfk9cagxu3m0khzy.pdf",
          },
        },
        {
          id: "sec-blogs-articles",
          type: "articles",
          order: 2,
          content: [
            {
              id: "blog-1",
              title:
                "AMF Panel for DG Set: Automatic Power Management for Continuous Operations",
              slug: "amf-panel-for-dg-set",
              category: "Product Guide",
              author: "Kumar Power Team",
              publishedDate: new Date().toISOString().split("T")[0],
              summary:
                "AMF Panels (Automatic Mains Failure Panels) for DG Sets are essential for ensuring uninterrupted power supply, automatically switching between mains and generator power during outages.",
              image:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784983053/KumarPower-Assets/brtcoxyzckxg84qqk8lk.jpg",
              readTime: "5 min read",
              status: "Published",
              content: `<h2>How Does an AMF Panel Work?</h2>
<p>AMF panel stands for Auto Mains Failure panel. It is a control panel that automatically switches the load from the main grid power supply to the backup generator (usually a DG set) in the event of a power outage. Once the main power is restored, the AMF panel switches the load back to the grid and automatically shuts down the generator.</p>
<blockquote>
<p>Think of an AMF panel as the brain of your backup power system. It continuously monitors the main power supply and takes action without any human intervention.</p>
</blockquote>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137532/kumarpower_website/blog_migrated/amf-panel-for-dg-set-electrical-control-panel.jpg" alt="AMF Panel For DG Set - Modern Power Soltions" /></p>
<p>1. Monitoring: The AMF panel constantly monitors the incoming mains supply voltage and frequency.<br>
2. Detecting Failure: If the mains supply fails, drops below a certain voltage, or experiences a phase loss, the AMF panel detects this anomaly instantly.<br>
3. Starting the Generator: It sends a start signal to the generator's engine control unit (ECU).<br>
4. Switching Load: Once the generator reaches the correct speed and voltage, the AMF panel's changeover contactor switches the load from the mains to the generator.<br>
5. Restoring Power: When the mains power returns and stabilizes, the panel switches the load back to the mains.<br>
6. Shutting Down: The panel allows the generator to run for a short cool-down period before shutting it off completely.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137407/kumarpower_website/blog_migrated/amf-panel-for-generator-feature-image.jpg" alt="AMF Control Panel For DG Set - Kumar Power ISO 9001:2015" /></p>`,
            },
            {
              id: "blog-2",
              title:
                "Kirloskar Silent Generator for Home and Business: Diesel, Green & DG Set Guide",
              slug: "kirloskar-silent-generator",
              category: "Technical Insights",
              author: "Kumar Power Team",
              publishedDate: new Date().toISOString().split("T")[0],
              summary:
                "The Kirloskar silent power generator operates at a noise level of less than 75 dBA at 1 metre distance, which is roughly similar to the sound of a normal conversation.",
              image:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784983055/KumarPower-Assets/v3kwtoml4ltegduz27in.jpg",
              readTime: "4 min read",
              status: "Published",
              content: `<h2>What Is a Silent Generator?</h2>
<p>A silent generator is a standard diesel or <strong>gas generator</strong> fitted inside a specially designed acoustic enclosure that is called a canopy. This canopy is built with sound-absorbing material like high-density foam or glass wool, which keeps the noise level low. It not only reduces noise but also saves the genset from dust, rain, and sunlight.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1784712861/kumarpower_website/pages/mijnbqaaframtgxjcszo.jpg" alt="The Power of Silence" /></p>
<p>A canopy can only reduce sound; it can't totally silence the generator. When a generator is used to make electricity, the engine inside it starts running on its rated RPM (Revolutions Per Minute). In a generator, RPM is directly linked to its power generation capacity and engine speed.</p>
<blockquote>
<p>As in India, 50 Hz is the standard frequency for electricity. When the alternator inside the generator rotates, it generates AC electricity. To maintain the frequency of 50Hz, the piston of the engine has to run at a specific speed, such as 1500RPM or 3000RPM. When the engine runs at this speed, they generate a lot of noise.</p>
</blockquote>
<h2>Why Choose Kirloskar?</h2>
<p>Whether you need a compact 15 kVA generator for a commercial building or office, or a heavy-duty 1500 kVA DG set for your large industrial facility. When people search for a reliable silent generator in India, the name Kirloskar comes up for good reason. Kirloskar Oil Engines Limited (KOEL) (1946) carries over a century (starting of Kirloskar 1888) of engineering heritage and currently operates one of the largest genset fleets in the country, serving 50+ countries globally.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1784983055/KumarPower-Assets/v3kwtoml4ltegduz27in.jpg" alt="Power That Blends Into the Background" /></p>`,
            },
            {
              id: "blog-3",
              title:
                "Industrial Kirloskar DG Set (750 kVA to 1500 kVA) for Heavy Duty Power Requirement",
              slug: "industrial-kirloskar-dg-set-750-1500kva",
              category: "Industrial Solutions",
              author: "Kumar Power Team",
              publishedDate: new Date().toISOString().split("T")[0],
              summary:
                "Heavy-duty industrial Kirloskar DG Sets ranging from 750 kVA to 1500 kVA are engineered for continuous, reliable prime and standby power in large-scale manufacturing, infrastructure, and commercial sectors.",
              image:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1784983056/KumarPower-Assets/dgdqgwswk8cxs4awcfvs.jpg",
              readTime: "6 min read",
              status: "Published",
              content: `<p>Even metro cities face constant power cuts due to rising electricity demands alongside growing needs. Heavy-duty industrial Kirloskar DG sets ranging from 750 kVA to 1500 kVA are engineered for continuous, reliable prime and standby power in large-scale manufacturing, infrastructure, IT, data centres, hospitals, and commercial sectors.</p>
<p>How machinery runs constantly in a factory, warehouse, enterprises, and large industries, having plenty of orders for stocks. But what if the grid electricity fails? How will you manage the downtime caused by the power failure? The Mechanical Jamming or Thermal Shock that harms expensive machines & temporary machinery shutdowns, production deadlines, and the labour cost - How will you manage this?</p>
<blockquote>
<p>Sitting worklessly during a power outage, looking at the machinery shutting down, it's a scene that feels like a very painful story from a business owner's POV. A small amount of time that causes production halts can affect the revenue and the reputation of the industry in the market, turning into a very big amount of loss for businesses.</p>
</blockquote>
<p>We can't control the grid electricity. In peak summertimes, well, not only summertime, but it's every time, there is always high power demand. The machines we use in our daily life, for commercial buildings, as well as in industrial sectors, everything depends on power. Due to this additional power load, power maintenance shutdowns and grid power failures are to be expected. Even the weather contributes to this, too. And then it strikes us: Yes! We do need a backup.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137559/kumarpower_website/blog_migrated/industrial-kirloskar-dg-set-750-1500kva.jpg" alt="High Capacity Industrial Kirloskar DG Set 750 kVA to 1500 kVA" /></p>
<h2>Understanding Heavy-Duty Industrial Power Requirements</h2>
<p>Heavy-duty power requirements are significantly different from standard commercial and residential backup applications. Because industrial facilities operate multiple high-capacity machines, motor-driven equipment, HVAC systems, process loads, and critical infrastructure simultaneously. From production in the industry to the warehouse shifting, machines work continuously. As a result, power demand can fluctuate throughout the day, particularly during equipment startup and peak production cycles.</p>
<h2>Which Industries Require 750 kVA to 1500 kVA KOEL DG Sets?</h2>
<p>In this high-capacity industrial segment, the available range is 750 kVA (600kW), 900 kVA (720kW), 1010 kVA (808kW), 1250 kVA (1000kW), and 1500 kVA (1200kW) with 0.8 lagging power factor. Provide a reliable and uninterrupted power supply. Various industries require a stable power backup connection for seamless operations.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137358/kumarpower_website/blog_migrated/industrial-kirloskar-dg-set-750-1500kva-feature-image.jpg" alt="High-Capacity Industrial Kirloskar DG Set 750 kVA to 1500 kVA - Keep Running Industries 24/7" /></p>
<h3>Manufacturing Plants (1000 kVA to 1500 kVA)</h3>
<p>Manufacturing facilities often experience high starting currents due to CNC machines, compressors, conveyor systems, and heavy-duty motors. In such environments, a 1250 kVA DG set is frequently preferred because it provides sufficient headroom during simultaneous equipment startup while reducing the risk of voltage fluctuations during production hours that a 750 kVA unit may struggle to absorb.</p>
<h3>Large Data Centres (1000 kVA to 1500 kVA)</h3>
<p>Data centres have to prioritise uptime over everything else. In this digital world, they can't afford even a single-second power cut due to the high risk of losing cache data (live data in temporary memory) and online services (transactions and server-based software) failure.</p>
<h2>Top 6 Features Designed Specifically for Demanding Site Conditions</h2>
<ul>
  <li>CRDi Engine Technology for Heavy Industrial Load</li>
  <li>CPCB IV+ Compliance for Modern Industrial Projects</li>
  <li>Fuel Efficiency Under Real Operating Conditions</li>
  <li>Acoustic Performance for Noise-Sensitive Installations</li>
  <li>Advanced Monitoring and Remote Diagnostics</li>
  <li>Built for Demanding Site Conditions</li>
</ul>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137466/kumarpower_website/blog_migrated/blog1.png" alt="Kirloskar generator" /></p>`,
            },
            {
              id: "blog-4",
              title:
                "Preventive Maintenance: Extending Your Generator's Lifespan",
              slug: "benefits-of-diesel-generator",
              category: "Maintenance",
              author: "Kumar Power Team",
              publishedDate: new Date().toISOString().split("T")[0],
              summary:
                "A very comprehensive preventive maintenance strategy is one of the most important investments businesses can make to improve generator reliability, operational efficiency, and long-term performance.",
              image:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1785137466/kumarpower_website/blog_migrated/blog1.png",
              readTime: "5 min read",
              status: "Published",
              content: `<p>Abhishek A very comprehensive preventive maintenance strategy is one of the most important investments businesses can make to improve generator reliability, operational efficiency, and long-term performance.</p>
<blockquote>
<p>“Routine maintenance prevents unexpected failures and significantly extends generator lifespan.”</p>
</blockquote>
<h2>Essential Maintenance Schedule</h2>
<p>Industrial generators require structured maintenance intervals to maintain peak operational efficiency. Weekly inspections, monthly load testing, and annual servicing ensure optimal system performance.</p>
<p>Preventive inspections help identify small issues before they become major equipment failures, reducing downtime and repair costs.</p>
<h2>Fluid Management</h2>
<p>Proper oil management and coolant monitoring are critical for preventing overheating and reducing internal engine wear.</p>
<p>Using manufacturer-recommended lubricants and replacing filters regularly helps generators perform consistently under heavy industrial loads.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137466/kumarpower_website/blog_migrated/blog1.png" alt="Kirloskar generator" /></p>
<h2>Smart Monitoring Systems</h2>
<p>Modern monitoring systems use IoT and predictive analytics to track performance in real time. These intelligent systems notify operators about maintenance requirements before failures occur.</p>`,
            },
            {
              id: "blog-5",
              title:
                "Optimizing Generator Performance in Extreme Weather Conditions",
              slug: "generator-performance",
              category: "Technical Insights",
              author: "Kumar Power Team",
              publishedDate: new Date().toISOString().split("T")[0],
              summary:
                "Extreme weather conditions can severely impact generator performance if proper precautions aren't taken. In hot weather, ensure proper ventilation.",
              image:
                "https://res.cloudinary.com/dpa93copz/image/upload/v1785137515/kumarpower_website/blog_migrated/blog3.png",
              readTime: "3 min read",
              status: "Published",
              content: `<p>Extreme weather conditions can severely impact generator performance if proper precautions aren't taken.</p>
<h2>Temperature Regulation</h2>
<p>In hot weather, ensure proper ventilation around your generator.</p>
<h2>Moisture Protection</h2>
<p>Rain and humidity can damage electrical components.</p>
<p><img src="https://res.cloudinary.com/dpa93copz/image/upload/v1785137515/kumarpower_website/blog_migrated/blog3.png" alt="Generator Performance" /></p>`,
            },
          ],
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

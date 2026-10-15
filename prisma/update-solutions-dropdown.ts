import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// TASK 1: Why Choose paragraphs (only the two missing paragraphs per route)
// **bold** markers render as bold with the RichText version of the component.
// ---------------------------------------------------------------------------
const paragraphs: Record<
  string,
  { whyChoosePara1: string; whyChoosePara2: string }
> = {
  products: {
    whyChoosePara1:
      "**Kirloskar generators** bring together KOEL's (Kirloskar Oil Engines Ltd) engineering expertise and decades of proven reliability. Available from 2.1 kVA to 2000 kVA across diesel, gas, portable and Optiprime ranges, they provide dependable backup and prime power for homes, businesses and heavy industry.",
    whyChoosePara2:
      "CPCB-IV+ certified and supported by Kumar Power's installation, AMC and 24/7 service network, these gensets deliver reliable, low-noise and compliant power. Alongside generators, we supply electrical panels, servo stabilizers and transformers for a complete power solution.",
  },
  generators: {
    whyChoosePara1:
      "**Kirloskar generators** bring together KOEL's (Kirloskar Oil Engines Ltd) engineering expertise and decades of proven reliability. Available from 2.1 kVA to 2000 kVA across diesel, gas, portable and Optiprime ranges, they provide dependable backup and prime power for homes, businesses and heavy industry.",
    whyChoosePara2:
      "CPCB-IV+ certified and supported by Kumar Power's installation, AMC and 24/7 service network, these gensets deliver reliable, low-noise and compliant power for commercial and industrial applications.",
  },
  "kirloskar-diesel-generator": {
    whyChoosePara1:
      "**Kirloskar diesel generators** combine KOEL's (Kirloskar Oil Engines Ltd) long-standing engine expertise with heavy-duty alternators to deliver dependable power for homes, businesses and industries. Built for continuous operation, these gensets offer strong performance, efficient fuel consumption and a long service life, making them a trusted backup power choice across India.",
    whyChoosePara2:
      "Backed by a wide service network, genuine spares and rapid maintenance support, they keep downtime to a minimum. CPCB-IV+ certified and equipped with acoustic enclosures and smart digital controllers, these gensets ensure reliable, low-noise and compliant power supply for commercial and industrial applications.",
  },
  "kirloskar-gas-generator": {
    whyChoosePara1:
      "**Kirloskar gas generators** represent a perfect blend of KOEL's (Kirloskar Oil Engines Ltd) engineering expertise and clean, sustainable power technology. Powered by natural gas and CNG, these generators offer a superior total cost of ownership—featuring significantly lower emissions and fuel costs reduced by approximately 30–40% compared to diesel generators—making them more economical in the long run. Available in a range of 15 kVA to 250 kVA, these gensets ensure reduced engine wear due to the use of clean fuel, resulting in longer maintenance intervals and lower servicing costs.",
    whyChoosePara2:
      "Equipped with safety features such as advanced leak detection and automatic shut-off valves, they provide a safe power backup option while eliminating the fire risks associated with diesel storage. CPCB-IV+ certified and compliant with the latest emission norms, these gensets ensure a reliable, low-noise, and eco-friendly power supply for commercial and industrial applications.",
  },
  "kirloskar-portable-generator": {
    whyChoosePara1:
      "**Kirloskar portable generators** bring KOEL's (Kirloskar Oil Engines Ltd) trusted engine technology into a compact, lightweight and easy-to-move form. Designed for homes, shops, clinics, outdoor events and small enterprises, they provide instant backup power wherever you need it, with efficient fuel usage and dependable performance.",
    whyChoosePara2:
      "With easy starting, stable voltage output safe for sensitive electronics, and a low-noise enclosure, these generators deliver convenient and reliable power without the complexity of a large installation. CPCB compliant and backed by KOEL's service network, they are a practical choice for everyday and emergency power needs.",
  },
  optiprime: {
    whyChoosePara1:
      "**OptiPrime generators** are built around intelligent load management and variable speed technology, adjusting engine speed to match the actual power demand. This avoids wasteful low-load running, which helps reduce diesel consumption and operating costs while keeping the engine in better health over time.",
    whyChoosePara2:
      "Designed with industrial-grade components for continuous duty in demanding Indian conditions, OptiPrime gensets also offer lower emissions and IoT-enabled monitoring of fuel levels, efficiency and engine health. The result is a smart, eco-optimized power solution with a faster return on your investment.",
  },
  panels: {
    whyChoosePara1:
      "**Kumar Power electrical panels** are engineered for safe and dependable power distribution, control and protection across industrial and commercial installations. Our range covers AMF panels, vacuum circuit breaker panels, distribution boxes and feeder pillars, built to IEC 61439 and IS standards.",
    whyChoosePara2:
      "Built with premium busbars, powder-coated enclosures rated up to IP54/IP55 and modular cubicles for easy expansion, these panels handle demanding site conditions. Optional PLC automation and digital metering with RS485/Modbus give you real-time visibility of your power system.",
  },
  "servo-stabilizer": {
    whyChoosePara1:
      "**Kumar Power servo voltage stabilizers** correct voltage fluctuations to deliver consistent output power to your equipment. With output regulation accuracy of ±1% and correction speed above 20V per second, they protect sensitive machinery from damage caused by unstable supply.",
    whyChoosePara2:
      "Available in oil-cooled and air-cooled versions for single-phase and three-phase applications, they feature toroidal variacs, buck-boost transformers and built-in protection against high/low voltage, phase failure and overload. Pan-India availability and support keep your operations running reliably.",
  },
  transformers: {
    whyChoosePara1:
      "**Kumar Power transformers** are designed to meet a wide range of industrial and commercial needs across India. Our range includes Distribution Transformers (100–2500 kVA), Power Transformers (1–10 MVA), Cast Resin Transformers and Unitized Package Substations.",
    whyChoosePara2:
      "Built with low-loss CRGO cores and quality windings, they deliver high efficiency, safety and long service life. From oil-filled units to fire-safe dry-type and compact plug-and-play substations, we help you choose the right transformer for your facility, backed by Pan-India support.",
  },
  bess: {
    whyChoosePara1:
      "**Kumar Power Battery Energy Storage Systems (BESS)** use Tier-1 Lithium Iron Phosphate (LiFePO4) chemistry for safe, long-life energy storage, with over 6,000 cycles. Scalable from 5 kW commercial units to containerized 1 MW+ installations, they suit businesses, industries and utilities.",
    whyChoosePara2:
      "With switchover in under 20 milliseconds, intelligent cloud BMS and seamless integration with solar and diesel generators, BESS delivers uninterrupted backup, peak demand shaving and lower fuel and electricity costs, with zero noise and zero emissions.",
  },
  solar: {
    whyChoosePara1:
      "**Kumar Power solar solutions** use Tier-1 Mono PERC and TOPCon bifacial panels to deliver high-efficiency clean energy for commercial, industrial and residential rooftops. Panels range from 550W to 670W, backed by long-term performance warranties.",
    whyChoosePara2:
      "Our hybrid sync controllers integrate solar with your diesel generator and Kumar Power BESS to cut diesel use and electricity bills. We handle the full turnkey scope, including structure design, DISCOM net-metering approval, CEIG inspection and monitoring.",
  },
};

async function addWhyChooseParagraphs() {
  console.log(
    "🔄 Adding whyChoosePara1 & whyChoosePara2 to all product routes...",
  );

  for (const [slug, paras] of Object.entries(paragraphs)) {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      console.warn(`⚠️  Page [${slug}] not found, skipped`);
      continue;
    }

    // In the seed, each product page's main section type equals its slug
    const section = await prisma.section.findFirst({
      where: { pageId: page.id, type: slug },
    });
    if (!section) {
      console.warn(`⚠️  Section for [${slug}] not found, skipped`);
      continue;
    }

    const content = (section.content as Record<string, any>) || {};

    // Add only the missing paragraphs; never overwrite existing ones
    const additions: Record<string, string> = {};
    if (!content.whyChoosePara1)
      additions.whyChoosePara1 = paras.whyChoosePara1;
    if (!content.whyChoosePara2)
      additions.whyChoosePara2 = paras.whyChoosePara2;

    if (Object.keys(additions).length === 0) {
      console.log(`⏭️  [${slug}] already has both paragraphs`);
      continue;
    }

    await prisma.section.update({
      where: { id: section.id },
      data: { content: { ...content, ...additions } },
    });
    console.log(`✅ [${slug}] added: ${Object.keys(additions).join(", ")}`);
  }

  console.log("🎉 Done adding Why Choose paragraphs!");
}

// ---------------------------------------------------------------------------
// TASK 2: Make "Solutions" a pure dropdown (no navigation route)
// ---------------------------------------------------------------------------
async function updateSolutionsNav() {
  console.log("🔄 Updating Solutions navigation item to be a pure dropdown...");

  const solutionsLink = await prisma.navLink.findFirst({
    where: {
      OR: [{ id: "nav-2" }, { label: "Solutions" }],
    },
  });

  if (solutionsLink) {
    const updated = await prisma.navLink.update({
      where: { id: solutionsLink.id },
      data: {
        type: "Dropdown",
        url: "#",
      },
    });

    console.log("✅ Successfully updated Solutions NavLink:", {
      id: updated.id,
      label: updated.label,
      type: updated.type,
      url: updated.url,
      parent: updated.parent,
      order: updated.order,
    });
  } else {
    const created = await prisma.navLink.create({
      data: {
        id: "nav-2",
        label: "Solutions",
        url: "#",
        order: 3,
        type: "Dropdown",
        parent: "-",
        isStatic: true,
        isActive: true,
      },
    });

    console.log("✅ Created Solutions NavLink as pure dropdown:", created);
  }

  const subLinks = await prisma.navLink.findMany({
    where: { parent: "nav-2" },
    orderBy: { order: "asc" },
  });

  console.log(`📋 Found ${subLinks.length} sub-links under Solutions:`);
  for (const sub of subLinks) {
    console.log(`   - [${sub.order}] ${sub.label} -> ${sub.url}`);
  }

  console.log(
    "🎉 Done! Solutions is now a dropdown only (no navigation route).",
  );
}

// ---------------------------------------------------------------------------
// RUN BOTH
// ---------------------------------------------------------------------------
async function main() {
  await addWhyChooseParagraphs();
  console.log("\n----------------------------------------\n");
  await updateSolutionsNav();
}

main()
  .catch((e) => {
    console.error("❌ Error running combined update:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

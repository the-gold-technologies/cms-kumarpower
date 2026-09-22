"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, Save } from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

export type GensetCard = {
  id: string;
  name: string;
  range: string;
  fuelType: string;
  cpcbNorm: string;
  cooling: string;
  phase: string;
  rating: string;
  ratingCount: string;
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const GENERATORS_ENDPOINT = "/api/generators";

const defaultDieselGensets: GensetCard[] = [
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
    technicalSpecs: "Engineered specifically for compact power needs, this range utilizes the robust Kirloskar R550 series engines, known for their naturally aspirated design and reliable G2 class mechanical governing.",
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
    technicalSpecs: "These mid-range workhorses are built for stability and endurance, powered by Kirloskar's liquid-cooled 3R1040 and 4R1040 series engines equipped with heavy-duty radiators.",
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
    technicalSpecs: "Designed for industrial-grade performance, this range utilizes 4 and 6 cylinder inline turbocharged and intercooled engines to handle demanding loads.",
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
    technicalSpecs: "This series features high-performance Kirloskar DV Series engines (with V-Type configuration options) that deliver robust power for critical infrastructure.",
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
    ratingCount: "145",
    image: "",
    description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
    technicalSpecs: "Built for heavy industrial plants and data centers, equipped with SL90 series engines with advanced electronic governors and dual-stage air filtration.",
    brochurePdf: ""
  },
  {
    id: "dg-6",
    name: "750 kVA to 1500 kVA Diesel Generators",
    range: "750 kVA to 1500 kVA",
    fuelType: "Diesel",
    cpcbNorm: "CPCB-IV+",
    cooling: "Liquid",
    phase: "Three Phase",
    rating: "5.0",
    ratingCount: "92",
    image: "",
    description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
    technicalSpecs: "Mission-critical high-output power generation using the flagship DV series engines. Features integrated digital paralleling and remote monitoring capabilities.",
    brochurePdf: ""
  }
];

const defaultGasGensets: GensetCard[] = [
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
    image: "",
    description: "Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.",
    technicalSpecs: "Utilizing state-of-the-art gas engine technology, this range offers a greener footprint with extremely low NOx and PM emissions that exceed CPCB norms. The engines employ stoichiometric combustion to ensure high thermal efficiency, resulting in operating costs that are 40-50% lower than comparable diesel gensets. With inherent fuel flexibility (compatible with Natural Gas, CNG, and LPG) and a quieter combustion process, these generators are ideal for urban areas with strict pollution norms, green buildings, and cost-conscious businesses.",
    brochurePdf: ""
  }
];

const defaultPortableGensets: GensetCard[] = [
  {
    id: "pg-1",
    name: "2.1 kVA to 5 kVA Portable Generators",
    range: "2.1 kVA to 5 kVA",
    fuelType: "Gasoline",
    cpcbNorm: "CPCB-IV+",
    cooling: "Air",
    phase: "Single Phase",
    rating: "4.7",
    ratingCount: "165",
    image: "",
    description: "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
    technicalSpecs: "These lightweight and mobile power solutions are designed for 'on-the-go' reliability. Featuring ergonomic designs with wheels and handles on select models, they offer easy mobility for any user. The units come with options for easy recoil start or electric start and feature copper-wound alternators for stable voltage output. Equipped with circuit breaker protection and oil alert systems to prevent damage, they are ideal for food trucks, camping trips, home backup for lights and fans, and operating small construction tools.",
    brochurePdf: ""
  }
];

const defaultOptiprimeGensets: GensetCard[] = [
  {
    id: "op-1",
    name: "Kirloskar Optiprime Generator",
    range: "117 kVA to 2020 kVA",
    fuelType: "Diesel",
    cpcbNorm: "CPCB-IV+",
    cooling: "Liquid",
    phase: "Three Phase",
    rating: "4.8",
    ratingCount: "195",
    image: "",
    description: "Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
    technicalSpecs: "The Optiprime series represents the next evolution in generator efficiency, utilizing variable speed and optimized fuel mapping technology. This advanced system delivers significantly better fuel economy at partial loads compared to standard generators, drastically reducing running costs. It comes integrated with an IoT device for real-time health monitoring and predictive maintenance, ensuring maximum uptime. Housed in an enhanced canopy for superior weather protection, the Optiprime is the perfect solution for telecom towers, ATMs, and remote sites with varying load patterns.",
    brochurePdf: ""
  }
];

export default function GeneratorsCMS() {
  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isDieselOpen, setIsDieselOpen] = useState(true);
  const [isGasOpen, setIsGasOpen] = useState(false);
  const [isPortableOpen, setIsPortableOpen] = useState(false);
  const [isOptiprimeOpen, setIsOptiprimeOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);

  // Saving states
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingDiesel, setSavingDiesel] = useState(false);
  const [savedDiesel, setSavedDiesel] = useState(false);
  const [savingGas, setSavingGas] = useState(false);
  const [savedGas, setSavedGas] = useState(false);
  const [savingPortable, setSavingPortable] = useState(false);
  const [savedPortable, setSavedPortable] = useState(false);
  const [savingOptiprime, setSavingOptiprime] = useState(false);
  const [savedOptiprime, setSavedOptiprime] = useState(false);
  const [savingExtra, setSavingExtra] = useState(false);
  const [savedExtra, setSavedExtra] = useState(false);
  const [savingAll, setSavingAll] = useState(false);

  // 1. Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Kirloskar Generators");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Distributor");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("Explore Kirloskar Generators at Kumar Power for reliable backup and prime power solutions. Ideal for industrial and commercial applications in the required power range.");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // 2. Diesel Section
  const [dieselSectionTitle, setDieselSectionTitle] = useState("CPCB IV+ Diesel Generators");
  const [dieselSectionDesc, setDieselSectionDesc] = useState("Kirloskar's range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.");
  const [dieselGensets, setDieselGensets] = useState<GensetCard[]>(defaultDieselGensets);

  // 3. Gas Section
  const [gasSectionTitle, setGasSectionTitle] = useState("Gas Generators");
  const [gasSectionDesc, setGasSectionDesc] = useState("Eco-friendly and efficient, our gas generators provide clean power with lower emissions and reduced operating costs.");
  const [gasGensets, setGasGensets] = useState<GensetCard[]>(defaultGasGensets);

  // 4. Portable Section
  const [portableSectionTitle, setPortableSectionTitle] = useState("Portable Generators");
  const [portableSectionDesc, setPortableSectionDesc] = useState("Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.");
  const [portableGensets, setPortableGensets] = useState<GensetCard[]>(defaultPortableGensets);

  // 5. OptiPrime Section
  const [optiprimeSectionTitle, setOptiprimeSectionTitle] = useState("OptiPrime Heavy Duty Generators");
  const [optiprimeSectionDesc, setOptiprimeSectionDesc] = useState("Kirloskar Optiprime series are advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.");
  const [optiprimeGensets, setOptiprimeGensets] = useState<GensetCard[]>(defaultOptiprimeGensets);

  // 6. Extra / Why Choose / Certifications
  const [whyChooseTitle, setWhyChooseTitle] = useState("Why Choose Kirloskar Generators?");
  const [whyChooseCard1Title, setWhyChooseCard1Title] = useState("Unmatched Reliability");
  const [whyChooseCard1Desc, setWhyChooseCard1Desc] = useState("Engineered for 24/7 operation with redundant systems and fail-safe mechanisms.");
  const [whyChooseCard2Title, setWhyChooseCard2Title] = useState("Fuel Efficiency");
  const [whyChooseCard2Desc, setWhyChooseCard2Desc] = useState("Advanced engine technology delivers optimal fuel consumption and lower operating costs.");
  const [whyChooseCard3Title, setWhyChooseCard3Title] = useState("Rapid Response");
  const [whyChooseCard3Desc, setWhyChooseCard3Desc] = useState("Quick start capability ensures minimal downtime during power outages.");
  const [whyChooseCard4Title, setWhyChooseCard4Title] = useState("Low Noise Operation");
  const [whyChooseCard4Desc, setWhyChooseCard4Desc] = useState("Acoustic engineering reduces noise levels for urban and sensitive environments.");
  const [whyChooseCard5Title, setWhyChooseCard5Title] = useState("Easy Maintenance");
  const [whyChooseCard5Desc, setWhyChooseCard5Desc] = useState("Modular design with accessible components simplifies service and maintenance.");
  const [whyChooseCard6Title, setWhyChooseCard6Title] = useState("Smart Controls");
  const [whyChooseCard6Desc, setWhyChooseCard6Desc] = useState("Advanced digital interfaces with remote monitoring and diagnostic capabilities.");

  const [certTitle, setCertTitle] = useState("Certified Excellence");
  const [cert1Title, setCert1Title] = useState("ISO 9001:2015");
  const [cert2Title, setCert2Title] = useState("CPCB-IV+");
  const [cert3Title, setCert3Title] = useState("Kirloskar Authorized");

  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnText, setHelpBtnText] = useState("Talk to an Expert");

  // Helper to save to single /api/generators endpoint
  const saveToGenerators = async (partialContent: Record<string, any>) => {
    const payload = await uploadFilesDeep(partialContent);
    await fetch(GENERATORS_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "generators", content: payload }),
    });
    clearCache(GENERATORS_ENDPOINT);
    return payload;
  };

  // Load initial data - SINGLE API CALL ONLY
  useEffect(() => {
    fetchWithCache(GENERATORS_ENDPOINT)
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data.generators || json.data["kirloskar-diesel-generator"] || json.data;
          // Hero
          if (data.heroHeadingPart1 !== undefined) setHeroHeadingPart1(data.heroHeadingPart1);
          if (data.heroHeadingPart2 !== undefined) setHeroHeadingPart2(data.heroHeadingPart2);
          if (data.heroHeading !== undefined) setHeroHeading(data.heroHeading);
          if (data.heroSub !== undefined) setHeroSub(data.heroSub);
          if (data.heroBg !== undefined) setHeroBg(data.heroBg);

          // Diesel
          if (data.sectionTitle !== undefined) setDieselSectionTitle(data.sectionTitle);
          if (data.sectionDesc !== undefined) setDieselSectionDesc(data.sectionDesc);
          if (Array.isArray(data.gensets) && data.gensets.length > 0) setDieselGensets(data.gensets);

          // Gas
          if (data.gasSectionTitle !== undefined) setGasSectionTitle(data.gasSectionTitle);
          if (data.gasSectionDesc !== undefined) setGasSectionDesc(data.gasSectionDesc);
          if (Array.isArray(data.gasGensets) && data.gasGensets.length > 0) setGasGensets(data.gasGensets);

          // Portable
          if (data.portableSectionTitle !== undefined) setPortableSectionTitle(data.portableSectionTitle);
          if (data.portableSectionDesc !== undefined) setPortableSectionDesc(data.portableSectionDesc);
          if (Array.isArray(data.portableGensets) && data.portableGensets.length > 0) setPortableGensets(data.portableGensets);

          // Optiprime
          if (data.optiprimeSectionTitle !== undefined) setOptiprimeSectionTitle(data.optiprimeSectionTitle);
          if (data.optiprimeSectionDesc !== undefined) setOptiprimeSectionDesc(data.optiprimeSectionDesc);
          if (Array.isArray(data.optiprimeGensets) && data.optiprimeGensets.length > 0) setOptiprimeGensets(data.optiprimeGensets);

          // Extra / Why Choose / Certifications / Help
          if (data.whyChooseTitle !== undefined) setWhyChooseTitle(data.whyChooseTitle);
          if (data.whyChooseCard1Title !== undefined) setWhyChooseCard1Title(data.whyChooseCard1Title);
          if (data.whyChooseCard1Desc !== undefined) setWhyChooseCard1Desc(data.whyChooseCard1Desc);
          if (data.whyChooseCard2Title !== undefined) setWhyChooseCard2Title(data.whyChooseCard2Title);
          if (data.whyChooseCard2Desc !== undefined) setWhyChooseCard2Desc(data.whyChooseCard2Desc);
          if (data.whyChooseCard3Title !== undefined) setWhyChooseCard3Title(data.whyChooseCard3Title);
          if (data.whyChooseCard3Desc !== undefined) setWhyChooseCard3Desc(data.whyChooseCard3Desc);
          if (data.whyChooseCard4Title !== undefined) setWhyChooseCard4Title(data.whyChooseCard4Title);
          if (data.whyChooseCard4Desc !== undefined) setWhyChooseCard4Desc(data.whyChooseCard4Desc);
          if (data.whyChooseCard5Title !== undefined) setWhyChooseCard5Title(data.whyChooseCard5Title);
          if (data.whyChooseCard5Desc !== undefined) setWhyChooseCard5Desc(data.whyChooseCard5Desc);
          if (data.whyChooseCard6Title !== undefined) setWhyChooseCard6Title(data.whyChooseCard6Title);
          if (data.whyChooseCard6Desc !== undefined) setWhyChooseCard6Desc(data.whyChooseCard6Desc);

          if (data.certTitle !== undefined) setCertTitle(data.certTitle);
          if (data.cert1Title !== undefined) setCert1Title(data.cert1Title);
          if (data.cert2Title !== undefined) setCert2Title(data.cert2Title);
          if (data.cert3Title !== undefined) setCert3Title(data.cert3Title);

          if (data.helpTitle !== undefined) setHelpTitle(data.helpTitle);
          if (data.helpSub !== undefined) setHelpSub(data.helpSub);
          if (data.helpBtnText !== undefined) setHelpBtnText(data.helpBtnText);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      const payload = await saveToGenerators({
        heroHeadingPart1,
        heroHeadingPart2,
        heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
        heroSub,
        heroBg,
      });
      if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
      toast.success("Hero Banner saved successfully!");
      setSavedHero(true);
      setTimeout(() => setSavedHero(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save Hero Banner");
    } finally {
      setSavingHero(false);
    }
  };

  const handleSaveDiesel = async () => {
    setSavingDiesel(true);
    try {
      const payload = await saveToGenerators({
        sectionTitle: dieselSectionTitle,
        sectionDesc: dieselSectionDesc,
        gensets: dieselGensets,
      });
      if (payload.gensets) setDieselGensets(payload.gensets);
      toast.success("Diesel Generators saved successfully!");
      setSavedDiesel(true);
      setTimeout(() => setSavedDiesel(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save Diesel Generators");
    } finally {
      setSavingDiesel(false);
    }
  };

  const handleSaveGas = async () => {
    setSavingGas(true);
    try {
      const payload = await saveToGenerators({
        gasSectionTitle,
        gasSectionDesc,
        gasGensets,
      });
      if (payload.gasGensets) setGasGensets(payload.gasGensets);
      toast.success("Gas Generators saved successfully!");
      setSavedGas(true);
      setTimeout(() => setSavedGas(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save Gas Generators");
    } finally {
      setSavingGas(false);
    }
  };

  const handleSavePortable = async () => {
    setSavingPortable(true);
    try {
      const payload = await saveToGenerators({
        portableSectionTitle,
        portableSectionDesc,
        portableGensets,
      });
      if (payload.portableGensets) setPortableGensets(payload.portableGensets);
      toast.success("Portable Generators saved successfully!");
      setSavedPortable(true);
      setTimeout(() => setSavedPortable(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save Portable Generators");
    } finally {
      setSavingPortable(false);
    }
  };

  const handleSaveOptiprime = async () => {
    setSavingOptiprime(true);
    try {
      const payload = await saveToGenerators({
        optiprimeSectionTitle,
        optiprimeSectionDesc,
        optiprimeGensets,
      });
      if (payload.optiprimeGensets) setOptiprimeGensets(payload.optiprimeGensets);
      toast.success("OptiPrime Generators saved successfully!");
      setSavedOptiprime(true);
      setTimeout(() => setSavedOptiprime(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save OptiPrime Generators");
    } finally {
      setSavingOptiprime(false);
    }
  };

  const handleSaveExtra = async () => {
    setSavingExtra(true);
    try {
      await saveToGenerators({
        whyChooseTitle,
        whyChooseCard1Title,
        whyChooseCard1Desc,
        whyChooseCard2Title,
        whyChooseCard2Desc,
        whyChooseCard3Title,
        whyChooseCard3Desc,
        whyChooseCard4Title,
        whyChooseCard4Desc,
        whyChooseCard5Title,
        whyChooseCard5Desc,
        whyChooseCard6Title,
        whyChooseCard6Desc,
        certTitle,
        cert1Title,
        cert2Title,
        cert3Title,
        helpTitle,
        helpSub,
        helpBtnText,
      });
      toast.success("Why Choose & Certifications saved successfully!");
      setSavedExtra(true);
      setTimeout(() => setSavedExtra(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save Why Choose & Certifications");
    } finally {
      setSavingExtra(false);
    }
  };

  const handleSaveAll = async () => {
    setSavingAll(true);
    try {
      const payload = await saveToGenerators({
        heroHeadingPart1,
        heroHeadingPart2,
        heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
        heroSub,
        heroBg,
        sectionTitle: dieselSectionTitle,
        sectionDesc: dieselSectionDesc,
        gensets: dieselGensets,
        gasSectionTitle,
        gasSectionDesc,
        gasGensets,
        portableSectionTitle,
        portableSectionDesc,
        portableGensets,
        optiprimeSectionTitle,
        optiprimeSectionDesc,
        optiprimeGensets,
        whyChooseTitle,
        whyChooseCard1Title,
        whyChooseCard1Desc,
        whyChooseCard2Title,
        whyChooseCard2Desc,
        whyChooseCard3Title,
        whyChooseCard3Desc,
        whyChooseCard4Title,
        whyChooseCard4Desc,
        whyChooseCard5Title,
        whyChooseCard5Desc,
        whyChooseCard6Title,
        whyChooseCard6Desc,
        certTitle,
        cert1Title,
        cert2Title,
        cert3Title,
        helpTitle,
        helpSub,
        helpBtnText,
      });
      if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
      if (payload.gensets) setDieselGensets(payload.gensets);
      if (payload.gasGensets) setGasGensets(payload.gasGensets);
      if (payload.portableGensets) setPortableGensets(payload.portableGensets);
      if (payload.optiprimeGensets) setOptiprimeGensets(payload.optiprimeGensets);
      toast.success("All Generator sections successfully saved!");
    } catch (e) {
      console.error(e);
      toast.error("Error saving all sections");
    } finally {
      setSavingAll(false);
    }
  };

  // Card Handlers Helper
  const createCardHandlers = (
    setter: React.Dispatch<React.SetStateAction<GensetCard[]>>,
    prefix: string,
    defaultFuel: string,
    typeLabel: string
  ) => {
    const handleFieldChange = (id: string, field: keyof GensetCard, val: string | File) => {
      setter((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: val } : g)));
    };

    const addCard = () => {
      setter((prev) => [
        ...prev,
        {
          id: `${prefix}-${Date.now()}`,
          name: "",
          range: "",
          fuelType: defaultFuel,
          cpcbNorm: "CPCB-IV+",
          cooling: "Liquid",
          phase: "Three Phase",
          rating: "4.8",
          ratingCount: "100",
          image: "",
          description: "",
          technicalSpecs: "",
          brochurePdf: "",
        },
      ]);
      toast.success(`New ${typeLabel} added!`);
    };

    const removeCard = (id: string) => {
      setter((prev) => prev.filter((g) => g.id !== id));
      toast.success(`${typeLabel} removed`);
    };

    return { handleFieldChange, addCard, removeCard };
  };

  const dieselHandlers = createCardHandlers(setDieselGensets, "dg", "Diesel", "Diesel Generator range");
  const gasHandlers = createCardHandlers(setGasGensets, "gg", "Natural Gas/CNG", "Gas Generator range");
  const portableHandlers = createCardHandlers(setPortableGensets, "pg", "Gasoline", "Portable Generator range");
  const optiprimeHandlers = createCardHandlers(setOptiprimeGensets, "op", "Diesel", "OptiPrime Generator range");

  // Reusable Product Range Grid Editor
  const renderRangeEditor = (
    items: GensetCard[],
    handlers: ReturnType<typeof createCardHandlers>,
    titleLabel: string,
    buttonAddLabel: string
  ) => (
    <div className="flex flex-col gap-6 pt-1">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handlers.addCard}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {buttonAddLabel}
        </button>
      </div>

      <div className="space-y-4">
        {items.map((g, idx) => (
          <div key={g.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                {titleLabel} #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handlers.removeCard(g.id)}
                className="text-slate-400 hover:text-red-500 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Product Name / Model"
                value={g.name}
                onChange={(e) => handlers.handleFieldChange(g.id, "name", e.target.value)}
                placeholder="e.g. 7.5 kVA to 20 kVA Diesel Generators"
              />
              <InputField
                label="Power Range"
                value={g.range}
                onChange={(e) => handlers.handleFieldChange(g.id, "range", e.target.value)}
                placeholder="e.g. 7.5 kVA to 20 kVA"
              />
              <InputField
                label="Fuel Type"
                value={g.fuelType}
                onChange={(e) => handlers.handleFieldChange(g.id, "fuelType", e.target.value)}
                placeholder="e.g. Diesel, Natural Gas/CNG, Gasoline"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <InputField
                label="CPCB Norm"
                value={g.cpcbNorm}
                onChange={(e) => handlers.handleFieldChange(g.id, "cpcbNorm", e.target.value)}
                placeholder="CPCB-IV+"
              />
              <InputField
                label="Cooling"
                value={g.cooling}
                onChange={(e) => handlers.handleFieldChange(g.id, "cooling", e.target.value)}
                placeholder="Liquid / Air / Water"
              />
              <InputField
                label="Phase"
                value={g.phase}
                onChange={(e) => handlers.handleFieldChange(g.id, "phase", e.target.value)}
                placeholder="Single / Three Phase"
              />
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  label="Rating (★)"
                  value={g.rating}
                  onChange={(e) => handlers.handleFieldChange(g.id, "rating", e.target.value)}
                  placeholder="4.8"
                />
                <InputField
                  label="Reviews"
                  value={g.ratingCount}
                  onChange={(e) => handlers.handleFieldChange(g.id, "ratingCount", e.target.value)}
                  placeholder="120"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadField
                label="Genset Image Graphic"
                value={g.image}
                onChange={(val) => handlers.handleFieldChange(g.id, "image", val)}
              />
              <PDFUploadField
                label="Brochure PDF Document"
                value={g.brochurePdf}
                onChange={(val) => handlers.handleFieldChange(g.id, "brochurePdf", val)}
              />
            </div>
            <TextAreaField
              label="Card Short Description"
              value={g.description}
              onChange={(e) => handlers.handleFieldChange(g.id, "description", e.target.value)}
              rows={2}
            />
            <TextAreaField
              label="Technical Specifications & Details"
              value={g.technicalSpecs}
              onChange={(e) => handlers.handleFieldChange(g.id, "technicalSpecs", e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Generators CMS (/products/generators)"
          description="Manage banner text, diesel generators, gas generators, portable generators, and optiprime generators in one unified section."
        />
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={savingAll}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-sm font-semibold rounded-xl shadow-sm transition cursor-pointer disabled:opacity-60"
        >
          <Save className="w-4 h-4" /> {savingAll ? "Saving All..." : "Save All Changes"}
        </button>
      </div>

      {/* 1. Hero Banner Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Manage page headline, colored accent text, banner description & graphic."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Hero Heading (Regular Part)"
                value={heroHeadingPart1}
                onChange={(e) => setHeroHeadingPart1(e.target.value)}
                placeholder="Kirloskar Generators"
              />
              <InputField
                label="Hero Heading (Colored Part)"
                value={heroHeadingPart2}
                onChange={(e) => setHeroHeadingPart2(e.target.value)}
                placeholder="Distributor"
              />
            </div>
            <TextAreaField
              label="Hero Tagline Subtitle"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              rows={2}
            />
            <ImageUploadField
              label="Hero Banner Graphic Background"
              value={heroBg}
              onChange={(val) => setHeroBg(val)}
            />
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Diesel Generators Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. CPCB IV+ Diesel Generators (${dieselGensets.length} Ranges)`}
          description="Manage title, description, and diesel generator models (7.5 kVA to 1500 kVA)."
          isOpen={isDieselOpen}
          onToggle={() => setIsDieselOpen(!isDieselOpen)}
        />
        <div className={`grid transition-all duration-300 ${isDieselOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Section Heading"
                value={dieselSectionTitle}
                onChange={(e) => setDieselSectionTitle(e.target.value)}
                placeholder="CPCB IV+ Diesel Generators"
              />
              <TextAreaField
                label="Section Description"
                value={dieselSectionDesc}
                onChange={(e) => setDieselSectionDesc(e.target.value)}
                rows={2}
              />
            </div>
            {renderRangeEditor(dieselGensets, dieselHandlers, "Diesel Range", "Add Diesel Power Range")}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingDiesel} saved={savedDiesel} onClick={handleSaveDiesel} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Gas Generators Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Kirloskar Gas Generators (${gasGensets.length} Ranges)`}
          description="Manage eco-friendly gas generator models (15 kVA to 250 kVA)."
          isOpen={isGasOpen}
          onToggle={() => setIsGasOpen(!isGasOpen)}
        />
        <div className={`grid transition-all duration-300 ${isGasOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Section Heading"
                value={gasSectionTitle}
                onChange={(e) => setGasSectionTitle(e.target.value)}
                placeholder="Gas Generators"
              />
              <TextAreaField
                label="Section Description"
                value={gasSectionDesc}
                onChange={(e) => setGasSectionDesc(e.target.value)}
                rows={2}
              />
            </div>
            {renderRangeEditor(gasGensets, gasHandlers, "Gas Range", "Add Gas Generator Range")}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingGas} saved={savedGas} onClick={handleSaveGas} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Portable Generators Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`4. Kirloskar Portable Generators (${portableGensets.length} Ranges)`}
          description="Manage compact portable petrol/gasoline generator models (2.1 kVA to 5 kVA)."
          isOpen={isPortableOpen}
          onToggle={() => setIsPortableOpen(!isPortableOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPortableOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Section Heading"
                value={portableSectionTitle}
                onChange={(e) => setPortableSectionTitle(e.target.value)}
                placeholder="Portable Generators"
              />
              <TextAreaField
                label="Section Description"
                value={portableSectionDesc}
                onChange={(e) => setPortableSectionDesc(e.target.value)}
                rows={2}
              />
            </div>
            {renderRangeEditor(portableGensets, portableHandlers, "Portable Range", "Add Portable Generator Range")}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPortable} saved={savedPortable} onClick={handleSavePortable} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. OptiPrime Generators Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`5. OptiPrime Heavy Duty Generators (${optiprimeGensets.length} Ranges)`}
          description="Manage advanced CRDi smart monitoring OptiPrime generator series."
          isOpen={isOptiprimeOpen}
          onToggle={() => setIsOptiprimeOpen(!isOptiprimeOpen)}
        />
        <div className={`grid transition-all duration-300 ${isOptiprimeOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Section Heading"
                value={optiprimeSectionTitle}
                onChange={(e) => setOptiprimeSectionTitle(e.target.value)}
                placeholder="OptiPrime Heavy Duty Generators"
              />
              <TextAreaField
                label="Section Description"
                value={optiprimeSectionDesc}
                onChange={(e) => setOptiprimeSectionDesc(e.target.value)}
                rows={2}
              />
            </div>
            {renderRangeEditor(optiprimeGensets, optiprimeHandlers, "OptiPrime Range", "Add OptiPrime Generator Range")}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingOptiprime} saved={savedOptiprime} onClick={handleSaveOptiprime} />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Why Choose & Certifications Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="6. Why Choose, Certifications & Help Section"
          description="Manage Why Choose Us benefits, certification badges, and consultation helpline text."
          isOpen={isExtraOpen}
          onToggle={() => setIsExtraOpen(!isExtraOpen)}
        />
        <div className={`grid transition-all duration-300 ${isExtraOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <InputField
              label="Why Choose Section Title"
              value={whyChooseTitle}
              onChange={(e) => setWhyChooseTitle(e.target.value)}
              placeholder="Why Choose Kirloskar Generators?"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 1 Title" value={whyChooseCard1Title} onChange={(e) => setWhyChooseCard1Title(e.target.value)} />
                <TextAreaField label="Card 1 Description" value={whyChooseCard1Desc} onChange={(e) => setWhyChooseCard1Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 2 Title" value={whyChooseCard2Title} onChange={(e) => setWhyChooseCard2Title(e.target.value)} />
                <TextAreaField label="Card 2 Description" value={whyChooseCard2Desc} onChange={(e) => setWhyChooseCard2Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 3 Title" value={whyChooseCard3Title} onChange={(e) => setWhyChooseCard3Title(e.target.value)} />
                <TextAreaField label="Card 3 Description" value={whyChooseCard3Desc} onChange={(e) => setWhyChooseCard3Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 4 Title" value={whyChooseCard4Title} onChange={(e) => setWhyChooseCard4Title(e.target.value)} />
                <TextAreaField label="Card 4 Description" value={whyChooseCard4Desc} onChange={(e) => setWhyChooseCard4Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 5 Title" value={whyChooseCard5Title} onChange={(e) => setWhyChooseCard5Title(e.target.value)} />
                <TextAreaField label="Card 5 Description" value={whyChooseCard5Desc} onChange={(e) => setWhyChooseCard5Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 6 Title" value={whyChooseCard6Title} onChange={(e) => setWhyChooseCard6Title(e.target.value)} />
                <TextAreaField label="Card 6 Description" value={whyChooseCard6Desc} onChange={(e) => setWhyChooseCard6Desc(e.target.value)} rows={2} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <InputField
                label="Certifications Section Title"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                placeholder="Certified Excellence"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <InputField label="Badge 1 Label" value={cert1Title} onChange={(e) => setCert1Title(e.target.value)} />
                <InputField label="Badge 2 Label" value={cert2Title} onChange={(e) => setCert2Title(e.target.value)} />
                <InputField label="Badge 3 Label" value={cert3Title} onChange={(e) => setCert3Title(e.target.value)} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <InputField
                label="Help Section Title"
                value={helpTitle}
                onChange={(e) => setHelpTitle(e.target.value)}
                placeholder="Need Help Choosing the Right Electrical Solution?"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextAreaField
                  label="Help Section Description"
                  value={helpSub}
                  onChange={(e) => setHelpSub(e.target.value)}
                  rows={2}
                />
                <InputField
                  label="Help Button Label"
                  value={helpBtnText}
                  onChange={(e) => setHelpBtnText(e.target.value)}
                  placeholder="Talk to an Expert"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingExtra} saved={savedExtra} onClick={handleSaveExtra} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

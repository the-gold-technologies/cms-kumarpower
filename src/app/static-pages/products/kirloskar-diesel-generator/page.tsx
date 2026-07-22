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
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type DieselGensetCard = {
  id: string;
  name: string;
  range: string;
  fuelType: string;
  cpcbNorm: string;
  cooling: string;
  phase: string;
  rating: string;
  ratingCount: string;
  image: string;
  description: string;
  technicalSpecs: string;
  brochurePdf: string;
};

const API_ENDPOINT = "/api/kirloskar-diesel-generator";
const SECTION_TYPE = "kirloskar-diesel-generator";

const defaultGensets: DieselGensetCard[] = [
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
    ratingCount: "96",
    image: "",
    description: "Our range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.",
    technicalSpecs: "These heavy-duty powerhouses are designed for 24/7 continuous operations in harsh environments, powered by SL90 and DV Series turbocharged after-cooled engines.",
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
    technicalSpecs: "Representing the ultimate in power solutions, this range features the legendary K-Series and DV-Series engines known for massive power density within a compact footprint.",
    brochurePdf: ""
  }
];

export default function KirloskarDieselGeneratorCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGensetsOpen, setIsGensetsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingGensets, setSavingGensets] = useState(false);
  const [savedGensets, setSavedGensets] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Kirloskar Diesel Generators");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Dealer in Delhi");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("Explore Kirloskar Diesel Generators at Kumar Power for reliable backup and prime power solutions. Ideal for industrial and commercial applications in the required power range.");
  const [heroBg, setHeroBg] = useState("");

  // Section Header Text
  const [sectionTitle, setSectionTitle] = useState("CPCB4+ Diesel Generators");
  const [sectionDesc, setSectionDesc] = useState("Kirloskar's range of diesel generators are designed for maximum performance and reliability. Our generators meet the latest CPCB norms and are built for Indian conditions.");

  // Certifications & Help Section Text
  const [certTitle, setCertTitle] = useState("Certified Excellence");
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnText, setHelpBtnText] = useState("Talk to an Expert");

  // Gensets List
  const [gensets, setGensets] = useState<DieselGensetCard[]>(defaultGensets);

  useEffect(() => {
    fetchWithCache(API_ENDPOINT)
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data[SECTION_TYPE] || json.data.products || json.data;
          if (data.heroHeadingPart1 !== undefined) setHeroHeadingPart1(data.heroHeadingPart1);
          if (data.heroHeadingPart2 !== undefined) setHeroHeadingPart2(data.heroHeadingPart2);
          if (data.heroHeading !== undefined) setHeroHeading(data.heroHeading);
          if (data.heroSub !== undefined) setHeroSub(data.heroSub);
          if (data.heroBg !== undefined) setHeroBg(data.heroBg);
          if (data.sectionTitle !== undefined) setSectionTitle(data.sectionTitle);
          if (data.sectionDesc !== undefined) setSectionDesc(data.sectionDesc);
          if (data.certTitle !== undefined) setCertTitle(data.certTitle);
          if (data.helpTitle !== undefined) setHelpTitle(data.helpTitle);
          if (data.helpSub !== undefined) setHelpSub(data.helpSub);
          if (data.helpBtnText !== undefined) setHelpBtnText(data.helpBtnText);
          if (Array.isArray(data.gensets) && data.gensets.length > 0) {
            setGensets(data.gensets);
          }
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const payload = {
      heroHeadingPart1,
      heroHeadingPart2,
      heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
      heroSub,
      heroBg,
      sectionTitle,
      sectionDesc,
      certTitle,
      helpTitle,
      helpSub,
      helpBtnText,
      gensets,
    };

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Kirloskar Diesel Generator page updated!");
    } else {
      toast.error("Failed to save Kirloskar Diesel Generator page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSaveGensets = async () => {
    setSavingGensets(true);
    await saveAllToDB();
    setSavingGensets(false);
    setSavedGensets(true);
    setTimeout(() => setSavedGensets(false), 2000);
  };

  const handleGensetChange = (id: string, field: keyof DieselGensetCard, val: string) => {
    setGensets((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: val } : g)));
  };

  const addGenset = () => {
    setGensets((prev) => [
      ...prev,
      {
        id: `dg-${Date.now()}`,
        name: "",
        range: "",
        fuelType: "Diesel",
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
    toast.success("New Diesel Generator range added!");
  };

  const removeGenset = (id: string) => {
    setGensets((prev) => prev.filter((g) => g.id !== id));
    toast.success("Diesel Generator range removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Kirloskar Diesel Generators CMS (/products/kirloskar-diesel-generator)"
        description="Manage banner text, section headers, diesel generator ranges (7.5 to 1500 kVA), technical specs & brochure downloads."
      />

      {/* 1. Hero Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Manage page headline (regular and colored parts) & tagline description."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Kirloskar Diesel Generators" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Dealer in Delhi" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InputField label="Section Title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} placeholder="CPCB4+ Diesel Generators" />
              <TextAreaField label="Section Description" value={sectionDesc} onChange={(e) => setSectionDesc(e.target.value)} rows={2} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InputField label="Certifications Title" value={certTitle} onChange={(e) => setCertTitle(e.target.value)} placeholder="Certified Excellence" />
              <InputField label="Help Section Title" value={helpTitle} onChange={(e) => setHelpTitle(e.target.value)} placeholder="Need Help Choosing the Right Electrical Solution?" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextAreaField label="Help Section Description" value={helpSub} onChange={(e) => setHelpSub(e.target.value)} rows={2} />
              <InputField label="Help Section Button Text" value={helpBtnText} onChange={(e) => setHelpBtnText(e.target.value)} placeholder="Talk to an Expert" />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Genset Ranges List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Diesel Generator Power Ranges (${gensets.length} Ranges)`}
          description="Manage kVA ratings (7.5kVA, 25kVA, 82.5kVA, 200kVA, 320kVA, 750-1500kVA), technical specs & brochures."
          isOpen={isGensetsOpen}
          onToggle={() => setIsGensetsOpen(!isGensetsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isGensetsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addGenset}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Power Range
              </button>
            </div>

            <div className="space-y-4">
              {gensets.map((g, idx) => (
                <div key={g.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Range #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeGenset(g.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="Name" value={g.name} onChange={(e) => handleGensetChange(g.id, "name", e.target.value)} placeholder="e.g. 7.5 kVA to 20 kVA Diesel generators" />
                    <InputField label="Power Range String" value={g.range} onChange={(e) => handleGensetChange(g.id, "range", e.target.value)} placeholder="7.5 kVA to 20 kVA" />
                    <InputField label="CPCB Norm" value={g.cpcbNorm} onChange={(e) => handleGensetChange(g.id, "cpcbNorm", e.target.value)} placeholder="CPCB-IV+" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Genset Image" value={g.image} onChange={(val) => handleGensetChange(g.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={g.brochurePdf} onChange={(val) => handleGensetChange(g.id, "brochurePdf", val)} />
                  </div>
                  <TextAreaField label="Description" value={g.description} onChange={(e) => handleGensetChange(g.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={g.technicalSpecs} onChange={(e) => handleGensetChange(g.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingGensets} saved={savedGensets} onClick={handleSaveGensets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

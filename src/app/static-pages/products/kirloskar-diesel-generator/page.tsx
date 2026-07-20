"use client";

import { useState } from "react";
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

const INITIAL_GENSETS: DieselGensetCard[] = [
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "Engineered specifically for compact power needs...",
    brochurePdf: "",
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "These mid-range workhorses are built for stability...",
    brochurePdf: "",
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "Designed for industrial-grade performance...",
    brochurePdf: "",
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "This series features high-performance Kirloskar DV Series engines...",
    brochurePdf: "",
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "These heavy-duty powerhouses are designed for 24/7 continuous operations...",
    brochurePdf: "",
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
    description: "Our range of diesel generators are designed for maximum performance and reliability.",
    technicalSpecs: "Representing the ultimate in power solutions, featuring K-Series and DV-Series engines...",
    brochurePdf: "",
  },
];

export default function KirloskarDieselGeneratorCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGensetsOpen, setIsGensetsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingGensets, setSavingGensets] = useState(false);
  const [savedGensets, setSavedGensets] = useState(false);

  const [savingHelp, setSavingHelp] = useState(false);
  const [savedHelp, setSavedHelp] = useState(false);

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("Kirloskar Diesel Generators Dealer in Delhi");
  const [heroSub, setHeroSub] = useState("Explore Kirloskar Diesel Generators at Kumar Power for reliable backup and prime power solutions.");
  const [heroBg, setHeroBg] = useState("");

  // Gensets List
  const [gensets, setGensets] = useState<DieselGensetCard[]>(INITIAL_GENSETS);

  // Help CTA
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnLabel, setHelpBtnLabel] = useState("Talk to an Expert");

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

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveGensets = () => {
    setSavingGensets(true);
    setTimeout(() => {
      setSavingGensets(false);
      setSavedGensets(true);
      toast.success("Diesel generator models saved!");
      setTimeout(() => setSavedGensets(false), 2000);
    }, 400);
  };

  const handleSaveHelp = () => {
    setSavingHelp(true);
    setTimeout(() => {
      setSavingHelp(false);
      setSavedHelp(true);
      toast.success("Help CTA section saved!");
      setTimeout(() => setSavedHelp(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Kirloskar Diesel Generators Static Page CMS (/products/kirloskar-diesel-generator)"
        description="Manage the Kirloskar Diesel Generator product category page (Hero Header, 6 DG Set Models, Technical Specs, PDF Brochures & Help CTA)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Kirloskar Diesel Generators Dealer in Delhi')"
          description="Manage main heading, tagline description & background image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Hero Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Hero Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Background Banner Image" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CPCB-IV+ Diesel Generator Models */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. CPCB4+ Diesel Generator Models (${gensets.length} Models)`}
          description="Manage individual kVA power ranges (7.5 to 1500 kVA), technical specs, images & specific PDF brochures."
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
                <Plus className="w-4 h-4" /> Add Diesel Generator Model
              </button>
            </div>

            <div className="space-y-4">
              {gensets.map((g, idx) => (
                <div key={g.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeGenset(g.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Model Name" value={g.name} onChange={(e) => handleGensetChange(g.id, "name", e.target.value)} placeholder="e.g. 7.5 kVA to 20 kVA Diesel generators" />
                    <InputField label="Power Range" value={g.range} onChange={(e) => handleGensetChange(g.id, "range", e.target.value)} placeholder="e.g. 7.5 kVA to 20 kVA" />
                    <InputField label="Fuel Type" value={g.fuelType} onChange={(e) => handleGensetChange(g.id, "fuelType", e.target.value)} />
                    <InputField label="CPCB Norm" value={g.cpcbNorm} onChange={(e) => handleGensetChange(g.id, "cpcbNorm", e.target.value)} />
                    <InputField label="Cooling System" value={g.cooling} onChange={(e) => handleGensetChange(g.id, "cooling", e.target.value)} />
                    <InputField label="Phase" value={g.phase} onChange={(e) => handleGensetChange(g.id, "phase", e.target.value)} />
                  </div>
                  <TextAreaField label="Short Overview Description" value={g.description} onChange={(e) => handleGensetChange(g.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Detailed Technical Specifications" value={g.technicalSpecs} onChange={(e) => handleGensetChange(g.id, "technicalSpecs", e.target.value)} rows={4} />
                  <ImageUploadField label="Genset Product Image" value={g.image} onChange={(val) => handleGensetChange(g.id, "image", val)} />
                  <PDFUploadField label="Model Brochure PDF File" value={g.brochurePdf} onChange={(val) => handleGensetChange(g.id, "brochurePdf", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingGensets} saved={savedGensets} onClick={handleSaveGensets} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Expert Consultation Help Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Expert Consultation Help Banner"
          description="Manage headline, description copy & action button label."
          isOpen={isHelpOpen}
          onToggle={() => setIsHelpOpen(!isHelpOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHelpOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Banner Title" value={helpTitle} onChange={(e) => setHelpTitle(e.target.value)} />
            <TextAreaField label="Description Subtitle" value={helpSub} onChange={(e) => setHelpSub(e.target.value)} rows={2} />
            <InputField label="Button Text" value={helpBtnLabel} onChange={(e) => setHelpBtnLabel(e.target.value)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHelp} saved={savedHelp} onClick={handleSaveHelp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

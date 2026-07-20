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

type PortableGensetCard = {
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

const INITIAL_PORTABLE_GENSETS: PortableGensetCard[] = [
  {
    id: "port-1",
    name: "2.1 kVA to 5 kVA Portable Generators",
    range: "2.1 kVA to 5 kVA",
    fuelType: "Gasoline / Petrol",
    cpcbNorm: "CPCB-IV+",
    cooling: "Air",
    phase: "Single Phase",
    rating: "4.5",
    ratingCount: "210",
    image: "",
    description: "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
    technicalSpecs: "These lightweight and mobile power solutions are designed for on-the-go reliability...",
    brochurePdf: "",
  },
];

export default function KirloskarPortableGeneratorCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingModels, setSavingModels] = useState(false);
  const [savedModels, setSavedModels] = useState(false);

  const [savingHelp, setSavingHelp] = useState(false);
  const [savedHelp, setSavedHelp] = useState(false);

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("Kirloskar Portable Generators Dealer in Delhi");
  const [heroSub, setHeroSub] = useState("Explore lightweight, mobile, and reliable air-cooled petrol generators for home, retail, outdoor, and mobile field backup.");
  const [heroBg, setHeroBg] = useState("");

  // Models List
  const [models, setModels] = useState<PortableGensetCard[]>(INITIAL_PORTABLE_GENSETS);

  // Help Section
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnLabel, setHelpBtnLabel] = useState("Talk to an Expert");

  const handleModelChange = (id: string, field: keyof PortableGensetCard, val: string) => {
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const addModel = () => {
    setModels((prev) => [
      ...prev,
      {
        id: `port-${Date.now()}`,
        name: "",
        range: "",
        fuelType: "Gasoline / Petrol",
        cpcbNorm: "CPCB-IV+",
        cooling: "Air",
        phase: "Single Phase",
        rating: "4.5",
        ratingCount: "100",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Portable Generator model added!");
  };

  const removeModel = (id: string) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
    toast.success("Portable Generator model removed");
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

  const handleSaveModels = () => {
    setSavingModels(true);
    setTimeout(() => {
      setSavingModels(false);
      setSavedModels(true);
      toast.success("Portable generator models saved!");
      setTimeout(() => setSavedModels(false), 2000);
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
        title="Kirloskar Portable Generators Static Page CMS (/products/kirloskar-portable-generator)"
        description="Manage the Kirloskar Portable Generator product page (Hero Header, Portable Genset models, Technical Specs, PDF Brochures & Help CTA)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Kirloskar Portable Generators')"
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

      {/* 2. Portable Generator Models */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Portable Generator Models (${models.length} Models)`}
          description="Manage kVA power ranges, technical specs, images & PDF brochures."
          isOpen={isModelsOpen}
          onToggle={() => setIsModelsOpen(!isModelsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isModelsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addModel}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Portable Generator Model
              </button>
            </div>

            <div className="space-y-4">
              {models.map((m, idx) => (
                <div key={m.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeModel(m.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Model Name" value={m.name} onChange={(e) => handleModelChange(m.id, "name", e.target.value)} placeholder="e.g. 2.1 kVA to 5 kVA Portable Generators" />
                    <InputField label="Power Range" value={m.range} onChange={(e) => handleModelChange(m.id, "range", e.target.value)} placeholder="e.g. 2.1 kVA to 5 kVA" />
                    <InputField label="Fuel Type" value={m.fuelType} onChange={(e) => handleModelChange(m.id, "fuelType", e.target.value)} />
                    <InputField label="Cooling System" value={m.cooling} onChange={(e) => handleModelChange(m.id, "cooling", e.target.value)} />
                  </div>
                  <TextAreaField label="Short Overview Description" value={m.description} onChange={(e) => handleModelChange(m.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Detailed Technical Specifications" value={m.technicalSpecs} onChange={(e) => handleModelChange(m.id, "technicalSpecs", e.target.value)} rows={4} />
                  <ImageUploadField label="Product Image Upload" value={m.image} onChange={(val) => handleModelChange(m.id, "image", val)} />
                  <PDFUploadField label="Portable Generator Brochure PDF File" value={m.brochurePdf} onChange={(val) => handleModelChange(m.id, "brochurePdf", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingModels} saved={savedModels} onClick={handleSaveModels} />
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

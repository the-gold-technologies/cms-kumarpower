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

type TransformerModelCard = {
  id: string;
  name: string;
  range: string;
  cooling: string;
  phase: string;
  image: string;
  description: string;
  technicalSpecs: string;
  brochurePdf: string;
};

const INITIAL_TRANS_MODELS: TransformerModelCard[] = [
  {
    id: "trans-1",
    name: "Distribution Transformers",
    range: "100-2500 kVA",
    cooling: "Oil/Dry",
    phase: "Three Phase",
    image: "",
    description: "Durable and efficient transformers designed for various industrial and commercial applications.",
    technicalSpecs: "These reliable step-down transformers are crafted for utility and industrial use, featuring a core made from CRGO silicon steel...",
    brochurePdf: "",
  },
];

export default function TransformersCMSPage() {
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
  const [heroHeading, setHeroHeading] = useState("Distribution Transformers Manufacturer in Delhi");
  const [heroSub, setHeroSub] = useState("High-efficiency step-down distribution transformers engineered for industrial, commercial & utility substations.");
  const [heroBg, setHeroBg] = useState("");

  // Models List
  const [models, setModels] = useState<TransformerModelCard[]>(INITIAL_TRANS_MODELS);

  // Help Section
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnLabel, setHelpBtnLabel] = useState("Talk to an Expert");

  const handleModelChange = (id: string, field: keyof TransformerModelCard, val: string) => {
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const addModel = () => {
    setModels((prev) => [
      ...prev,
      {
        id: `trans-${Date.now()}`,
        name: "",
        range: "",
        cooling: "ONAN / Dry Type",
        phase: "Three Phase",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Transformer model added!");
  };

  const removeModel = (id: string) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
    toast.success("Transformer model removed");
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
      toast.success("Transformer models saved!");
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
        title="Transformers Static Page CMS (/products/transformers)"
        description="Manage the Distribution Transformers product page (Hero Header, Transformer models, Technical Specs, PDF Catalogues & Help CTA)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Distribution Transformers')"
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

      {/* 2. Transformer Models */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Transformer Models (${models.length} Models)`}
          description="Manage kVA power ratings, cooling, technical specs, images & PDF brochures."
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
                <Plus className="w-4 h-4" /> Add Transformer Model
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
                    <InputField label="Model Name" value={m.name} onChange={(e) => handleModelChange(m.id, "name", e.target.value)} placeholder="e.g. Distribution Transformers" />
                    <InputField label="Power Range" value={m.range} onChange={(e) => handleModelChange(m.id, "range", e.target.value)} placeholder="e.g. 100-2500 kVA" />
                    <InputField label="Cooling System" value={m.cooling} onChange={(e) => handleModelChange(m.id, "cooling", e.target.value)} />
                    <InputField label="Phase" value={m.phase} onChange={(e) => handleModelChange(m.id, "phase", e.target.value)} />
                  </div>
                  <TextAreaField label="Short Overview Description" value={m.description} onChange={(e) => handleModelChange(m.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Detailed Technical Specifications" value={m.technicalSpecs} onChange={(e) => handleModelChange(m.id, "technicalSpecs", e.target.value)} rows={4} />
                  <ImageUploadField label="Product Image Upload" value={m.image} onChange={(val) => handleModelChange(m.id, "image", val)} />
                  <PDFUploadField label="Transformer Brochure PDF File" value={m.brochurePdf} onChange={(val) => handleModelChange(m.id, "brochurePdf", val)} />
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

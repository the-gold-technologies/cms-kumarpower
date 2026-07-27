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

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type TransformerCard = {
  id: string;
  name: string;
  range: string;
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const API_ENDPOINT = "/api/transformers";
const SECTION_TYPE = "transformers";

export default function DistributionTransformersCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isTransOpen, setIsTransOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingTrans, setSavingTrans] = useState(false);
  const [savedTrans, setSavedTrans] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Distribution");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Transformers");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Transformers List
  const [transformers, setTransformers] = useState<TransformerCard[]>([]);

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
          if (Array.isArray(data.transformers)) setTransformers(data.transformers);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const rawPayload = {
      heroHeadingPart1,
      heroHeadingPart2,
      heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
      heroSub,
      heroBg,
      transformers,
    };

    const payload = await uploadFilesDeep(rawPayload);

    // Sync state
    if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
    if (payload.transformers) setTransformers(payload.transformers);

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Distribution Transformers page updated!");
    } else {
      toast.error("Failed to save Distribution Transformers page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSaveTrans = async () => {
    setSavingTrans(true);
    await saveAllToDB();
    setSavingTrans(false);
    setSavedTrans(true);
    setTimeout(() => setSavedTrans(false), 2000);
  };

  const handleTransChange = (id: string, field: keyof TransformerCard, val: string | File) => {
    setTransformers((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const addTransformer = () => {
    setTransformers((prev) => [
      ...prev,
      {
        id: `trans-${Date.now()}`,
        name: "",
        range: "100-2500 kVA",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Transformer model added!");
  };

  const removeTransformer = (id: string) => {
    setTransformers((prev) => prev.filter((t) => t.id !== id));
    toast.success("Transformer model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Distribution Transformers CMS (/products/transformers)"
        description="Manage banner text, step-down transformer models (100kVA to 2500kVA), technical specs & brochures."
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
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Distribution" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Transformers" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Transformers List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Transformer Models (${transformers.length} Models)`}
          description="Manage transformer models, technical specs & brochure downloads."
          isOpen={isTransOpen}
          onToggle={() => setIsTransOpen(!isTransOpen)}
        />
        <div className={`grid transition-all duration-300 ${isTransOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addTransformer}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Transformer Model
              </button>
            </div>

            <div className="space-y-4">
              {transformers.map((t, idx) => (
                <div key={t.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeTransformer(t.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Name" value={t.name} onChange={(e) => handleTransChange(t.id, "name", e.target.value)} placeholder="e.g. Distribution Transformers" />
                    <InputField label="Capacity Range" value={t.range} onChange={(e) => handleTransChange(t.id, "range", e.target.value)} placeholder="100-2500 kVA" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Transformer Graphic Image" value={t.image} onChange={(val) => handleTransChange(t.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={t.brochurePdf} onChange={(val) => handleTransChange(t.id, "brochurePdf", val)} />
                  </div>
                  <TextAreaField label="Description" value={t.description} onChange={(e) => handleTransChange(t.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={t.technicalSpecs} onChange={(e) => handleTransChange(t.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingTrans} saved={savedTrans} onClick={handleSaveTrans} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

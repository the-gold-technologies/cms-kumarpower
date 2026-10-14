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
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const API_ENDPOINT = "/api/kirloskar-diesel-generator";
const SECTION_TYPE = "kirloskar-diesel-generator";

export default function KirloskarDieselGeneratorCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGensetsOpen, setIsGensetsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingGensets, setSavingGensets] = useState(false);
  const [savedGensets, setSavedGensets] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Section Header Text
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");

  // Certifications & Help Section Text
  const [certTitle, setCertTitle] = useState("");
  const [helpTitle, setHelpTitle] = useState("");
  const [helpSub, setHelpSub] = useState("");
  const [helpBtnText, setHelpBtnText] = useState("");

  // Gensets List
  const [gensets, setGensets] = useState<DieselGensetCard[]>([]);

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
          if (Array.isArray(data.gensets)) {
            setGensets(data.gensets);
          }
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
      sectionTitle,
      sectionDesc,
      certTitle,
      helpTitle,
      helpSub,
      helpBtnText,
      gensets,
    };
    
    const payload = await uploadFilesDeep(rawPayload);
    
    if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
    if (payload.gensets) setGensets(payload.gensets);

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

  const handleGensetChange = (id: string, field: keyof DieselGensetCard, val: string | File) => {
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

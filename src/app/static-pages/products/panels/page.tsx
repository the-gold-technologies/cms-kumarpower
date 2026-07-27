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

type PanelCard = {
  id: string;
  name: string;
  range: string;
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const API_ENDPOINT = "/api/panels";
const SECTION_TYPE = "panels";

export default function ElectricalPanelsCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isPanelsOpen, setIsPanelsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingPanels, setSavingPanels] = useState(false);
  const [savedPanels, setSavedPanels] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Electrical");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Panels");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Panels List
  const [panels, setPanels] = useState<PanelCard[]>([]);

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
          if (Array.isArray(data.panels)) setPanels(data.panels);
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
      panels,
    };

    const payload = await uploadFilesDeep(rawPayload);

    // Sync state
    if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
    if (payload.panels) setPanels(payload.panels);

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Electrical Panels page updated!");
    } else {
      toast.error("Failed to save Electrical Panels page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSavePanels = async () => {
    setSavingPanels(true);
    await saveAllToDB();
    setSavingPanels(false);
    setSavedPanels(true);
    setTimeout(() => setSavedPanels(false), 2000);
  };

  const handlePanelChange = (id: string, field: keyof PanelCard, val: string | File) => {
    setPanels((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addPanel = () => {
    setPanels((prev) => [
      ...prev,
      {
        id: `panel-${Date.now()}`,
        name: "",
        range: "Various",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Electrical Panel model added!");
  };

  const removePanel = (id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
    toast.success("Electrical Panel model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Electrical Panels CMS (/products/panels)"
        description="Manage banner text, AMF panels, synchronization panels, distribution boards, technical specs & brochures."
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
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Electrical" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Panels" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Panels List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Electrical Panel Types (${panels.length} Panel Models)`}
          description="Manage electrical panel types, technical specs & brochure downloads."
          isOpen={isPanelsOpen}
          onToggle={() => setIsPanelsOpen(!isPanelsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPanelsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addPanel}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Panel Model
              </button>
            </div>

            <div className="space-y-4">
              {panels.map((p, idx) => (
                <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Panel #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removePanel(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Name" value={p.name} onChange={(e) => handlePanelChange(p.id, "name", e.target.value)} placeholder="e.g. AMF Panels" />
                    <InputField label="Rating / Capacity Range" value={p.range} onChange={(e) => handlePanelChange(p.id, "range", e.target.value)} placeholder="Various" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Panel Graphic Image" value={p.image} onChange={(val) => handlePanelChange(p.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={p.brochurePdf} onChange={(val) => handlePanelChange(p.id, "brochurePdf", val)} />
                  </div>
                  <TextAreaField label="Description" value={p.description} onChange={(e) => handlePanelChange(p.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={p.technicalSpecs} onChange={(e) => handlePanelChange(p.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPanels} saved={savedPanels} onClick={handleSavePanels} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

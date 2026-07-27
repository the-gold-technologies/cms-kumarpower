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

type ServoCard = {
  id: string;
  name: string;
  range: string;
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const API_ENDPOINT = "/api/servo-stabilizer";
const SECTION_TYPE = "servo-stabilizer";

export default function ServoStabilizerCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isServosOpen, setIsServosOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingServos, setSavingServos] = useState(false);
  const [savedServos, setSavedServos] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Servo Voltage");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Stabilizers");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Servos List
  const [servos, setServos] = useState<ServoCard[]>([]);

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
          if (Array.isArray(data.servos)) setServos(data.servos);
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
      servos,
    };

    const payload = await uploadFilesDeep(rawPayload);

    // Sync state
    if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
    if (payload.servos) setServos(payload.servos);

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Servo Stabilizer page updated!");
    } else {
      toast.error("Failed to save Servo Stabilizer page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSaveServos = async () => {
    setSavingServos(true);
    await saveAllToDB();
    setSavingServos(false);
    setSavedServos(true);
    setTimeout(() => setSavedServos(false), 2000);
  };

  const handleServoChange = (id: string, field: keyof ServoCard, val: string | File) => {
    setServos((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const addServo = () => {
    setServos((prev) => [
      ...prev,
      {
        id: `servo-${Date.now()}`,
        name: "",
        range: "5-100 kVA",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Servo Stabilizer model added!");
  };

  const removeServo = (id: string) => {
    setServos((prev) => prev.filter((s) => s.id !== id));
    toast.success("Servo Stabilizer model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Servo Voltage Stabilizers CMS (/products/servo-stabilizer)"
        description="Manage banner text, oil cooled & air cooled servo stabilizer models, technical specs & brochures."
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
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Servo Voltage" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Stabilizers" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Servos List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Servo Stabilizer Models (${servos.length} Models)`}
          description="Manage stabilizer models, technical specs & brochure downloads."
          isOpen={isServosOpen}
          onToggle={() => setIsServosOpen(!isServosOpen)}
        />
        <div className={`grid transition-all duration-300 ${isServosOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addServo}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Stabilizer Model
              </button>
            </div>

            <div className="space-y-4">
              {servos.map((s, idx) => (
                <div key={s.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeServo(s.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Name" value={s.name} onChange={(e) => handleServoChange(s.id, "name", e.target.value)} placeholder="e.g. Oil Cooled Servo Stabilizers" />
                    <InputField label="Capacity Range" value={s.range} onChange={(e) => handleServoChange(s.id, "range", e.target.value)} placeholder="5-100 kVA" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Stabilizer Graphic Image" value={s.image} onChange={(val) => handleServoChange(s.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={s.brochurePdf} onChange={(val) => handleServoChange(s.id, "brochurePdf", val)} />
                  </div>
                  <TextAreaField label="Description" value={s.description} onChange={(e) => handleServoChange(s.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={s.technicalSpecs} onChange={(e) => handleServoChange(s.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingServos} saved={savedServos} onClick={handleSaveServos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

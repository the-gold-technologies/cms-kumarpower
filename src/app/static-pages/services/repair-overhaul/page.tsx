"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type RepairServiceCard = {
  id: string;
  title: string;
  description: string;
  includedTasks: string;
};

export default function RepairOverhaulCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingServices, setSavingServices] = useState(false);
  const [savedServices, setSavedServices] = useState(false);

  const [savingHelp, setSavingHelp] = useState(false);
  const [savedHelp, setSavedHelp] = useState(false);

  // Hero Section
  const [heroTagline, setHeroTagline] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState("");

  // Repair Services
  const [services, setServices] = useState<RepairServiceCard[]>([]);

  // Help Section
  const [helpTitle, setHelpTitle] = useState("");
  const [helpSub, setHelpSub] = useState("");
  const [helpBtnLabel, setHelpBtnLabel] = useState("");

  const handleServiceChange = (id: string, field: keyof RepairServiceCard, val: string) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      { id: `rep-${Date.now()}`, title: "", description: "", includedTasks: "" },
    ]);
    toast.success("New Repair Service item added!");
  };

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success("Repair Service item removed");
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

  const handleSaveServices = () => {
    setSavingServices(true);
    setTimeout(() => {
      setSavingServices(false);
      setSavedServices(true);
      toast.success("Repair & overhaul services saved!");
      setTimeout(() => setSavedServices(false), 2000);
    }, 400);
  };

  const handleSaveHelp = () => {
    setSavingHelp(true);
    setTimeout(() => {
      setSavingHelp(false);
      setSavedHelp(true);
      toast.success("Inspection consultation section saved!");
      setTimeout(() => setSavedHelp(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Repair & Overhaul Service Static Page CMS (/services/repair-overhaul)"
        description="Manage the Engine Repair & Overhauling page (Hero Header, overhauling packages, FIP/Alternator repair & diagnostic audit hotline)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('ENGINE REPAIR & OVERHAULING')"
          description="Manage headline, subtitle tagline & background image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline Badge Text" value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} />
            <InputField label="Main Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Subtitle Tagline" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Background Banner Image" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Repair & Overhaul Service Items */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Overhauling & Repair Offerings (${services.length} Services)`}
          description="Manage engine rebuilding, alternator rewinding, fuel pump calibration & genuine KOEL parts."
          isOpen={isServicesOpen}
          onToggle={() => setIsServicesOpen(!isServicesOpen)}
        />
        <div className={`grid transition-all duration-300 ${isServicesOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Repair Service
              </button>
            </div>

            <div className="space-y-4">
              {services.map((s, idx) => (
                <div key={s.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      Offering #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeService(s.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField label="Service Name" value={s.title} onChange={(e) => handleServiceChange(s.id, "title", e.target.value)} placeholder="e.g. Major Engine Overhauling & Rebuilding" />
                  <TextAreaField label="Service Overview" value={s.description} onChange={(e) => handleServiceChange(s.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Included Tasks / Technical Scope" value={s.includedTasks} onChange={(e) => handleServiceChange(s.id, "includedTasks", e.target.value)} rows={2} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingServices} saved={savedServices} onClick={handleSaveServices} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Diagnostic Audit Consultation CTA */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Diagnostic Audit Consultation CTA"
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

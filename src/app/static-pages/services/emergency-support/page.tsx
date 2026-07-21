"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function EmergencySupportCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingHotline, setSavingHotline] = useState(false);
  const [savedHotline, setSavedHotline] = useState(false);

  // Hero Section
  const [heroTagline, setHeroTagline] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState("");

  // Hotline Details
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyPhone2, setEmergencyPhone2] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [dispatchSla, setDispatchSla] = useState("");

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveHotline = () => {
    setSavingHotline(true);
    setTimeout(() => {
      setSavingHotline(false);
      setSavedHotline(true);
      toast.success("Emergency hotline numbers saved!");
      setTimeout(() => setSavedHotline(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Emergency Support Service Static Page CMS (/services/emergency-support)"
        description="Manage the 24/7 Emergency Breakdown Support page (Hero Header, Hotline phone numbers, SLA guarantee & dispatch terms)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('24/7 EMERGENCY POWER SUPPORT')"
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

      {/* 2. Emergency Hotline & SLA Details */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. 24/7 Emergency Hotline Numbers & Response SLA"
          description="Manage primary emergency call line, landline hotline, WhatsApp SOS line & SLA dispatch guarantee."
          isOpen={isHotlineOpen}
          onToggle={() => setIsHotlineOpen(!isHotlineOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHotlineOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Primary Emergency Phone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="+919773877796" />
              <InputField label="Landline Helpline Number" value={emergencyPhone2} onChange={(e) => setEmergencyPhone2(e.target.value)} placeholder="01140191273" />
              <InputField label="WhatsApp Emergency SOS Number" value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} placeholder="+919773877796" />
              <InputField label="Guaranteed Response SLA" value={dispatchSla} onChange={(e) => setDispatchSla(e.target.value)} placeholder="120 Minutes Response SLA within Delhi-NCR" />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHotline} saved={savedHotline} onClick={handleSaveHotline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

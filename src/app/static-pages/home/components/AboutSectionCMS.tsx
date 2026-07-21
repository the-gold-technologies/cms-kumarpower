"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface AboutSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AboutSectionCMS({
  saveUrl = "/api/home",
  responseKey = "about",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: AboutSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    bannerTitle: "",
    bannerSubtitle: "",
    mainHeadingLine1: "",
    mainHeadingLine2: "",
    description: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    ctaLabel: "",
    ctaUrl: "",
    teamImage: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const about = responseKey ? json.data?.[responseKey] : json.data;
          if (about && typeof about === "object") {
            setFormData((prev) => ({
              ...prev,
              ...about,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("About section saved!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="About Us Section"
        description="Manage the About page banner, main heading, story copy, feature checkmarks, CTA button, and showcase image."
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-6 pt-1">

          {/* Black Hero Banner */}
          <div className="p-5 bg-slate-900 rounded-2xl space-y-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Black Hero Banner</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Banner Title"
                value={formData.bannerTitle}
                onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                placeholder="e.g. ABOUT KUMAR POWER"
              />
              <InputField
                label="Banner Tagline"
                value={formData.bannerSubtitle}
                onChange={(e) => setFormData({ ...formData, bannerSubtitle: e.target.value })}
                placeholder="e.g. Powering Progress."
              />
            </div>
          </div>

          {/* Main Heading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Heading Line 1"
              value={formData.mainHeadingLine1}
              onChange={(e) => setFormData({ ...formData, mainHeadingLine1: e.target.value })}
              placeholder="e.g. Engineering India's"
            />
            <InputField
              label="Heading Line 2"
              value={formData.mainHeadingLine2}
              onChange={(e) => setFormData({ ...formData, mainHeadingLine2: e.target.value })}
              placeholder="e.g. Energy Backbone."
            />
          </div>

          {/* Story Copy */}
          <TextAreaField
            label="About Story Paragraph"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />

          {/* Feature Bullets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#2D6FBA]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                Feature Checkmarks (4 Items)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Feature 1"
                value={formData.feature1}
                onChange={(e) => setFormData({ ...formData, feature1: e.target.value })}
              />
              <InputField
                label="Feature 2"
                value={formData.feature2}
                onChange={(e) => setFormData({ ...formData, feature2: e.target.value })}
              />
              <InputField
                label="Feature 3"
                value={formData.feature3}
                onChange={(e) => setFormData({ ...formData, feature3: e.target.value })}
              />
              <InputField
                label="Feature 4"
                value={formData.feature4}
                onChange={(e) => setFormData({ ...formData, feature4: e.target.value })}
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="CTA Button Label"
              value={formData.ctaLabel}
              onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
              placeholder="e.g. Explore Our Legacy"
            />
            <InputField
              label="CTA Target URL"
              value={formData.ctaUrl}
              onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
              placeholder="e.g. /about/OurProfile"
            />
          </div>

          {/* Team Image */}
          <ImageUploadField
            label="Section Image (Right Side)"
            value={formData.teamImage}
            onChange={(val) => setFormData({ ...formData, teamImage: val })}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

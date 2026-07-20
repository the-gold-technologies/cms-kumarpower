"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export function AboutSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    // Black Banner
    bannerTitle: "ABOUT KUMAR POWER",
    bannerSubtitle: "Powering Progress.",

    // Main section
    mainHeadingLine1: "Engineering India's",
    mainHeadingLine2: "Energy Backbone.",
    description: "For over 30+ years, Kumar Power has engineered uninterrupted power across India's industries, infrastructure, and institutions. With Kirloskar certification and ISO 9001:2015 accreditation, we serve 500+ enterprise clients with unmatched reliability and scale.",

    // Feature bullets
    feature1: "Kirloskar Authorized Distributor",
    feature2: "24/7 Service Infrastructure",
    feature3: "500+ Enterprise Clients",
    feature4: "ISO 9001:2015 Accredited",

    // CTA Button
    ctaLabel: "Explore Our Legacy",
    ctaUrl: "/about/OurProfile",

    // Team Image
    teamImage: "",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("About section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
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

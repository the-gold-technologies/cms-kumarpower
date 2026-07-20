"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { FileText, Video, Award } from "lucide-react";
import toast from "react-hot-toast";

export function HeroSectionCMS() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    titleLine1: "Trusted Kirloskar Generator Dealer",
    titleLine2: "Certified Dealer for India’s Power Needs",
    subtitleDesktop: "Authorized Channel Distributor | ISO 9001:2015 | 500+ Enterprise Clients | 30+ Years of Uninterrupted Excellence",
    subtitleMobile: "Authorized Channel Distributor\nISO 9001:2015\n500+ Enterprise Clients\n30+ Years of Excellence",
    ctaPrimaryLabel: "Explore Power Solutions",
    ctaPrimaryUrl: "/products",
    ctaSecondaryLabel: "Download Profile",
    pdfProfileUrl: "/profile.pdf",
    videoBgUrl: "/video/background.mp4",
    trustedByHeading: "TRUSTED BY",
    logo1: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg",
    logo2: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Hero Section saved to CMS!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Home Hero Section"
        description="Manage hero headlines, background video, CTA buttons, downloadable company profile PDF, and trusted client logos."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Headline Line 1"
              value={formData.titleLine1}
              onChange={(e) => setFormData({ ...formData, titleLine1: e.target.value })}
              placeholder="e.g. Trusted Kirloskar Generator Dealer"
            />
            <InputField
              label="Headline Line 2"
              value={formData.titleLine2}
              onChange={(e) => setFormData({ ...formData, titleLine2: e.target.value })}
              placeholder="e.g. Certified Dealer for India’s Power Needs"
            />
          </div>

          <TextAreaField
            label="Sub-headline Copy (Desktop)"
            value={formData.subtitleDesktop}
            onChange={(e) => setFormData({ ...formData, subtitleDesktop: e.target.value })}
            rows={2}
          />

          <TextAreaField
            label="Sub-headline Copy (Mobile)"
            value={formData.subtitleMobile}
            onChange={(e) => setFormData({ ...formData, subtitleMobile: e.target.value })}
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Primary CTA Button Text"
              value={formData.ctaPrimaryLabel}
              onChange={(e) => setFormData({ ...formData, ctaPrimaryLabel: e.target.value })}
            />

            <InputField
              label="Primary CTA Target Link"
              value={formData.ctaPrimaryUrl}
              onChange={(e) => setFormData({ ...formData, ctaPrimaryUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Download Profile Button Text"
              value={formData.ctaSecondaryLabel}
              onChange={(e) => setFormData({ ...formData, ctaSecondaryLabel: e.target.value })}
            />

            <InputField
              label="Download PDF File URL"
              value={formData.pdfProfileUrl}
              onChange={(e) => setFormData({ ...formData, pdfProfileUrl: e.target.value })}
            />
          </div>

          <InputField
            label="Background Video URL / Asset"
            value={formData.videoBgUrl}
            onChange={(e) => setFormData({ ...formData, videoBgUrl: e.target.value })}
            icon={<Video className="w-4 h-4" />}
          />

          {/* Trusted By Client Logos Section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <InputField
              label="Trusted By Section Heading"
              value={formData.trustedByHeading}
              onChange={(e) => setFormData({ ...formData, trustedByHeading: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadField
                label="Client Logo 1"
                value={formData.logo1}
                onChange={(val) => setFormData({ ...formData, logo1: val })}
              />

              <ImageUploadField
                label="Client Logo 2"
                value={formData.logo2}
                onChange={(val) => setFormData({ ...formData, logo2: val })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

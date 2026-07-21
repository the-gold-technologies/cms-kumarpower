"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface ContactHeroSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ContactHeroSectionCMS({
  saveUrl = "/api/contact",
  responseKey = "hero",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ContactHeroSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    bannerHeading: "",
    bannerSubtitle: "",
    bannerBgImage: "",
    primaryBtnLabel: "",
    whatsappBtnLabel: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const hero = responseKey ? json.data?.[responseKey] : json.data;
          if (hero && typeof hero === "object") {
            setFormData((prev) => ({
              ...prev,
              ...Object.fromEntries(Object.entries(hero).filter(([k]) => k in prev)),
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
      toast.success("Hero banner saved!");
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
        title="1. Hero Banner Section ('Powering Connections')"
        description="Manage the contact hero banner headline, subtitle, background image, and CTA buttons."
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
          <InputField
            label="Banner Main Heading"
            value={formData.bannerHeading}
            onChange={(e) => setFormData({ ...formData, bannerHeading: e.target.value })}
          />
          <TextAreaField
            label="Banner Subtitle"
            value={formData.bannerSubtitle}
            onChange={(e) => setFormData({ ...formData, bannerSubtitle: e.target.value })}
            rows={2}
          />
          <ImageUploadField
            label="Banner Background Image"
            value={formData.bannerBgImage}
            onChange={(val) => setFormData({ ...formData, bannerBgImage: val })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField
              label="Primary Button Label"
              value={formData.primaryBtnLabel}
              onChange={(e) => setFormData({ ...formData, primaryBtnLabel: e.target.value })}
            />
            <InputField
              label="WhatsApp Button Label"
              value={formData.whatsappBtnLabel}
              onChange={(e) => setFormData({ ...formData, whatsappBtnLabel: e.target.value })}
            />
            <InputField
              label="WhatsApp Phone Number"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface AboutHeroSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AboutHeroSectionCMS({
  saveUrl = "/api/our-profile",
  responseKey = "hero",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: AboutHeroSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    image: string | File;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
  }>({
    title: "",
    subtitle: "",
    image: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
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
      const content = await uploadFilesDeep(formData);
      if (content.image && typeof content.image === "string") {
        setFormData((prev) => ({ ...prev, image: content.image }));
      }

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Hero section saved!");
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
        title="1. Hero Intro Section ('Know About Kumar Power')"
        description="Manage the top overview title, subtitle, facility showcase image, and introductory paragraphs."
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
              label="Main Heading"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <InputField
              label="Subtitle Tagline"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <ImageUploadField
            label="Facility Showcase Image"
            value={formData.image}
            onChange={(val) => setFormData({ ...formData, image: val })}
          />

          <TextAreaField
            label="Paragraph 1 (Establishment & Background)"
            value={formData.paragraph1}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 2 (SITC & Power Solutions)"
            value={formData.paragraph2}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 3 (Authorized Dealer & Service)"
            value={formData.paragraph3}
            onChange={(e) => setFormData({ ...formData, paragraph3: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 4 (Delivery & Customer Approach)"
            value={formData.paragraph4}
            onChange={(e) => setFormData({ ...formData, paragraph4: e.target.value })}
            rows={3}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

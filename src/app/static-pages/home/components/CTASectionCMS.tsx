"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function CTASectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    primaryBtnLabel: "",
    primaryBtnUrl: "",
    whatsappBtnLabel: "",
    whatsappNumber: "",
    backgroundImage: "",
  });

  useEffect(() => {
    fetch("/api/pages/home")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const cta = json.data.cta || {};
          setFormData((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(cta).filter(([k]) => k in prev)),
          }));
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "cta", content: formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("CTA section saved!");
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
        title="CTA Assistance Section"
        description="Configure the mid-page 'Need Expert Assistance?' banner, buttons, WhatsApp number & background image."
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
            label="Banner Headline"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Need Expert Assistance?"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Primary Button Label"
              value={formData.primaryBtnLabel}
              onChange={(e) => setFormData({ ...formData, primaryBtnLabel: e.target.value })}
              placeholder="e.g. Talk to an Expert"
            />
            <InputField
              label="Primary Button URL"
              value={formData.primaryBtnUrl}
              onChange={(e) => setFormData({ ...formData, primaryBtnUrl: e.target.value })}
              placeholder="e.g. /contact"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="WhatsApp Button Label"
              value={formData.whatsappBtnLabel}
              onChange={(e) => setFormData({ ...formData, whatsappBtnLabel: e.target.value })}
              placeholder="e.g. Connect on WhatsApp"
            />
            <InputField
              label="WhatsApp Number (with country code)"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="e.g. 919773851767"
              tooltip="Phone number formatted without + symbol (e.g. 919773851767)"
            />
          </div>

          <ImageUploadField
            label="Banner Background Image"
            value={formData.backgroundImage}
            onChange={(val) => setFormData({ ...formData, backgroundImage: val })}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
